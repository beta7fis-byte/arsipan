'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar } from 'lucide-react';

interface HeaderProps {
    title: string;
    subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const today = new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    return (
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-20">
            <div className="flex items-center justify-between px-6 py-4">
                {/* Left Side - Title */}
                <div>
                    <motion.h1
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-2xl font-bold text-gray-800"
                    >
                        {title}
                    </motion.h1>
                    {subtitle && (
                        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
                    )}
                </div>

                {/* Right Side - Actions */}
                <div className="flex items-center gap-4">
                    {/* Date Display */}
                    <div className="hidden md:flex items-center gap-2 text-gray-500 text-sm bg-gray-50 px-4 py-2 rounded-xl">
                        <Calendar size={16} />
                        <span suppressHydrationWarning>{today}</span>
                    </div>

                    {/* Search Button */}
                    <div className="relative">
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
                        >
                            <Search size={20} />
                        </button>

                        {/* Search Dropdown */}
                        {isSearchOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 p-4"
                            >
                                <input
                                    type="text"
                                    placeholder="Cari surat, undangan..."
                                    className="input-field"
                                    autoFocus
                                />
                                <div className="mt-3 text-xs text-gray-400">
                                    Tekan Enter untuk mencari
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
