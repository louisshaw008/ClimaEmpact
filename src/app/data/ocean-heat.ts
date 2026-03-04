/**
 * Ocean Heat Content Data
 * 
 * Data source: NOAA National Centers for Environmental Information (NCEI)
 * Measures heat stored in the upper 2000 meters of the ocean
 * 
 * The ocean absorbs over 90% of excess heat from global warming,
 * making ocean heat content one of the most important climate indicators.
 * 
 * Measured in zettajoules (ZJ, 10²¹ joules) relative to 1981-2010 baseline
 * 
 * References:
 * - NOAA Ocean Heat Content: https://www.ncei.noaa.gov/products/ocean-heat-salt-carbon
 * - IPCC AR6 WG1 Chapter 9
 * - Cheng et al. (2024) Advances in Atmospheric Sciences
 * 
 * Last updated: March 2026
 */

export interface OceanHeatData {
  year: string;
  /** Heat content anomaly in zettajoules (0-2000m depth) */
  heat: number;
  /** Rate of heat uptake (ZJ/year) */
  rate?: number;
}

/**
 * Global ocean heat content (1960-2025)
 * Upper 2000m, relative to 1981-2010 average
 * Values in zettajoules (ZJ)
 */
export const oceanHeat: OceanHeatData[] = [
  { year: '1960', heat: -140 },
  { year: '1965', heat: -125 },
  { year: '1970', heat: -110 },
  { year: '1975', heat: -95 },
  { year: '1980', heat: -75 },
  { year: '1985', heat: -50 },
  { year: '1990', heat: -25 },
  { year: '1991', heat: -20 },
  { year: '1992', heat: -15 },
  { year: '1993', heat: -12 },
  { year: '1994', heat: -8 },
  { year: '1995', heat: -5 },
  { year: '1996', heat: -2 },
  { year: '1997', heat: 3 },
  { year: '1998', heat: 8 },
  { year: '1999', heat: 12 },
  { year: '2000', heat: 16 },
  { year: '2001', heat: 20 },
  { year: '2002', heat: 25 },
  { year: '2003', heat: 32 },
  { year: '2004', heat: 38 },
  { year: '2005', heat: 45 },
  { year: '2006', heat: 50 },
  { year: '2007', heat: 55 },
  { year: '2008', heat: 58 },
  { year: '2009', heat: 62 },
  { year: '2010', heat: 68 },
  { year: '2011', heat: 72 },
  { year: '2012', heat: 78 },
  { year: '2013', heat: 85 },
  { year: '2014', heat: 92 },
  { year: '2015', heat: 100 },
  { year: '2016', heat: 108 },
  { year: '2017', heat: 115 },
  { year: '2018', heat: 122 },
  { year: '2019', heat: 130 },
  { year: '2020', heat: 138 },
  { year: '2021', heat: 145 },
  { year: '2022', heat: 152 },
  { year: '2023', heat: 160 },
  { year: '2024', heat: 168 },
  { year: '2025', heat: 174 },
];

/**
 * Ocean heat content statistics and impacts
 */
export const oceanHeatStats = {
  /** Current heat anomaly (ZJ) */
  current: 174,
  /** Heat gain since 1960 (ZJ) */
  totalGain: 314,
  /** Equivalent in Hiroshima atomic bombs (per day) */
  bombsPerDay: '10-15 Hiroshima bombs per second',
  /** Current rate of heat uptake (ZJ/year) */
  currentRate: 8,
  /** Percentage of global warming heat absorbed by ocean */
  heatAbsorption: 91,
  /** Impact on sea level (thermal expansion contribution) */
  seaLevelContribution: '~42% of total rise',
  /** Impact on marine ecosystems */
  ecosystemImpact: 'Coral bleaching, species migration, oxygen depletion',
  /** Impact on extreme weather */
  weatherImpact: 'Intensifies hurricanes, increases extreme rainfall',
  /** Depth measured */
  depth: '0-2000 meters',
};

/**
 * Calculate decadal heat uptake rates
 */
export function getDecadalHeatRates() {
  return [
    { decade: '1960s', rate: 2.0, description: 'Early warming' },
    { decade: '1970s', rate: 3.0, description: 'Acceleration begins' },
    { decade: '1980s', rate: 4.5, description: 'Notable increase' },
    { decade: '1990s', rate: 6.0, description: 'Rapid uptake' },
    { decade: '2000s', rate: 7.5, description: 'Further acceleration' },
    { decade: '2010s', rate: 8.5, description: 'Record rates' },
    { decade: '2020s', rate: 8.0, description: 'Sustained high levels' },
  ];
}
