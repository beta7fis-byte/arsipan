'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Plus, Filter, Download, Mail } from 'lucide-react';
import Header from '@/components/dashboard/Header';
import DataTable from '@/components/ui/DataTable';
import Modal from '@/components/ui/Modal';
import SuratMasukForm from '@/components/forms/SuratMasukForm';
import { SuratMasuk } from '@/types';
import { formatDateShort, getSifatColor, truncateText } from '@/lib/utils';

const columns = [
    {
        key: 'noAgenda',
        label: 'No. Agenda',
        sortable: true,
        width: '100px',
        render: (value: number) => (
            <span className="font-semibold text-primary-600">{value}</span>
        ),
    },
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
        key: 'pengirim',
        label: 'Pengirim',
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
                <Mail className="text-primary-500" size={18} />
            </div>
        ) : (
            <div className="flex justify-center">
                <span className="text-gray-300">-</span>
            </div>
        ),
    },
];

export default function SuratMasukPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSurat, setSelectedSurat] = useState<SuratMasuk | null>(null);
    const [suratList, setSuratList] = useState<SuratMasuk[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await fetch('/api/surat-masuk');
            const json = await res.json();
            if (json.success) {
                setSuratList(json.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleView = (surat: SuratMasuk) => {
        setSelectedSurat(surat);
        setIsModalOpen(true);
    };

    const handleEdit = (surat: SuratMasuk) => {
        setSelectedSurat(surat);
        setIsModalOpen(true);
    };

    const handleDelete = async (surat: SuratMasuk) => {
        if (confirm('Apakah Anda yakin ingin menghapus surat ini?')) {
            try {
                const res = await fetch(`/api/surat-masuk?id=${surat.id}`, {
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

    const handleFormSubmit = async (data: Partial<SuratMasuk>) => {
        try {
            if (selectedSurat) {
                // Update existing
                await fetch('/api/surat-masuk', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: selectedSurat.id, ...data }),
                });
            } else {
                // Add new
                await fetch('/api/surat-masuk', {
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
                title="Surat Masuk"
                subtitle="Kelola dan arsipkan surat masuk dinas"
            />

            <div className="p-6 space-y-6">
                {/* Action Bar */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                    <div className="flex items-center gap-3">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleAddNew}
                            className="btn-primary flex items-center gap-2"
                        >
                            <Plus size={20} />
                            <span>Tambah Surat Masuk</span>
                        </motion.button>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="btn-secondary flex items-center gap-2">
                            <Filter size={18} />
                            <span>Filter</span>
                        </button>
                        <button className="btn-secondary flex items-center gap-2">
                            <Download size={18} />
                            <span>Export</span>
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Mail className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-800">{suratList.length}</p>
                                <p className="text-sm text-gray-500">Total Surat</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                <Mail className="w-5 h-5 text-red-600" />
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
                            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                                <Mail className="w-5 h-5 text-amber-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-800">
                                    {suratList.filter((s) => s.sifat === 'Rahasia').length}
                                </p>
                                <p className="text-sm text-gray-500">Surat Rahasia</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <Mail className="w-5 h-5 text-green-600" />
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
                    searchPlaceholder="Cari nomor surat, pengirim, perihal..."
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>

            {/* Form Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={selectedSurat ? 'Edit Surat Masuk' : 'Tambah Surat Masuk'}
                size="lg"
            >
                <SuratMasukForm
                    initialData={selectedSurat}
                    onSubmit={handleFormSubmit}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
        </div>
    );
}
