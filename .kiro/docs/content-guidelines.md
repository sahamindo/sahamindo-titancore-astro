# Panduan Konten Sahamindo

## 1. STANDAR METADATA ARTIKEL

### Field Wajib (Required)
- **title**: Judul artikel yang informatif dan menarik
- **excerpt**: Ringkasan 1-2 kalimat (maksimal 160 karakter)
- **publishDate**: Format YYYY-MM-DD
- **author**: Nama lengkap penulis
- **category**: Salah satu dari: banking, ipo, consumer, infrastructure

### Field Opsional (Optional)
- **stockSymbols**: Array kode saham Indonesia (format XXXX.JK)
- **isBreaking**: Boolean untuk breaking news
- **tags**: Array tag untuk kategorisasi
- **featuredImage**: Path ke gambar utama
- **seo**: Object untuk optimasi SEO custom

## 2. FORMAT KODE SAHAM

### Standar Indonesia
- **Format**: XXXX.JK (4 huruf + .JK)
- **Contoh Valid**: BBCA.JK, TLKM.JK, UNVR.JK, WIKA.JK
- **Penulisan**: Selalu gunakan huruf KAPITAL
- **Dalam Artikel**: Bold formatting untuk kode saham (**BBCA.JK**)

### Validasi Otomatis
Sistem akan memvalidasi format kode saham:
```javascript
// Pattern: /^[A-Z]{4}\.JK$/
✅ Valid: BBCA.JK, TLKM.JK, GOTO.JK
❌ Invalid: bbca.jk, BBCA, TLKM.ID
```

## 3. KATEGORI SEKTOR

### Banking (Perbankan)
- **Fokus**: Bank umum, BPR, fintech lending
- **Saham Utama**: BBCA.JK, BBRI.JK, BMRI.JK, BBNI.JK
- **Keywords**: kredit, NPL, NIM, CAR, ROE, dana pihak ketiga

### IPO (Initial Public Offering)
- **Fokus**: Penawaran saham perdana, listing baru
- **Keywords**: prospektus, underwriter, book building, alokasi saham
- **Timeline**: Pre-IPO, masa penawaran, pencatatan perdana

### Consumer (Barang Konsumen)
- **Fokus**: FMCG, retail, makanan & minuman
- **Saham Utama**: ICBP.JK, INDF.JK, UNVR.JK, GGRM.JK
- **Keywords**: volume penjualan, margin, distribusi, brand

### Infrastructure (Infrastruktur)
- **Fokus**: Konstruksi, jalan tol, utilitas
- **Saham Utama**: WIKA.JK, WSKT.JK, ADHI.JK, JSMR.JK
- **Keywords**: kontrak baru, backlog, BUMN, proyek pemerintah

## 4. STANDAR PENULISAN

### Judul Artikel
- **Panjang**: 50-80 karakter
- **Format**: Aktif, informatif, mengandung kode saham jika relevan
- **Contoh**: "BBCA Catat Laba Bersih Rp 32,4 Triliun di Kuartal III 2024"

### Excerpt (Ringkasan)
- **Panjang**: 120-160 karakter
- **Isi**: Ringkas poin utama artikel
- **Hindari**: Clickbait, informasi yang tidak akurat

### Struktur Artikel
1. **Lead**: Informasi utama + kode saham
2. **Body**: Detail, quote, data pendukung
3. **Analisis**: Dampak dan outlook
4. **Penutup**: Kesimpulan dan call-to-action

### Formatting Guidelines
- **Kode Saham**: Bold (**BBCA.JK**)
- **Angka**: Format Indonesia (Rp 32,4 triliun)
- **Persentase**: Format standar (12,5%)
- **Quote**: Gunakan tanda kutip dan attribution jelas

## 5. BREAKING NEWS PROTOCOL

### Kriteria Breaking News
- Merger & akuisisi besar
- Perubahan manajemen kunci
- Pengumuman dividen/stock split signifikan
- Suspensi/delisting saham
- Kejadian force majeure

### Workflow Breaking News
1. **Verifikasi**: Konfirmasi dari 2+ sumber
2. **Speed**: Publish maksimal 30 menit setelah pengumuman
3. **Update**: Follow-up artikel untuk detail lengkap
4. **Flag**: Set `isBreaking: true` dalam metadata

## 6. SEO OPTIMIZATION

### Meta Title
- **Panjang**: 50-60 karakter
- **Include**: Kode saham, kata kunci utama
- **Contoh**: "BBCA Laba Q3 2024 Naik 12,5% - Sahamindo"

### Meta Description
- **Panjang**: 150-160 karakter
- **Include**: Rangkuman utama + call-to-action
- **Keywords**: Sektor, kode saham, metric utama

### URL Structure
- **News**: `/berita/[slug]`
- **Sector**: `/sektor/[sector-slug]`
- **Slug**: lowercase, hyphen-separated, include stock code

## 7. QUALITY CHECKLIST

### Sebelum Publish
- [ ] Metadata lengkap dan valid
- [ ] Kode saham format benar (XXXX.JK)
- [ ] Kategori sektor tepat
- [ ] Spelling & grammar check
- [ ] Fact-checking angka dan data
- [ ] Attribution quote jelas
- [ ] Featured image relevan
- [ ] SEO meta tags optimized

### Content Standards
- [ ] Objektif dan berimbang
- [ ] Sumber terpercaya (IDX, perusahaan, regulator)
- [ ] Tidak ada bias atau konflik kepentingan
- [ ] Bahasa profesional namun mudah dipahami
- [ ] Data akurat dan up-to-date

## 8. TOOLS & RESOURCES

### Data Sources
- **Bursa Efek Indonesia (IDX)**: www.idx.co.id
- **Yahoo Finance Indonesia**: finance.yahoo.com
- **Kontan**: kontan.co.id
- **Bloomberg Indonesia**: bloomberg.com/asia

### Image Guidelines
- **Resolution**: Minimum 1200x600px
- **Format**: JPG untuk foto, PNG untuk grafik
- **Size**: Maksimal 500KB setelah optimasi
- **Copyright**: Pastikan hak penggunaan atau gunakan stock photos

### Stock Symbol Validation
```bash
# Regex pattern untuk validasi
^[A-Z]{4}\.JK$

# Testing tools
- Regex101.com
- Internal validation di content.config.ts
```

---

*Dokumen ini akan diupdate seiring perkembangan platform. Hubungi tim editorial untuk pertanyaan atau saran.*