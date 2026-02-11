'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, File, X, CheckCircle, AlertCircle } from 'lucide-react';

interface FileUploadProps {
    onFileSelect: (url: string) => void;
    accept?: string;
    maxSize?: number; // in MB
    disabled?: boolean;
}

export default function FileUpload({
    onFileSelect,
    accept = '.pdf,.doc,.docx,.jpg,.jpeg,.png',
    maxSize = 10,
    disabled = false,
}: FileUploadProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    const handleFile = useCallback(async (selectedFile: File) => {
        setError(null);

        // Check file size
        if (selectedFile.size > maxSize * 1024 * 1024) {
            setError(`Ukuran file maksimal ${maxSize}MB`);
            return;
        }

        // Check file type
        const validTypes = accept.split(',').map(t => t.trim().toLowerCase());
        const fileExt = '.' + selectedFile.name.split('.').pop()?.toLowerCase();
        const mimeType = selectedFile.type.toLowerCase();

        const isValidType = validTypes.some(type => {
            if (type.startsWith('.')) {
                return fileExt === type;
            }
            return mimeType.includes(type);
        });

        if (!isValidType) {
            setError(`Format file tidak didukung. Gunakan: ${accept}`);
            return;
        }

        setFile(selectedFile);
        setIsUploading(true);
        setUploadProgress(20);

        try {
            const formData = new FormData();
            formData.append('file', selectedFile);

            const response = await fetch(`/api/upload?filename=${encodeURIComponent(selectedFile.name)}`, {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.error || 'Gagal mengupload file');
            }

            setUploadProgress(100);
            setIsUploading(false);
            onFileSelect(result.data.fileUrl); // Pass the real URL back
        } catch (err: any) {
            console.error('Upload error:', err);
            setError(err.message || 'Gagal mengupload file ke server');
            setIsUploading(false);
            setFile(null);
        }
    }, [maxSize, accept, onFileSelect]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        if (!disabled) setIsDragging(true);
    }, [disabled]);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        if (disabled) return;

        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            handleFile(droppedFile);
        }
    }, [disabled, handleFile]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            handleFile(selectedFile);
        }
    };

    const removeFile = () => {
        setFile(null);
        setUploadProgress(0);
        setError(null);
    };

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    return (
        <div className="w-full">
            {/* Drop Zone */}
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 ${isDragging
                    ? 'border-primary-500 bg-primary-50'
                    : error
                        ? 'border-red-300 bg-red-50'
                        : file
                            ? 'border-green-300 bg-green-50'
                            : 'border-gray-200 bg-gray-50 hover:border-primary-300 hover:bg-primary-50/50'
                    } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
                <input
                    type="file"
                    accept={accept}
                    onChange={handleInputChange}
                    disabled={disabled}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                />

                <AnimatePresence mode="wait">
                    {!file ? (
                        <motion.div
                            key="upload"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center"
                        >
                            <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${isDragging ? 'bg-primary-100' : 'bg-white'
                                } shadow-sm`}>
                                <Upload className={`w-8 h-8 ${isDragging ? 'text-primary-600' : 'text-gray-400'}`} />
                            </div>
                            <p className="text-gray-700 font-medium mb-1">
                                {isDragging ? 'Lepaskan file di sini' : 'Drag & drop file atau klik untuk memilih'}
                            </p>
                            <p className="text-sm text-gray-500">
                                Format: PDF, DOC, DOCX, JPG, PNG (Maks. {maxSize}MB)
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="file"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center gap-4"
                        >
                            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                <File className="w-6 h-6 text-primary-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-800 truncate">{file.name}</p>
                                <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                                {isUploading && (
                                    <div className="mt-2">
                                        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${uploadProgress}%` }}
                                                className="h-full bg-primary-500 rounded-full"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                            {!isUploading && (
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeFile();
                                        }}
                                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        <X size={16} className="text-gray-500" />
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Error Message */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2 mt-3 text-red-600 text-sm"
                    >
                        <AlertCircle size={16} />
                        <span>{error}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
