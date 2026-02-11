import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

// POST - Upload file to Vercel Blob
export async function POST(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const filename = searchParams.get('filename');

        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { success: false, error: 'No file provided' },
                { status: 400 }
            );
        }

        // Check file size (max 10MB)
        const maxSize = 10 * 1024 * 1024;
        if (file.size > maxSize) {
            return NextResponse.json(
                { success: false, error: 'File size exceeds 10MB limit' },
                { status: 400 }
            );
        }

        // Upload to Vercel Blob
        const blob = await put(filename || file.name, file, {
            access: 'public',
        });

        return NextResponse.json({
            success: true,
            data: {
                fileName: file.name,
                fileUrl: blob.url,
            },
        });
    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to upload file' },
            { status: 500 }
        );
    }
}
