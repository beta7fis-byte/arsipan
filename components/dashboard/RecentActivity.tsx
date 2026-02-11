'use client';

import { motion } from 'framer-motion';
import { Mail, Send, Calendar, FileText, Clock } from 'lucide-react';
import { getRelativeTime } from '@/lib/utils';

interface Activity {
    id: string;
    type: 'masuk' | 'keluar' | 'undangan';
    title: string;
    description: string;
    timestamp: string;
    user: string;
}

import { useState, useEffect } from 'react';

const iconMap = {
    masuk: { icon: Mail, color: 'text-blue-500', bg: 'bg-blue-100' },
    keluar: { icon: Send, color: 'text-emerald-500', bg: 'bg-emerald-100' },
    undangan: { icon: Calendar, color: 'text-amber-500', bg: 'bg-amber-100' },
};

export default function RecentActivity() {
    const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchActivity() {
            try {
                const res = await fetch('/api/dashboard/stats');
                const json = await res.json();
                if (json.success) {
                    setRecentActivities(json.data.activities);
                }
            } catch (error) {
                console.error('Failed to fetch activities:', error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchActivity();
    }, []);
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-card"
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                        <Clock className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">Aktivitas Terbaru</h3>
                        <p className="text-sm text-gray-500">5 surat terakhir diinput</p>
                    </div>
                </div>
                <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                    Lihat Semua
                </button>
            </div>

            <div className="space-y-4">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-12 gap-3">
                        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                        <p className="text-sm text-gray-500 font-medium">Memuat aktivitas...</p>
                    </div>
                ) : recentActivities.length === 0 ? (
                    <div className="text-center py-8 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
                        <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 font-medium">Belum ada aktivitas terbaru</p>
                        <p className="text-xs text-gray-400 mt-1">Input data untuk melihat riwayat di sini</p>
                    </div>
                ) : (
                    recentActivities.map((activity, index) => {
                        const IconConfig = iconMap[activity.type] || iconMap.masuk;
                        const Icon = IconConfig.icon;

                        return (
                            <motion.div
                                key={activity.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 * index }}
                                className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group"
                            >
                                <div className={`w-10 h-10 ${IconConfig.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                                    <Icon className={`w-5 h-5 ${IconConfig.color}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-gray-800 text-sm truncate group-hover:text-primary-600 transition-colors">
                                        {activity.title}
                                    </p>
                                    <p className="text-gray-500 text-xs mt-1 truncate">{activity.description}</p>
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <p className="text-xs text-gray-400">{getRelativeTime(activity.timestamp)}</p>
                                    <p className="text-xs text-gray-500 mt-1">{activity.user}</p>
                                </div>
                            </motion.div>
                        );
                    })
                )}
            </div>
        </motion.div>
    );
}
