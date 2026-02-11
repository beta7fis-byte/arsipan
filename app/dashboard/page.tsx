'use client';

import { Mail, Send, Calendar, Archive } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/dashboard/Header';
import StatsCard from '@/components/dashboard/StatsCard';
import ActivityChart from '@/components/dashboard/ActivityChart';
import RecentActivity from '@/components/dashboard/RecentActivity';
import AgendaWidget from '@/components/dashboard/AgendaWidget';

export default function DashboardPage() {
    // Stats data - akan terupdate dari database
    const stats = {
        suratMasukBulanIni: 0,
        suratKeluarBulanIni: 0,
        undanganBulanIni: 0,
        totalArsip: 0,
    };

    return (
        <div className="min-h-screen">
            <Header
                title="Dashboard"
                subtitle="Selamat datang kembali! Berikut ringkasan aktivitas arsip."
            />

            <div className="p-6 space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatsCard
                        title="Surat Masuk"
                        value={stats.suratMasukBulanIni}
                        icon={<Mail className="w-6 h-6 text-white" />}
                        color="blue"
                        delay={0}
                    />
                    <StatsCard
                        title="Surat Keluar"
                        value={stats.suratKeluarBulanIni}
                        icon={<Send className="w-6 h-6 text-white" />}
                        color="green"
                        delay={0.1}
                    />
                    <StatsCard
                        title="Undangan"
                        value={stats.undanganBulanIni}
                        icon={<Calendar className="w-6 h-6 text-white" />}
                        color="yellow"
                        delay={0.2}
                    />
                    <StatsCard
                        title="Total Arsip"
                        value={stats.totalArsip}
                        icon={<Archive className="w-6 h-6 text-white" />}
                        color="purple"
                        delay={0.3}
                    />
                </div>

                {/* Chart and Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <ActivityChart />
                    </div>
                    <div className="lg:col-span-1">
                        <RecentActivity />
                    </div>
                </div>

                {/* Agenda Widget */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <AgendaWidget />

                    {/* Quick Actions Card */}
                    <div className="bg-white rounded-2xl p-6 shadow-card">
                        <h3 className="text-lg font-semibold text-gray-800 mb-6">Aksi Cepat</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Link
                                href="/dashboard/surat-masuk/new"
                                className="flex flex-col items-center justify-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all group cursor-pointer"
                            >
                                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                    <Mail className="w-6 h-6 text-white" />
                                </div>
                                <span className="font-medium text-gray-700 text-sm text-center">Input Surat Masuk</span>
                            </Link>
                            <Link
                                href="/dashboard/surat-keluar/new"
                                className="flex flex-col items-center justify-center p-6 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 hover:from-emerald-100 hover:to-emerald-200 transition-all group cursor-pointer"
                            >
                                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                    <Send className="w-6 h-6 text-white" />
                                </div>
                                <span className="font-medium text-gray-700 text-sm text-center">Input Surat Keluar</span>
                            </Link>
                            <Link
                                href="/dashboard/undangan/new"
                                className="flex flex-col items-center justify-center p-6 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 hover:from-amber-100 hover:to-amber-200 transition-all group cursor-pointer"
                            >
                                <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                    <Calendar className="w-6 h-6 text-white" />
                                </div>
                                <span className="font-medium text-gray-700 text-sm text-center">Catat Undangan</span>
                            </Link>
                            <Link
                                href="/dashboard/surat-masuk"
                                className="flex flex-col items-center justify-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 transition-all group cursor-pointer"
                            >
                                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                    <Archive className="w-6 h-6 text-white" />
                                </div>
                                <span className="font-medium text-gray-700 text-sm text-center">Lihat Arsip</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
