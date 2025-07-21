#!/usr/bin/env node

/**
 * Sahamindo Article Creation Helper
 * 
 * Usage: node scripts/create-article.js
 * This script helps content editors create properly formatted news articles
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Available sectors
const SECTORS = {
    'banking': { name: 'Perbankan', path: 'banking' },
    'ipo': { name: 'IPO', path: 'ipo' },
    'consumer': { name: 'Barang Konsumen', path: 'consumer' },
    'infrastructure': { name: 'Infrastruktur', path: 'infrastructure' }
};

// Common stock symbols by sector
const COMMON_STOCKS = {
    banking: ['BBCA.JK', 'BBRI.JK', 'BMRI.JK', 'BBNI.JK', 'BNGA.JK'],
    consumer: ['ICBP.JK', 'INDF.JK', 'UNVR.JK', 'GGRM.JK', 'KLBF.JK'],
    infrastructure: ['WIKA.JK', 'WSKT.JK', 'ADHI.JK', 'PTPP.JK', 'JSMR.JK'],
    ipo: ['GOTO.JK', 'BUKA.JK', 'EMTK.JK']
};

function createReadlineInterface() {
    const readline = await import('readline');
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
}

async function promptUser(rl, question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer.trim());
        });
    });
}

function validateStockSymbol(symbol) {
    const pattern = /^[A-Z]{4}\.JK$/;
    return pattern.test(symbol);
}

function generateSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 60);
}

function formatDate(date) {
    return date.toISOString().split('T')[0];
}

function createArticleContent(metadata) {
    const frontmatter = `---
title: "${metadata.title}"
excerpt: "${metadata.excerpt}"
publishDate: "${metadata.publishDate}"
author: "${metadata.author}"
category: "${metadata.category}"
stockSymbols: [${metadata.stockSymbols.map(s => `"${s}"`).join(', ')}]
isBreaking: ${metadata.isBreaking}
publish: true
tags: [${metadata.tags.map(t => `"${t}"`).join(', ')}]
seo:
  title: "${metadata.title} - Sahamindo"
  description: "${metadata.excerpt}"
---

# ${metadata.title}

[Tulis konten artikel di sini...]

## Poin Utama

- Poin pertama
- Poin kedua  
- Poin ketiga

## Analisis

[Tambahkan analisis mendalam di sini...]

## Outlook ke Depan

[Proyeksi dan outlook untuk ke depan...]

---

*Artikel ini telah melalui proses fact-checking dan editorial Sahamindo.*`;

    return frontmatter;
}

async function main() {
    console.log('🚀 Sahamindo Article Creator');
    console.log('================================\n');

    const rl = await createReadlineInterface();

    try {
        // Get article metadata
        const title = await promptUser(rl, 'Judul artikel: ');
        if (!title) {
            console.log('❌ Judul wajib diisi!');
            process.exit(1);
        }

        const excerpt = await promptUser(rl, 'Excerpt (ringkasan): ');
        if (!excerpt) {
            console.log('❌ Excerpt wajib diisi!');
            process.exit(1);
        }

        const author = await promptUser(rl, 'Nama penulis: ');
        if (!author) {
            console.log('❌ Nama penulis wajib diisi!');
            process.exit(1);
        }

        // Select sector
        console.log('\nPilih sektor:');
        Object.entries(SECTORS).forEach(([key, sector], index) => {
            console.log(`${index + 1}. ${sector.name} (${key})`);
        });

        const sectorChoice = await promptUser(rl, 'Pilih sektor (1-4): ');
        const sectorKeys = Object.keys(SECTORS);
        const selectedSectorKey = sectorKeys[parseInt(sectorChoice) - 1];
        
        if (!selectedSectorKey) {
            console.log('❌ Pilihan sektor tidak valid!');
            process.exit(1);
        }

        // Stock symbols
        console.log(`\nSaham umum untuk sektor ${SECTORS[selectedSectorKey].name}:`);
        console.log(COMMON_STOCKS[selectedSectorKey]?.join(', ') || 'Tidak ada saran');
        
        const stockSymbolsInput = await promptUser(rl, 'Kode saham (pisahkan dengan koma, contoh: BBCA.JK,TLKM.JK): ');
        const stockSymbols = stockSymbolsInput 
            ? stockSymbolsInput.split(',').map(s => s.trim().toUpperCase()).filter(Boolean)
            : [];

        // Validate stock symbols
        const invalidSymbols = stockSymbols.filter(symbol => !validateStockSymbol(symbol));
        if (invalidSymbols.length > 0) {
            console.log(`⚠️  Kode saham tidak valid: ${invalidSymbols.join(', ')}`);
            console.log('Format yang benar: XXXX.JK (contoh: BBCA.JK)');
        }

        // Breaking news check
        const isBreakingInput = await promptUser(rl, 'Breaking news? (y/n): ');
        const isBreaking = isBreakingInput.toLowerCase() === 'y';

        // Tags
        const tagsInput = await promptUser(rl, 'Tags (pisahkan dengan koma): ');
        const tags = tagsInput 
            ? tagsInput.split(',').map(t => t.trim()).filter(Boolean)
            : [];

        // Generate metadata
        const metadata = {
            title,
            excerpt,
            author,
            category: selectedSectorKey,
            stockSymbols: stockSymbols.filter(s => validateStockSymbol(s)),
            isBreaking,
            tags,
            publishDate: formatDate(new Date())
        };

        // Generate filename and path
        const slug = generateSlug(title);
        const sectorPath = SECTORS[selectedSectorKey].path;
        const fileName = `${slug}.md`;
        const filePath = path.join(__dirname, '..', 'src', 'content', 'news', sectorPath, fileName);

        // Create directory if it doesn't exist
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        // Generate article content
        const articleContent = createArticleContent(metadata);

        // Write file
        fs.writeFileSync(filePath, articleContent, 'utf8');

        console.log('\n✅ Artikel berhasil dibuat!');
        console.log(`📁 File: ${filePath}`);
        console.log(`🔗 URL: /berita/${slug}`);
        
        if (invalidSymbols.length > 0) {
            console.log(`⚠️  Perhatian: ${invalidSymbols.length} kode saham tidak valid diabaikan`);
        }

        console.log('\n📝 Langkah selanjutnya:');
        console.log('1. Edit konten artikel di file yang dibuat');
        console.log('2. Tambahkan gambar featured jika diperlukan');
        console.log('3. Review dan publish artikel');

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    } finally {
        rl.close();
    }
}

// Handle process termination
process.on('SIGINT', () => {
    console.log('\n\n👋 Artikel creation dibatalkan');
    process.exit(0);
});

// Run the script
main().catch(console.error);