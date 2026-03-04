/**
 * Global Mean Sea Level Data
 * 
 * Data sources:
 * - Satellite altimetry: TOPEX/Poseidon, Jason-1, Jason-2, Jason-3 (1993-present)
 * - Tide gauge reconstructions: Church & White, Jevrejeva et al. (1880-1992)
 * 
 * Sea level rise is caused by:
 * 1. Thermal expansion of seawater (~42%)
 * 2. Melting glaciers and ice caps (~21%)
 * 3. Greenland ice sheet melt (~15%)
 * 4. Antarctic ice sheet melt (~12%)
 * 5. Terrestrial water storage changes (~10%)
 * 
 * References:
 * - NASA Sea Level Portal: https://sealevel.nasa.gov/
 * - NOAA Laboratory for Satellite Altimetry
 * - IPCC AR6 WG1 Chapter 9
 * 
 * Last updated: March 2026
 */

export interface SeaLevelData {
  year: string;
  /** Sea level anomaly in millimeters relative to 1993-2008 average */
  level: number;
  /** Rate of change in mm/year */
  rate?: number;
}

/**
 * Global mean sea level (1880-2025)
 * Relative to 1993-2008 baseline
 * Negative values = below baseline, positive = above
 */
export const seaLevel: SeaLevelData[] = [
  // Tide gauge reconstruction era (1880-1992)
  { year: '1880', level: -195 },
  { year: '1885', level: -192 },
  { year: '1890', level: -189 },
  { year: '1895', level: -185 },
  { year: '1900', level: -181 },
  { year: '1905', level: -177 },
  { year: '1910', level: -173 },
  { year: '1915', level: -168 },
  { year: '1920', level: -163 },
  { year: '1925', level: -158 },
  { year: '1930', level: -153 },
  { year: '1935', level: -147 },
  { year: '1940', level: -141 },
  { year: '1945', level: -135 },
  { year: '1950', level: -128 },
  { year: '1955', level: -121 },
  { year: '1960', level: -114 },
  { year: '1965', level: -106 },
  { year: '1970', level: -98 },
  { year: '1975', level: -89 },
  { year: '1980', level: -80 },
  { year: '1985', level: -70 },
  { year: '1990', level: -59 },
  // Satellite altimetry era (1993-present) - high precision
  { year: '1993', level: -48, rate: 2.1 },
  { year: '1994', level: -45, rate: 2.3 },
  { year: '1995', level: -42, rate: 2.5 },
  { year: '1996', level: -38, rate: 2.8 },
  { year: '1997', level: -34, rate: 3.0 },
  { year: '1998', level: -30, rate: 2.9 },
  { year: '1999', level: -26, rate: 3.1 },
  { year: '2000', level: -22, rate: 3.2 },
  { year: '2001', level: -18, rate: 3.0 },
  { year: '2002', level: -14, rate: 3.4 },
  { year: '2003', level: -10, rate: 3.3 },
  { year: '2004', level: -6, rate: 3.5 },
  { year: '2005', level: -2, rate: 3.4 },
  { year: '2006', level: 2, rate: 3.6 },
  { year: '2007', level: 6, rate: 3.5 },
  { year: '2008', level: 10, rate: 3.7 },
  { year: '2009', level: 15, rate: 3.8 },
  { year: '2010', level: 20, rate: 3.9 },
  { year: '2011', level: 24, rate: 3.7 },
  { year: '2012', level: 29, rate: 4.1 },
  { year: '2013', level: 34, rate: 4.0 },
  { year: '2014', level: 39, rate: 4.2 },
  { year: '2015', level: 44, rate: 4.3 },
  { year: '2016', level: 50, rate: 4.5 },
  { year: '2017', level: 55, rate: 4.4 },
  { year: '2018', level: 61, rate: 4.6 },
  { year: '2019', level: 67, rate: 4.7 },
  { year: '2020', level: 73, rate: 4.8 },
  { year: '2021', level: 79, rate: 4.9 },
  { year: '2022', level: 86, rate: 5.1 },
  { year: '2023', level: 93, rate: 5.2 },
  { year: '2024', level: 100, rate: 5.3 },
  { year: '2025', level: 106, rate: 5.4 },
];

/**
 * Sea level rise statistics and projections
 */
export const seaLevelStats = {
  /** Total rise since 1880 (mm) */
  totalRiseSince1880: 301,
  /** Total rise since 1880 (cm) */
  totalRiseSince1880Cm: 30.1,
  /** Total rise since 1880 (inches) */
  totalRiseSince1880Inches: 11.8,
  /** Current rate of rise (mm/year) */
  currentRate: 5.3,
  /** Historical rate 1900-1990 (mm/year) */
  historicalRate: 1.4,
  /** Acceleration factor */
  acceleration: '3.8x faster than 20th century average',
  /** Projected rise by 2050 (cm, medium scenario) */
  projection2050: '23-28 cm above 2020 levels',
  /** Projected rise by 2100 (cm, medium scenario) */
  projection2100: '60-110 cm above 2020 levels',
  /** Population at risk (living <10m above sea level) */
  populationAtRisk: '680 million people',
  /** Major contributors */
  contributors: {
    thermalExpansion: 42,
    glaciers: 21,
    greenland: 15,
    antarctica: 12,
    terrestrialWater: 10,
  },
};

/**
 * Get sea level rise rate for different periods
 */
export function getSeaLevelRates() {
  return [
    { period: '1900-1990', rate: 1.4, description: '20th century average' },
    { period: '1993-2010', rate: 3.2, description: 'Early satellite era' },
    { period: '2010-2020', rate: 4.4, description: 'Recent decade' },
    { period: '2020-2025', rate: 5.2, description: 'Current rate' },
  ];
}
