'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Filter, Download, Calendar, MapPin, Clock, Check, X as XIcon } from 'lucide-react';
import Header from '@/components/dashboard/Header';
import DataTable from '@/components/ui/DataTable';
import Modal from '@/components/ui/Modal';
import UndanganForm from '@/components/forms/UndanganForm';
import { Undangan } from '@/types';
import { formatDateShort, getStatusColor, truncateText, exportToCSV } from '@/lib/utils';

// Data undangan - akan diisi dari database
const initialUndangan: Undangan[] = [];

const columns = [
    {
        key: 'tanggalAcara',
        label: 'Tanggal',
        sortable: true,
        width: '110px',
        render: (value: string, row: Undangan) => (
            <div className="text-center">
                <p className="text-sm font-semibold text-primary-600">{formatDateShort(value)}</p>
                <p className="text-xs text-gray-500">{row.waktuAcara}</p>
            </div>
        ),
    },
    {
        key: 'perihal',
        label: 'Acara',
        render: (value: string) => (
            <span className="text-sm font-medium text-gray-800">{truncateText(value, 35)}</span>
        ),
    },
    {
        key: 'tempat',
        label: 'Tempat',
        render: (value: string) => (
            <div className="flex items-center gap-1 text-sm text-gray-600">
                <MapPin size={14} className="text-gray-400" />
                {truncateText(value, 25)}
            </div>
        ),
    },
    {
        key: 'pengirim',
        label: 'Pengundang',
        sortable: true,
        render: (value: string) => (
            <span className="text-sm text-gray-600">{truncateText(value, 20)}</span>
        ),
    },
    {
        key: 'status',
        label: 'Status',
        width: '120px',
        render: (value: string) => (
            <span className={`badge ${getStatusColor(value)}`}>{value}</span>
        ),
    },
    {
        key: 'fileUrl',
        label: 'File',
        width: '60px',
        render: (value: string) => value ? (
            <div className="flex justify-center">
                <Download className="text-amber-500" size={18} />
            </div>
        ) : (
            <div className="flex justify-center">
                <span className="text-gray-300">-</span>
            </div>
        ),
    },
];

export default function UndanganPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUndangan, setSelectedUndangan] = useState<Undangan | null>(null);
    const [undanganList, setUndanganList] = useState<Undangan[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const res = await fetch('/api/undangan');
            const json = await res.json();
            if (json.success) {
                setUndanganList(json.data);
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

    const handleView = (undangan: Undangan) => {
        setSelectedUndangan(undangan);
        setIsModalOpen(true);
    };

    const handleEdit = (undangan: Undangan) => {
        setSelectedUndangan(undangan);
        setIsModalOpen(true);
    };

    const handleDelete = async (undangan: Undangan) => {
        if (confirm('Apakah Anda yakin ingin menghapus undangan ini?')) {
            try {
                const res = await fetch(`/api/undangan?id=${undangan.id}`, {
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
        setSelectedUndangan(null);
        setIsModalOpen(true);
    };

    const handleFormSubmit = async (data: Partial<Undangan>) => {
        try {
            if (selectedUndangan) {
                // Update existing
                await fetch('/api/undangan', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: selectedUndangan.id, ...data }),
                });
            } else {
                // Add new
                await fetch('/api/undangan', {
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

    const pendingCount = undanganList.filter((u) => u.status === 'Pending').length;
    const hadirCount = undanganList.filter((u) => u.status === 'Hadir').length;
    const tidakHadirCount = undanganList.filter((u) => u.status === 'Tidak Hadir').length;

    return (
        <div className="min-h-screen">
            <Header
                title="Undangan"
                subtitle="Kelola dan catat undangan rapat/acara"
            />

            <div className="p-6 space-y-6">
                {/* Action Bar */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleAddNew}
                        className="btn-accent flex items-center gap-2"
                    >
                        <Plus size={20} />
                        <span>Catat Undangan Baru</span>
                    </motion.button>

                    <div className="flex items-center gap-3">
                        <button className="btn-secondary flex items-center gap-2">
                            <Filter size={18} />
                            <span>Filter</span>
                        </button>
                        <button
                            className="btn-secondary flex items-center gap-2"
                            onClick={() => exportToCSV(undanganList, 'undangan-rapat')}
                        >
                            <Download size={18} />
                            <span>Export</span>
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-amber-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-800">{undanganList.length}</p>
                                <p className="text-sm text-gray-500">Total Undangan</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <Clock className="w-5 h-5 text-yellow-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-800">{pendingCount}</p>
                                <p className="text-sm text-gray-500">Pending</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <Check className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-800">{hadirCount}</p>
                                <p className="text-sm text-gray-500">Hadir</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                <XIcon className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-800">{tidakHadirCount}</p>
                                <p className="text-sm text-gray-500">Tidak Hadir</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Data Table */}
                <DataTable
                    data={undanganList}
                    columns={columns}
                    searchPlaceholder="Cari acara, pengundang, tempat..."
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={selectedUndangan ? 'Edit Undangan' : 'Catat Undangan'}
                size="lg"
            >
                <UndanganForm
                    initialData={selectedUndangan}
                    onSubmit={handleFormSubmit}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
        </div>
    );
}
