import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, ShoppingCart, Phone, QrCode, Utensils, Clock, Calendar, Sparkles, Percent, Star, Award, ChevronRight, Menu as MenuIcon, ShoppingBag, Users, CalendarDays, ArrowRight, Wheat, MapPin, Mail, Tag } from 'lucide-react';

const Home = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    return (
        <div className="min-h-screen bg-[#fef9e1] font-sans selection:bg-[#d68b3b] selection:text-white">
            {/* Header */}
            <header className="bg-[#FFFDFC] sticky top-0 z-50">
                <div className="max-w-[1400px] mx-auto px-6 py-5 flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-3 lg:gap-4">
                        <img src="/images/logo.png" alt="Wijayasiri Logo" className="w-12 h-12 lg:w-14 lg:h-14 rounded-full shadow-sm bg-white object-contain" />
                        <div className="flex flex-col justify-center">
                            <span className="text-2xl font-bold text-[#4A3C31] leading-none tracking-tight font-serif">Smart Bake Hub</span>
                            <span className="text-[10px] font-semibold text-[#A67B5B] uppercase tracking-widest mt-1.5">WIJAYASIRI FRESH FOOD (PVT) LTD.</span>
                        </div>
                    </div>

                    {/* Nav Links */}
                    <nav className="hidden lg:flex items-center gap-10">
                        <a href="#" className="text-[#C8843B] font-medium text-sm border-b-2 border-[#C8843B] pb-1">Home</a>
                        <a href="#" className="text-[#2E1A12] font-medium text-sm hover:text-[#C8843B] transition-colors pb-1">Menu</a>
                        <a href="#" className="text-[#2E1A12] font-medium text-sm hover:text-[#C8843B] transition-colors pb-1">Order Now</a>
                        <a href="#" className="text-[#2E1A12] font-medium text-sm hover:text-[#C8843B] transition-colors pb-1">Events & Booking</a>
                        <a href="#" className="text-[#2E1A12] font-medium text-sm hover:text-[#C8843B] transition-colors pb-1">About Us</a>
                        <a href="#" className="text-[#2E1A12] font-medium text-sm hover:text-[#C8843B] transition-colors pb-1">Contact Us</a>
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center gap-8">

                        
                        <div className="relative cursor-pointer text-[#2E1A12] hover:text-[#C8843B] transition-colors">
                            <ShoppingCart className="w-6 h-6 stroke-[1.5]" />
                            <span className="absolute -top-1.5 -right-2 bg-[#C8843B] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-[#FFFDFC]">2</span>
                        </div>

                        <Link to="/login" className="hidden md:flex bg-[#2E1A12] text-white font-medium px-6 py-2.5 rounded-full text-sm hover:bg-[#C8843B] transition-colors">
                            Login / Register
                        </Link>
                        
                        <button className="lg:hidden text-[#2E1A12]"><MenuIcon className="w-6 h-6" /></button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative w-full pt-12 pb-24 lg:pt-16 lg:pb-32 flex flex-col lg:flex-row items-center overflow-hidden">
                
                {/* Subtle background decorative element */}
                <div className="absolute top-20 left-10 w-64 h-64 bg-[#e8decf] rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse"></div>

                {/* Hero Content Container */}
                <div className="w-full max-w-[1400px] mx-auto px-6 relative z-10 flex">
                    <div className="w-full lg:w-1/2 mb-12 lg:mb-0 relative">
                        <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-md border border-white px-4 py-2 rounded-full shadow-sm text-[#d68b3b] font-semibold text-xs tracking-wide mb-6">
                            <Wheat className="w-4 h-4" />
                            <span className="text-[#3a1d08]">Freshly Baked. <span className="text-[#d68b3b]">Smartly Served.</span></span>
                        </div>
                        
                        <h1 className="text-5xl lg:text-[4rem] font-bold text-[#2c1d11] leading-[1.1] mb-6 font-serif tracking-tight">
                            Smart Bakery. <br />
                            <span className="relative inline-block mt-2">
                                <span className="text-[#8c5e35]">Smarter Experience.</span>
                                <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#d68b3b]/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
                                </svg>
                            </span>
                        </h1>
                        
                        <p className="text-[#5a4d41] text-lg mb-10 max-w-lg leading-relaxed font-medium">
                            Scan, Order, Enjoy! Explore our delicious bakery items, meals, beverages and cakes with a smart self-service experience.
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-4">
                            <button className="bg-[#2E1A12] text-white font-semibold px-8 py-4 rounded-full flex items-center gap-2 hover:bg-[#C8843B] hover:-translate-y-1 shadow-[0_8px_20px_rgba(46,26,18,0.2)] hover:shadow-[0_12px_25px_rgba(200,132,59,0.3)] transition-all duration-300">
                                <QrCode className="w-5 h-5" />
                                Scan QR to Order
                            </button>
                            <button className="bg-white/40 text-[#2E1A12] font-semibold px-8 py-4 rounded-full flex items-center gap-2 border border-[#d3cac1] hover:border-[#C8843B] hover:text-[#C8843B] hover:bg-white/80 hover:-translate-y-1 shadow-sm hover:shadow-md backdrop-blur-md transition-all duration-300">
                                <Utensils className="w-5 h-5" />
                                Explore Menu
                            </button>
                        </div>
                    </div>
                </div>

                {/* Hero Image Container - Full Width Right Edge */}
                <div className="lg:absolute top-0 right-0 w-full lg:w-1/2 h-full flex flex-col justify-center items-end relative z-0 mt-8 lg:mt-0">
                    <img src="/images/hero_cake_pastries.png" alt="Bakery Items" className="w-full max-w-[600px] h-auto object-contain object-right [mask-image:linear-gradient(to_right,transparent_0%,black_15%)]" />

                    {/* Floating Premium Badge */}
                    <div className="absolute top-10 right-6 lg:right-[15%] bg-white/95 backdrop-blur-xl rounded-[24px] p-5 shadow-[0_15px_40px_rgba(44,29,17,0.08)] border border-white flex flex-col items-center gap-1 z-20 animate-[bounce_4s_infinite]">
                        <div className="flex text-[#d68b3b] gap-1 mb-1">
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="bg-gradient-to-br from-[#d68b3b] to-[#b36a1c] p-1.5 rounded-full text-white shadow-sm">
                                <Award className="w-4 h-4" />
                            </div>
                            <span className="font-bold text-[#3a1d08] text-sm">Premium Quality</span>
                        </div>
                        <span className="text-[10px] text-gray-500 font-semibold tracking-wide mt-1 text-center">Fresh ingredients<br/>Made with love</span>
                    </div>
                </div>
            </section>

            {/* Info Bar */}
            <section className="max-w-[1400px] mx-auto px-6 relative z-20 -mt-16 lg:-mt-24 mb-10">
                <div className="bg-white rounded-[24px] shadow-[0_10px_40px_rgba(44,29,17,0.08)] p-6 lg:px-10 lg:py-8 flex flex-wrap items-center justify-between gap-6">
                    
                    <div className="flex items-start gap-4 flex-1 min-w-[200px]">
                        <div className="text-[#3a1d08] mt-1">
                            <QrCode className="w-6 h-6 stroke-[2]" />
                        </div>
                        <div>
                            <h4 className="font-bold text-[#2c1d11] text-sm mb-1">QR Code Ordering</h4>
                            <p className="text-[11px] text-[#888] leading-relaxed">Scan, select and order<br/>in just a few taps.</p>
                        </div>
                    </div>

                    <div className="w-px h-10 bg-gray-200 hidden xl:block"></div>

                    <div className="flex items-start gap-4 flex-1 min-w-[200px]">
                        <div className="text-[#3a1d08] mt-1">
                            <Clock className="w-6 h-6 stroke-[2]" />
                        </div>
                        <div>
                            <h4 className="font-bold text-[#2c1d11] text-sm mb-1">Real-Time Updates</h4>
                            <p className="text-[11px] text-[#888] leading-relaxed">Track your order status<br/>in real time.</p>
                        </div>
                    </div>

                    <div className="w-px h-10 bg-gray-200 hidden xl:block"></div>

                    <div className="flex items-start gap-4 flex-1 min-w-[200px]">
                        <div className="text-[#3a1d08] mt-1">
                            <Calendar className="w-6 h-6 stroke-[2]" />
                        </div>
                        <div>
                            <h4 className="font-bold text-[#2c1d11] text-sm mb-1">Event Booking</h4>
                            <p className="text-[11px] text-[#888] leading-relaxed">Book your events and<br/>celebrations easily.</p>
                        </div>
                    </div>

                    <div className="w-px h-10 bg-gray-200 hidden xl:block"></div>

                    <div className="flex items-start gap-4 flex-1 min-w-[200px]">
                        <div className="text-[#3a1d08] mt-1">
                            <Sparkles className="w-6 h-6 stroke-[2]" />
                        </div>
                        <div>
                            <h4 className="font-bold text-[#2c1d11] text-sm mb-1">Personalized Offers</h4>
                            <p className="text-[11px] text-[#888] leading-relaxed">Smart recommendations<br/>and best deals for you.</p>
                        </div>
                    </div>

                    <div className="w-px h-10 bg-gray-200 hidden xl:block"></div>

                    <div className="flex items-start gap-4 flex-1 min-w-[200px]">
                        <div className="text-[#3a1d08] mt-1">
                            <Percent className="w-6 h-6 stroke-[2]" />
                        </div>
                        <div>
                            <h4 className="font-bold text-[#2c1d11] text-sm mb-1">Exclusive Discounts</h4>
                            <p className="text-[11px] text-[#888] leading-relaxed">Enjoy our daily specials<br/>and smart discounts.</p>
                        </div>
                    </div>

                </div>
            </section>

            {/* Premium Smart Deals CTA Banner */}
            <section className="max-w-[1400px] mx-auto px-6 py-4">
                <Link to="/smart-deals" className="block relative overflow-hidden rounded-3xl shadow-[0_20px_40px_-15px_rgba(46,26,18,0.2)] group bg-[#2c1d11]">
                    
                    {/* Full Width Background Image */}
                    <div 
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 group-hover:scale-105"
                        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2000&auto=format&fit=crop")' }}
                    ></div>
                    
                    {/* Dark Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1A110B] via-[#1A110B]/80 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A110B]/80 via-transparent to-transparent opacity-80"></div>
                    <div className="absolute inset-0 bg-black/20"></div>

                    {/* Glowing Accents */}
                    <div className="absolute -top-32 -left-32 w-64 h-64 bg-[#d68b3b] rounded-full mix-blend-overlay filter blur-[80px] opacity-40 group-hover:opacity-60 transition-opacity duration-700"></div>

                    <div className="relative z-10 px-8 py-8 sm:px-12 sm:py-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        
                        <div className="flex-1 max-w-xl z-20 relative">
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-[#fef9e1] px-3 py-1.5 rounded-full mb-4 transform transition-transform group-hover:-translate-y-1">
                                <Sparkles className="w-3.5 h-3.5 text-[#d68b3b]" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Limited Time Offers</span>
                            </div>
                            
                            <h3 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold font-serif leading-tight mb-3 drop-shadow-md">
                                Unlock <span className="text-[#d68b3b] italic">Exclusive</span> Savings
                            </h3>
                            
                            <p className="text-[#e6dfd5] text-sm md:text-base font-['Inter'] font-light opacity-90 mb-6 max-w-md">
                                Grab our freshly baked daily specials before they're gone!
                            </p>

                            {/* CTA Button */}
                            <div className="relative inline-flex group/btn">
                                <div className="absolute -inset-1 bg-gradient-to-r from-[#d68b3b] to-[#f4a261] rounded-full blur opacity-30 group-hover/btn:opacity-80 transition duration-500"></div>
                                <div className="relative bg-[#d68b3b] text-white px-6 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 overflow-hidden shadow-lg border border-white/10">
                                    <span className="relative z-10">Explore Deals</span>
                                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center relative z-10 group-hover/btn:translate-x-1 transition-transform">
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </div>
                                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover/btn:animate-[shimmer_1.5s_infinite]"></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </Link>
            </section>

            {/* Content Area: Categories & Deals */}
            <section className="max-w-[1400px] mx-auto px-6 py-6 flex flex-col xl:flex-row gap-6 items-start">
                
                {/* Popular Categories */}
                <div className="flex-1 w-full bg-white/70 backdrop-blur-xl py-5 px-5 lg:px-6 rounded-[28px] shadow-[0_20px_40px_-15px_rgba(46,26,18,0.1)] border border-white/60 relative z-10">
                    <div className="flex flex-col items-center justify-center text-center mb-5">
                        <span className="text-[#d68b3b] text-[10px] font-bold uppercase tracking-widest mb-2 block">What would you like today?</span>
                        <h2 className="text-3xl font-bold text-[#2c1d11] font-serif flex flex-col items-center">
                            Popular Categories
                            <svg width="80" height="20" viewBox="0 0 80 20" fill="none" className="mt-2 text-[#d68b3b]">
                                <path d="M40 10c-5-2-10-5-20-5S5 8 5 8m35 2c5-2 10-5 20-5s15 3 15 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                                <circle cx="40" cy="10" r="3" fill="currentColor"/>
                            </svg>
                        </h2>
                    </div>

                    <style>{`
                        @keyframes float {
                            0% { transform: translateY(0px); }
                            50% { transform: translateY(-8px); }
                            100% { transform: translateY(0px); }
                        }
                        .animate-float-1 { animation: float 6s ease-in-out infinite; }
                        .animate-float-2 { animation: float 6.5s ease-in-out infinite 1s; }
                        .animate-float-3 { animation: float 5.5s ease-in-out infinite 2s; }
                        .animate-float-4 { animation: float 6s ease-in-out infinite 1.5s; }
                    `}</style>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-3 mt-2">
                        {/* Category 1 */}
                        <div className="flex flex-col items-center text-center cursor-pointer group animate-float-1">
                            <div className="relative mb-4 w-[110px] mx-auto">
                                <div className="w-[110px] h-[110px] rounded-full overflow-hidden shadow-[0_15px_30px_-10px_rgba(46,26,18,0.2)] group-hover:shadow-[0_20px_40px_-10px_rgba(214,139,59,0.35)] transition-all duration-700 border-4 border-white bg-[#fcfaf5] relative z-10">
                                    <div className="absolute inset-0 rounded-full shadow-[inset_0_6px_15px_rgba(0,0,0,0.25)] z-20 pointer-events-none mix-blend-multiply"></div>
                                    <div className="absolute inset-0 rounded-full shadow-[inset_0_-4px_10px_rgba(255,255,255,0.7)] z-20 pointer-events-none mix-blend-screen"></div>
                                    <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=500&auto=format&fit=crop" alt="Bakery" className="w-full h-full object-cover transform group-hover:scale-110 group-hover:rotate-2 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" />
                                </div>
                                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md rounded-full p-2.5 shadow-[0_8px_20px_-6px_rgba(46,26,18,0.25)] z-30 text-[#d68b3b] border border-white group-hover:bg-[#d68b3b] group-hover:text-white group-hover:-translate-y-1 transition-all duration-500">
                                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21V9m0 0l-3.5 3.5M12 9l3.5 3.5M12 3v2M5 10c0-2.5 2-5 6-5s6 2.5 6 5M5 21v-6a2 2 0 012-2h10a2 2 0 012 2v6" /></svg>
                                </div>
                            </div>
                            <h3 className="font-bold text-[#2E1A12] text-sm lg:text-base mb-0.5 group-hover:text-[#d68b3b] transition-colors duration-500 font-['Inter'] tracking-tight">Bakery</h3>
                            <p className="text-[10px] lg:text-[11px] text-[#2E1A12]/60 font-medium tracking-wide font-['Inter']">Freshly baked daily</p>
                        </div>

                        {/* Category 2 */}
                        <div className="flex flex-col items-center text-center cursor-pointer group animate-float-2">
                            <div className="relative mb-4 w-[110px] mx-auto">
                                <div className="w-[110px] h-[110px] rounded-full overflow-hidden shadow-[0_15px_30px_-10px_rgba(46,26,18,0.2)] group-hover:shadow-[0_20px_40px_-10px_rgba(214,139,59,0.35)] transition-all duration-700 border-4 border-white bg-[#fcfaf5] relative z-10">
                                    <div className="absolute inset-0 rounded-full shadow-[inset_0_6px_15px_rgba(0,0,0,0.25)] z-20 pointer-events-none mix-blend-multiply"></div>
                                    <div className="absolute inset-0 rounded-full shadow-[inset_0_-4px_10px_rgba(255,255,255,0.7)] z-20 pointer-events-none mix-blend-screen"></div>
                                    <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=500&auto=format&fit=crop" alt="Meals" className="w-full h-full object-cover transform group-hover:scale-110 group-hover:-rotate-2 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" />
                                </div>
                                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md rounded-full p-2.5 shadow-[0_8px_20px_-6px_rgba(46,26,18,0.25)] z-30 text-[#d68b3b] border border-white group-hover:bg-[#d68b3b] group-hover:text-white group-hover:-translate-y-1 transition-all duration-500">
                                    <Utensils className="w-3.5 h-3.5 fill-current" />
                                </div>
                            </div>
                            <h3 className="font-bold text-[#2E1A12] text-sm lg:text-base mb-0.5 group-hover:text-[#d68b3b] transition-colors duration-500 font-['Inter'] tracking-tight">Meals</h3>
                            <p className="text-[10px] lg:text-[11px] text-[#2E1A12]/60 font-medium tracking-wide font-['Inter']">Delicious & healthy</p>
                        </div>

                        {/* Category 3 */}
                        <div className="flex flex-col items-center text-center cursor-pointer group animate-float-3">
                            <div className="relative mb-4 w-[110px] mx-auto">
                                <div className="w-[110px] h-[110px] rounded-full overflow-hidden shadow-[0_15px_30px_-10px_rgba(46,26,18,0.2)] group-hover:shadow-[0_20px_40px_-10px_rgba(214,139,59,0.35)] transition-all duration-700 border-4 border-white bg-[#fcfaf5] relative z-10">
                                    <div className="absolute inset-0 rounded-full shadow-[inset_0_6px_15px_rgba(0,0,0,0.25)] z-20 pointer-events-none mix-blend-multiply"></div>
                                    <div className="absolute inset-0 rounded-full shadow-[inset_0_-4px_10px_rgba(255,255,255,0.7)] z-20 pointer-events-none mix-blend-screen"></div>
                                    <img src="https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=500&auto=format&fit=crop" alt="Beverages" className="w-full h-full object-cover transform group-hover:scale-110 group-hover:rotate-2 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" />
                                </div>
                                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md rounded-full p-2.5 shadow-[0_8px_20px_-6px_rgba(46,26,18,0.25)] z-30 text-[#d68b3b] border border-white group-hover:bg-[#d68b3b] group-hover:text-white group-hover:-translate-y-1 transition-all duration-500">
                                    <svg className="w-3.5 h-3.5 fill-current" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4z" /></svg>
                                </div>
                            </div>
                            <h3 className="font-bold text-[#2E1A12] text-sm lg:text-base mb-0.5 group-hover:text-[#d68b3b] transition-colors duration-500 font-['Inter'] tracking-tight">Beverages</h3>
                            <p className="text-[10px] lg:text-[11px] text-[#2E1A12]/60 font-medium tracking-wide font-['Inter']">Refreshing drinks</p>
                        </div>

                        {/* Category 4 */}
                        <div className="flex flex-col items-center text-center cursor-pointer group animate-float-4">
                            <div className="relative mb-4 w-[110px] mx-auto">
                                <div className="w-[110px] h-[110px] rounded-full overflow-hidden shadow-[0_15px_30px_-10px_rgba(46,26,18,0.2)] group-hover:shadow-[0_20px_40px_-10px_rgba(214,139,59,0.35)] transition-all duration-700 border-4 border-white bg-[#fcfaf5] relative z-10">
                                    <div className="absolute inset-0 rounded-full shadow-[inset_0_6px_15px_rgba(0,0,0,0.25)] z-20 pointer-events-none mix-blend-multiply"></div>
                                    <div className="absolute inset-0 rounded-full shadow-[inset_0_-4px_10px_rgba(255,255,255,0.7)] z-20 pointer-events-none mix-blend-screen"></div>
                                    <img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=500&auto=format&fit=crop" alt="Cakes" className="w-full h-full object-cover transform group-hover:scale-110 group-hover:-rotate-2 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" />
                                </div>
                                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md rounded-full p-2.5 shadow-[0_8px_20px_-6px_rgba(46,26,18,0.25)] z-30 text-[#d68b3b] border border-white group-hover:bg-[#d68b3b] group-hover:text-white group-hover:-translate-y-1 transition-all duration-500">
                                    <svg className="w-3.5 h-3.5 fill-current" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" /></svg>
                                </div>
                            </div>
                            <h3 className="font-bold text-[#2E1A12] text-sm lg:text-base mb-0.5 group-hover:text-[#d68b3b] transition-colors duration-500 font-['Inter'] tracking-tight">Cakes</h3>
                            <p className="text-[10px] lg:text-[11px] text-[#2E1A12]/60 font-medium tracking-wide font-['Inter']">Made for celebrations</p>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-center">
                        <button onClick={() => window.location.href = '/menus'} className="flex items-center justify-center gap-2 text-xs font-semibold text-[#8c5e35] border border-[#e6dfd5] px-6 py-2.5 rounded-full hover:bg-white hover:border-[#d68b3b] transition-all hover:shadow-[0_8px_16px_-6px_rgba(46,26,18,0.15)] hover:-translate-y-0.5 bg-transparent">
                            View All Menu <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </section>


            {/* Bottom Stats Bar */}
            <div className="max-w-[1400px] mx-auto px-6 pb-6">
                <div className="bg-[#3a2618] rounded-[32px] py-6 px-10 text-white flex flex-wrap justify-between items-center gap-6 shadow-xl">
                    
                    <div className="flex items-center gap-4">
                        <ShoppingBag className="w-7 h-7 text-white stroke-[1.5]" />
                        <div>
                            <div className="text-2xl font-bold font-serif mb-0.5">500+</div>
                            <div className="text-[10px] text-gray-300">Daily Orders</div>
                        </div>
                    </div>

                    <div className="hidden lg:block w-px h-8 bg-white/20"></div>

                    <div className="flex items-center gap-4">
                        <Users className="w-7 h-7 text-white stroke-[1.5]" />
                        <div>
                            <div className="text-2xl font-bold font-serif mb-0.5">10K+</div>
                            <div className="text-[10px] text-gray-300">Happy Customers</div>
                        </div>
                    </div>

                    <div className="hidden lg:block w-px h-8 bg-white/20"></div>

                    <div className="flex items-center gap-4">
                        <svg className="w-7 h-7 text-white stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" /></svg>
                        <div>
                            <div className="text-2xl font-bold font-serif mb-0.5">50+</div>
                            <div className="text-[10px] text-gray-300">Varieties of Cakes</div>
                        </div>
                    </div>

                    <div className="hidden xl:block w-px h-8 bg-white/20"></div>

                    <div className="flex items-center gap-4">
                        <CalendarDays className="w-7 h-7 text-white stroke-[1.5]" />
                        <div>
                            <div className="text-2xl font-bold font-serif mb-0.5">200+</div>
                            <div className="text-[10px] text-gray-300">Events Completed</div>
                        </div>
                    </div>

                    <div className="hidden xl:block w-px h-8 bg-white/20"></div>

                    <div className="flex items-center gap-4">
                        <Star className="w-7 h-7 text-white stroke-[1.5]" />
                        <div>
                            <div className="text-2xl font-bold font-serif mb-0.5">4.8</div>
                            <div className="text-[10px] text-gray-300">Customer Rating</div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Customer Reviews Section */}
            {/* Customer Reviews Section */}
            <section className="max-w-[1400px] mx-auto px-4 sm:px-6 py-12 lg:py-16 relative mb-8">
                {/* Premium Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFFDFC] via-[#fdfaf5] to-[#f4ebe1] rounded-[32px] shadow-[inset_0_2px_20px_rgba(0,0,0,0.02)] border border-white z-0"></div>
                
                {/* Decorative blobs */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-[32px] z-0 pointer-events-none">
                    <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#C8843B]/10 blur-[120px]"></div>
                    <div className="absolute bottom-[-20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-[#2E1A12]/5 blur-[100px]"></div>
                </div>

                <div className="relative z-10">
                    <div className="flex flex-col items-center text-center mb-8 gap-4 px-4 lg:px-8 relative">
                        <div className="flex flex-col items-center">
                            <span className="text-[#C8843B] text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block">Testimonials</span>
                            <h2 className="text-2xl lg:text-3xl font-bold text-[#2E1A12] font-serif leading-tight">What Our Customers <br className="hidden md:block" />Say About Us</h2>
                        </div>
                        <div className="flex items-center gap-2 mt-2 md:mt-0 md:absolute md:right-8 md:top-1/2 md:-translate-y-1/2">
                            <button className="w-8 h-8 rounded-full bg-white shadow-sm border border-[#f0e6d8] flex items-center justify-center text-[#2E1A12] hover:bg-[#C8843B] hover:text-white hover:border-[#C8843B] transition-all duration-300">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            </button>
                            <button className="w-8 h-8 rounded-full bg-white shadow-sm border border-[#f0e6d8] flex items-center justify-center text-[#2E1A12] hover:bg-[#C8843B] hover:text-white hover:border-[#C8843B] transition-all duration-300">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 lg:px-8">
                        {/* Review 1 */}
                        <div className="bg-gradient-to-b from-white to-[#fcfbf9] rounded-[20px] p-5 lg:p-6 shadow-[0_20px_40px_-15px_rgba(46,26,18,0.1),inset_0_1px_0_rgba(255,255,255,1)] border border-[#f0e6d8]/50 relative transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_50px_-15px_rgba(46,26,18,0.15)] group">
                            <svg className="absolute top-5 right-5 w-8 h-8 text-[#f4ebe1] opacity-50 group-hover:scale-110 transition-transform duration-500" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                            <div className="flex gap-1 mb-4 text-[#F5A623]">
                                <Star className="w-3.5 h-3.5 fill-current" />
                                <Star className="w-3.5 h-3.5 fill-current" />
                                <Star className="w-3.5 h-3.5 fill-current" />
                                <Star className="w-3.5 h-3.5 fill-current" />
                                <Star className="w-3.5 h-3.5 fill-current" />
                            </div>
                            <p className="text-[#2E1A12]/70 text-[13px] leading-relaxed mb-6 relative z-10 font-medium min-h-[80px]">
                                "The Smart Deals feature is amazing! I always get exactly what I'm craving for a discounted price. Their chocolate truffle cake is absolutely out of this world."
                            </p>
                            <div className="flex items-center gap-3 mt-auto">
                                <div>
                                    <h4 className="font-bold text-[#2E1A12] text-[14px] font-serif">Kasun Perera</h4>
                                    <span className="text-[9px] text-[#C8843B] font-bold uppercase tracking-wider">Regular Customer</span>
                                </div>
                            </div>
                        </div>

                        {/* Review 2 */}
                        <div className="bg-gradient-to-b from-white to-[#fcfbf9] rounded-[20px] p-5 lg:p-6 shadow-[0_20px_40px_-15px_rgba(46,26,18,0.1),inset_0_1px_0_rgba(255,255,255,1)] border border-[#f0e6d8]/50 relative transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_50px_-15px_rgba(46,26,18,0.15)] group">
                            <svg className="absolute top-5 right-5 w-8 h-8 text-[#f4ebe1] opacity-50 group-hover:scale-110 transition-transform duration-500" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                            <div className="flex gap-1 mb-4 text-[#F5A623]">
                                <Star className="w-3.5 h-3.5 fill-current" />
                                <Star className="w-3.5 h-3.5 fill-current" />
                                <Star className="w-3.5 h-3.5 fill-current" />
                                <Star className="w-3.5 h-3.5 fill-current" />
                                <Star className="w-3.5 h-3.5 fill-current" />
                            </div>
                            <p className="text-[#2E1A12]/70 text-[13px] leading-relaxed mb-6 relative z-10 font-medium min-h-[80px]">
                                "Booking an event through the Smart Bake Hub was seamless. The pastries were fresh, and the self-service ordering system made our party run so smoothly!"
                            </p>
                            <div className="flex items-center gap-3 mt-auto">
                                <div>
                                    <h4 className="font-bold text-[#2E1A12] text-[14px] font-serif">Nethmi Silva</h4>
                                    <span className="text-[9px] text-[#C8843B] font-bold uppercase tracking-wider">Event Organizer</span>
                                </div>
                            </div>
                        </div>

                        {/* Review 3 */}
                        <div className="bg-gradient-to-b from-white to-[#fcfbf9] rounded-[20px] p-5 lg:p-6 shadow-[0_20px_40px_-15px_rgba(46,26,18,0.1),inset_0_1px_0_rgba(255,255,255,1)] border border-[#f0e6d8]/50 relative transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_50px_-15px_rgba(46,26,18,0.15)] group hidden md:block">
                            <svg className="absolute top-5 right-5 w-8 h-8 text-[#f4ebe1] opacity-50 group-hover:scale-110 transition-transform duration-500" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                            <div className="flex gap-1 mb-4 text-[#F5A623]">
                                <Star className="w-3.5 h-3.5 fill-current" />
                                <Star className="w-3.5 h-3.5 fill-current" />
                                <Star className="w-3.5 h-3.5 fill-current" />
                                <Star className="w-3.5 h-3.5 fill-current" />
                                <Star className="w-3.5 h-3.5 fill-current" />
                            </div>
                            <p className="text-[#2E1A12]/70 text-[13px] leading-relaxed mb-6 relative z-10 font-medium min-h-[80px]">
                                "The QR code ordering is incredibly fast. I love how I can sit down, scan, and have my coffee and croissants brought right to me without waiting in line."
                            </p>
                            <div className="flex items-center gap-3 mt-auto">
                                <div>
                                    <h4 className="font-bold text-[#2E1A12] text-[14px] font-serif">Kavindi Fernando</h4>
                                    <span className="text-[9px] text-[#C8843B] font-bold uppercase tracking-wider">Food Blogger</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Write a Review CTA */}
                <div className="mt-8 flex justify-center px-4">
                    <div className="bg-white/80 backdrop-blur-xl rounded-full p-2 pr-6 shadow-[0_10px_30px_rgba(46,26,18,0.05)] border border-[#f0e6d8] flex flex-col sm:flex-row items-center gap-4 sm:gap-6 transform transition-all duration-300 hover:shadow-[0_15px_40px_rgba(46,26,18,0.08)]">
                        <button className="w-full sm:w-auto bg-gradient-to-r from-[#2E1A12] to-[#3a2217] text-white py-3 px-8 rounded-full font-medium text-[13px] hover:shadow-lg hover:shadow-[#2E1A12]/30 transition-all duration-300 flex items-center justify-center gap-2">
                            Write a Review <Sparkles className="w-4 h-4 text-[#C8843B]" />
                        </button>
                        <div className="flex items-center gap-3 pb-2 sm:pb-0">
                            <span className="font-bold text-[#2E1A12] text-[13px] hidden sm:block">Enjoyed our food?</span>
                            <div className="flex gap-1.5 cursor-pointer">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star 
                                        key={star}
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHover(star)}
                                        onMouseLeave={() => setHover(0)}
                                        className={`w-6 h-6 sm:w-5 sm:h-5 transition-all duration-300 transform hover:scale-110 ${
                                            star <= (hover || rating) 
                                                ? 'text-[#F5A623] fill-current' 
                                                : 'text-gray-200'
                                        }`} 
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#2E1A12] text-[#fef9e1] pt-12 pb-6">
                <div className="max-w-[1400px] mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 mb-10">
                        {/* Brand Column */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <img src="/images/logo.png" alt="Wijayasiri Logo" className="w-10 h-10 lg:w-12 lg:h-12 rounded-full shadow-sm bg-white object-contain" />
                                <div className="flex flex-col justify-center">
                                    <span className="text-lg font-bold text-white leading-none tracking-tight font-serif">Smart Bake Hub</span>
                                    <span className="text-[8px] font-semibold text-[#C8843B] uppercase tracking-widest mt-1.5">WIJAYASIRI FRESH FOOD</span>
                                </div>
                            </div>
                            <p className="text-xs text-gray-300 leading-relaxed">
                                Experience the finest bakery items, meals, and beverages with our smart self-service and event management system.
                            </p>
                            <div className="flex items-center gap-3 mt-1">
                                <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#C8843B] transition-colors">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                                </a>
                                <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#C8843B] transition-colors">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                                </a>
                                <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#C8843B] transition-colors">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-base font-bold font-serif text-white">Quick Links</h3>
                            <div className="flex flex-col gap-2 text-xs text-gray-300">
                                <Link to="/" className="hover:text-[#C8843B] transition-colors w-fit">Home</Link>
                                <Link to="/menu" className="hover:text-[#C8843B] transition-colors w-fit">Our Menu</Link>
                                <Link to="/events" className="hover:text-[#C8843B] transition-colors w-fit">Events & Booking</Link>
                                <Link to="/about" className="hover:text-[#C8843B] transition-colors w-fit">About Us</Link>
                                <Link to="/contact" className="hover:text-[#C8843B] transition-colors w-fit">Contact Us</Link>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-base font-bold font-serif text-white">Contact Us</h3>
                            <div className="flex flex-col gap-3 text-xs text-gray-300">
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-4 h-4 text-[#C8843B] shrink-0" />
                                    <span>123 Bakery Street, Colombo 03, Sri Lanka</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="w-4 h-4 text-[#C8843B] shrink-0" />
                                    <span>076 123 4567</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Mail className="w-4 h-4 text-[#C8843B] shrink-0" />
                                    <span>info@wijayasiri.com</span>
                                </div>
                            </div>
                        </div>

                        {/* Opening Hours */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-base font-bold font-serif text-white">Opening Hours</h3>
                            <div className="flex flex-col gap-2 text-xs text-gray-300">
                                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                                    <span>Monday - Friday</span>
                                    <span className="text-[#C8843B] font-medium">8:00 AM - 10:00 PM</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                                    <span>Saturday</span>
                                    <span className="text-[#C8843B] font-medium">9:00 AM - 11:00 PM</span>
                                </div>
                                <div className="flex justify-between items-center pb-2">
                                    <span>Sunday</span>
                                    <span className="text-[#C8843B] font-medium">9:00 AM - 8:00 PM</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-gray-400">
                        <p>© {new Date().getFullYear()} Wijayasiri Fresh Food (PVT) LTD. All rights reserved.</p>
                        <div className="flex items-center gap-6">
                            <Link to="/privacy" className="hover:text-[#C8843B] transition-colors">Privacy Policy</Link>
                            <Link to="/terms" className="hover:text-[#C8843B] transition-colors">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
