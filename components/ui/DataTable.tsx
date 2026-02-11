'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
    Search,
    ChevronUp,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Eye,
    Edit,
    Trash2,
    FileText,
    Download,
    MoreHorizontal,
} from 'lucide-react';

interface Column<T> {
    key: keyof T | string;
    label: string;
    sortable?: boolean;
    width?: string;
    render?: (value: any, row: T) => React.ReactNode;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    searchPlaceholder?: string;
    onView?: (row: T) => void;
    onEdit?: (row: T) => void;
    onDelete?: (row: T) => void;
    pageSize?: number;
}

export default function DataTable<T extends { id: string }>({
    data,
    columns,
    searchPlaceholder = 'Cari...',
    onView,
    onEdit,
    onDelete,
    pageSize = 10,
}: DataTableProps<T>) {
    const [search, setSearch] = useState('');
    const [sortKey, setSortKey] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [openActionMenu, setOpenActionMenu] = useState<string | null>(null);

    // Filter and sort data
    const processedData = useMemo(() => {
        let result = [...data];

        // Search filter
        if (search) {
            const searchLower = search.toLowerCase();
            result = result.filter((row) =>
                columns.some((col) => {
                    const value = (row as any)[col.key];
                    return value?.toString().toLowerCase().includes(searchLower);
                })
            );
        }

        // Sort
        if (sortKey) {
            result.sort((a, b) => {
                const aValue = (a as any)[sortKey];
                const bValue = (b as any)[sortKey];

                if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return result;
    }, [data, columns, search, sortKey, sortDirection]);

    // Pagination
    const totalPages = Math.ceil(processedData.length / pageSize);
    const paginatedData = processedData.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const handleSort = (key: string) => {
        if (sortKey === key) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortDirection('asc');
        }
    };

    const getValue = (row: T, key: string) => {
        const keys = key.split('.');
        let value: any = row;
        for (const k of keys) {
            value = value?.[k];
        }
        return value;
    };

    return (
        <div className="bg-white rounded-2xl shadow-card overflow-hidden">
            {/* Search Bar */}
            <div className="p-4 border-b border-gray-100">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                        placeholder={searchPlaceholder}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-12">
                                #
                            </th>
                            {columns.map((column) => (
                                <th
                                    key={String(column.key)}
                                    className={`px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider ${column.sortable ? 'cursor-pointer hover:bg-gray-100 transition-colors' : ''
                                        }`}
                                    style={{ width: column.width }}
                                    onClick={() => column.sortable && handleSort(String(column.key))}
                                >
                                    <div className="flex items-center gap-2">
                                        <span>{column.label}</span>
                                        {column.sortable && sortKey === column.key && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                            >
                                                {sortDirection === 'asc' ? (
                                                    <ChevronUp size={14} />
                                                ) : (
                                                    <ChevronDown size={14} />
                                                )}
                                            </motion.div>
                                        )}
                                    </div>
                                </th>
                            ))}
                            {(onView || onEdit || onDelete) && (
                                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider w-24">
                                    Aksi
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length + 2}
                                    className="px-4 py-12 text-center text-gray-500"
                                >
                                    <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                    <p>Tidak ada data ditemukan</p>
                                </td>
                            </tr>
                        ) : (
                            paginatedData.map((row, index) => (
                                <motion.tr
                                    key={row.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.02 }}
                                    className="table-row"
                                >
                                    <td className="px-4 py-4 text-sm text-gray-500">
                                        {(currentPage - 1) * pageSize + index + 1}
                                    </td>
                                    {columns.map((column) => (
                                        <td key={String(column.key)} className="px-4 py-4">
                                            {column.render
                                                ? column.render(getValue(row, String(column.key)), row)
                                                : <span className="text-sm text-gray-700">{getValue(row, String(column.key))}</span>
                                            }
                                        </td>
                                    ))}
                                    {(onView || onEdit || onDelete) && (
                                        <td className="px-4 py-4">
                                            <div className="relative flex items-center justify-center gap-1">
                                                {onView && (
                                                    <button
                                                        onClick={() => onView(row)}
                                                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors"
                                                        title="Lihat"
                                                    >
                                                        <Eye size={16} />
                                                    </button>
                                                )}
                                                {/* File Download Action */}
                                                {(row as any).fileUrl && (
                                                    <a
                                                        href={(row as any).fileUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-green-50 text-gray-400 hover:text-green-600 transition-colors"
                                                        title="Download File"
                                                    >
                                                        <Download size={16} />
                                                    </a>
                                                )}
                                                {onEdit && (
                                                    <button
                                                        onClick={() => onEdit(row)}
                                                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-amber-50 text-gray-400 hover:text-amber-600 transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit size={16} />
                                                    </button>
                                                )}
                                                {onDelete && (
                                                    <button
                                                        onClick={() => onDelete(row)}
                                                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"
                                                        title="Hapus"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    )}
                                </motion.tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                        Menampilkan {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, processedData.length)} dari {processedData.length} data
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let pageNum;
                            if (totalPages <= 5) {
                                pageNum = i + 1;
                            } else if (currentPage <= 3) {
                                pageNum = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                                pageNum = totalPages - 4 + i;
                            } else {
                                pageNum = currentPage - 2 + i;
                            }
                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => setCurrentPage(pageNum)}
                                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${currentPage === pageNum
                                        ? 'bg-primary-500 text-white'
                                        : 'border border-gray-200 hover:bg-gray-50'
                                        }`}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}
                        <button
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
