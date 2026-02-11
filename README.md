# E-Arsip ESDM Kalsel

Sistem Arsip Digital untuk Dinas Energi dan Sumber Daya Mineral Provinsi Kalimantan Selatan.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm atau yarn
- Google Cloud Project dengan Sheets & Drive API enabled

### Installation

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.local.example .env.local
# Edit .env.local dengan kredensial Google API Anda

# Run development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## 📁 Project Structure

```
e-arsip-esdm/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth pages (login)
│   ├── dashboard/         # Dashboard pages
│   │   ├── surat-masuk/   # Incoming letters
│   │   ├── surat-keluar/  # Outgoing letters
│   │   ├── undangan/      # Invitations
│   │   └── settings/      # Settings
│   └── api/               # API routes
├── components/            # React components
│   ├── dashboard/         # Dashboard-specific
│   ├── forms/             # Form components
│   └── ui/                # Reusable UI
├── lib/                   # Utility libraries
│   ├── google-sheets.ts   # Google Sheets API
│   └── google-drive.ts    # Google Drive API
└── types/                 # TypeScript types
```

## 🔐 Demo Credentials

| Role | Username | Password |
|------|----------|----------|
| Admin | `admin` | `admin123` |
| Staff | `staff` | `staff123` |

## 📊 Features

- ✅ Modern glassmorphism UI design
- ✅ Dashboard dengan statistik real-time
- ✅ Manajemen Surat Masuk (CRUD)
- ✅ Manajemen Surat Keluar (CRUD)
- ✅ Manajemen Undangan dengan status
- ✅ Drag & drop file upload
- ✅ Data table dengan search & filter
- ✅ Integrasi Google Sheets sebagai database
- ✅ Integrasi Google Drive untuk file storage
- ✅ Responsive design (mobile-friendly)

## 🔧 Configuration

### Google Cloud Setup

1. Buat project di [Google Cloud Console](https://console.cloud.google.com)
2. Enable Google Sheets API dan Google Drive API
3. Buat Service Account dan download credentials
4. Share Google Sheet ke email service account
5. Buat folder di Google Drive dan share ke service account

### Environment Variables

```env
# Google API
GOOGLE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
GOOGLE_SHEET_ID=your-spreadsheet-id
GOOGLE_DRIVE_FOLDER_ID=your-folder-id

# NextAuth
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# Demo Mode (set to false for production)
DEMO_MODE=true
```

## 📝 Google Sheet Structure

Pastikan struktur sheet Anda sesuai:

### Sheet 1: Surat_Masuk
| Column | Type |
|--------|------|
| id | string |
| noAgenda | number |
| noSurat | string |
| tanggalSurat | date |
| tanggalTerima | date |
| pengirim | string |
| perihal | string |
| sifat | Penting/Biasa/Rahasia |
| klasifikasi | string |
| fileUrl | string |
| createdAt | datetime |
| createdBy | string |

### Sheet 2: Surat_Keluar
(Similar structure, with `penerima` instead of `pengirim`)

### Sheet 3: Undangan
Includes `tanggalAcara`, `waktuAcara`, `tempat`, and `status` fields.

### Sheet 4: Users
For authentication management.

## 🚀 Deployment

### Deploy ke Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Set environment variables di Vercel Dashboard.

## 📄 License

Copyright © 2024 Dinas ESDM Provinsi Kalimantan Selatan
# tes2
