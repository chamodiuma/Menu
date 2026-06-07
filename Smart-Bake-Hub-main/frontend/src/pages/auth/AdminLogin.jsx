import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { Lock, Mail, ArrowLeft, Eye, EyeOff } from 'lucide-react';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post('/auth/login', { email, password });
            
            if (data.role !== 'admin' && data.role !== 'staff') {
                toast.error('Access denied. Admin portal only.');
                return;
            }
            
            login(data);
            toast.success('Welcome to the Admin Dashboard');
            navigate('/admin');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen bg-[#FAF7F2] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <img src="/images/logo.png" alt="Smart Bake Hub" className="w-20 h-20 rounded-full shadow-sm bg-white object-contain border-2 border-[#E8DCC8]" />
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-[#4A3C31] font-serif">
                    Smart Bake Hub
                </h2>
                <p className="mt-2 text-center text-sm text-[#A67B5B] font-medium tracking-wide uppercase">
                    Admin Portal
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-[#E8DCC8]/30">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-[#4A3C31]">
                                Email Address
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="block w-full pl-10 sm:text-sm border border-gray-200 rounded-xl py-3 bg-[#FAFAFA] text-[#4A3C31] focus:ring-[#A67B5B] focus:border-[#A67B5B] outline-none transition-colors"
                                    placeholder="admin@smartbakehub.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-[#4A3C31]">
                                Password
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    className="block w-full pl-10 pr-10 sm:text-sm border border-gray-200 rounded-xl py-3 bg-[#FAFAFA] text-[#4A3C31] focus:ring-[#A67B5B] focus:border-[#A67B5B] outline-none transition-colors"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-[#A67B5B] transition-colors" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400 hover:text-[#A67B5B] transition-colors" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-[#A67B5B] focus:ring-[#A67B5B] border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-[#4A3C31]">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-[#A67B5B] hover:text-[#8c5e35]">
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-[#4A3C31] hover:bg-[#3D291F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A67B5B] transition-colors"
                            >
                                Sign in to Dashboard
                            </button>
                        </div>
                    </form>
                </div>
                
                <div className="mt-8 text-center">
                    <button 
                        onClick={() => navigate('/')}
                        className="inline-flex items-center gap-2 text-sm font-medium text-[#A67B5B] hover:text-[#4A3C31] transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
