const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const sm = await prisma.suratMasuk.count();
    const sk = await prisma.suratKeluar.count();
    const un = await prisma.undangan.count();
    console.log(`Surat Masuk: ${sm}`);
    console.log(`Surat Keluar: ${sk}`);
    console.log(`Undangan: ${un}`);

    if (sm > 0) {
        const latest = await prisma.suratMasuk.findMany({ take: 5, orderBy: { createdAt: 'desc' } });
        console.log('\nLatest Surat Masuk:');
        latest.forEach(s => console.log(`- ${s.noSurat} (${s.perihal}) - File: ${s.fileUrl ? 'Yes' : 'No'}`));
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
