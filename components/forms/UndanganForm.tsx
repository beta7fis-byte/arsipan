'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, X } from 'lucide-react';
import FileUpload from '@/components/ui/FileUpload';
import { Undangan } from '@/types';

interface UndanganFormProps {
    initialData?: Undangan | null;
    onSubmit: (data: Partial<Undangan>) => void;
    onCancel: () => void;
}

export default function UndanganForm({ initialData, onSubmit, onCancel }: UndanganFormProps) {
    const [formData, setFormData] = useState({
        noSurat: initialData?.noSurat || '',
        tanggalAcara: initialData?.tanggalAcara || '',
        waktuAcara: initialData?.waktuAcara || '',
        tempat: initialData?.tempat || '',
        pengirim: initialData?.pengirim || '',
        perihal: initialData?.perihal || '',
        status: initialData?.status || 'Pending',
        fileUrl: initialData?.fileUrl || '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileSelect = (url: string) => {
        setFormData({ ...formData, fileUrl: url });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        onSubmit(formData);
        setIsSubmitting(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        Nomor Surat Undangan <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="noSurat"
                        value={formData.noSurat}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Contoh: 001/UND/BAPPEDA/I/2026"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        Tanggal Acara <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="date"
                        name="tanggalAcara"
                        value={formData.tanggalAcara}
                        onChange={handleChange}
                        className="input-field"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        Waktu Acara <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="time"
                        name="waktuAcara"
                        value={formData.waktuAcara}
                        onChange={handleChange}
                        className="input-field"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        Status Kehadiran <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="input-field"
                        required
                    >
                        <option value="Pending">Pending</option>
                        <option value="Hadir">Hadir</option>
                        <option value="Tidak Hadir">Tidak Hadir</option>
                    </select>
                </div>

                <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        Pengundang <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="pengirim"
                        value={formData.pengirim}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Nama instansi/organisasi pengundang"
                        required
                    />
                </div>

                <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        Tempat Acara <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="tempat"
                        value={formData.tempat}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Lokasi/alamat acara"
                        required
                    />
                </div>

                <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        Nama Acara/Perihal <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        name="perihal"
                        value={formData.perihal}
                        onChange={handleChange}
                        className="input-field min-h-[80px] resize-none"
                        placeholder="Nama atau perihal acara"
                        required
                    />
                </div>

                <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-gray-700">Upload Scan Undangan</label>
                    <FileUpload onFileSelect={handleFileSelect} />
                </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onCancel}
                    className="btn-secondary flex items-center gap-2"
                >
                    <X size={18} />
                    <span>Batal</span>
                </motion.button>
                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                    className="btn-primary flex items-center gap-2 disabled:opacity-70"
                >
                    {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <Save size={18} />
                    )}
                    <span>{isSubmitting ? 'Menyimpan...' : 'Simpan'}</span>
                </motion.button>
            </div>
        </form>
    );
}
