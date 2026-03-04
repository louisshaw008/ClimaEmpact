/**
 * Global Carbon Emissions Data
 * 
 * Data source: Global Carbon Project
 * Annual fossil fuel CO₂ emissions + land use change emissions
 * 
 * Global emissions are the primary driver of atmospheric CO₂ increase
 * and climate change. This tracks humanity's carbon footprint over time.
 * 
 * Values in gigatons of CO₂ per year (Gt CO₂/year)
 * 1 Gt CO₂ = 1 billion metric tons = 0.273 Gt C (carbon)
 * 
 * References:
 * - Global Carbon Project: https://www.globalcarbonproject.org/
 * - CDIAC (Carbon Dioxide Information Analysis Center)
 * - IPCC AR6 WG3
 * 
 * Last updated: March 2026
 */

export interface CarbonEmissionsData {
  year: string;
  /** Fossil fuel & industry emissions (Gt CO₂/year) */
  fossilFuel: number;
  /** Land use change emissions (Gt CO₂/year) */
  landUse: number;
  /** Total CO₂ emissions (Gt CO₂/year) */
  total: number;
}

/**
 * Global CO₂ emissions (1900-2025)
 * Includes fossil fuels, cement, and land use change
 */
export const carbonEmissions: CarbonEmissionsData[] = [
  { year: '1900', fossilFuel: 2.0, landUse: 1.5, total: 3.5 },
  { year: '1910', fossilFuel: 3.2, landUse: 1.6, total: 4.8 },
  { year: '1920', fossilFuel: 3.8, landUse: 1.7, total: 5.5 },
  { year: '1930', fossilFuel: 4.1, landUse: 1.8, total: 5.9 },
  { year: '1940', fossilFuel: 5.0, landUse: 1.9, total: 6.9 },
  { year: '1950', fossilFuel: 6.0, landUse: 2.0, total: 8.0 },
  { year: '1960', fossilFuel: 9.4, landUse: 2.2, total: 11.6 },
  { year: '1965', fossilFuel: 11.2, landUse: 2.3, total: 13.5 },
  { year: '1970', fossilFuel: 14.9, landUse: 2.5, total: 17.4 },
  { year: '1975', fossilFuel: 16.8, landUse: 2.6, total: 19.4 },
  { year: '1980', fossilFuel: 19.5, landUse: 2.8, total: 22.3 },
  { year: '1985', fossilFuel: 20.3, landUse: 3.0, total: 23.3 },
  { year: '1990', fossilFuel: 22.7, landUse: 3.2, total: 25.9 },
  { year: '1991', fossilFuel: 23.0, landUse: 3.2, total: 26.2 },
  { year: '1992', fossilFuel: 23.1, landUse: 3.3, total: 26.4 },
  { year: '1993', fossilFuel: 23.3, landUse: 3.3, total: 26.6 },
  { year: '1994', fossilFuel: 23.7, landUse: 3.4, total: 27.1 },
  { year: '1995', fossilFuel: 24.2, landUse: 3.4, total: 27.6 },
  { year: '1996', fossilFuel: 24.8, landUse: 3.5, total: 28.3 },
  { year: '1997', fossilFuel: 25.3, landUse: 3.5, total: 28.8 },
  { year: '1998', fossilFuel: 25.5, landUse: 3.6, total: 29.1 },
  { year: '1999', fossilFuel: 25.8, landUse: 3.6, total: 29.4 },
  { year: '2000', fossilFuel: 26.6, landUse: 3.7, total: 30.3 },
  { year: '2001', fossilFuel: 27.0, landUse: 3.7, total: 30.7 },
  { year: '2002', fossilFuel: 27.5, landUse: 3.8, total: 31.3 },
  { year: '2003', fossilFuel: 28.7, landUse: 3.8, total: 32.5 },
  { year: '2004', fossilFuel: 30.0, landUse: 3.9, total: 33.9 },
  { year: '2005', fossilFuel: 31.0, landUse: 3.9, total: 34.9 },
  { year: '2006', fossilFuel: 32.1, landUse: 4.0, total: 36.1 },
  { year: '2007', fossilFuel: 33.0, landUse: 4.0, total: 37.0 },
  { year: '2008', fossilFuel: 33.5, landUse: 4.1, total: 37.6 },
  { year: '2009', fossilFuel: 32.8, landUse: 4.1, total: 36.9 },
  { year: '2010', fossilFuel: 34.7, landUse: 4.2, total: 38.9 },
  { year: '2011', fossilFuel: 35.6, landUse: 4.2, total: 39.8 },
  { year: '2012', fossilFuel: 36.2, landUse: 4.3, total: 40.5 },
  { year: '2013', fossilFuel: 36.8, landUse: 4.3, total: 41.1 },
  { year: '2014', fossilFuel: 37.2, landUse: 4.4, total: 41.6 },
  { year: '2015', fossilFuel: 37.4, landUse: 4.4, total: 41.8 },
  { year: '2016', fossilFuel: 37.5, landUse: 4.5, total: 42.0 },
  { year: '2017', fossilFuel: 38.0, landUse: 4.5, total: 42.5 },
  { year: '2018', fossilFuel: 38.7, landUse: 4.6, total: 43.3 },
  { year: '2019', fossilFuel: 39.2, landUse: 4.6, total: 43.8 },
  { year: '2020', fossilFuel: 36.7, landUse: 4.7, total: 41.4 }, // COVID-19 impact
  { year: '2021', fossilFuel: 38.5, landUse: 4.7, total: 43.2 },
  { year: '2022', fossilFuel: 39.3, landUse: 4.8, total: 44.1 },
  { year: '2023', fossilFuel: 39.8, landUse: 4.8, total: 44.6 },
  { year: '2024', fossilFuel: 40.2, landUse: 4.9, total: 45.1 },
  { year: '2025', fossilFuel: 40.0, landUse: 4.9, total: 44.9 }, // Preliminary
];

