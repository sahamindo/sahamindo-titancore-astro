export interface FaqItem {
    question: string;
    answer: string;
}

export interface FaqList {
    id: string;
    faqs: FaqItem[];
}

export const faqLists: Record<string, FaqList> = {
    main: {
        id: 'main',
        faqs: [
            {
                question: "Bagaimana cara membaca kode saham Indonesia?",
                answer: "Kode saham Indonesia menggunakan format 4 huruf diikuti .JK, contoh: BBCA.JK untuk Bank Central Asia, TLKM.JK untuk Telkom Indonesia. Kode ini digunakan untuk mengidentifikasi saham di Bursa Efek Indonesia."
            },
            {
                question: "Apa saja sektor yang dibahas di Sahamindo?",
                answer: "Sahamindo fokus pada 4 sektor utama: Perbankan (banking), IPO & listing baru, Barang Konsumen (consumer goods), dan Infrastruktur. Sektor-sektor ini mewakili pilar ekonomi Indonesia yang paling aktif di pasar modal."
            },
            {
                question: "Seberapa sering berita di Sahamindo diperbarui?",
                answer: "Kami memperbarui berita setiap hari kerja bursa, dengan breaking news untuk pengumuman penting seperti laporan keuangan, merger, akuisisi, atau perubahan manajemen. Tim redaksi kami bekerja dari jam buka hingga tutup bursa."
            },
            {
                question: "Apakah analisis di Sahamindo gratis untuk diakses?",
                answer: "Ya, seluruh content Sahamindo termasuk berita, analisis sektor, dan update kinerja saham dapat diakses secara gratis. Kami berkomitmen menyediakan informasi berkualitas untuk mendukung investor Indonesia."
            },
            {
                question: "Bagaimana kredibilitas sumber berita Sahamindo?",
                answer: "Sahamindo menggunakan sumber resmi seperti laporan perusahaan, pengumuman Bursa Efek Indonesia (IDX), siaran pers manajemen, dan wawancara langsung dengan pihak terkait. Semua artikel melalui proses fact-checking sebelum publikasi."
            },
            {
                question: "Bisakah saya mencari berita saham tertentu?",
                answer: "Tentu! Gunakan fitur pencarian kami untuk mencari berdasarkan kode saham (contoh: BBCA.JK), nama perusahaan, sektor, atau topik tertentu. Anda juga bisa menjelajahi arsip berita berdasarkan tanggal dan kategori."
            }
        ]
    }
};
