import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET - Fetch all surat masuk
export async function GET() {
    try {
        const data = await prisma.suratMasuk.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Error fetching surat masuk:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch data' },
            { status: 500 }
        );
    }
}

// POST - Create new surat masuk
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const newSurat = await prisma.suratMasuk.create({
            data: {
                noSurat: body.noSurat,
                tanggalSurat: body.tanggalSurat,
                tanggalTerima: body.tanggalTerima || new Date().toISOString().split('T')[0],
                pengirim: body.pengirim,
                perihal: body.perihal,
                sifat: body.sifat || 'Biasa',
                klasifikasi: body.klasifikasi || null,
                fileUrl: body.fileUrl || null,
                createdBy: body.createdBy || 'Admin',
            },
        });

        return NextResponse.json({ success: true, data: newSurat });
    } catch (error) {
        console.error('Error creating surat masuk:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create data' },
            { status: 500 }
        );
    }
}

// PUT - Update surat masuk
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, ...updateData } = body;

        if (!id) {
            return NextResponse.json(
                { success: false, error: 'ID is required' },
                { status: 400 }
            );
        }

        const updated = await prisma.suratMasuk.update({
            where: { id },
            data: updateData,
        });

        return NextResponse.json({ success: true, data: updated });
    } catch (error) {
        console.error('Error updating surat masuk:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update data' },
            { status: 500 }
        );
    }
}

// DELETE - Delete surat masuk
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { success: false, error: 'ID is required' },
                { status: 400 }
            );
        }

        await prisma.suratMasuk.delete({
            where: { id },
        });

        return NextResponse.json({ success: true, message: 'Deleted successfully' });
    } catch (error) {
        console.error('Error deleting surat masuk:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete data' },
            { status: 500 }
        );
    }
}