/**
 * Emissions statistics and targets
 */
export const emissionsStats = {
  /** Current annual emissions (Gt CO₂) */
  current: 45.1,
  /** Pre-industrial annual emissions (Gt CO₂) */
  preIndustrial: 0,
  /** Peak year (so far) */
  peakYear: 2024,
  /** Peak emissions */
  peakEmissions: 45.1,
  /** Total cumulative emissions since 1850 (Gt CO₂) */
  cumulativeSince1850: 2400,
  /** Remaining carbon budget for 1.5°C (50% probability) */
  remainingBudget1p5C: 380,
  /** Years until budget exhausted at current rate */
  yearsRemaining1p5C: 8.4,
  /** Remaining carbon budget for 2°C (67% probability) */
  remainingBudget2C: 1150,
  /** Required reduction rate per year to reach net zero by 2050 */
  reductionRateNeeded: '7.6% per year',
  /** Largest emitters (2024, % of global total) */
  topEmitters: {
    China: 30.2,
    USA: 13.5,
    EU27: 7.2,
    India: 7.1,
    Russia: 4.5,
  },
  /** Per capita leaders (tons CO₂/person/year) */
  perCapitaLeaders: {
    Qatar: 37.6,
    Kuwait: 25.6,
    UAE: 23.3,
    USA: 14.9,
    Canada: 14.2,
  },
};

/**
 * Calculate cumulative emissions for different time periods
 */
export function getCumulativeEmissions(startYear: number = 1900) {
  const relevantData = carbonEmissions.filter(d => parseInt(d.year) >= startYear);
  let cumulative = 0;
  return relevantData.map(data => {
    cumulative += data.total;
    return {
      year: data.year,
      cumulative: Math.round(cumulative),
    };
  });
}

/**
 * Get emission growth rates by decade
 */
export function getDecadalGrowthRates() {
  return [
    { decade: '1900s', avgEmissions: 4.1, growth: 'Baseline' },
    { decade: '1950s', avgEmissions: 7.2, growth: '+76%' },
    { decade: '1970s', avgEmissions: 18.4, growth: '+156%' },
    { decade: '1990s', avgEmissions: 27.5, growth: '+50%' },
    { decade: '2010s', avgEmissions: 40.6, growth: '+48%' },
    { decade: '2020s', avgEmissions: 44.1, growth: '+9%' },
  ];
}
