import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'Pencatatan Arsip Surat - ESDM Kalsel',
    description: 'Sistem Arsip Digital Dinas Energi dan Sumber Daya Mineral Provinsi Kalimantan Selatan',
    keywords: ['arsip', 'esdm', 'kalsel', 'surat', 'digital'],
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="id">
            <body className="antialiased">
                {children}
            </body>
        </html>
    )
}
