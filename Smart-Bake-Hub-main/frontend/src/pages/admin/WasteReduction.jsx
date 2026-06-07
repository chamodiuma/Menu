import React, { useState, useEffect } from 'react';
import { 
    ResponsiveContainer, PieChart, Pie, Cell, Tooltip as RechartsTooltip,
    AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { 
    Sparkles, Calendar, Filter, Layers, BadgePercent, Coins, 
    TrendingDown, Trash2, AlertTriangle, CheckCircle, TrendingUp, 
    Leaf, ArrowUpRight, Activity, FileText, RefreshCw, Loader2, Check, ArrowRight
} from 'lucide-react';
import toast from 'react-hot-toast';

// Initial Mock Data reflecting the provided mockup screenshot
const initialDashboardData = {
    accuracy: 92.6,
    kpis: [
        { id: 'total-risk', title: 'Total Waste Risk Items', value: '94', change: '+18.4%', vsLastWeek: 'vs last week', color: '#E76F51', icon: Layers },
        { id: 'near-expiry', title: 'Near Expiry Products', value: '36', change: '+12.7%', vsLastWeek: 'vs last week', color: '#F4A261', icon: Calendar },
        { id: 'potential-recovery', title: 'Potential Revenue Recovery', value: 'Rs. 85,430', change: '+22.6%', vsLastWeek: 'vs last week', color: '#6B8E23', icon: Coins },
        { id: 'discounts-generated', title: 'Smart Discounts Generated', value: '14', change: '+16.2%', vsLastWeek: 'vs last week', color: '#C8843B', icon: BadgePercent },
        { id: 'waste-reduction', title: 'Waste Reduction %', value: '24.8%', change: '+8.6%', vsLastWeek: 'vs last week', color: '#6B8E23', icon: TrendingDown },
        { id: 'predicted-waste', title: 'Predicted Waste This Week', value: 'Rs. 18,920', change: '-9.3%', vsLastWeek: 'vs last week', color: '#E76F51', icon: Trash2 },
    ],
    
    riskOverview: [
        { name: 'High Risk', value: 12, percentage: '13%', color: '#E76F51' },
        { name: 'Medium Risk', value: 24, percentage: '26%', color: '#F4A261' },
        { name: 'Low Risk', value: 58, percentage: '61%', color: '#6B8E23' }
    ],

    nearExpiryProducts: [
        { id: 1, name: 'Chocolate Cake', category: 'Cakes', stock: 18, expiryDate: '20 May 2025', daysLeft: 2, risk: 'High', action: 'Apply Discount', icon: '🍰' },
        { id: 2, name: 'Butter Croissant', category: 'Bakery', stock: 32, expiryDate: '21 May 2025', daysLeft: 3, risk: 'High', action: 'Apply Discount', icon: '🥐' },
        { id: 3, name: 'Chicken Sandwich', category: 'Meals', stock: 25, expiryDate: '22 May 2025', daysLeft: 4, risk: 'Medium', action: 'Apply Discount', icon: '🥪' },
        { id: 4, name: 'Iced Coffee', category: 'Beverages', stock: 28, expiryDate: '23 May 2025', daysLeft: 5, risk: 'Medium', action: 'Apply Discount', icon: '🥤' },
        { id: 5, name: 'Strawberry Cupcake', category: 'Desserts', stock: 15, expiryDate: '24 May 2025', daysLeft: 6, risk: 'Low', action: 'Monitor', icon: '🧁' },
        { id: 6, name: 'Veg Pasta', category: 'Meals', stock: 20, expiryDate: '24 May 2025', daysLeft: 6, risk: 'Low', action: 'Monitor', icon: '🍝' }
    ],

    heatmap: {
        categories: ['Cakes', 'Bakery Items', 'Meals', 'Beverages', 'Desserts'],
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        // Grid intensities (0 to 5)
        grid: [
            [2, 3, 4, 3, 2, 4, 5], // Cakes
            [1, 2, 3, 2, 3, 4, 4], // Bakery Items
            [3, 4, 3, 3, 4, 5, 5], // Meals
            [2, 2, 3, 2, 3, 4, 3], // Beverages
            [1, 1, 2, 2, 3, 4, 5]  // Desserts
        ]
    },

    slowMovingProducts: [
        { id: 1, name: 'Fruit Tart', stock: 22, velocity: 2, demandScore: 20, riskScore: 85 },
        { id: 2, name: 'Blueberry Muffin', stock: 30, velocity: 3, demandScore: 28, riskScore: 72 },
        { id: 3, name: 'Garlic Bread', stock: 18, velocity: 4, demandScore: 35, riskScore: 65 },
        { id: 4, name: 'Chicken Puff', stock: 25, velocity: 3, demandScore: 30, riskScore: 60 },
        { id: 5, name: 'Veg Sandwich', stock: 40, velocity: 5, demandScore: 40, riskScore: 45 }
    ],

    discountRecommendations: [
        { id: 1, product: 'Chocolate Cake', text: 'Apply 20% discount on Chocolate Cake. High stock & near expiry.', estRecovery: 'Rs. 12,000', confidence: 92, applied: false, icon: '🍰' },
        { id: 2, product: 'Butter Croissants', text: 'Apply Buy 1 Get 1 promotion on Butter Croissants. Weekend promotion recommended.', estRecovery: 'Rs. 8,500', confidence: 88, applied: false, icon: '🥐' },
        { id: 3, product: 'Iced Coffee Combo', text: 'Bundle Iced Coffee with Sandwich Combo to boost sales velocity.', estRecovery: 'Rs. 6,200', confidence: 81, applied: false, icon: '🥤' }
    ],

    aiInsights: [
        { text: 'Chocolate Cake demand expected to decrease by 15% next week. Adjust production accordingly.', type: 'danger' },
        { text: 'Chicken Sandwich stock should be reduced by 20 units to avoid waste.', type: 'warning' },
        { text: 'Friday to Sunday shows 30% higher waste risk. Garlic bread promotion recommended.', type: 'info' },
        { text: 'You can recover up to Rs. 85,430 if suggested actions are applied.', type: 'success' }
    ],

    // Chart Data
    wasteReductionTrend: [
        { name: 'May 1', value: 12 }, { name: 'May 6', value: 25 }, { name: 'May 11', value: 15 },
        { name: 'May 16', value: 22 }, { name: 'May 21', value: 18 }, { name: 'May 26', value: 20 },
        { name: 'May 31', value: 28.5 }
    ],

    wasteVsSales: [
        { name: 'Week 1', Waste: 45000, Sales: 110000 },
        { name: 'Week 2', Waste: 62000, Sales: 135000 },
        { name: 'Week 3', Waste: 35000, Sales: 125000 },
        { name: 'Week 4', Waste: 28000, Sales: 140000 },
        { name: 'Week 5', Waste: 18920, Sales: 155000 }
    ],

    recoveredRevenue: [
        { name: 'May 1', value: 10000 }, { name: 'May 8', value: 32000 },
        { name: 'May 15', value: 48000 }, { name: 'May 22', value: 65000 },
        { name: 'May 29', value: 85430 }
    ],

    expiryRiskTrend: [
        { name: 'Mon', value: 90 }, { name: 'Tue', value: 82 },
        { name: 'Wed', value: 75 }, { name: 'Thu', value: 60 },
        { name: 'Fri', value: 50 }, { name: 'Sat', value: 35 },
        { name: 'Sun', value: 20 }
    ]
};

const CustomChartTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#FFFDFC] p-3 border border-[#C8843B]/10 shadow-xl rounded-xl text-xs z-50">
                <p className="font-bold text-[#2E1A12] mb-1.5">{label}</p>
                {payload.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2 mb-0.5">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }}></div>
                        <span className="text-gray-500 font-medium">{entry.name}:</span>
                        <span className="font-semibold text-[#2E1A12]">
                            {typeof entry.value === 'number' && (entry.name.toLowerCase().includes('revenue') || entry.name.toLowerCase().includes('sales') || entry.name.toLowerCase().includes('waste'))
                                ? `Rs. ${entry.value.toLocaleString()}` 
                                : entry.value}
                            {entry.name.toLowerCase().includes('percentage') || entry.name.toLowerCase().includes('reduction') ? '%' : ''}
                        </span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

const WasteReduction = () => {
    const [dashboardData, setDashboardData] = useState(initialDashboardData);
    const [isReanalyzing, setIsReanalyzing] = useState(false);
    const [dateRange, setDateRange] = useState('May 12 - May 18, 2025');

    // Trigger local simulation of regenerating predictive analytics
    const handleGenerateAnalysis = () => {
        setIsReanalyzing(true);
        toast.loading('Gemini AI is analyzing inventory datasets, checking batch sales histories, and recalculating product risks...', { id: 'ai-analysis' });
        
        setTimeout(() => {
            // Randomize KPI values slightly to simulate fresh analysis
            const updatedKpis = dashboardData.kpis.map(kpi => {
                if (kpi.id === 'total-risk') return { ...kpi, value: String(Math.floor(Math.random() * 15) + 85) };
                if (kpi.id === 'near-expiry') return { ...kpi, value: String(Math.floor(Math.random() * 10) + 30) };
                if (kpi.id === 'potential-recovery') return { ...kpi, value: `Rs. ${Math.floor(Math.random() * 5000 + 83000).toLocaleString()}` };
                return kpi;
            });

            setDashboardData(prev => ({
                ...prev,
                kpis: updatedKpis
            }));

            setIsReanalyzing(false);
            toast.success('AI Predictive Risk Analysis updated successfully!', { id: 'ai-analysis', icon: '🤖' });
        }, 1500);
    };

    // Apply individual discount recommendation
    const handleApplyDiscount = (id, productName) => {
        setDashboardData(prev => {
            const updatedRecs = prev.discountRecommendations.map(rec => {
                if (rec.id === id) return { ...rec, applied: true };
                return rec;
            });

            // If applied, increment the discounts counter and potential recovery KPI
            const updatedKpis = prev.kpis.map(kpi => {
                if (kpi.id === 'discounts-generated') {
                    return { ...kpi, value: String(parseInt(kpi.value) + 1) };
                }
                return kpi;
            });

            return {
                ...prev,
                discountRecommendations: updatedRecs,
                kpis: updatedKpis
            };
        });

        toast.success(`AI recommendations applied for ${productName}! Smart promotion launched.`, { icon: '🔥' });
    };

    // Apply all discounts in bulk
    const handleApplyAllDiscounts = () => {
        const unapplied = dashboardData.discountRecommendations.filter(r => !r.applied);
        if (unapplied.length === 0) {
            toast.error('All AI recommendations have already been applied.');
            return;
        }

        setDashboardData(prev => {
            const updatedRecs = prev.discountRecommendations.map(rec => ({ ...rec, applied: true }));
            const updatedKpis = prev.kpis.map(kpi => {
                if (kpi.id === 'discounts-generated') {
                    return { ...kpi, value: String(parseInt(kpi.value) + unapplied.length) };
                }
                return kpi;
            });

            return {
                ...prev,
                discountRecommendations: updatedRecs,
                kpis: updatedKpis
            };
        });

        toast.success(`Successfully applied all ${unapplied.length} pending AI smart recommendations!`, { icon: '✨' });
    };

    // Export report trigger
    const handleExportReport = () => {
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 1000)),
            {
                loading: 'Preparing AI-driven waste reduction PDF report...',
                success: 'Waste Reduction Report downloaded successfully! (SBH-Waste-Report.pdf)',
                error: 'Export failed. Please try again.',
            }
        );
    };

    // Helper function to color intensities for the Heatmap grid
    const getHeatmapBgColor = (intensity) => {
        // Green -> Yellow -> Orange -> Red intensities
        if (intensity === 1) return 'bg-[#6B8E23]/20 border-[#6B8E23]/30'; // Very Low (Soft Green)
        if (intensity === 2) return 'bg-[#6B8E23]/40 border-[#6B8E23]/50'; // Low (Green)
        if (intensity === 3) return 'bg-[#F4A261]/30 border-[#F4A261]/40'; // Medium-Low (Yellow-Orange)
        if (intensity === 4) return 'bg-[#F4A261]/70 border-[#F4A261]/80'; // Medium-High (Orange)
        if (intensity === 5) return 'bg-[#E76F51]/80 border-[#E76F51]/95'; // High (Red)
        return 'bg-[#F7F4ED] border-[#C8843B]/10'; // Inactive
    };

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto text-[#2E1A12] pb-10">
            
            {/* 1. DASHBOARD HEADER */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#FFFDFC] p-6 rounded-3xl border border-[#C8843B]/10 shadow-[0_8px_30px_rgba(46,26,18,0.02)]">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#C8843B]/10 rounded-xl">
                            <Sparkles className="w-6 h-6 text-[#C8843B]" />
                        </div>
                        <h1 className="text-3xl font-extrabold font-serif tracking-tight text-[#2E1A12]">
                            AI-Powered Food Waste Reduction
                        </h1>
                        <div className="hidden sm:flex items-center gap-1 bg-[#6B8E23]/10 border border-[#6B8E23]/20 px-3 py-1 rounded-full text-xs font-semibold text-[#6B8E23] ml-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#6B8E23] animate-pulse"></span>
                            AI Accuracy {dashboardData.accuracy}%
                        </div>
                    </div>
                    <p className="text-sm text-[#2E1A12]/70 font-medium">
                        Reduce waste, maximize profit, and improve sustainability using AI-driven insights.
                    </p>
                </div>

                {/* Actions & Filters */}
                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 bg-[#F7F4ED] px-4 py-2.5 border border-[#C8843B]/20 rounded-xl text-xs font-semibold text-[#2E1A12]/80">
                        <Calendar className="w-4 h-4 text-[#C8843B]" />
                        <span>{dateRange}</span>
                    </div>

                    <button 
                        onClick={handleGenerateAnalysis}
                        disabled={isReanalyzing}
                        className="flex items-center gap-2 bg-[#2E1A12] hover:bg-[#1f110c] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-[0_4px_12px_rgba(46,26,18,0.15)] transition-all cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                        {isReanalyzing ? <Loader2 className="w-4 h-4 animate-spin text-[#C8843B]" /> : <RefreshCw className="w-4 h-4 text-[#C8843B]" />}
                        <span>Generate Analysis</span>
                    </button>

                    <button 
                        onClick={handleApplyAllDiscounts}
                        className="flex items-center gap-2 bg-[#FFFDFC] border border-[#C8843B] hover:bg-[#C8843B]/5 text-[#C8843B] px-5 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer"
                    >
                        <BadgePercent className="w-4 h-4" />
                        <span>Apply Discounts</span>
                    </button>

                    <button 
                        onClick={handleExportReport}
                        className="flex items-center gap-2 bg-[#FFFDFC] border border-gray-200 hover:bg-gray-50 text-[#2E1A12]/80 px-5 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer"
                    >
                        <FileText className="w-4 h-4" />
                        <span>Export Report</span>
                    </button>
                </div>
            </div>

            {/* 2. TOP KPI CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {dashboardData.kpis.map((kpi) => {
                    const IconComponent = kpi.icon;
                    const isPositive = kpi.change.startsWith('+');
                    const isReduction = kpi.id === 'predicted-waste';
                    const changeColor = (isPositive && !isReduction) || (!isPositive && isReduction) 
                        ? 'text-[#6B8E23] bg-[#6B8E23]/10' 
                        : 'text-[#E76F51] bg-[#E76F51]/10';

                    return (
                        <div key={kpi.id} className="bg-[#FFFDFC] p-5 rounded-2xl border border-[#C8843B]/10 shadow-[0_4px_20px_rgba(46,26,18,0.01)] hover:-translate-y-1.5 hover:shadow-[0_12px_24px_rgba(46,26,18,0.05)] transition-all duration-300 flex flex-col justify-between group">
                            <div className="flex justify-between items-start mb-4">
                                <div 
                                    className="p-2.5 rounded-xl transition-all"
                                    style={{ backgroundColor: `${kpi.color}15`, color: kpi.color }}
                                >
                                    <IconComponent className="w-5 h-5 transition-transform group-hover:scale-110" />
                                </div>
                                <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-md tracking-wide ${changeColor}`}>
                                    {kpi.change}
                                </span>
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                                    {kpi.title}
                                </h3>
                                <p className="text-2xl font-extrabold text-[#2E1A12] leading-tight">
                                    {kpi.value}
                                </p>
                                <p className="text-[10px] text-gray-400 font-medium mt-0.5">
                                    {kpi.vsLastWeek}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 3. ROW: RISK OVERVIEW, EXPIRY PRODUCTS & RISK HEATMAP */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                
                {/* Waste Risk Overview - Donut Chart */}
                <div className="xl:col-span-3 bg-[#FFFDFC] p-6 rounded-3xl border border-[#C8843B]/10 shadow-[0_4px_20px_rgba(46,26,18,0.01)] hover:shadow-[0_12px_24px_rgba(46,26,18,0.05)] transition-all duration-300 flex flex-col justify-between">
                    <div>
                        <h2 className="text-lg font-bold font-serif text-[#2E1A12]">Waste Risk Overview</h2>
                        <p className="text-xs text-gray-400 font-medium mt-1">Real-time alert distribution</p>
                    </div>

                    <div className="my-3 flex justify-center items-center relative">
                        <div className="w-[180px] h-[180px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={dashboardData.riskOverview}
                                        innerRadius={65}
                                        outerRadius={85}
                                        paddingAngle={3}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {dashboardData.riskOverview.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        {/* Dynamic Centered Counter */}
                        <div className="absolute text-center flex flex-col">
                            <span className="text-3xl font-extrabold text-[#2E1A12]">94</span>
                            <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">Total Items</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        {dashboardData.riskOverview.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs border-b border-[#F7F4ED] pb-1.5 last:border-0 last:pb-0">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                                    <span className="font-semibold text-[#2E1A12]/80">{item.name}</span>
                                </div>
                                <div className="text-right flex gap-3 text-[11px]">
                                    <span className="font-extrabold text-[#2E1A12]">{item.value} Products</span>
                                    <span className="text-gray-400 font-bold">({item.percentage})</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 p-3 bg-[#F4A261]/10 rounded-2xl border border-[#F4A261]/20 flex items-start gap-2.5">
                        <AlertTriangle className="w-4 h-4 text-[#F4A261] flex-shrink-0 mt-0.5" />
                        <p className="text-[10px] leading-normal font-semibold text-[#2E1A12]/80">
                            <strong className="text-[#E76F51]">AI Insight:</strong> 12 items are in high risk. Take action now to prevent food waste.
                        </p>
                    </div>
                </div>

                {/* Near Expiry Products Table */}
                <div className="xl:col-span-6 bg-[#FFFDFC] p-6 rounded-3xl border border-[#C8843B]/10 shadow-[0_4px_20px_rgba(46,26,18,0.01)] hover:shadow-[0_12px_24px_rgba(46,26,18,0.05)] transition-all duration-300 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h2 className="text-lg font-bold font-serif text-[#2E1A12]">Near Expiry Products</h2>
                            <p className="text-xs text-gray-400 font-medium mt-1">Products reaching expiration within 7 days</p>
                        </div>
                        <button className="text-xs font-bold text-[#C8843B] hover:text-[#2E1A12] transition-colors flex items-center gap-1">
                            <span>View All Near Expiry Products</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                    </div>

                    <div className="overflow-x-auto flex-1">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-[#F7F4ED] text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                                    <th className="pb-3 pl-2">Product</th>
                                    <th className="pb-3">Category</th>
                                    <th className="pb-3 text-center">Stock (Qty)</th>
                                    <th className="pb-3">Expiry Date</th>
                                    <th className="pb-3 text-center">Days Left</th>
                                    <th className="pb-3 text-center">Risk Level</th>
                                    <th className="pb-3 text-right pr-2">Suggested Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#F7F4ED]">
                                {dashboardData.nearExpiryProducts.map((prod) => (
                                    <tr key={prod.id} className="hover:bg-[#F7F4ED]/40 transition-colors text-xs font-semibold text-[#2E1A12]/90">
                                        <td className="py-2.5 pl-2 flex items-center gap-2">
                                            <span className="text-lg bg-[#F7F4ED] w-8 h-8 rounded-lg flex items-center justify-center border border-[#C8843B]/10">{prod.icon}</span>
                                            <span className="font-extrabold">{prod.name}</span>
                                        </td>
                                        <td className="py-2.5 text-gray-400 font-bold text-[11px]">{prod.category}</td>
                                        <td className="py-2.5 text-center font-bold">{prod.stock}</td>
                                        <td className="py-2.5 font-bold text-[11px]">{prod.expiryDate}</td>
                                        <td className="py-2.5 text-center">
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${prod.daysLeft <= 3 ? 'text-[#E76F51] bg-[#E76F51]/10' : 'text-gray-500 bg-gray-100'}`}>
                                                {prod.daysLeft} days
                                            </span>
                                        </td>
                                        <td className="py-2.5 text-center">
                                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold tracking-wide ${
                                                prod.risk === 'High' ? 'bg-[#E76F51]/10 text-[#E76F51]' :
                                                prod.risk === 'Medium' ? 'bg-[#F4A261]/10 text-[#F4A261]' :
                                                'bg-[#6B8E23]/10 text-[#6B8E23]'
                                            }`}>
                                                {prod.risk}
                                            </span>
                                        </td>
                                        <td className="py-2.5 text-right pr-2">
                                            {prod.action === 'Apply Discount' ? (
                                                <button 
                                                    onClick={() => handleApplyDiscount(prod.id, prod.name)}
                                                    className="px-3 py-1 bg-[#2E1A12] text-white hover:bg-[#C8843B] text-[10px] font-extrabold rounded-lg shadow-sm transition-all cursor-pointer"
                                                >
                                                    Apply Discount
                                                </button>
                                            ) : (
                                                <span className="px-3 py-1 bg-[#F7F4ED] text-[#2E1A12]/60 text-[10px] font-bold rounded-lg border border-[#C8843B]/20">
                                                    Monitor
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Waste Risk Heatmap (Next 7 Days) */}
                <div className="xl:col-span-3 bg-[#FFFDFC] p-6 rounded-3xl border border-[#C8843B]/10 shadow-[0_4px_20px_rgba(46,26,18,0.01)] hover:shadow-[0_12px_24px_rgba(46,26,18,0.05)] transition-all duration-300 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-1.5">
                            <h2 className="text-lg font-bold font-serif text-[#2E1A12]">Waste Risk Heatmap</h2>
                            <span className="px-1.5 py-0.5 text-[9px] font-extrabold bg-[#C8843B]/15 text-[#C8843B] rounded-md tracking-wider uppercase">Next 7 Days</span>
                        </div>
                        <p className="text-xs text-gray-400 font-medium mt-1">Likelihood of food waste occurrences</p>
                    </div>

                    {/* Heatmap Grid */}
                    <div className="my-4">
                        {/* Days of week Header */}
                        <div className="grid grid-cols-8 gap-1.5 mb-1.5 text-center text-[9px] font-extrabold text-gray-400 uppercase tracking-widest">
                            <div></div>
                            {dashboardData.heatmap.days.map((day, dIdx) => (
                                <div key={dIdx} className="w-8">{day}</div>
                            ))}
                        </div>

                        {/* Category Rows */}
                        <div className="space-y-1.5">
                            {dashboardData.heatmap.categories.map((cat, rIdx) => (
                                <div key={rIdx} className="grid grid-cols-8 gap-1.5 items-center">
                                    {/* Left Category Label */}
                                    <div className="text-[9px] font-bold text-gray-400 text-right pr-1 truncate leading-none" title={cat}>
                                        {cat.split(' ')[0]}
                                    </div>

                                    {/* Intensity blocks */}
                                    {dashboardData.heatmap.grid[rIdx].map((val, cIdx) => (
                                        <div
                                            key={`${rIdx}-${cIdx}`}
                                            className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all hover:scale-110 cursor-help ${getHeatmapBgColor(val)}`}
                                            title={`${cat} on ${dashboardData.heatmap.days[cIdx]} • Risk Level: ${
                                                val === 5 ? 'Critical (5/5)' :
                                                val === 4 ? 'High (4/5)' :
                                                val === 3 ? 'Moderate (3/5)' :
                                                'Low (1-2/5)'
                                            }`}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-[9px] font-bold text-gray-400 tracking-wider uppercase border-t border-[#F7F4ED] pt-2">
                            <span>Low Risk</span>
                            <span>High Risk</span>
                        </div>
                        <div className="h-1.5 w-full bg-gradient-to-r from-[#6B8E23]/20 via-[#F4A261] to-[#E76F51] rounded-full" />
                    </div>
                </div>

            </div>

            {/* 4. ROW: SLOW MOVING PRODUCTS, SMART DISCOUNTS & AI INSIGHTS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Slow Moving Products */}
                <div className="bg-[#FFFDFC] p-6 rounded-3xl border border-[#C8843B]/10 shadow-[0_4px_20px_rgba(46,26,18,0.01)] hover:shadow-[0_12px_24px_rgba(46,26,18,0.05)] transition-all duration-300 flex flex-col justify-between">
                    <div>
                        <h2 className="text-lg font-bold font-serif text-[#2E1A12]">Slow Moving Products</h2>
                        <p className="text-xs text-gray-400 font-medium mt-1">AI-identified items with declining market demand</p>
                    </div>

                    <div className="my-4 overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-[#F7F4ED] text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                                    <th className="pb-3">Product</th>
                                    <th className="pb-3 text-center">Stock</th>
                                    <th className="pb-3 text-center">Velocity (7d)</th>
                                    <th className="pb-3 text-center">Demand Score</th>
                                    <th className="pb-3 text-center">Risk Score</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#F7F4ED]">
                                {dashboardData.slowMovingProducts.map((p) => (
                                    <tr key={p.id} className="hover:bg-[#F7F4ED]/40 transition-colors text-xs font-semibold text-[#2E1A12]/90">
                                        <td className="py-2.5 font-extrabold">{p.name}</td>
                                        <td className="py-2.5 text-center font-bold">{p.stock}</td>
                                        <td className="py-2.5 text-center font-extrabold text-[#C8843B]">{p.velocity}</td>
                                        <td className="py-2.5 text-center">
                                            <span className="px-2 py-0.5 bg-[#F4A261]/10 text-[#F4A261] rounded text-[10px] font-extrabold">
                                                {p.demandScore}
                                            </span>
                                        </td>
                                        <td className="py-2.5 text-center">
                                            <span className="px-2 py-0.5 bg-[#E76F51]/10 text-[#E76F51] rounded text-[10px] font-extrabold">
                                                {p.riskScore}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <button className="text-xs font-extrabold text-[#C8843B] hover:text-[#2E1A12] transition-colors flex items-center justify-center gap-1 mt-2">
                        <span>View All Slow Moving Items</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                </div>

                {/* Smart Discount Recommendations */}
                <div className="bg-[#FFFDFC] p-6 rounded-3xl border border-[#C8843B]/10 shadow-[0_4px_20px_rgba(46,26,18,0.01)] hover:shadow-[0_12px_24px_rgba(46,26,18,0.05)] transition-all duration-300 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-[#C8843B]" />
                            <h2 className="text-lg font-bold font-serif text-[#2E1A12]">Smart Recommendations</h2>
                        </div>
                        <p className="text-xs text-gray-400 font-medium mt-1">AI suggestions to optimize stock and prevent waste</p>
                    </div>

                    <div className="my-4 space-y-3 flex-1">
                        {dashboardData.discountRecommendations.map((rec) => (
                            <div 
                                key={rec.id} 
                                className={`p-3 rounded-2xl border flex gap-3 items-start transition-all relative overflow-hidden ${
                                    rec.applied 
                                        ? 'bg-gray-50/50 border-gray-100 opacity-60' 
                                        : 'bg-[#FFFDFC] border-[#C8843B]/20 hover:border-[#C8843B]/40'
                                }`}
                            >
                                <div className="text-xl bg-[#F7F4ED] w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 border border-[#C8843B]/10">
                                    {rec.icon}
                                </div>
                                <div className="flex-1 space-y-1.5">
                                    <div className="flex justify-between items-start gap-1">
                                        <h4 className="text-[11px] font-extrabold text-[#2E1A12] leading-tight">
                                            {rec.product}
                                        </h4>
                                        <span className={`px-1.5 py-0.5 rounded text-[8px] font-extrabold uppercase ${
                                            rec.confidence >= 90 ? 'bg-[#6B8E23]/10 text-[#6B8E23]' : 'bg-[#C8843B]/10 text-[#C8843B]'
                                        }`}>
                                            {rec.confidence}% Confidence
                                        </span>
                                    </div>
                                    <p className="text-[10px] text-gray-500 font-medium leading-relaxed">
                                        {rec.text}
                                    </p>
                                    <div className="flex justify-between items-center pt-1 border-t border-[#F7F4ED]">
                                        <span className="text-[10px] font-semibold text-gray-400">
                                            Est. Recovery: <strong className="text-[#6B8E23] font-bold">{rec.estRecovery}</strong>
                                        </span>
                                        {rec.applied ? (
                                            <span className="flex items-center gap-1 text-[10px] font-extrabold text-[#6B8E23] bg-[#6B8E23]/10 px-2 py-0.5 rounded-lg">
                                                <Check className="w-3.5 h-3.5" /> Applied
                                            </span>
                                        ) : (
                                            <button 
                                                onClick={() => handleApplyDiscount(rec.id, rec.product)}
                                                className="px-3 py-1 bg-[#2E1A12] text-white hover:bg-[#C8843B] text-[10px] font-extrabold rounded-lg shadow-sm transition-all cursor-pointer"
                                            >
                                                Apply
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button 
                        onClick={handleApplyAllDiscounts}
                        className="text-xs font-extrabold text-[#C8843B] hover:text-[#2E1A12] transition-colors flex items-center justify-center gap-1 mt-2"
                    >
                        <span>View All Recommendations</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                </div>

                {/* AI Insight Cards */}
                <div className="bg-[#FFFDFC] p-6 rounded-3xl border border-[#C8843B]/10 shadow-[0_4px_20px_rgba(46,26,18,0.01)] hover:shadow-[0_12px_24px_rgba(46,26,18,0.05)] transition-all duration-300 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-1.5">
                            <Activity className="w-4 h-4 text-[#C8843B]" />
                            <h2 className="text-lg font-bold font-serif text-[#2E1A12]">AI Insights</h2>
                        </div>
                        <p className="text-xs text-gray-400 font-medium mt-1">Heuristics generated by neural trend analysis</p>
                    </div>

                    <div className="my-4 space-y-3 flex-1 overflow-y-auto max-h-[220px] pr-1">
                        {dashboardData.aiInsights.map((insight, idx) => {
                            let cardStyle = '';
                            if (insight.type === 'danger') cardStyle = 'bg-[#E76F51]/10 border-[#E76F51]/20 text-[#E76F51]';
                            else if (insight.type === 'warning') cardStyle = 'bg-[#F4A261]/10 border-[#F4A261]/20 text-[#F4A261]';
                            else if (insight.type === 'info') cardStyle = 'bg-[#C8843B]/10 border-[#C8843B]/20 text-[#C8843B]';
                            else cardStyle = 'bg-[#6B8E23]/10 border-[#6B8E23]/20 text-[#6B8E23]';

                            return (
                                <div key={idx} className={`p-3 rounded-2xl border text-xs font-semibold leading-relaxed ${cardStyle}`}>
                                    <div className="flex gap-2 items-start">
                                        <div className="w-1.5 h-1.5 rounded-full bg-current flex-shrink-0 mt-2" />
                                        <p className="text-[#2E1A12]/80 font-medium">
                                            {insight.text}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <button className="text-xs font-extrabold text-[#C8843B] hover:text-[#2E1A12] transition-colors flex items-center justify-center gap-1 mt-2">
                        <span>View All Insights</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                </div>

            </div>

            {/* 5. ROW: WASTE TREND ANALYSIS CHARTS & SUSTAINABILITY */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                
                {/* 1. Monthly Waste Reduction Trend */}
                <div className="bg-[#FFFDFC] p-5 rounded-2xl border border-[#C8843B]/10 shadow-[0_4px_20px_rgba(46,26,18,0.01)] hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(46,26,18,0.04)] transition-all duration-300">
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="text-xs font-bold text-[#2E1A12]">Waste Reduction Trend</h4>
                        <span className="text-[10px] font-extrabold text-[#6B8E23] bg-[#6B8E23]/10 px-2 py-0.5 rounded">
                            +24.8% This Month
                        </span>
                    </div>
                    <div className="h-[120px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={dashboardData.wasteReductionTrend} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F7F4ED" />
                                <XAxis dataKey="name" tick={{ fontSize: 8, fill: '#9ca3af', fontWeight: 'bold' }} tickLine={false} axisLine={false} />
                                <YAxis tick={{ fontSize: 8, fill: '#9ca3af' }} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}%`} />
                                <RechartsTooltip content={<CustomChartTooltip />} />
                                <Area type="monotone" dataKey="value" stroke="#6B8E23" fill="#6B8E23" fillOpacity={0.15} strokeWidth={2} name="Reduction Rate" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 2. Waste vs Sales Comparison */}
                <div className="bg-[#FFFDFC] p-5 rounded-2xl border border-[#C8843B]/10 shadow-[0_4px_20px_rgba(46,26,18,0.01)] hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(46,26,18,0.04)] transition-all duration-300">
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="text-xs font-bold text-[#2E1A12]">Waste vs Sales Comparison</h4>
                        <div className="flex gap-2 text-[8px] font-extrabold text-gray-400">
                            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#E76F51]" /> Waste</span>
                            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#6B8E23]" /> Sales</span>
                        </div>
                    </div>
                    <div className="h-[120px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dashboardData.wasteVsSales} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F7F4ED" />
                                <XAxis dataKey="name" tick={{ fontSize: 8, fill: '#9ca3af', fontWeight: 'bold' }} tickLine={false} axisLine={false} />
                                <YAxis tick={{ fontSize: 8, fill: '#9ca3af' }} tickLine={false} axisLine={false} tickFormatter={(val) => `${val/1000}k`} />
                                <RechartsTooltip content={<CustomChartTooltip />} />
                                <Bar dataKey="Waste" fill="#E76F51" radius={[2, 2, 0, 0]} />
                                <Bar dataKey="Sales" fill="#6B8E23" radius={[2, 2, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 3. Recovered Revenue from Discounts */}
                <div className="bg-[#FFFDFC] p-5 rounded-2xl border border-[#C8843B]/10 shadow-[0_4px_20px_rgba(46,26,18,0.01)] hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(46,26,18,0.04)] transition-all duration-300">
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="text-xs font-bold text-[#2E1A12]">Recovered Revenue</h4>
                        <span className="text-[10px] font-extrabold text-[#6B8E23] bg-[#6B8E23]/10 px-2 py-0.5 rounded">
                            Rs. 85,430 Saved
                        </span>
                    </div>
                    <div className="h-[120px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={dashboardData.recoveredRevenue} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F7F4ED" />
                                <XAxis dataKey="name" tick={{ fontSize: 8, fill: '#9ca3af', fontWeight: 'bold' }} tickLine={false} axisLine={false} />
                                <YAxis tick={{ fontSize: 8, fill: '#9ca3af' }} tickLine={false} axisLine={false} tickFormatter={(val) => `${val/1000}k`} />
                                <RechartsTooltip content={<CustomChartTooltip />} />
                                <Area type="monotone" dataKey="value" stroke="#6B8E23" fill="#6B8E23" fillOpacity={0.12} strokeWidth={2} name="Recovered" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 4. Expiry Risk Trend */}
                <div className="bg-[#FFFDFC] p-5 rounded-2xl border border-[#C8843B]/10 shadow-[0_4px_20px_rgba(46,26,18,0.01)] hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(46,26,18,0.04)] transition-all duration-300">
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="text-xs font-bold text-[#2E1A12]">Expiry Risk Trend</h4>
                        <span className="text-[9px] font-extrabold text-[#E76F51] bg-[#E76F51]/10 px-2 py-0.5 rounded uppercase tracking-wider">
                            Next 7 Days
                        </span>
                    </div>
                    <div className="h-[120px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={dashboardData.expiryRiskTrend} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F7F4ED" />
                                <XAxis dataKey="name" tick={{ fontSize: 8, fill: '#9ca3af', fontWeight: 'bold' }} tickLine={false} axisLine={false} />
                                <YAxis tick={{ fontSize: 8, fill: '#9ca3af' }} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}%`} />
                                <RechartsTooltip content={<CustomChartTooltip />} />
                                <Line type="monotone" dataKey="value" stroke="#E76F51" strokeWidth={3} dot={{ r: 3, fill: '#E76F51' }} activeDot={{ r: 5 }} name="Expiry Risk" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 5. Sustainability Section */}
                <div className="bg-[#FFFDFC] p-5 rounded-2xl border border-[#C8843B]/10 shadow-[0_4px_20px_rgba(46,26,18,0.01)] hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(46,26,18,0.04)] transition-all duration-300 flex flex-col justify-between">
                    <div>
                        <h4 className="text-xs font-bold text-[#2E1A12] flex items-center gap-1">
                            <Leaf className="w-4 h-4 text-[#6B8E23]" />
                            <span>Sustainability Impact</span>
                        </h4>
                        <p className="text-[10px] text-gray-400 font-semibold mt-0.5">This Month Summary</p>
                    </div>

                    <div className="my-2.5 grid grid-cols-2 gap-2 text-[10px]">
                        <div className="p-1.5 bg-[#6B8E23]/10 border border-[#6B8E23]/25 rounded-xl text-center space-y-0.5">
                            <span className="font-extrabold text-[#6B8E23]">214.5 kg</span>
                            <span className="block text-[8px] font-bold text-gray-400 uppercase">Food Saved</span>
                        </div>
                        <div className="p-1.5 bg-[#C8843B]/10 border border-[#C8843B]/25 rounded-xl text-center space-y-0.5">
                            <span className="font-extrabold text-[#C8843B]">18.7%</span>
                            <span className="block text-[8px] font-bold text-gray-400 uppercase">Waste Reduced</span>
                        </div>
                        <div className="p-1.5 bg-[#6B8E23]/10 border border-[#6B8E23]/25 rounded-xl text-center space-y-0.5">
                            <span className="font-extrabold text-[#6B8E23]">Rs. 85,430</span>
                            <span className="block text-[8px] font-bold text-gray-400 uppercase">Revenue Rec.</span>
                        </div>
                        <div className="p-1.5 bg-teal-50 border border-teal-200 rounded-xl text-center space-y-0.5">
                            <span className="font-extrabold text-teal-600">125.6 kg</span>
                            <span className="block text-[8px] font-bold text-gray-400 uppercase">CO2 Avoided</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* 6. AI ENGINE STATUS SECTION */}
            <div className="bg-[#FFFDFC] p-5 rounded-3xl border border-[#C8843B]/10 shadow-[0_4px_20px_rgba(46,26,18,0.01)] hover:shadow-[0_12px_24px_rgba(46,26,18,0.05)] transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-[#2E1A12] text-white rounded-xl">
                        <Activity className="w-5 h-5 text-[#C8843B]" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="text-sm font-extrabold font-serif text-[#2E1A12]">AI Engine Status</h3>
                            <span className="flex items-center gap-1 text-[9px] font-extrabold text-[#6B8E23] bg-[#6B8E23]/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                <span className="w-1.5 h-1.5 bg-[#6B8E23] rounded-full animate-ping" /> Active
                            </span>
                        </div>
                        <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Gemini-powered forecasting and waste avoidance model active.</p>
                    </div>
                </div>

                {/* Sub Stats Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1 max-w-2xl text-[10px] font-bold">
                    <div className="border-r border-[#F7F4ED] pr-3">
                        <span className="block text-gray-400 uppercase font-extrabold tracking-wider">Confidence Score</span>
                        <span className="text-xs text-[#2E1A12] font-extrabold">92.6%</span>
                    </div>
                    <div className="border-r border-[#F7F4ED] pr-3">
                        <span className="block text-gray-400 uppercase font-extrabold tracking-wider">Prediction Accuracy</span>
                        <span className="text-xs text-[#2E1A12] font-extrabold">92.6%</span>
                    </div>
                    <div className="border-r border-[#F7F4ED] pr-3">
                        <span className="block text-gray-400 uppercase font-extrabold tracking-wider">Last Training</span>
                        <span className="text-xs text-[#2E1A12] font-extrabold">May 11, 2025</span>
                    </div>
                    <div>
                        <span className="block text-gray-400 uppercase font-extrabold tracking-wider">Next Sync</span>
                        <span className="text-xs text-[#2E1A12] font-extrabold">May 18, 2025</span>
                    </div>
                </div>

                {/* Data Sources Badges */}
                <div className="flex flex-wrap items-center gap-1.5 max-w-sm">
                    {['Inventory Levels', 'Expiry Dates', 'Historical Sales', 'Demand Forecasts', 'Seasonal Trends'].map((src, sIdx) => (
                        <span 
                            key={sIdx} 
                            className="px-2 py-1 bg-[#F7F4ED] border border-[#C8843B]/20 text-[#2E1A12]/60 rounded-lg text-[9px] font-extrabold shadow-sm transition-all hover:bg-[#C8843B]/10 hover:text-[#2E1A12]"
                        >
                            {src}
                        </span>
                    ))}
                </div>
            </div>

            <div className="text-center text-[10px] text-gray-400 font-extrabold uppercase tracking-widest pt-2">
                Powered by Gemini-2.5-Flash AI Engine • Real-time Predictive Waste Avoidance
            </div>

        </div>
    );
};

export default WasteReduction;
