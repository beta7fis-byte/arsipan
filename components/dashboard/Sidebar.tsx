'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Mail,
    Send,
    Calendar,
    Settings,
    LogOut,
    ChevronLeft,
    Building2,
    Menu,
    X,
    User
} from 'lucide-react';

interface SidebarProps {
    isCollapsed: boolean;
    setIsCollapsed: (value: boolean) => void;
}

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: Mail, label: 'Surat Masuk', href: '/dashboard/surat-masuk' },
    { icon: Send, label: 'Surat Keluar', href: '/dashboard/surat-keluar' },
    { icon: Calendar, label: 'Undangan', href: '/dashboard/undangan' },
    { icon: Settings, label: 'Pengaturan', href: '/dashboard/settings' },
];

export default function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
    const pathname = usePathname();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const handleLogout = () => {
        // In production, this would call the logout API
        window.location.href = '/';
    };

    const SidebarContent = () => (
        <>
            {/* Logo */}
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-4 py-6 border-b border-gray-100`}>
                <Link href="/dashboard" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md overflow-hidden p-1">
                        <img src="/logo-kalsel.png" alt="Logo Kalsel" className="w-full h-full object-contain" />
                    </div>
                    <AnimatePresence>
                        {!isCollapsed && (
                            <motion.div
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: 'auto' }}
                                exit={{ opacity: 0, width: 0 }}
                                className="overflow-hidden"
                            >
                                <h1 className="font-bold text-gray-800 whitespace-nowrap">Pencatatan Arsip Surat</h1>
                                <p className="text-xs text-gray-500 whitespace-nowrap">Bidang Gatrik</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Link>

                {/* Collapse Button - Desktop */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="hidden lg:flex w-8 h-8 items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                >
                    <ChevronLeft
                        size={18}
                        className={`text-gray-400 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
                    />
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`sidebar-link ${isActive ? 'active' : ''} ${isCollapsed ? 'justify-center px-3' : ''}`}
                            onClick={() => setIsMobileOpen(false)}
                        >
                            <item.icon size={20} />
                            <AnimatePresence>
                                {!isCollapsed && (
                                    <motion.span
                                        initial={{ opacity: 0, width: 0 }}
                                        animate={{ opacity: 1, width: 'auto' }}
                                        exit={{ opacity: 0, width: 0 }}
                                        className="whitespace-nowrap overflow-hidden"
                                    >
                                        {item.label}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </Link>
                    );
                })}
            </nav>

            {/* User Info & Logout */}
            <div className="border-t border-gray-100 p-4">
                <div className={`flex items-center gap-3 mb-4 ${isCollapsed ? 'justify-center' : ''}`}>
                    <div className="w-10 h-10 bg-gradient-to-br from-accent-400 to-accent-500 rounded-full flex items-center justify-center shadow-md">
                        <User size={18} className="text-white" />
                    </div>
                    <AnimatePresence>
                        {!isCollapsed && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <p className="font-medium text-gray-800 text-sm">Staff Bidang Gatrik</p>
                                <p className="text-xs text-gray-500">Pencatat Arsip</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <button
                    onClick={handleLogout}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors ${isCollapsed ? 'justify-center px-3' : ''}`}
                >
                    <LogOut size={20} />
                    <AnimatePresence>
                        {!isCollapsed && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="whitespace-nowrap"
                            >
                                Keluar
                            </motion.span>
                        )}
                    </AnimatePresence>
                </button>
            </div>
        </>
    );

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center"
            >
                {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Mobile Overlay */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMobileOpen(false)}
                        className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    />
                )}
            </AnimatePresence>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.aside
                        initial={{ x: -280 }}
                        animate={{ x: 0 }}
                        exit={{ x: -280 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="lg:hidden fixed top-0 left-0 h-screen w-[280px] bg-white shadow-2xl z-50 flex flex-col"
                    >
                        <SidebarContent />
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Desktop Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: isCollapsed ? 80 : 280 }}
                transition={{ duration: 0.3 }}
                className="hidden lg:flex h-screen bg-white shadow-lg flex-col fixed left-0 top-0 z-30"
            >
                <SidebarContent />
            </motion.aside>
        </>
    );
}
