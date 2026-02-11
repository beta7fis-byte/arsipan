'use client';

import { motion } from 'framer-motion';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';

// Data chart - akan diisi dari database
const chartData: { month: string; suratMasuk: number; suratKeluar: number; undangan: number }[] = [];


const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                <p className="font-semibold text-gray-800 mb-2">{label}</p>
                {payload.map((entry: any, index: number) => (
                    <p key={index} className="text-sm" style={{ color: entry.color }}>
                        {entry.name}: {entry.value}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

export default function ActivityChart() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-card"
        >
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">Aktivitas Surat</h3>
                    <p className="text-sm text-gray-500">Statistik per bulan tahun 2026</p>
                </div>
                <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option>Tahun 2026</option>
                    <option>Tahun 2025</option>
                    <option>Tahun 2024</option>
                </select>
            </div>

            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} barGap={4} barCategoryGap={20}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend
                            wrapperStyle={{ paddingTop: '20px' }}
                            iconType="circle"
                            formatter={(value) => (
                                <span className="text-sm text-gray-600">{value}</span>
                            )}
                        />
                        <Bar
                            dataKey="suratMasuk"
                            name="Surat Masuk"
                            fill="#3b82f6"
                            radius={[4, 4, 0, 0]}
                        />
                        <Bar
                            dataKey="suratKeluar"
                            name="Surat Keluar"
                            fill="#10b981"
                            radius={[4, 4, 0, 0]}
                        />
                        <Bar
                            dataKey="undangan"
                            name="Undangan"
                            fill="#f59e0b"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
}
