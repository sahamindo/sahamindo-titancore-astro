// src/data/menu.ts

export const headerMenu = [
    { name: 'Beranda', link: '/' },
    { name: 'Sektor', link: '/sektor', showArrow: true,
        children: [
            { name: '🏦 Perbankan', link: '/sektor/perbankan' },
            { name: '📈 IPO', link: '/sektor/ipo' },
            { name: '🛒 Barang Konsumen', link: '/sektor/barang-konsumen' },
            { name: '🏗️ Infrastruktur', link: '/sektor/infrastruktur' },
        ]
    },
    { name: 'Analisis', link: '/analisis' },
    { name: 'Tentang', link: '/tentang' },
    { name: 'Kontak', link: '/kontak' }
];

export const footerMenu = [
    { name: 'Semua Berita', link: '/berita' },
    { name: 'Arsip', link: '/arsip' },
];

export const legalMenu = [
    { name: 'Kebijakan Privasi', link: '/legal/kebijakan-privasi' },
    { name: 'Syarat & Ketentuan', link: '/legal/syarat-ketentuan' }
];

