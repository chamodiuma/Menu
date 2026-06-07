import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { Lock, Mail, User as UserIcon, ChevronRight, Shield, Briefcase, ArrowLeft } from 'lucide-react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState('customer');
    
    const { login } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post('/auth/register', { name, email, password, role: selectedRole });
            login(data);
            toast.success(`Registered successfully as ${selectedRole}`);
            
            if (data.role === 'admin' || data.role === 'staff') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
        }
    };

    const roles = [
        { id: 'customer', label: 'Customer', icon: UserIcon },
        { id: 'staff', label: 'Staff', icon: Briefcase },
        { id: 'admin', label: 'Admin', icon: Shield },
    ];

    return (
        <div className="min-h-screen flex flex-col lg:flex-row relative overflow-hidden font-sans text-[#4A3C31]">
            {/* Full Screen Background Image */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <img 
                    src="/images/auth_bakery_basket.png" 
                    alt="Bakery Background" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#F4EFE6]/30"></div>
                {/* Gradient for text readability on left side */}
                <div className="absolute inset-y-0 left-0 w-full lg:w-[60%] bg-gradient-to-r from-[#F4EFE6]/90 via-[#F4EFE6]/60 to-transparent"></div>
            </div>

            {/* Left Side: Branding & Imagery */}
            <div className="w-full lg:w-[55%] flex flex-col relative z-10 min-h-[50vh] lg:min-h-screen px-8 pb-8 pt-4 lg:px-16 lg:pb-16 lg:pt-8">
                {/* Logo */}
                <div className="flex items-center gap-3 lg:gap-4 mb-6">
                    <img src="/images/logo.png" alt="Wijayasiri Logo" className="w-12 h-12 lg:w-14 lg:h-14 rounded-full shadow-sm bg-white object-contain" />
                    <div className="flex flex-col justify-center">
                        <span className="text-2xl lg:text-[28px] font-bold text-[#4A3C31] leading-none tracking-tight font-serif">Smart Bake Hub</span>
                        <span className="text-[9px] lg:text-[10px] font-semibold text-[#A67B5B] uppercase tracking-widest mt-1.5">WIJAYASIRI FRESH FOOD (PVT) LTD.</span>
                    </div>
                </div>

                {/* Back to Home Link */}
                <div className="mb-12 lg:mb-16">
                    <Link to="/" className="inline-flex items-center gap-2 text-sm lg:text-[15px] font-medium text-[#4A3C31] hover:text-[#A67B5B] transition-colors border border-transparent hover:border-[#A67B5B]/30 bg-white/40 hover:bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm w-max">
                        <ArrowLeft className="w-4 h-4 lg:w-5 lg:h-5" strokeWidth={2} /> Back to Home
                    </Link>
                </div>

                {/* Typography */}
                <div className="max-w-lg mb-8 relative z-20">
                    <h1 className="text-5xl lg:text-[4rem] font-bold text-[#4A3C31] leading-[1.1] mb-4 font-serif">
                        Freshly Baked.<br />
                        <span className="text-[#A67B5B]">Smartly Served.</span>
                    </h1>
                    
                    {/* Decorative Divider SVG */}
                    <div className="flex items-center gap-4 my-6">
                        <div className="h-[1px] w-12 bg-[#A67B5B]/40"></div>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#A67B5B] opacity-80" stroke="currentColor" strokeWidth="1.5">
                            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" strokeOpacity="0.2"/>
                            <path d="M8 12c1.5-1 3-1 4.5 0s3 1 4.5 0" />
                            <path d="M12 8v4" />
                        </svg>
                        <div className="h-[1px] w-12 bg-[#A67B5B]/40"></div>
                    </div>

                    <p className="text-[15px] text-[#4A3C31]/85 font-light leading-relaxed max-w-sm">
                        Join Smart Bake Hub. Scan, order and enjoy delicious bakery items, meals, beverages and cakes with a smart self-service experience.
                    </p>
                </div>
            </div>

            {/* Right Side: Form Container */}
            <div className="w-full lg:w-[45%] flex flex-col items-center justify-center p-6 lg:p-12 relative z-10" style={{ perspective: '1000px' }}>
                {/* Background Shapes */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white rounded-full blur-3xl opacity-60 -translate-y-1/4 translate-x-1/4 pointer-events-none"></div>
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#E8DCC8] rounded-full blur-3xl opacity-50 translate-y-1/4 pointer-events-none"></div>

                <div className="w-full max-w-[420px] bg-[#FFFCF9] rounded-[40px] shadow-[0_20px_40px_rgba(74,60,49,0.05)] p-10 lg:p-12 relative z-20 border border-white animate-float-3d">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-[#4A3C31] tracking-tight font-serif mb-3">
                            Create an Account
                        </h2>
                        {/* Center Divider */}
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="h-[1px] w-8 bg-[#A67B5B]/30"></div>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#A67B5B]" stroke="currentColor" strokeWidth="2">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                            </svg>
                            <div className="h-[1px] w-8 bg-[#A67B5B]/30"></div>
                        </div>
                        <p className="text-sm text-gray-500">
                            Join us to continue your experience
                        </p>
                    </div>

                    {/* Role Tabs */}
                    <div className="flex bg-[#FAFAFA] p-1 rounded-2xl border border-gray-200 mb-6">
                        {roles.map((r) => {
                            const Icon = r.icon;
                            const isActive = selectedRole === r.id;
                            return (
                                <button
                                    key={r.id}
                                    type="button"
                                    onClick={() => setSelectedRole(r.id)}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs lg:text-sm font-semibold rounded-xl capitalize transition-all duration-300 ${isActive ? 'bg-white text-[#4A3C31] shadow-sm border border-gray-100' : 'text-gray-400 hover:text-[#4A3C31]'}`}
                                >
                                    <Icon className={`w-3.5 h-3.5 lg:w-4 lg:h-4 ${isActive ? 'text-[#A67B5B]' : 'text-gray-400'}`} />
                                    {r.label}
                                </button>
                            );
                        })}
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <UserIcon className="h-5 w-5 text-gray-400 group-focus-within:text-[#A67B5B] transition-colors" strokeWidth={1.5} />
                                </div>
                                <input
                                    type="text" required
                                    className="block w-full pl-11 pr-4 py-3.5 bg-[#FAFAFA] border border-gray-200 rounded-xl text-[#4A3C31] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#A67B5B] focus:border-[#A67B5B] transition-all text-sm"
                                    placeholder="Full Name"
                                    value={name} onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-[#A67B5B] transition-colors" strokeWidth={1.5} />
                                </div>
                                <input
                                    type="email" required
                                    className="block w-full pl-11 pr-4 py-3.5 bg-[#FAFAFA] border border-gray-200 rounded-xl text-[#4A3C31] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#A67B5B] focus:border-[#A67B5B] transition-all text-sm"
                                    placeholder="Email Address"
                                    value={email} onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-[#A67B5B] transition-colors" strokeWidth={1.5} />
                                </div>
                                <input
                                    type="password" required
                                    className="block w-full pl-11 pr-12 py-3.5 bg-[#FAFAFA] border border-gray-200 rounded-xl text-[#4A3C31] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#A67B5B] focus:border-[#A67B5B] transition-all text-sm"
                                    placeholder="Password"
                                    value={password} onChange={(e) => setPassword(e.target.value)}
                                />
                                <div className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer">
                                    <svg className="h-4 w-4 text-gray-400 hover:text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"/></svg>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-4 flex justify-center py-4 px-4 text-sm font-semibold rounded-xl text-white bg-[#3D291F] hover:bg-[#2E1A12] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3D291F] transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            Sign Up
                        </button>
                    </form>

                    <div className="relative my-8 flex items-center justify-center">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <span className="relative bg-[#FFFCF9] px-4 text-[11px] font-medium text-gray-400 uppercase tracking-wider">
                            or continue with
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-3 hover:bg-gray-50 transition-colors">
                            <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                            <span className="text-sm font-semibold text-[#4A3C31]">Google</span>
                        </button>
                        <button className="flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-3 hover:bg-gray-50 transition-colors">
                            <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                            <span className="text-sm font-semibold text-[#4A3C31]">Facebook</span>
                        </button>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-500">
                            Already have an account?{' '}
                            <Link to="/login" className="font-semibold text-[#A67B5B] hover:text-[#8c5e35] transition-colors">
                                Log in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
