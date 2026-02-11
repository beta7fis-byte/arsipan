'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { motion } from 'framer-motion';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
            <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

            <motion.main
                initial={false}
                animate={{
                    marginLeft: isCollapsed ? 80 : 280,
                }}
                transition={{ duration: 0.3 }}
                className="min-h-screen transition-all duration-300 lg:ml-0"
            >
                {children}
            </motion.main>
        </div>
    );
}
