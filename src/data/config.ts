export const siteConfig = {
  companyName: 'Sahamindo',
  siteUrl: 'https://sahamindo.com',
  language: 'id-ID',
  locale: 'id',
  marketFocus: 'Indonesia',
  Socials: {
      xSocial: 'https://x.com/sahamindo',
      Github: 'https://github.com/sahamindo',
      Instagram: 'https://www.instagram.com/sahamindo',
      LinkedIn: 'https://www.linkedin.com/company/sahamindo',
      Email: 'info@sahamindo.com',
      Phone: '+62 21 1234 5678',
      Location: 'Jakarta, Indonesia',
  }
};

export const SEO = {
  Separator: '|',
  SiteName: 'Sahamindo',
  defaultDescription: 'Portal berita dan analisis pasar saham Indonesia - Informasi terkini sektor perbankan, IPO, barang konsumen, dan infrastruktur',
};
  
export const newsSetting = {
  articlesPerPage: 10   
}

export const themeSetting = {
  theme: 'poseidon' // Using ocean theme for professional finance look
}

export const marketSectors = [
  { id: 'banking', name: 'Perbankan', slug: 'perbankan', icon: '🏦' },
  { id: 'ipo', name: 'IPO', slug: 'ipo', icon: '📈' },
  { id: 'consumer', name: 'Barang Konsumen', slug: 'barang-konsumen', icon: '🛒' },
  { id: 'infrastructure', name: 'Infrastruktur', slug: 'infrastruktur', icon: '🏗️' }
];