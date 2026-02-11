'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, X } from 'lucide-react';
import FileUpload from '@/components/ui/FileUpload';
import { SuratKeluar } from '@/types';

interface SuratKeluarFormProps {
    initialData?: SuratKeluar | null;
    onSubmit: (data: Partial<SuratKeluar>) => void;
    onCancel: () => void;
}

export default function SuratKeluarForm({ initialData, onSubmit, onCancel }: SuratKeluarFormProps) {
    const [formData, setFormData] = useState({
        noSurat: initialData?.noSurat || '',
        tanggalSurat: initialData?.tanggalSurat || new Date().toISOString().split('T')[0],
        penerima: initialData?.penerima || '',
        perihal: initialData?.perihal || '',
        sifat: initialData?.sifat || 'Biasa',
        klasifikasi: initialData?.klasifikasi || '',
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

    const klasifikasiOptions = [
        { value: '', label: 'Pilih Klasifikasi' },
        { value: 'TU.01', label: 'TU.01 - Tata Usaha Umum' },
        { value: 'TU.02', label: 'TU.02 - Persuratan' },
        { value: 'TU.03', label: 'TU.03 - Instruksi/Edaran' },
        { value: 'PE.01', label: 'PE.01 - Perencanaan' },
        { value: 'PE.02', label: 'PE.02 - Pelaporan' },
        { value: 'LH.01', label: 'LH.01 - Lingkungan Hidup' },
        { value: 'IZ.01', label: 'IZ.01 - Perizinan' },
        { value: 'KE.01', label: 'KE.01 - Keuangan' },
    ];

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        Nomor Surat <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="noSurat"
                        value={formData.noSurat}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Contoh: 001/DESDM/I/2026"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        Tanggal Surat <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="date"
                        name="tanggalSurat"
                        value={formData.tanggalSurat}
                        onChange={handleChange}
                        className="input-field"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        Sifat Surat <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="sifat"
                        value={formData.sifat}
                        onChange={handleChange}
                        className="input-field"
                        required
                    >
                        <option value="Biasa">Biasa</option>
                        <option value="Penting">Penting</option>
                        <option value="Rahasia">Rahasia</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Kode Klasifikasi</label>
                    <select
                        name="klasifikasi"
                        value={formData.klasifikasi}
                        onChange={handleChange}
                        className="input-field"
                    >
                        {klasifikasiOptions.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>

                <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        Penerima <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="penerima"
                        value={formData.penerima}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Nama instansi/organisasi penerima"
                        required
                    />
                </div>

                <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        Perihal <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        name="perihal"
                        value={formData.perihal}
                        onChange={handleChange}
                        className="input-field min-h-[80px] resize-none"
                        placeholder="Isi perihal surat"
                        required
                    />
                </div>

                <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-gray-700">Upload Scan Surat</label>
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
