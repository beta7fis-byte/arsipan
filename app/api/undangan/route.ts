import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET - Fetch all undangan
export async function GET() {
    try {
        const data = await prisma.undangan.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Error fetching undangan:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch data' },
            { status: 500 }
        );
    }
}

// POST - Create new undangan
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const newUndangan = await prisma.undangan.create({
            data: {
                noSurat: body.noSurat,
                tanggalAcara: body.tanggalAcara,
                waktuAcara: body.waktuAcara,
                tempat: body.tempat,
                pengirim: body.pengirim,
                perihal: body.perihal,
                status: body.status || 'Pending',
                fileUrl: body.fileUrl || null,
                createdBy: body.createdBy || 'Admin',
            },
        });

        return NextResponse.json({ success: true, data: newUndangan });
    } catch (error) {
        console.error('Error creating undangan:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create data' },
            { status: 500 }
        );
    }
}

// PUT - Update undangan
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

        const updated = await prisma.undangan.update({
            where: { id },
            data: updateData,
        });

        return NextResponse.json({ success: true, data: updated });
    } catch (error) {
        console.error('Error updating undangan:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update data' },
            { status: 500 }
        );
    }
}

// DELETE - Delete undangan
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

        await prisma.undangan.delete({
            where: { id },
        });

        return NextResponse.json({ success: true, message: 'Deleted successfully' });
    } catch (error) {
        console.error('Error deleting undangan:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete data' },
            { status: 500 }
        );
    }
}
