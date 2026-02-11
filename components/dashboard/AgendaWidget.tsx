'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, ChevronRight } from 'lucide-react';

interface Agenda {
    id: string;
    title: string;
    time: string;
    location: string;
    organizer: string;
    status: 'ongoing' | 'upcoming' | 'done';
}

import { useState, useEffect } from 'react';

const statusStyles = {
    done: { label: 'Selesai', bg: 'bg-gray-100', text: 'text-gray-600' },
    ongoing: { label: 'Berlangsung', bg: 'bg-green-100', text: 'text-green-600' },
    upcoming: { label: 'Akan Datang', bg: 'bg-blue-100', text: 'text-blue-600' },
};

export default function AgendaWidget() {
    const [todayAgenda, setTodayAgenda] = useState<Agenda[]>([]);

    useEffect(() => {
        async function fetchAgenda() {
            try {
                const res = await fetch('/api/dashboard/stats');
                const json = await res.json();
                if (json.success) {
                    setTodayAgenda(json.data.agenda);
                }
            } catch (error) {
                console.error('Failed to fetch agenda:', error);
            }
        }
        fetchAgenda();
    }, []);
    const today = new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-card"
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">Agenda Hari Ini</h3>
                        <p className="text-sm text-gray-500">{today}</p>
                    </div>
                </div>
                <span className="bg-primary-100 text-primary-600 text-xs font-medium px-3 py-1 rounded-full">
                    {todayAgenda.length} Agenda
                </span>
            </div>

            <div className="space-y-4">
                {todayAgenda.map((agenda, index) => {
                    const status = statusStyles[agenda.status];

                    return (
                        <motion.div
                            key={agenda.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 * index }}
                            className={`p-4 rounded-xl border-l-4 ${agenda.status === 'ongoing'
                                ? 'border-l-green-500 bg-green-50/50'
                                : agenda.status === 'upcoming'
                                    ? 'border-l-blue-500 bg-blue-50/50'
                                    : 'border-l-gray-300 bg-gray-50/50'
                                } hover:shadow-md transition-shadow cursor-pointer group`}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${status.bg} ${status.text}`}>
                                            {status.label}
                                        </span>
                                    </div>
                                    <h4 className="font-medium text-gray-800 group-hover:text-primary-600 transition-colors">
                                        {agenda.title}
                                    </h4>
                                    <div className="mt-3 space-y-1">
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Clock size={14} />
                                            <span>{agenda.time}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <MapPin size={14} />
                                            <span>{agenda.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Users size={14} />
                                            <span>{agenda.organizer}</span>
                                        </div>
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {todayAgenda.length === 0 && (
                <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">Tidak ada agenda hari ini</p>
                </div>
            )}
        </motion.div>
    );
}
