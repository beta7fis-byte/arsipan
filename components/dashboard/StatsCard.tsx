'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface StatsCardProps {
    title: string;
    value: number | string;
    icon: ReactNode;
    change?: string;
    changeType?: 'up' | 'down' | 'neutral';
    color: 'blue' | 'green' | 'yellow' | 'purple';
    delay?: number;
}

const colorStyles = {
    blue: {
        bg: 'bg-gradient-to-br from-blue-500 to-blue-600',
        iconBg: 'bg-blue-400/30',
        light: 'bg-blue-50',
    },
    green: {
        bg: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
        iconBg: 'bg-emerald-400/30',
        light: 'bg-emerald-50',
    },
    yellow: {
        bg: 'bg-gradient-to-br from-amber-500 to-amber-600',
        iconBg: 'bg-amber-400/30',
        light: 'bg-amber-50',
    },
    purple: {
        bg: 'bg-gradient-to-br from-purple-500 to-purple-600',
        iconBg: 'bg-purple-400/30',
        light: 'bg-purple-50',
    },
};

// Format number consistently to avoid hydration mismatch
function formatNumber(value: number | string): string {
    if (typeof value === 'string') return value;
    return new Intl.NumberFormat('id-ID').format(value);
}

export default function StatsCard({
    title,
    value,
    icon,
    change,
    changeType = 'neutral',
    color,
    delay = 0,
}: StatsCardProps) {
    const styles = colorStyles[color];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className={`${styles.bg} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden`}
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-white rounded-full" />
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white rounded-full" />
            </div>

            <div className="relative z-10">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-white/80 mb-1">{title}</p>
                        <h3 className="text-3xl font-bold" suppressHydrationWarning>
                            {formatNumber(value)}
                        </h3>
                        {change && (
                            <div className="flex items-center gap-1 mt-2">
                                <span
                                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${changeType === 'up'
                                        ? 'bg-white/20 text-white'
                                        : changeType === 'down'
                                            ? 'bg-red-400/30 text-red-100'
                                            : 'bg-white/10 text-white/70'
                                        }`}
                                >
                                    {change}
                                </span>
                            </div>
                        )}
                    </div>
                    <div className={`w-12 h-12 ${styles.iconBg} rounded-xl flex items-center justify-center`}>
                        {icon}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
