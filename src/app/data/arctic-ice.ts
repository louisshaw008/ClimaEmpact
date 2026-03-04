/**
 * Arctic Sea Ice Extent Data
 * 
 * Data source: National Snow and Ice Data Center (NSIDC)
 * Satellite passive microwave measurements
 * 
 * Arctic sea ice shows strong seasonal variation:
 * - Maximum extent: March (end of winter)
 * - Minimum extent: September (end of summer melt)
 * 
 * The September minimum is the most important climate indicator
 * as it shows long-term decline trend clearly.
 * 
 * References:
 * - NSIDC Sea Ice Index: https://nsidc.org/data/seaice_index
 * - NASA Cryosphere: https://climate.nasa.gov/vital-signs/arctic-sea-ice/
 * - IPCC AR6 WG1 Chapter 9
 * 
 * Last updated: March 2026
 */

export interface ArcticIceData {
  year: string;
  /** March maximum extent in million km² */
  marchMax: number;
  /** September minimum extent in million km² */
  septMin: number;
}

/**
 * Arctic sea ice extent (1979-2025)
 * Satellite era measurements
 * Values in million square kilometers
 */
export const arcticIce: ArcticIceData[] = [
  { year: '1979', marchMax: 16.5, septMin: 7.2 },
  { year: '1980', marchMax: 16.2, septMin: 7.9 },
  { year: '1981', marchMax: 16.3, septMin: 7.3 },
  { year: '1982', marchMax: 16.4, septMin: 7.5 },
  { year: '1983', marchMax: 16.6, septMin: 7.6 },
  { year: '1984', marchMax: 16.1, septMin: 7.2 },
  { year: '1985', marchMax: 16.3, septMin: 6.9 },
  { year: '1986', marchMax: 16.5, septMin: 7.5 },
  { year: '1987', marchMax: 16.2, septMin: 7.4 },
  { year: '1988', marchMax: 16.4, septMin: 7.5 },
  { year: '1989', marchMax: 16.3, septMin: 7.0 },
  { year: '1990', marchMax: 16.1, septMin: 6.2 },
  { year: '1991', marchMax: 16.0, septMin: 6.6 },
  { year: '1992', marchMax: 16.2, septMin: 7.6 },
  { year: '1993', marchMax: 16.3, septMin: 6.5 },
  { year: '1994', marchMax: 16.1, septMin: 7.2 },
  { year: '1995', marchMax: 15.9, septMin: 6.1 },
  { year: '1996', marchMax: 15.8, septMin: 7.9 },
  { year: '1997', marchMax: 15.7, septMin: 6.7 },
  { year: '1998', marchMax: 16.0, septMin: 6.6 },
  { year: '1999', marchMax: 15.8, septMin: 6.2 },
  { year: '2000', marchMax: 15.6, septMin: 6.3 },
  { year: '2001', marchMax: 15.5, septMin: 6.7 },
  { year: '2002', marchMax: 15.7, septMin: 5.9 },
  { year: '2003', marchMax: 15.6, septMin: 6.1 },
  { year: '2004', marchMax: 15.4, septMin: 6.0 },
  { year: '2005', marchMax: 15.2, septMin: 5.6 },
  { year: '2006', marchMax: 15.1, septMin: 5.9 },
  { year: '2007', marchMax: 15.0, septMin: 4.3 }, // Record minimum at the time
  { year: '2008', marchMax: 15.3, septMin: 4.7 },
  { year: '2009', marchMax: 15.2, septMin: 5.4 },
  { year: '2010', marchMax: 15.1, septMin: 4.9 },
  { year: '2011', marchMax: 14.8, septMin: 4.6 },
  { year: '2012', marchMax: 15.2, septMin: 3.6 }, // All-time record minimum
  { year: '2013', marchMax: 15.1, septMin: 5.2 },
  { year: '2014', marchMax: 14.9, septMin: 5.3 },
  { year: '2015', marchMax: 14.5, septMin: 4.6 },
  { year: '2016', marchMax: 14.4, septMin: 4.7 },
  { year: '2017', marchMax: 14.3, septMin: 4.8 },
  { year: '2018', marchMax: 14.5, septMin: 4.7 },
  { year: '2019', marchMax: 14.8, septMin: 4.3 },
  { year: '2020', marchMax: 14.6, septMin: 3.9 },
  { year: '2021', marchMax: 14.4, septMin: 4.9 },
  { year: '2022', marchMax: 14.3, septMin: 4.9 },
  { year: '2023', marchMax: 14.6, septMin: 4.4 },
  { year: '2024', marchMax: 14.2, septMin: 4.1 },
  { year: '2025', marchMax: 14.3, septMin: 4.3 },
];

/**
 * Arctic sea ice statistics and trends
 */
export const arcticIceStats = {
  /** 1979-1988 average September minimum */
  baseline1980s: 7.3,
  /** 2015-2024 average September minimum */
  recent2020s: 4.4,
  /** Decline since 1980s (million km²) */
  decline: 2.9,
  /** Percentage decline */
  percentDecline: 40,
  /** Rate of decline per decade (September minimum) */
  declineRate: '12.3% per decade',
  /** Record low year */
  recordLowYear: 2012,
  /** Record low extent */
  recordLowExtent: 3.6,
  /** Ice-free summer projection */
  iceFreeProjection: '2040-2060 (first occurrence)',
  /** Impact on albedo */
  albedoImpact: 'Reduced reflectivity amplifies Arctic warming 2-3x global average',
  /** Thickness decline */
  thicknessDecline: '~66% loss of multi-year ice since 1979',
};

/**
 * Get September minimum trend (most climate-relevant metric)
 */
export function getSeptemberMinimumTrend() {
  return arcticIce.map(data => ({
    year: data.year,
    extent: data.septMin,
  }));
}

/**
 * Calculate decadal averages for September minimum
 */
export function getDecadalAverages() {
  const decades = [
    { decade: '1980s', years: arcticIce.filter(d => parseInt(d.year) >= 1979 && parseInt(d.year) < 1990) },
    { decade: '1990s', years: arcticIce.filter(d => parseInt(d.year) >= 1990 && parseInt(d.year) < 2000) },
    { decade: '2000s', years: arcticIce.filter(d => parseInt(d.year) >= 2000 && parseInt(d.year) < 2010) },
    { decade: '2010s', years: arcticIce.filter(d => parseInt(d.year) >= 2010 && parseInt(d.year) < 2020) },
    { decade: '2020s', years: arcticIce.filter(d => parseInt(d.year) >= 2020) },
  ];

  return decades.map(d => ({
    decade: d.decade,
    avgSeptMin: d.years.reduce((sum, ice) => sum + ice.septMin, 0) / d.years.length,
    avgMarchMax: d.years.reduce((sum, ice) => sum + ice.marchMax, 0) / d.years.length,
  }));
}
