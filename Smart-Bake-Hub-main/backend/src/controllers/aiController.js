const { GoogleGenAI } = require('@google/genai');
const db = require('../config/db');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const generateForecast = async (req, res) => {
    try {
        // 1. Fetch real historical sales data from the database (last 7 days for faster processing)
        const salesQuery = `
            SELECT 
                DATE_FORMAT(o.created_at, '%Y-%m-%d') as date,
                c.name as category,
                SUM(oi.quantity) as total_quantity,
                SUM(oi.price * oi.quantity) as total_revenue
            FROM order_items oi
            JOIN orders o ON oi.order_id = o.id
            JOIN products p ON oi.product_id = p.id
            LEFT JOIN categories c ON p.category_id = c.id
            WHERE o.created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
            GROUP BY DATE(o.created_at), category
            ORDER BY date DESC
        `;
        
        const peakHourQuery = `
            SELECT 
                HOUR(o.created_at) as hourOfDay,
                SUM(oi.quantity) as total_quantity
            FROM order_items oi
            JOIN orders o ON oi.order_id = o.id
            WHERE o.created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
            GROUP BY HOUR(o.created_at)
            ORDER BY hourOfDay ASC
        `;

        const [salesData] = await db.query(salesQuery);
        const [hourData] = await db.query(peakHourQuery);

        if (salesData.length === 0) {
            return res.status(400).json({ message: "Not enough historical sales data to generate forecast." });
        }

        // 2. Feed this raw data as context into the Gemini API
        const prompt = `
            You are an advanced AI Demand Forecasting Engine for a commercial bakery called Smart Bake Hub.
            
            Below is the REAL historical sales data for the last 7 days, aggregated by date and category:
            ${JSON.stringify(salesData)}
            
            Below is the peak hour sales volume data over the same period:
            ${JSON.stringify(hourData)}

            Task: Analyze the provided real historical data to determine trends and generate a highly accurate 7-day FUTURE demand forecast JSON.
            
            Return ONLY a valid JSON object matching this schema exactly. Ensure numbers are mathematically plausible based on the historical data.
            - totalForecastedSales: number (expected revenue for next 7 days)
            - salesGrowth: string (e.g. "+15.2%" or "-2.1%" compared to previous week)
            - forecastedOrders: number (total orders expected)
            - ordersGrowth: string
            - predictedProductionQuantity: number (total items to bake)
            - itemsGrowth: string
            - highDemandItemsCount: number
            - expectedRevenueIncrease: string (e.g. "+Rs. 25,000")
            
            - forecastData: array of 7 objects (Mon to Sun of upcoming week) { name: 'Day', forecast: number (forecasted revenue), actual: number|null (leave null for future), confidence: [number, number] (min/max range) }
            - categoryData: array of 5 objects { name: 'Cakes'|'Meals'|'Bakery'|'Beverages'|'Snacks', value: number (forecasted quantity) }
            - peakHourData: array of 8 objects representing times (e.g. '08:00', '10:00') { time: string, demand: number (avg quantity) }
            - heatmapData: 2D array [5][7] of integers between 1 and 5 (representing demand intensity for the 5 categories over 7 days of the week)
            
            - topItems: array of 6 objects (the most popular products from historical data) { name: string, category: string, demand: string (e.g. '300 units'), change: string, recommendedStock: number, icon: string (use a relevant emoji) }
            - aiRecommendations: array of 4 actionable insights objects { title: string, description: string, type: 'increase'|'stock'|'discount'|'alert' }
            
            No markdown formatting, just pure JSON output.
        `;

        let response;
        let retries = 3;
        while (retries > 0) {
            try {
                response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash-lite',
                    contents: prompt,
                    config: {
                        responseMimeType: "application/json",
                        temperature: 0.4
                    }
                });
                break;
            } catch (err) {
                if (err.status === 503 && retries > 1) {
                    console.log("Gemini API overloaded. Retrying...");
                    retries--;
                    await new Promise(resolve => setTimeout(resolve, 2000));
                } else {
                    throw err;
                }
            }
        }

        const forecastJson = JSON.parse(response.text);
        res.status(200).json(forecastJson);
    } catch (error) {
        console.error("AI Forecasting Error:", error);
        res.status(500).json({ message: "Failed to generate AI forecast", error: error.message });
    }
};

module.exports = { generateForecast };
