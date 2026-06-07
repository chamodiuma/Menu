import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Tag, Sparkles } from 'lucide-react';
import api from '../../services/api';

const SmartDeals = () => {
    const [deals, setDeals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDeals = async () => {
            try {
                const { data } = await api.get('/products?discounted=true');
                setDeals(data);
            } catch (error) {
                console.error("Failed to fetch deals", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDeals();
    }, []);

    return (
        <div className="min-h-screen bg-[#fef9e1] font-sans">
            {/* Header / Nav Area */}
            <header className="bg-[#FFFDFC] sticky top-0 z-50 shadow-sm">
                <div className="max-w-[1400px] mx-auto px-6 py-5 flex items-center justify-between">
                    {/* Logo Section */}
                    <div className="flex items-center gap-3 lg:gap-4">
                        <img src="/images/logo.png" alt="Wijayasiri Logo" className="w-12 h-12 lg:w-14 lg:h-14 rounded-full shadow-sm bg-white object-contain" />
                        <div className="flex flex-col justify-center">
                            <span className="text-2xl font-bold text-[#4A3C31] leading-none tracking-tight font-serif">Smart Bake Hub</span>
                            <span className="text-[10px] font-semibold text-[#A67B5B] uppercase tracking-widest mt-1.5 hidden sm:block">WIJAYASIRI FRESH FOOD (PVT) LTD.</span>
                        </div>
                    </div>

                    {/* Back to Home Button */}
                    <Link to="/" className="flex items-center gap-2 text-[#2E1A12] hover:text-[#d68b3b] font-medium transition-colors bg-[#fef9e1] px-4 py-2 rounded-full border border-[#e6dfd5] shadow-sm">
                        <ArrowLeft className="w-4 h-4" />
                        <span className="hidden sm:inline">Back to Home</span>
                    </Link>
                </div>
            </header>

            <main className="max-w-[1400px] mx-auto px-6 py-12">
                <div className="flex flex-col items-center justify-center text-center mb-12">
                    <div className="inline-flex items-center gap-1.5 bg-[#d68b3b]/10 text-[#d68b3b] px-3 py-1.5 rounded-full mb-4">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Exclusive Savings</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#2c1d11] font-serif flex flex-col items-center">
                        Smart Deals
                        <svg width="80" height="20" viewBox="0 0 80 20" fill="none" className="mt-4 text-[#d68b3b]">
                            <path d="M40 10c-5-2-10-5-20-5S5 8 5 8m35 2c5-2 10-5 20-5s15 3 15 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                        </svg>
                    </h1>
                    <p className="text-[#888] mt-4 max-w-xl mx-auto font-['Inter']">
                        Discover our chef's hand-picked selection of discounted pastries, cakes, and treats. These special prices won't last forever!
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d68b3b]"></div>
                    </div>
                ) : deals.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {deals.map((deal) => (
                            <div key={deal.id} className="group bg-white rounded-3xl p-4 shadow-[0_15px_35px_-10px_rgba(46,26,18,0.1)] border border-[#e6dfd5]/50 hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(214,139,59,0.15)] transition-all duration-300 relative overflow-hidden flex flex-col h-full">
                                {/* Discount Badge */}
                                <div className="absolute top-4 right-4 bg-[#d68b3b] text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-md flex items-center gap-1">
                                    <Tag className="w-3.5 h-3.5" />
                                    {deal.discount_percentage}% OFF
                                </div>
                                
                                {/* Image */}
                                <div className="w-full h-[220px] rounded-2xl overflow-hidden bg-[#fef9e1] mb-4 relative">
                                    <img 
                                        src={deal.image_url ? `http://localhost:5000${deal.image_url}` : 'https://images.unsplash.com/photo-1557142046-c704a3adf364?q=80&w=400&auto=format&fit=crop'} 
                                        alt={deal.name} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                
                                {/* Content */}
                                <div className="flex flex-col flex-1">
                                    <div className="flex items-start justify-between gap-2 mb-1">
                                        <h3 className="font-bold text-[#2E1A12] font-serif text-lg leading-tight line-clamp-2">{deal.name}</h3>
                                    </div>
                                    <p className="text-[#888] text-xs line-clamp-2 mb-4 font-['Inter']">{deal.description}</p>
                                    
                                    <div className="mt-auto flex items-end justify-between">
                                        <div>
                                            <div className="text-[#888] text-xs line-through mb-0.5 font-['Inter']">Rs. {Number(deal.price).toFixed(2)}</div>
                                            <div className="text-[#d68b3b] font-bold text-xl font-serif">
                                                Rs. {(Number(deal.price) * (1 - deal.discount_percentage / 100)).toFixed(2)}
                                            </div>
                                        </div>
                                        <button className="bg-[#2E1A12] text-white p-3 rounded-full hover:bg-[#d68b3b] transition-colors shadow-md">
                                            <ShoppingCart className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <Tag className="w-16 h-16 text-[#e6dfd5] mb-4" />
                        <h2 className="text-2xl font-bold text-[#2E1A12] font-serif mb-2">No Active Deals Right Now</h2>
                        <p className="text-[#888] font-['Inter']">Check back later for exclusive discounts and offers!</p>
                        <Link to="/" className="mt-6 px-6 py-2.5 bg-[#d68b3b] text-white rounded-full font-medium hover:bg-[#2E1A12] transition-colors">
                            Explore Our Menu
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
};

export default SmartDeals;
