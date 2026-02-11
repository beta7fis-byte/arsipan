// User Types
export interface User {
    id: string;
    username: string;
    name: string;
    role: 'admin' | 'viewer';
    lastLogin?: string;
}

// Surat Masuk Types
export interface SuratMasuk {
    id: string;
    noAgenda: number;
    noSurat: string;
    tanggalSurat: string;
    tanggalTerima: string;
    pengirim: string;
    perihal: string;
    sifat: 'Penting' | 'Biasa' | 'Rahasia';
    klasifikasi: string;
    fileUrl?: string;
    createdAt: string;
    createdBy: string;
}

// Surat Keluar Types
export interface SuratKeluar {
    id: string;
    noSurat: string;
    tanggalSurat: string;
    penerima: string;
    perihal: string;
    sifat: 'Penting' | 'Biasa' | 'Rahasia';
    klasifikasi: string;
    fileUrl?: string;
    createdAt: string;
    createdBy: string;
}

// Undangan Types
export interface Undangan {
    id: string;
    noSurat: string;
    tanggalAcara: string;
    waktuAcara: string;
    tempat: string;
    pengirim: string;
    perihal: string;
    status: 'Hadir' | 'Tidak Hadir' | 'Pending';
    fileUrl?: string;
    createdAt: string;
    createdBy: string;
}

// Dashboard Stats
export interface DashboardStats {
    totalSuratMasuk: number;
    totalSuratKeluar: number;
    totalUndangan: number;
    totalArsip: number;
    suratMasukBulanIni: number;
    suratKeluarBulanIni: number;
}

// Chart Data
export interface ChartDataPoint {
    month: string;
    suratMasuk: number;
    suratKeluar: number;
    undangan: number;
}

// Recent Activity
export interface RecentActivity {
    id: string;
    type: 'masuk' | 'keluar' | 'undangan';
    title: string;
    description: string;
    timestamp: string;
    user: string;
}

// Table Column Definition
export interface TableColumn<T> {
    key: keyof T | string;
    label: string;
    sortable?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render?: (value: any, row: T) => any;
}

// API Response
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

// Form State
export interface FormState {
    isLoading: boolean;
    error: string | null;
    success: boolean;
}

// Filter Options
export interface FilterOptions {
    startDate?: string;
    endDate?: string;
    sifat?: string;
    kategori?: string;
    search?: string;
}

// Pagination
export interface PaginationState {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
}
