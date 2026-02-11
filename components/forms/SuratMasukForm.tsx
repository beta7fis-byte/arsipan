'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, X, FileText, Upload } from 'lucide-react';
import FileUpload from '@/components/ui/FileUpload';
import { SuratMasuk } from '@/types';

interface SuratMasukFormProps {
    initialData?: SuratMasuk | null;
    onSubmit: (data: Partial<SuratMasuk>) => void;
    onCancel: () => void;
}

export default function SuratMasukForm({ initialData, onSubmit, onCancel }: SuratMasukFormProps) {
    const [formData, setFormData] = useState({
        noSurat: initialData?.noSurat || '',
        tanggalSurat: initialData?.tanggalSurat || '',
        tanggalTerima: initialData?.tanggalTerima || new Date().toISOString().split('T')[0],
        pengirim: initialData?.pengirim || '',
        perihal: initialData?.perihal || '',
        sifat: initialData?.sifat || 'Biasa',
        klasifikasi: initialData?.klasifikasi || '',
        fileUrl: initialData?.fileUrl || '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showUpload, setShowUpload] = useState(!initialData?.fileUrl);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileSelect = (url: string) => {
        setFormData({
            ...formData,
            fileUrl: url,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
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
        { value: 'SDM.01', label: 'SDM.01 - Kepegawaian' },
    ];

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nomor Surat */}
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
                        placeholder="Contoh: 001/BAPPEDA/I/2026"
                        required
                    />
                </div>

                {/* Tanggal Surat */}
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

                {/* Tanggal Terima */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        Tanggal Diterima <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="date"
                        name="tanggalTerima"
                        value={formData.tanggalTerima}
                        onChange={handleChange}
                        className="input-field"
                        required
                    />
                </div>

                {/* Sifat Surat */}
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

                {/* Pengirim */}
                <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        Pengirim <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="pengirim"
                        value={formData.pengirim}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Nama instansi/organisasi pengirim"
                        required
                    />
                </div>

                {/* Perihal */}
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

                {/* Klasifikasi */}
                <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        Kode Klasifikasi
                    </label>
                    <select
                        name="klasifikasi"
                        value={formData.klasifikasi}
                        onChange={handleChange}
                        className="input-field"
                    >
                        {klasifikasiOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* File Upload */}
                <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        Scan Surat (PDF/Gambar)
                    </label>

                    {formData.fileUrl && !showUpload ? (
                        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-100">
                            <div className="flex items-center gap-3 text-blue-700">
                                <FileText size={20} />
                                <div className="min-w-0">
                                    <p className="text-sm font-medium truncate max-w-[200px] sm:max-w-md">
                                        File sudah terlampir
                                    </p>
                                    <a
                                        href={formData.fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs hover:underline text-blue-600"
                                    >
                                        Klik untuk melihat file
                                    </a>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowUpload(true)}
                                className="text-xs px-3 py-1.5 bg-white border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-1.5"
                            >
                                <Upload size={14} />
                                Ganti File
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <FileUpload onFileSelect={handleFileSelect} />
                            {formData.fileUrl && (
                                <button
                                    type="button"
                                    onClick={() => setShowUpload(false)}
                                    className="text-xs text-gray-500 hover:text-gray-700"
                                >
                                    Batal ganti file
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Action Buttons */}
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
