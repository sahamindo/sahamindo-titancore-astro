interface MarketSector {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export const marketSectors: MarketSector[] = [
  {
    id: 'banking',
    name: 'Perbankan',
    slug: 'perbankan',
    description: 'Berita dan analisis sektor perbankan Indonesia - BBCA, BBRI, BMRI, BBNI',
    icon: '🏦'
  },
  {
    id: 'ipo',
    name: 'IPO',
    slug: 'ipo',
    description: 'Informasi penawaran saham perdana (IPO) di Bursa Efek Indonesia',
    icon: '📈'
  },
  {
    id: 'consumer',
    name: 'Barang Konsumen',
    slug: 'barang-konsumen',
    description: 'Berita saham sektor konsumer - ICBP, INDF, UNVR, GGRM',
    icon: '🛒'
  },
  {
    id: 'infrastructure',
    name: 'Infrastruktur',
    slug: 'infrastruktur',
    description: 'Analisis sektor infrastruktur dan konstruksi - WIKA, WSKT, ADHI, PTPP',
    icon: '🏗️'
  },
  
];

// Helper function to get sector by slug
export function getSectorBySlug(slug: string): MarketSector | undefined {
  return marketSectors.find(sector => sector.slug === slug);
}

// Helper function to get sector by id
export function getSectorById(id: string): MarketSector | undefined {
  return marketSectors.find(sector => sector.id === id);
}

// Legacy support - map categories to marketSectors
export const categories = marketSectors;