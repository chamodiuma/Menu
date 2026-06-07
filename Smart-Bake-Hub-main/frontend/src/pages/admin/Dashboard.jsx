import React, { useState, useEffect } from 'react';
import { 
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Area, ComposedChart,
    PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';
import { 
    Sparkles, Calendar, Filter, BarChart3, TrendingUp, Package, Target, ArrowUp, Info, RefreshCw,
    ClipboardList, Box, BadgePercent, Coins, AlertCircle, Loader2
} from 'lucide-react';
import api from "../../services/api";
import toast from 'react-hot-toast';

// Initial Mock Data (used while fetching or if fetch fails)
const initialData = {
    totalForecastedSales: 1545800,
    salesGrowth: "+18.6%",
    forecastedOrders: 2142,
    ordersGrowth: "+14.3%",
    predictedProductionQuantity: 2840,
    itemsGrowth: "+8.2%",
    highDemandItemsCount: 8,
    aiAccuracyPercentage: 94.2,
    expectedRevenueIncrease: "+Rs. 250,000",
    
    forecastData: [
        { name: 'May 12\nMon', forecast: 100000, actual: null, confidence: [80000, 120000] },
        { name: 'May 13\nTue', forecast: 148000, actual: null, confidence: [120000, 170000] },
        { name: 'May 14\nWed', forecast: 152000, actual: null, confidence: [130000, 180000] },
        { name: 'May 15\nThu', forecast: 186500, actual: 162300, confidence: [160000, 210000] },
        { name: 'May 16\nFri', forecast: 140000, actual: null, confidence: [110000, 160000] },
        { name: 'May 17\nSat', forecast: 215000, actual: null, confidence: [190000, 245000] },
        { name: 'May 18\nSun', forecast: 205000, actual: null, confidence: [180000, 230000] },
    ],
    
    categoryData: [
        { name: 'Cakes', value: 845, color: '#2E1A12' },
        { name: 'Meals', value: 516, color: '#C8843B' },
        { name: 'Bakery', value: 468, color: '#D4BFA0' },
        { name: 'Beverages', value: 321, color: '#E8DCC8' },
        { name: 'Snacks', value: 192, color: '#F7F4ED' },
    ],
    
    peakHourData: [
        { time: '08:00', demand: 45 },
        { time: '10:00', demand: 80 },
        { time: '12:00', demand: 120 },
        { time: '14:00', demand: 60 },
        { time: '16:00', demand: 90 },
        { time: '18:00', demand: 110 },
        { time: '20:00', demand: 50 },
    ],
    
    heatmapData: [
        [2, 3, 4, 5, 4, 5, 4], // Cakes
        [3, 3, 4, 4, 3, 5, 5], // Bakery
        [2, 2, 3, 3, 4, 5, 4], // Beverages
        [4, 4, 3, 2, 3, 4, 3], // Meals
        [1, 2, 2, 1, 2, 3, 2], // Snacks
    ],
    
    topItems: [
        { name: 'Chocolate Cake', category: 'Cakes', demand: '320 units', change: '+ 28%', recommendedStock: 350, icon: '🍰' },
        { name: 'Chicken Sandwich', category: 'Meals', demand: '280 units', change: '+ 18%', recommendedStock: 300, icon: '🥪' },
        { name: 'Butter Croissant', category: 'Bakery', demand: '250 units', change: '+ 15%', recommendedStock: 280, icon: '🥐' },
        { name: 'Iced Coffee', category: 'Beverages', demand: '200 units', change: '+ 12%', recommendedStock: 220, icon: '🥤' },
        { name: 'Veg Pasta', category: 'Meals', demand: '150 units', change: '+ 9%', recommendedStock: 160, icon: '🍝' },
        { name: 'Vanilla Cupcake', category: 'Cakes', demand: '120 units', change: '+ 8%', recommendedStock: 130, icon: '🧁' },
    ],
    
    aiRecommendations: [
        { title: 'Increase Chocolate Cake production by 25% this weekend due to rising demand.', description: 'Historical data shows a 30% spike in chocolate items during this period.', type: 'increase' },
        { title: 'Prepare extra stock for Chicken Sandwich', description: 'Peak ordering expected on Thursday and Friday lunch hours.', type: 'stock' },
        { title: 'Consider promoting Iced Coffee', description: 'Weather forecast indicates higher temperatures, increasing cold beverage demand.', type: 'discount' },
        { title: 'Low demand alert: Veg Puffs', description: 'Sales have declined by 10%. Consider reducing production or offering a combo.', type: 'alert' }
    ]
};

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const categories = ['Cakes', 'Bakery', 'Beverages', 'Meals', 'Snacks'];

const getHeatmapColor = (val) => {
    const colors = ['#F7F4ED', '#EEDAC3', '#C8843B', '#A05C33', '#6A3C23', '#2E1A12'];
    return colors[val] || colors[0];
};

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#FFFDFC] p-3 border border-gray-100 shadow-xl rounded-xl text-xs z-50">
                <p className="font-bold text-[#2E1A12] mb-2">{String(label).replace('\n', ', ')}</p>
                {payload.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
                        <span className="text-gray-500">{entry.name}:</span>
                        <span className="font-semibold text-[#2E1A12]">{entry.value?.toLocaleString() || entry.value}</span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

const Dashboard = () => {
    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);
    
    const generateNewForecast = async () => {
        setIsLoading(true);
        try {
            const response = await api.get('/ai/forecast');
            setData(response.data);
            toast.success('AI Forecast generated successfully!');
        } catch (error) {
            console.error('Failed to generate forecast:', error);
            toast.error('Failed to generate live forecast. Falling back to default data.');
            // Fallback is already present in state
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto text-[#2E1A12]">
            
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-serif flex items-center gap-2 text-[#2E1A12]">
                        <Sparkles className="w-7 h-7 text-[#C8843B]" />
                        AI-Based Demand Forecasting
                    </h1>
                    <p className="text-sm text-[#2E1A12]/60 mt-2 font-medium">Predict future demand and plan production smarter with Gemini AI insights.</p>
                </div>
                
                <div className="flex flex-wrap items-center justify-end gap-3">
                    <div className="flex items-center gap-2 bg-[#FFFDFC] px-4 py-2 border border-gray-200/60 rounded-xl shadow-[0_2px_10px_rgba(46,26,18,0.02)] text-sm font-medium cursor-help" onClick={() => toast('AI Forecast date is automatically locked to the upcoming 7 days.', { icon: '📅' })}>
                        <span>
                            {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - 
                            {new Date(new Date().setDate(new Date().getDate() + 7)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <Calendar className="w-4 h-4 text-[#C8843B]" />
                    </div>
                    <button 
                        onClick={generateNewForecast}
                        disabled={isLoading}
                        className="flex items-center gap-2 bg-[#2E1A12] text-white px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer hover:bg-[#1a0f0a] shadow-[0_4px_14px_rgba(46,26,18,0.3)] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                        {isLoading ? 'Generating AI Model...' : 'Generate New Forecast'}
                    </button>
                </div>
            </div>

            {/* KPI Cards (5 Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <KPICard title="Total Forecasted Sales" value={`Rs. ${data.totalForecastedSales?.toLocaleString()}`} change={data.salesGrowth} icon={BarChart3} color="#C8843B" />
                <KPICard title="Forecasted Orders" value={data.forecastedOrders?.toLocaleString()} change={data.ordersGrowth} icon={TrendingUp} color="#16A34A" />
                <KPICard title="Predicted Prod. Qty" value={data.predictedProductionQuantity?.toLocaleString()} change={data.itemsGrowth} icon={Package} color="#D97706" />
                <KPICard title="High Demand Items" value={data.highDemandItemsCount} change="Action Required" icon={Target} color="#7C3AED" />
                <KPICard title="Expected Revenue Inc." value={data.expectedRevenueIncrease} change="vs last week" icon={Coins} color="#059669" />
            </div>

            {/* Middle Row: Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Line Chart */}
                <div className="lg:col-span-2 bg-[#FFFDFC] p-6 rounded-2xl shadow-[0_8px_30px_rgba(46,26,18,0.04)] border border-gray-100 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(46,26,18,0.08)] transition-all duration-300">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold font-serif text-[#2E1A12]">Demand Forecast (7-Day Prediction)</h2>
                    </div>
                    
                    {/* Legend */}
                    <div className="flex items-center gap-6 mb-4 text-xs font-medium text-gray-500">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-1 bg-[#2E1A12] rounded"></div> Forecasted Sales
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-1 border-t-2 border-dashed border-[#C8843B]"></div> Actual Sales
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-[#C8843B] opacity-20 rounded"></div> Confidence Interval
                        </div>
                    </div>

                    <div className="h-[280px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={data.forecastData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} tickMargin={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} tickFormatter={(value) => `${value / 1000}K`} />
                                <RechartsTooltip content={<CustomTooltip />} />
                                
                                <Area type="monotone" dataKey="confidence" stroke="none" fill="#C8843B" fillOpacity={0.15} />
                                <Line type="monotone" dataKey="forecast" stroke="#2E1A12" strokeWidth={3} dot={{ r: 4, fill: '#2E1A12', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                                <Line type="monotone" dataKey="actual" stroke="#C8843B" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4, fill: '#fff', strokeWidth: 2, stroke: '#C8843B' }} />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Peak Hour Analysis (New Chart) */}
                <div className="bg-[#FFFDFC] p-6 rounded-2xl shadow-[0_8px_30px_rgba(46,26,18,0.04)] border border-gray-100 flex flex-col hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(46,26,18,0.08)] transition-all duration-300">
                    <h2 className="text-xl font-bold font-serif text-[#2E1A12] mb-6">Peak Hour Analysis</h2>
                    <p className="text-xs text-gray-500 mb-4">Busiest ordering times based on historical algorithms.</p>
                    
                    <div className="flex-1 min-h-[220px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data.peakHourData} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} tickMargin={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} />
                                <RechartsTooltip cursor={{fill: '#F7F4ED'}} content={<CustomTooltip />} />
                                <Bar dataKey="demand" fill="#C8843B" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Donut Chart */}
                <div className="bg-[#FFFDFC] p-6 rounded-2xl shadow-[0_8px_30px_rgba(46,26,18,0.04)] border border-gray-100 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(46,26,18,0.08)] transition-all duration-300">
                    <h2 className="text-lg font-bold font-serif text-[#2E1A12] mb-6">Category Demand</h2>
                    
                    <div className="flex items-center">
                        <div className="w-1/2 relative h-[180px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data.categoryData}
                                        innerRadius={55}
                                        outerRadius={75}
                                        paddingAngle={2}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {data.categoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <RechartsTooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        
                        <div className="w-1/2 pl-2 space-y-3">
                            {data.categoryData.map((item, i) => (
                                <div key={i} className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                        <span className="font-medium text-[#2E1A12]">{item.name}</span>
                                    </div>
                                    <div className="font-semibold text-gray-500">{item.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Heatmap */}
                <div className="bg-[#FFFDFC] p-6 rounded-2xl shadow-[0_8px_30px_rgba(46,26,18,0.04)] border border-gray-100 flex flex-col hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(46,26,18,0.08)] transition-all duration-300">
                    <h2 className="text-lg font-bold font-serif text-[#2E1A12] mb-6">Product Demand Heatmap</h2>
                    
                    <div className="flex-1">
                        <div className="flex">
                            <div className="flex flex-col justify-between w-16 text-[10px] font-medium text-gray-400 py-2">
                                {categories.map(cat => <div key={cat} className="h-7 flex items-center justify-end pr-2">{cat}</div>)}
                            </div>
                            
                            <div className="flex-1">
                                <div className="flex justify-between text-[10px] font-medium text-gray-400 mb-2 px-1">
                                    {days.map(day => <div key={day} className="w-7 text-center">{day}</div>)}
                                </div>
                                <div className="space-y-1">
                                    {data.heatmapData.map((row, rowIndex) => (
                                        <div key={rowIndex} className="flex justify-between">
                                            {row.map((val, colIndex) => (
                                                <div 
                                                    key={`${rowIndex}-${colIndex}`} 
                                                    className="w-7 h-7 rounded border border-white"
                                                    style={{ backgroundColor: getHeatmapColor(val) }}
                                                    title={`${categories[rowIndex]} on ${days[colIndex]}: Intensity ${val}`}
                                                ></div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recommendations */}
                <div className="bg-[#FFFDFC] p-6 rounded-2xl shadow-[0_8px_30px_rgba(46,26,18,0.04)] border border-gray-100 flex flex-col hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(46,26,18,0.08)] transition-all duration-300">
                    <h2 className="text-lg font-bold font-serif text-[#2E1A12] mb-6 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-[#C8843B]" />
                        AI Recommendation Engine
                    </h2>
                    
                    <div className="space-y-3 flex-1 overflow-y-auto custom-scrollbar pr-2 max-h-[200px]">
                        {data.aiRecommendations.map((rec, i) => (
                            <div key={i} className={`flex gap-3 p-3 rounded-xl border ${
                                rec.type === 'increase' ? 'bg-[#F0FDF4]/40 border-[#DCFCE7]' :
                                rec.type === 'stock' ? 'bg-[#FFFbeb]/40 border-[#FEF3C7]' :
                                rec.type === 'alert' ? 'bg-[#FEF2F2]/40 border-[#FEE2E2]' :
                                'bg-[#F7F4ED]/80 border-[#C8843B]/20'
                            }`}>
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                    rec.type === 'increase' ? 'bg-[#DCFCE7] text-[#16A34A]' :
                                    rec.type === 'stock' ? 'bg-[#FEF3C7] text-[#D97706]' :
                                    rec.type === 'alert' ? 'bg-[#FEE2E2] text-[#EF4444]' :
                                    'bg-[#C8843B]/20 text-[#C8843B]'
                                }`}>
                                    {rec.type === 'increase' ? <TrendingUp className="w-4 h-4" /> :
                                     rec.type === 'stock' ? <Package className="w-4 h-4" /> :
                                     rec.type === 'alert' ? <AlertCircle className="w-4 h-4" /> :
                                     <Sparkles className="w-4 h-4" />}
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-[#2E1A12] leading-tight">{rec.title}</h4>
                                    <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">{rec.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* High Demand Products Table */}
            <div className="bg-[#FFFDFC] p-6 rounded-2xl shadow-[0_8px_30px_rgba(46,26,18,0.04)] border border-gray-100 flex flex-col hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(46,26,18,0.08)] transition-all duration-300">
                <h2 className="text-xl font-bold font-serif text-[#2E1A12] mb-4">High Demand Products Prediction</h2>
                
                <div className="overflow-x-auto flex-1">
                    <table className="w-full text-sm text-left">
                        <thead className="text-[11px] text-gray-400 uppercase tracking-wider border-b border-gray-100">
                            <tr>
                                <th className="pb-3 font-semibold">Product Image & Name</th>
                                <th className="pb-3 font-semibold">Category</th>
                                <th className="pb-3 font-semibold">Predicted Demand</th>
                                <th className="pb-3 font-semibold text-center">Recommended Stock</th>
                                <th className="pb-3 font-semibold text-right">Growth</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {data.topItems.map((item, i) => (
                                <tr key={i} className="hover:bg-[#F7F4ED]/50 transition-colors">
                                    <td className="py-3 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-[#F7F4ED] flex items-center justify-center text-xl shadow-sm border border-white">
                                            {item.icon}
                                        </div>
                                        <span className="font-semibold text-[#2E1A12]">{item.name}</span>
                                    </td>
                                    <td className="py-3 text-gray-500 font-medium text-xs">{item.category}</td>
                                    <td className="py-3 font-semibold text-[#2E1A12]">{item.demand}</td>
                                    <td className="py-3 text-center">
                                        <span className="bg-[#C8843B]/10 text-[#C8843B] px-3 py-1 rounded-lg font-bold text-xs border border-[#C8843B]/20">
                                            {item.recommendedStock} units
                                        </span>
                                    </td>
                                    <td className="py-3 text-right text-green-600 font-bold text-xs">
                                        <div className="flex justify-end items-center gap-1">
                                            <ArrowUp className="w-3 h-3" /> {item.change.replace('+', '')}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div className="text-center text-[11px] text-gray-400 font-medium pb-4">
                Powered by Gemini AI • Real-time Predictive Analytics
            </div>

        </div>
    );
};

const KPICard = ({ title, value, change, icon: Icon, color }) => (
    <div className="bg-[#FFFDFC] p-5 rounded-2xl shadow-[0_4px_20px_rgba(46,26,18,0.03)] border border-gray-100 flex flex-col justify-between group hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(46,26,18,0.08)] transition-all duration-300">
        <div className="flex justify-between items-start mb-4">
            <div 
                className="p-2.5 rounded-xl transition-colors group-hover:animate-float"
                style={{ backgroundColor: `${color}15`, color: color }}
            >
                <Icon className="w-5 h-5" />
            </div>
            {change.includes('+') ? (
                <div className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">
                    <ArrowUp className="w-3 h-3" /> {change.replace('+', '')}
                </div>
            ) : (
                <div className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
                    {change}
                </div>
            )}
        </div>
        <div>
            <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">{title}</h3>
            <p className="text-xl font-bold text-[#2E1A12]">{value}</p>
        </div>
    </div>
);

export default Dashboard;
