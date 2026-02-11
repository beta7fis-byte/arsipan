'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/dashboard/Header';
import {
    Settings,
    User,
    Shield,
    Database,
    Bell,
    Palette,
    Save,
    Check
} from 'lucide-react';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('profile');
    const [isSaving, setIsSaving] = useState(false);
    const [showSaved, setShowSaved] = useState(false);

    // Appearance States
    const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
    const [pageSize, setPageSize] = useState<number>(10);

    const applyTheme = (newTheme: 'light' | 'dark' | 'system') => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');

        if (newTheme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            root.classList.add(systemTheme);
        } else {
            root.classList.add(newTheme);
        }
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system';
        const savedPageSize = localStorage.getItem('pageSize');

        if (savedTheme) {
            setTheme(savedTheme);
            applyTheme(savedTheme);
        }
        if (savedPageSize) {
            setPageSize(Number(savedPageSize));
        }
    }, []);

    const tabs = [
        { id: 'profile', label: 'Profil', icon: User },
        { id: 'security', label: 'Keamanan', icon: Shield },
        { id: 'database', label: 'Database', icon: Database },
        { id: 'notifications', label: 'Notifikasi', icon: Bell },
        { id: 'appearance', label: 'Tampilan', icon: Palette },
    ];

    const handleSave = async () => {
        setIsSaving(true);
        // Save to localStorage or database
        localStorage.setItem('theme', theme);
        localStorage.setItem('pageSize', pageSize.toString());

        applyTheme(theme);

        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsSaving(false);
        setShowSaved(true);
        setTimeout(() => setShowSaved(false), 2000);
    };

    return (
        <div className="min-h-screen">
            <Header title="Pengaturan" subtitle="Kelola pengaturan aplikasi" />

            <div className="p-6">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-card overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                            {/* Sidebar */}
                            <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-100 p-4">
                                <nav className="space-y-1">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === tab.id
                                                ? 'bg-primary-50 text-primary-600'
                                                : 'text-gray-600 hover:bg-gray-50'
                                                }`}
                                        >
                                            <tab.icon size={20} />
                                            <span className="font-medium">{tab.label}</span>
                                        </button>
                                    ))}
                                </nav>
                            </div>

                            {/* Content */}
                            <div className="flex-1 p-6">
                                {activeTab === 'profile' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="space-y-6"
                                    >
                                        <h3 className="text-lg font-semibold text-gray-800">Profil Pengguna</h3>

                                        <div className="flex items-center gap-4">
                                            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                                                A
                                            </div>
                                            <div>
                                                <button className="btn-secondary text-sm">Ganti Foto</button>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">Nama Lengkap</label>
                                                <input type="text" defaultValue="Admin User" className="input-field" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">Username</label>
                                                <input type="text" defaultValue="admin" className="input-field" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">Email</label>
                                                <input type="email" defaultValue="admin@esdm.kalselprov.go.id" className="input-field" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">Jabatan</label>
                                                <input type="text" defaultValue="Arsiparis" className="input-field" />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'security' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="space-y-6"
                                    >
                                        <h3 className="text-lg font-semibold text-gray-800">Keamanan Akun</h3>

                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">Password Saat Ini</label>
                                                <input type="password" className="input-field" placeholder="••••••••" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">Password Baru</label>
                                                <input type="password" className="input-field" placeholder="••••••••" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">Konfirmasi Password</label>
                                                <input type="password" className="input-field" placeholder="••••••••" />
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-gray-100">
                                            <h4 className="font-medium text-gray-800 mb-4">Sesi Aktif</h4>
                                            <div className="bg-gray-50 rounded-xl p-4">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="font-medium text-gray-800">Browser ini</p>
                                                        <p className="text-sm text-gray-500">Windows • Chrome • Aktif sekarang</p>
                                                    </div>
                                                    <span className="badge badge-success">Aktif</span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'database' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="space-y-6"
                                    >
                                        <h3 className="text-lg font-semibold text-gray-800">Koneksi Database</h3>

                                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                                            <p className="text-amber-800 text-sm">
                                                <strong>Info:</strong> Aplikasi ini menggunakan Google Sheets sebagai database.
                                                Pastikan Service Account sudah dikonfigurasi dengan benar.
                                            </p>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">Google Sheet ID</label>
                                                <input
                                                    type="text"
                                                    className="input-field font-mono text-sm"
                                                    placeholder="1ABC...xyz"
                                                    defaultValue="••••••••••••••••••••"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">Google Drive Folder ID</label>
                                                <input
                                                    type="text"
                                                    className="input-field font-mono text-sm"
                                                    placeholder="1DEF...abc"
                                                    defaultValue="••••••••••••••••••••"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                                            <div>
                                                <p className="font-medium text-gray-800">Status: Terhubung</p>
                                                <p className="text-sm text-gray-500">Terakhir sinkronisasi: 2 menit lalu</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'notifications' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="space-y-6"
                                    >
                                        <h3 className="text-lg font-semibold text-gray-800">Pengaturan Notifikasi</h3>

                                        <div className="space-y-4">
                                            {[
                                                { label: 'Surat Masuk Baru', desc: 'Notifikasi saat ada surat masuk baru', checked: true },
                                                { label: 'Undangan Hari Ini', desc: 'Pengingat agenda hari ini', checked: true },
                                                { label: 'Deadline Arsip', desc: 'Notifikasi batas waktu pengarsipan', checked: false },
                                                { label: 'Laporan Mingguan', desc: 'Email ringkasan aktivitas mingguan', checked: false },
                                            ].map((item, index) => (
                                                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                                    <div>
                                                        <p className="font-medium text-gray-800">{item.label}</p>
                                                        <p className="text-sm text-gray-500">{item.desc}</p>
                                                    </div>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input type="checkbox" defaultChecked={item.checked} className="sr-only peer" />
                                                        <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-primary-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'appearance' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="space-y-6"
                                    >
                                        <h3 className="text-lg font-semibold text-gray-800">Pengaturan Tampilan</h3>

                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">Tema</label>
                                                <div className="grid grid-cols-3 gap-4">
                                                    <button
                                                        onClick={() => setTheme('light')}
                                                        className={`p-4 border-2 rounded-xl bg-white transition-all ${theme === 'light' ? 'border-primary-500 ring-2 ring-primary-100' : 'border-gray-200 hover:border-gray-300'}`}
                                                    >
                                                        <div className="w-full h-8 bg-gray-100 rounded mb-2" />
                                                        <p className="text-sm font-medium text-center text-gray-800">Terang</p>
                                                    </button>
                                                    <button
                                                        onClick={() => setTheme('dark')}
                                                        className={`p-4 border-2 rounded-xl bg-gray-800 transition-all ${theme === 'dark' ? 'border-primary-500 ring-2 ring-primary-100' : 'border-gray-200 hover:border-gray-300'}`}
                                                    >
                                                        <div className="w-full h-8 bg-gray-700 rounded mb-2" />
                                                        <p className="text-sm font-medium text-center text-white">Gelap</p>
                                                    </button>
                                                    <button
                                                        onClick={() => setTheme('system')}
                                                        className={`p-4 border-2 rounded-xl bg-gradient-to-br from-white to-gray-800 transition-all ${theme === 'system' ? 'border-primary-500 ring-2 ring-primary-100' : 'border-gray-200 hover:border-gray-300'}`}
                                                    >
                                                        <div className="w-full h-8 bg-gradient-to-r from-gray-100 to-gray-700 rounded mb-2" />
                                                        <p className="text-sm font-medium text-center text-gray-800">Sistem</p>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">Ukuran Tabel</label>
                                                <select
                                                    value={pageSize}
                                                    onChange={(e) => setPageSize(Number(e.target.value))}
                                                    className="input-field"
                                                >
                                                    <option value={10}>10 baris per halaman</option>
                                                    <option value={25}>25 baris per halaman</option>
                                                    <option value={50}>50 baris per halaman</option>
                                                </select>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Save Button */}
                                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-end gap-4">
                                    {showSaved && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="flex items-center gap-2 text-green-600"
                                        >
                                            <Check size={18} />
                                            <span className="text-sm font-medium">Tersimpan!</span>
                                        </motion.div>
                                    )}
                                    <button onClick={handleSave} disabled={isSaving} className="btn-primary flex items-center gap-2">
                                        {isSaving ? (
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            <Save size={18} />
                                        )}
                                        <span>{isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
