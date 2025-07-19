/**
 * Utility functions for handling Indonesian stock symbols
 */

// Regex pattern for Indonesian stock symbols (XXXX.JK format)
export const STOCK_SYMBOL_PATTERN = /\b[A-Z]{4}\.JK\b/g;

/**
 * Validate if a string is a valid Indonesian stock symbol
 */
export function isValidStockSymbol(symbol: string): boolean {
  return /^[A-Z]{4}\.JK$/.test(symbol);
}

/**
 * Extract stock symbols from text content
 */
export function extractStockSymbols(text: string): string[] {
  const matches = text.match(STOCK_SYMBOL_PATTERN) || [];
  return [...new Set(matches)]; // Remove duplicates
}

/**
 * Format stock symbol for display
 */
export function formatStockSymbol(symbol: string): string {
  if (!isValidStockSymbol(symbol)) {
    return symbol;
  }
  return symbol.replace('.JK', '.JK');
}

/**
 * Common Indonesian stock symbols by sector
 */
export const COMMON_STOCKS = {
  banking: ['BBCA.JK', 'BBRI.JK', 'BMRI.JK', 'BBNI.JK', 'BNGA.JK'],
  consumer: ['ICBP.JK', 'INDF.JK', 'UNVR.JK', 'GGRM.JK', 'KLBF.JK'],
  infrastructure: ['WIKA.JK', 'WSKT.JK', 'ADHI.JK', 'PTPP.JK', 'JSMR.JK'],
  technology: ['GOTO.JK', 'BUKA.JK', 'EMTK.JK', 'TLKM.JK', 'EXCL.JK'],
  mining: ['ADRO.JK', 'ITMG.JK', 'PTBA.JK', 'INCO.JK', 'ANTM.JK'],
  property: ['BSDE.JK', 'SMRA.JK', 'CTRA.JK', 'PWON.JK', 'DILD.JK']
};

/**
 * Get sector for a given stock symbol
 */
export function getStockSector(symbol: string): string | null {
  for (const [sector, stocks] of Object.entries(COMMON_STOCKS)) {
    if (stocks.includes(symbol)) {
      return sector;
    }
  }
  return null;
}