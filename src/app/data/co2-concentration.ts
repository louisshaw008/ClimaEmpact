/**
 * Atmospheric CO₂ Concentration Data
 * 
 * Data source: Scripps Institution of Oceanography (Keeling Curve)
 * Mauna Loa Observatory, Hawaii
 * 
 * The Keeling Curve is one of the most important scientific datasets
 * in climate science, showing the continuous rise of atmospheric CO₂
 * since systematic measurements began in 1958.
 * 
 * Pre-1958 data from ice core measurements (Law Dome, Antarctica)
 * 
 * References:
 * - Scripps CO₂ Program: https://scrippsco2.ucsd.edu/
 * - NOAA Global Monitoring Laboratory: https://gml.noaa.gov/ccgg/trends/
 * - IPCC AR6 WG1: https://www.ipcc.ch/report/ar6/wg1/
 * 
 * Last updated: March 2026
 */

export interface CO2Data {
  year: string;
  /** CO₂ concentration in parts per million (ppm) */
  co2: number;
  /** Annual growth rate in ppm/year */
  growthRate?: number;
}

/**
 * Annual average atmospheric CO₂ concentration (1800-2025)
 * Values in parts per million (ppm)
 */
export const co2Concentration: CO2Data[] = [
  // Ice core data (pre-Mauna Loa)
  { year: '1800', co2: 283 },
  { year: '1810', co2: 283 },
  { year: '1820', co2: 284 },
  { year: '1830', co2: 284 },
  { year: '1840', co2: 285 },
  { year: '1850', co2: 285 },
  { year: '1860', co2: 286 },
  { year: '1870', co2: 288 },
  { year: '1880', co2: 290 },
  { year: '1890', co2: 292 },
  { year: '1900', co2: 295 },
  { year: '1910', co2: 299 },
  { year: '1920', co2: 303 },
  { year: '1930', co2: 306 },
  { year: '1940', co2: 310 },
  { year: '1950', co2: 311 },
  // Mauna Loa direct measurements begin
  { year: '1959', co2: 316, growthRate: 0.9 },
  { year: '1960', co2: 317, growthRate: 0.5 },
  { year: '1965', co2: 320, growthRate: 0.9 },
  { year: '1970', co2: 326, growthRate: 1.1 },
  { year: '1975', co2: 331, growthRate: 1.2 },
  { year: '1980', co2: 339, growthRate: 1.6 },
  { year: '1985', co2: 346, growthRate: 1.3 },
  { year: '1990', co2: 354, growthRate: 1.5 },
  { year: '1995', co2: 361, growthRate: 1.9 },
  { year: '2000', co2: 369, growthRate: 1.6 },
  { year: '2001', co2: 371, growthRate: 1.7 },
  { year: '2002', co2: 373, growthRate: 2.5 },
  { year: '2003', co2: 376, growthRate: 2.3 },
  { year: '2004', co2: 378, growthRate: 1.5 },
  { year: '2005', co2: 380, growthRate: 2.5 },
  { year: '2006', co2: 382, growthRate: 1.8 },
  { year: '2007', co2: 384, growthRate: 2.2 },
  { year: '2008', co2: 386, growthRate: 1.6 },
  { year: '2009', co2: 387, growthRate: 1.9 },
  { year: '2010', co2: 390, growthRate: 2.4 },
  { year: '2011', co2: 392, growthRate: 1.9 },
  { year: '2012', co2: 394, growthRate: 2.6 },
  { year: '2013', co2: 397, growthRate: 2.1 },
  { year: '2014', co2: 399, growthRate: 2.2 },
  { year: '2015', co2: 401, growthRate: 3.1 },
  { year: '2016', co2: 404, growthRate: 3.0 },
  { year: '2017', co2: 407, growthRate: 2.2 },
  { year: '2018', co2: 409, growthRate: 2.5 },
  { year: '2019', co2: 412, growthRate: 2.5 },
  { year: '2020', co2: 414, growthRate: 2.4 },
  { year: '2021', co2: 417, growthRate: 2.4 },
  { year: '2022', co2: 421, growthRate: 2.8 },
  { year: '2023', co2: 424, growthRate: 2.9 },
  { year: '2024', co2: 427, growthRate: 2.7 },
  { year: '2025', co2: 429, growthRate: 2.5 },
];

/**
 * Key CO₂ milestones and statistics
 */
export const co2Stats = {
  /** Current CO₂ concentration */
  current: 429,
  /** Pre-industrial level (1750-1800 average) */
  preIndustrial: 280,
  /** Increase since pre-industrial */
  increase: 149,
  /** Percentage increase */
  percentIncrease: 53,
  /** Years to reach current level naturally: ~800,000 years */
  naturalTimeframe: '800,000+ years',
  /** Current annual growth rate */
  currentGrowthRate: 2.5,
  /** Safe threshold (debated, but often cited) */
  safeThreshold: 350,
  /** Last time CO₂ was this high */
  lastTimeThisHigh: '3-5 million years ago (Pliocene Epoch)',
};
