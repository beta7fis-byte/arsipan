'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, LogIn, Building2, FileText, Sparkles } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Demo login - in production, this would call the API
        setTimeout(() => {
            if (formData.username === 'admin' && formData.password === 'admin123') {
                router.push('/dashboard');
            } else if (formData.username === 'staff' && formData.password === 'staff123') {
                router.push('/dashboard');
            } else {
                setError('Username atau password salah');
                setIsLoading(false);
            }
        }, 1500);
    };

    return (
        <div className="min-h-screen flex login-pattern">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-primary-400/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-400/20 rounded-full blur-3xl" />
                    <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        {/* Logo */}
                        <div className="mb-8 flex justify-center">
                            <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center border border-white/20 shadow-2xl p-2">
                                <Image src="/logo-kalsel.png" alt="Logo Kalsel" width={80} height={80} className="w-full h-full object-contain" />
                            </div>
                        </div>

                        <h1 className="text-4xl font-bold mb-4">
                            Pencatatan Arsip Surat
                        </h1>
                        <h2 className="text-xl font-medium text-primary-200 mb-6">
                            Provinsi Kalimantan Selatan
                        </h2>

                        <p className="text-primary-200 max-w-md mx-auto leading-relaxed">
                            Sistem Pencatatan Surat dan Arsip untuk mengelola surat masuk, surat keluar,
                            dan undangan secara efisien dan terorganisir.
                        </p>

                        {/* Feature Cards */}
                        <div className="mt-12 grid grid-cols-3 gap-4 max-w-lg mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                            >
                                <FileText className="w-8 h-8 mb-2 text-accent-400" />
                                <p className="text-sm font-medium">Surat Masuk</p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                            >
                                <Mail className="w-8 h-8 mb-2 text-accent-400" />
                                <p className="text-sm font-medium">Surat Keluar</p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                            >
                                <Sparkles className="w-8 h-8 mb-2 text-accent-400" />
                                <p className="text-sm font-medium">Undangan</p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md"
                >
                    {/* Mobile Logo */}
                    <div className="lg:hidden text-center mb-8">
                        <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg p-2">
                            <Image src="/logo-kalsel.png" alt="Logo Kalsel" width={64} height={64} className="w-full h-full object-contain" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800">Pencatatan Arsip Surat</h1>
                        <p className="text-gray-500">Provinsi Kalimantan Selatan</p>
                    </div>

                    {/* Login Card */}
                    <div className="glass rounded-3xl p-8 shadow-glass">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Selamat Datang!</h2>
                            <p className="text-gray-500">Silakan masuk ke akun Anda</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Error Message */}
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center gap-2"
                                >
                                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                                    {error}
                                </motion.div>
                            )}

                            {/* Username Field */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Username</label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <Mail size={20} />
                                    </div>
                                    <input
                                        type="text"
                                        value={formData.username}
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                        className="input-field pl-12"
                                        placeholder="Masukkan username"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Password</label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <Lock size={20} />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="input-field pl-12 pr-12"
                                        placeholder="Masukkan password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                                    />
                                    <span className="text-sm text-gray-600">Ingat saya</span>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <LogIn size={20} />
                                        <span>Masuk</span>
                                    </>
                                )}
                            </button>
                        </form>

                    </div>

                    {/* Footer */}
                    <p className="text-center text-gray-400 text-sm mt-8">
                        © developed by Bidang Ketenagalistrikan Dinas ESDM Provinsi Kalimantan Selatan
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
