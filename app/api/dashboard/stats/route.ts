import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        const [suratMasukCount, suratKeluarCount, undanganCount, totalArsip] = await Promise.all([
            prisma.suratMasuk.count({
                where: {
                    createdAt: {
                        gte: firstDayOfMonth,
                    },
                },
            }),
            prisma.suratKeluar.count({
                where: {
                    createdAt: {
                        gte: firstDayOfMonth,
                    },
                },
            }),
            prisma.undangan.count({
                where: {
                    createdAt: {
                        gte: firstDayOfMonth,
                    },
                },
            }),
            Promise.resolve(0).then(async () => {
                const sm = await prisma.suratMasuk.count();
                const sk = await prisma.suratKeluar.count();
                const un = await prisma.undangan.count();
                return sm + sk + un;
            })
        ]);

        // Get latest 5 activities
        const [latestSM, latestSK, latestUN] = await Promise.all([
            prisma.suratMasuk.findMany({ take: 5, orderBy: { createdAt: 'desc' } }),
            prisma.suratKeluar.findMany({ take: 5, orderBy: { createdAt: 'desc' } }),
            prisma.undangan.findMany({ take: 5, orderBy: { createdAt: 'desc' } }),
        ]);

        const activities = [
            ...latestSM.map(item => ({ id: item.id, type: 'masuk', title: item.noSurat, description: item.perihal, timestamp: item.createdAt, user: item.createdBy })),
            ...latestSK.map(item => ({ id: item.id, type: 'keluar', title: item.noSurat, description: item.perihal, timestamp: item.createdAt, user: item.createdBy })),
            ...latestUN.map(item => ({ id: item.id, type: 'undangan', title: item.noSurat, description: item.perihal, timestamp: item.createdAt, user: item.createdBy })),
        ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 5);

        // Get today's agenda
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

        const agenda = await prisma.undangan.findMany({
            where: {
                tanggalAcara: {
                    gte: startOfToday.toISOString().split('T')[0],
                    lte: endOfToday.toISOString().split('T')[0],
                },
            },
            take: 5,
            orderBy: { waktuAcara: 'asc' },
        });

        return NextResponse.json({
            success: true,
            data: {
                stats: {
                    suratMasukBulanIni: suratMasukCount,
                    suratKeluarBulanIni: suratKeluarCount,
                    undanganBulanIni: undanganCount,
                    totalArsip: totalArsip,
                },
                activities,
                agenda: agenda.map(item => ({
                    id: item.id,
                    title: item.perihal,
                    time: item.waktuAcara,
                    location: item.tempat,
                    organizer: item.pengirim,
                    status: 'upcoming' as const
                }))
            }
        });
    } catch (error) {
        console.error('Dashboard stats error:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch stats' }, { status: 500 });
    }
}
