'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Filter, Download, Send } from 'lucide-react';
import Header from '@/components/dashboard/Header';
import DataTable from '@/components/ui/DataTable';
import Modal from '@/components/ui/Modal';
import SuratKeluarForm from '@/components/forms/SuratKeluarForm';
import { SuratKeluar } from '@/types';
import { formatDateShort, getSifatColor, truncateText, exportToCSV } from '@/lib/utils';

// Data surat keluar - akan diisi dari database
const initialSuratKeluar: SuratKeluar[] = [];

const columns = [
    {
        key: 'noSurat',
        label: 'Nomor Surat',
        sortable: true,
        render: (value: string) => (
            <span className="font-medium text-gray-800">{value}</span>
        ),
    },
    {
        key: 'tanggalSurat',
        label: 'Tanggal',
        sortable: true,
        width: '120px',
        render: (value: string) => (
            <span className="text-sm text-gray-600">{formatDateShort(value)}</span>
        ),
    },
    {
        key: 'penerima',
        label: 'Penerima',
        sortable: true,
        render: (value: string) => (
            <span className="text-sm text-gray-700">{truncateText(value, 30)}</span>
        ),
    },
    {
        key: 'perihal',
        label: 'Perihal',
        render: (value: string) => (
            <span className="text-sm text-gray-600">{truncateText(value, 40)}</span>
        ),
    },
    {
        key: 'sifat',
        label: 'Sifat',
        width: '100px',
        render: (value: string) => (
            <span className={`badge ${getSifatColor(value)}`}>{value}</span>
        ),
    },
    {
        key: 'fileUrl',
        label: 'File',
        width: '60px',
        render: (value: string) => value ? (
            <div className="flex justify-center">
                <Send className="text-emerald-500" size={18} />
            </div>
        ) : (
            <div className="flex justify-center">
                <span className="text-gray-300">-</span>
            </div>
        ),
    },
];

export default function SuratKeluarPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSurat, setSelectedSurat] = useState<SuratKeluar | null>(null);
    const [suratList, setSuratList] = useState<SuratKeluar[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const res = await fetch('/api/surat-keluar');
            const json = await res.json();
            if (json.success) {
                setSuratList(json.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Load data on mount
    useEffect(() => {
        fetchData();
    }, []);

    const handleView = (surat: SuratKeluar) => {
        setSelectedSurat(surat);
        setIsModalOpen(true);
    };

    const handleEdit = (surat: SuratKeluar) => {
        setSelectedSurat(surat);
        setIsModalOpen(true);
    };

    const handleDelete = async (surat: SuratKeluar) => {
        if (confirm('Apakah Anda yakin ingin menghapus surat ini?')) {
            try {
                const res = await fetch(`/api/surat-keluar?id=${surat.id}`, {
                    method: 'DELETE',
                });
                const json = await res.json();
                if (json.success) {
                    await fetchData();
                }
            } catch (error) {
                console.error('Error deleting:', error);
            }
        }
    };

    const handleAddNew = () => {
        setSelectedSurat(null);
        setIsModalOpen(true);
    };

    const handleFormSubmit = async (data: Partial<SuratKeluar>) => {
        try {
            if (selectedSurat) {
                // Update existing
                await fetch('/api/surat-keluar', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: selectedSurat.id, ...data }),
                });
            } else {
                // Add new
                await fetch('/api/surat-keluar', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });
            }
            setIsModalOpen(false);
            await fetchData();
        } catch (error) {
            console.error('Error saving:', error);
        }
    };

    return (
        <div className="min-h-screen">
            <Header
                title="Surat Keluar"
                subtitle="Kelola dan arsipkan surat keluar dinas"
            />

            <div className="p-6 space-y-6">
                {/* Action Bar */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleAddNew}
                        className="btn-primary flex items-center gap-2"
                    >
                        <Plus size={20} />
                        <span>Tambah Surat Keluar</span>
                    </motion.button>

                    <div className="flex items-center gap-3">
                        <button className="btn-secondary flex items-center gap-2">
                            <Filter size={18} />
                            <span>Filter</span>
                        </button>
                        <button
                            className="btn-secondary flex items-center gap-2"
                            onClick={() => exportToCSV(suratList, 'surat-keluar')}
                        >
                            <Download size={18} />
                            <span>Export</span>
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                                <Send className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-800">{suratList.length}</p>
                                <p className="text-sm text-gray-500">Total Surat Keluar</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                <Send className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-800">
                                    {suratList.filter((s) => s.sifat === 'Penting').length}
                                </p>
                                <p className="text-sm text-gray-500">Surat Penting</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <Send className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-800">
                                    {suratList.filter((s) => s.fileUrl).length}
                                </p>
                                <p className="text-sm text-gray-500">Dengan File</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Data Table */}
                <DataTable
                    data={suratList}
                    columns={columns}
                    searchPlaceholder="Cari nomor surat, penerima, perihal..."
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={selectedSurat ? 'Edit Surat Keluar' : 'Tambah Surat Keluar'}
                size="lg"
            >
                <SuratKeluarForm
                    initialData={selectedSurat}
                    onSubmit={handleFormSubmit}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
        </div>
    );
}
