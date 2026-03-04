import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  Filter,
  ThermometerSun,
  CloudRain,
  Wind,
  Droplets,
  Snowflake,
  Map as MapIcon,
  Layers,
  X,
  Info,
  CalendarRange,
  MapPin,
  Globe,
  Zap,
  CloudLightning,
  Gauge,
} from 'lucide-react';
import { cn } from '../utils/cn';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import tropicalCycloneData from '../data/tropical_cyclone.json';

// --- Tropical Cyclone JSON shape ---
interface TropicalCycloneRecord {
  disno: string;
  start: string;
  end: string;
  max_wind_ms: number;
  max_rain_mm: number;
  max_rain_bin: string;
  wind_symmetry: string;
  wind_coverage_frac: number;
  rain_coverage_frac: number;
  wind_coverage_text: string;
  rain_coverage_text: string;
  rain_asym_dir: string;
  wind_max_quadrant: string | null;
  wind_rain_co_loc: string | null;
  rainband_type: string;
  max_wind_text: string;
  max_rain_text: string;
  storm_center: {
    lat: number;
    lon: number;
    land_sea: string;
    sea_area: string | null;
    country: string;
    admin1: string;
    nearest_city: string | null;
  };
  impact_summary: string;
}

// --- Types ---
type EventType = 'Heatwave' | 'Flood' | 'Storm' | 'Drought' | 'Coldwave';
const TYPES: EventType[] = ['Heatwave', 'Flood', 'Storm', 'Drought', 'Coldwave'];

interface StormDetail {
  disno: string;
  startDate: string;
  endDate: string;
  maxWindMs: number;
  maxRainMm: number;
  maxWindText: string;
  maxRainText: string;
  windCoverageText: string;
  rainCoverageText: string;
  rainbandType: string;
  impactSummary: string;
  windCoverageFrac: number;
  rainCoverageFrac: number;
  country: string;
  nearestCity: string | null;
}

interface ClimateEvent {
  id: string;
  title: string;
  type: EventType;
  date: string;
  year: number;
  lat: number;
  lng: number;
  intensity: 'High' | 'Severe' | 'Extreme';
  description: string;
  affectedArea: string;
  stormDetail?: StormDetail;
}

// --- Derive intensity from max wind speed ---
const windToIntensity = (ms: number): 'High' | 'Severe' | 'Extreme' => {
  if (ms >= 25) return 'Extreme';
  if (ms >= 17) return 'Severe';
  return 'High';
};

// --- Derive affected area (continent) from country ---
const countryToContinent = (country: string): string => {
  const map: Record<string, string> = {
    'Vanuatu': 'Oceania', 'Mauritius': 'Africa', 'Solomon Islands': 'Oceania',
    'Philippines': 'Asia', 'India': 'Asia', 'Bangladesh': 'Asia',
    'Puerto Rico': 'North America', 'Dominican Republic': 'North America',
    'Dominica': 'North America', 'U.S. Virgin Islands': 'North America',
    'Hong Kong': 'Asia', 'South Korea': 'Asia', 'Haiti': 'North America',
    'USA': 'North America', 'Japan': 'Asia', 'Réunion': 'Africa',
    'Guadeloupe': 'North America', 'Martinique': 'North America',
    'Anguilla': 'North America', 'Australia': 'Oceania',
    'Fiji': 'Oceania', 'Pakistan': 'Asia', 'Vietnam': 'Asia',
    'China': 'Asia', 'New Caledonia': 'Oceania',
  };
  for (const [key, val] of Object.entries(map)) {
    if (country.toLowerCase().includes(key.toLowerCase())) return val;
  }
  return 'Asia';
};

// --- Convert tropical cyclone JSON to ClimateEvent[] ---
const convertStormRecords = (records: TropicalCycloneRecord[]): ClimateEvent[] => {
  return records.map((r, i) => {
    const countryName = r.storm_center.country === 'Unknown country' ? (r.storm_center.sea_area || 'Unknown') : r.storm_center.country;
    const locationParts = [r.storm_center.nearest_city, r.storm_center.admin1 !== 'Unknown admin1' ? r.storm_center.admin1 : null, countryName].filter(Boolean);
    const title = `TC ${r.disno.split('-').slice(0, 2).join('-')} · ${countryName}`;
    const startYear = parseInt(r.start.split('-')[0], 10);

    return {
      id: `storm-${r.disno}`,
      title,
      type: 'Storm' as EventType,
      date: r.start,
      year: startYear,
      lat: r.storm_center.lat,
      lng: r.storm_center.lon,
      intensity: windToIntensity(r.max_wind_ms),
      description: locationParts.join(', '),
      affectedArea: countryToContinent(countryName),
      stormDetail: {
        disno: r.disno,
        startDate: r.start,
        endDate: r.end,
        maxWindMs: r.max_wind_ms,
        maxRainMm: r.max_rain_mm,
        maxWindText: r.max_wind_text,
        maxRainText: r.max_rain_text,
        windCoverageText: r.wind_coverage_text,
        rainCoverageText: r.rain_coverage_text,
        rainbandType: r.rainband_type,
        impactSummary: r.impact_summary,
        windCoverageFrac: r.wind_coverage_frac,
        rainCoverageFrac: r.rain_coverage_frac,
        country: countryName,
        nearestCity: r.storm_center.nearest_city,
      },
    };
  });
};

const STORM_EVENTS = convertStormRecords(tropicalCycloneData as TropicalCycloneRecord[]);

// --- Mock data for NON-storm types only ---
const generateMockEvents = (count: number): ClimateEvent[] => {
  const events: ClimateEvent[] = [];
  const nonStormTypes: EventType[] = ['Heatwave', 'Flood', 'Drought', 'Coldwave'];
  const areas = ['Europe', 'North America', 'Asia', 'South America', 'Africa', 'Oceania'];
  const mockYears = [2024, 2023, 2022, 2021, 2020];
  let seed = 42;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  for (let i = 0; i < count; i++) {
    const type = nonStormTypes[Math.floor(random() * nonStormTypes.length)];
    const year = mockYears[Math.floor(random() * mockYears.length)];
    const area = areas[Math.floor(random() * areas.length)];
    let lat = 0, lng = 0;
    if (area === 'Europe') { lat = 35 + random() * 25; lng = -10 + random() * 40; }
    else if (area === 'North America') { lat = 25 + random() * 35; lng = -130 + random() * 60; }
    else if (area === 'Asia') { lat = 10 + random() * 40; lng = 60 + random() * 80; }
    else if (area === 'South America') { lat = -50 + random() * 60; lng = -80 + random() * 40; }
    else if (area === 'Africa') { lat = -35 + random() * 70; lng = -20 + random() * 70; }
    else { lat = -40 + random() * 30; lng = 110 + random() * 50; }
    events.push({
      id: `evt-${i}`,
      title: `${area} ${type} ${year}`,
      type,
      date: `${year}-${Math.floor(random() * 12 + 1).toString().padStart(2, '0')}-${Math.floor(random() * 28 + 1).toString().padStart(2, '0')}`,
      year,
      lat,
      lng,
      intensity: random() > 0.7 ? 'Extreme' : random() > 0.4 ? 'Severe' : 'High',
      description: `A significant ${type.toLowerCase()} event affecting large parts of ${area}.`,
      affectedArea: area,
    });
  }
  return events;
};

// Combine real storm data with mock non-storm data
const ALL_EVENTS: ClimateEvent[] = [...STORM_EVENTS, ...generateMockEvents(48)];

// Derive YEARS dynamically from data
const YEARS = Array.from(new Set(ALL_EVENTS.map((e) => e.year))).sort((a, b) => b - a);

// --- Helpers ---
const getTypeColor = (type: EventType): string => {
  switch (type) {
    case 'Heatwave': return '#ef4444';
    case 'Flood': return '#3b82f6';
    case 'Storm': return '#94a3b8';
    case 'Drought': return '#f59e0b';
    case 'Coldwave': return '#06b6d4';
    default: return '#6b7280';
  }
};

// Continent colors for per-type distribution chart
const CONTINENTS = ['Europe', 'North America', 'Asia', 'South America', 'Africa', 'Oceania'] as const;
const getContinentColor = (continent: string): string => {
  switch (continent) {
    case 'Europe': return '#8b5cf6';
    case 'North America': return '#06b6d4';
    case 'Asia': return '#f59e0b';
    case 'South America': return '#10b981';
    case 'Africa': return '#f97316';
    case 'Oceania': return '#ec4899';
    default: return '#6b7280';
  }
};

const getTypeBgClass = (type: EventType): string => {
  switch (type) {
    case 'Heatwave': return 'bg-red-500';
    case 'Flood': return 'bg-blue-500';
    case 'Storm': return 'bg-slate-400';
    case 'Drought': return 'bg-amber-500';
    case 'Coldwave': return 'bg-cyan-500';
    default: return 'bg-gray-500';
  }
};

const GetIconForType = ({ type, size = 20, className }: { type: EventType; size?: number; className?: string }) => {
  switch (type) {
    case 'Heatwave': return <ThermometerSun size={size} className={cn('text-red-500', className)} />;
    case 'Flood': return <CloudRain size={size} className={cn('text-blue-500', className)} />;
    case 'Storm': return <Wind size={size} className={cn('text-slate-400', className)} />;
    case 'Drought': return <Droplets size={size} className={cn('text-amber-500', className)} />;
    case 'Coldwave': return <Snowflake size={size} className={cn('text-cyan-500', className)} />;
    default: return <Info size={size} className={cn('text-gray-500', className)} />;
  }
};

// ====================================================================
// Imperative Leaflet Map – bypasses react-leaflet's Context entirely
// ====================================================================

interface LeafletMapProps {
  events: ClimateEvent[];
  selectedEventId: string | null;
  onSelectEvent: (id: string) => void;
  onBoundsChange: (bounds: L.LatLngBounds) => void;
}

const LeafletMap: React.FC<LeafletMapProps> = ({
  events,
  selectedEventId,
  onSelectEvent,
  onBoundsChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);

  // Keep latest callbacks in refs so the map event listeners always call the newest version
  const onSelectRef = useRef(onSelectEvent);
  onSelectRef.current = onSelectEvent;
  const onBoundsRef = useRef(onBoundsChange);
  onBoundsRef.current = onBoundsChange;

  // 1. Create map ONCE
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [20, 0],
      zoom: 2,
      zoomControl: false,
      attributionControl: false,
    });

    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 16,
    }).addTo(map);

    // English-only reference labels (place names, borders, etc.)
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 16,
    }).addTo(map);

    // Add zoom control to top-right
    L.control.zoom({ position: 'topright' }).addTo(map);

    // Attribution bottom-right
    L.control.attribution({ position: 'bottomright', prefix: false })
      .addAttribution('&copy; Esri &mdash; Sources: Esri, HERE, Garmin, USGS')
      .addTo(map);

    // Notify parent of bounds changes
    map.on('moveend', () => {
      onBoundsRef.current(map.getBounds());
    });

    markersRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    // Fire initial bounds
    setTimeout(() => {
      map.invalidateSize();
      onBoundsRef.current(map.getBounds());
    }, 200);

    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2. Sync markers whenever events or selection change
  useEffect(() => {
    const lg = markersRef.current;
    if (!lg) return;

    lg.clearLayers();

    events.forEach((evt) => {
      const isSelected = evt.id === selectedEventId;
      const color = getTypeColor(evt.type);

      const marker = L.circleMarker([evt.lat, evt.lng], {
        radius: isSelected ? 10 : 6,
        fillColor: color,
        color: isSelected ? '#1e293b' : 'rgba(30,41,59,0.5)',
        weight: isSelected ? 2.5 : 1.5,
        fillOpacity: isSelected ? 1 : 0.85,
      });

      marker.on('click', () => {
        onSelectRef.current(evt.id);
      });

      marker.addTo(lg);
    });
  }, [events, selectedEventId]);

  // 3. Fly to selected event
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedEventId) return;
    const evt = events.find((e) => e.id === selectedEventId);
    if (evt) {
      map.flyTo([evt.lat, evt.lng], Math.max(map.getZoom(), 5), { duration: 0.8 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEventId]);

  // 4. Fit bounds when event list changes substantially (filters)
  const prevCountRef = useRef(events.length);
  useEffect(() => {
    const map = mapRef.current;
    if (!map || events.length === 0) return;
    // Only refit when filter causes a count change, not on every render
    if (events.length !== prevCountRef.current) {
      prevCountRef.current = events.length;
      const bounds = L.latLngBounds(events.map((e) => [e.lat, e.lng] as [number, number]));
      map.flyToBounds(bounds, { padding: [50, 50], maxZoom: 6, duration: 0.6 });
    }
  }, [events]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      style={{ minHeight: 400, background: '#e5e7eb' }}
    />
  );
};

// ====================================================================
// Dashboard
// ====================================================================

type TimelineMode = 'all' | 'year' | 'range';

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const parseEventDate = (dateStr: string) => {
  const [y, m] = dateStr.split('-').map(Number);
  return { year: y, month: m };
};

const Dashboard: React.FC = () => {
  // Timeline state
  const [timelineMode, setTimelineMode] = useState<TimelineMode>('all');
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null); // 1-12
  const [rangeFrom, setRangeFrom] = useState({ year: 1979, month: 1 });
  const [rangeTo, setRangeTo] = useState({ year: 2024, month: 12 });

  const [selectedType, setSelectedType] = useState<EventType | 'All'>('All');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mapBounds, setMapBounds] = useState<L.LatLngBounds | null>(null);

  // Helpers for year selection with mode switch
  const handleSelectYear = (year: number) => {
    setTimelineMode('year');
    setSelectedYear(year);
    setSelectedMonth(null);
  };

  const handleSelectAll = () => {
    setTimelineMode('all');
    setSelectedMonth(null);
  };

  const handleToggleMonth = (month: number) => {
    setSelectedMonth((prev) => (prev === month ? null : month));
  };

  // Base filter (timeline + type)
  const baseFiltered = useMemo(() => {
    return ALL_EVENTS.filter((e) => {
      // Type check
      const typeOk = selectedType === 'All' || e.type === selectedType;
      if (!typeOk) return false;

      // Timeline check
      if (timelineMode === 'all') return true;

      const { year: eYear, month: eMonth } = parseEventDate(e.date);

      if (timelineMode === 'year') {
        if (eYear !== selectedYear) return false;
        if (selectedMonth !== null && eMonth !== selectedMonth) return false;
        return true;
      }

      // range mode
      const eVal = eYear * 100 + eMonth;
      const fromVal = rangeFrom.year * 100 + rangeFrom.month;
      const toVal = rangeTo.year * 100 + rangeTo.month;
      return eVal >= fromVal && eVal <= toVal;
    });
  }, [timelineMode, selectedYear, selectedMonth, rangeFrom, rangeTo, selectedType]);

  // Events visible in current map viewport
  const visibleEvents = useMemo(() => {
    if (!mapBounds) return baseFiltered;
    return baseFiltered.filter((e) => mapBounds.contains([e.lat, e.lng]));
  }, [mapBounds, baseFiltered]);

  const selectedEvent = useMemo(
    () => ALL_EVENTS.find((e) => e.id === selectedEventId) ?? null,
    [selectedEventId],
  );

  const handleBoundsChange = useCallback((bounds: L.LatLngBounds) => {
    setMapBounds(bounds);
  }, []);

  // Stats for visible events
  const stats = useMemo(() => {
    const m: Record<string, number> = {};
    visibleEvents.forEach((e) => {
      m[e.type] = (m[e.type] || 0) + 1;
    });
    return m;
  }, [visibleEvents]);

  // Pie chart data: "All" → type breakdown, specific type → continent breakdown
  const pieData = useMemo(() => {
    if (selectedType === 'All') {
      // Type distribution
      return TYPES.map((t) => ({
        name: t,
        value: stats[t] || 0,
        color: getTypeColor(t),
      })).filter((d) => d.value > 0);
    } else {
      // Continent distribution for the selected type
      const m: Record<string, number> = {};
      visibleEvents.forEach((e) => {
        m[e.affectedArea] = (m[e.affectedArea] || 0) + 1;
      });
      return CONTINENTS.map((c) => ({
        name: c,
        value: m[c] || 0,
        color: getContinentColor(c),
      })).filter((d) => d.value > 0);
    }
  }, [selectedType, stats, visibleEvents]);

  const pieTotalCount = useMemo(() => pieData.reduce((s, d) => s + d.value, 0), [pieData]);

  // Floating panel animation state
  const [panelVisible, setPanelVisible] = useState(false);
  useEffect(() => {
    if (selectedEvent) {
      // Trigger enter animation
      const t = setTimeout(() => setPanelVisible(true), 50);
      return () => clearTimeout(t);
    } else {
      setPanelVisible(false);
    }
  }, [selectedEvent]);

  return (
    <div className="relative h-[calc(100vh-64px)] w-full bg-slate-900 overflow-hidden flex">
      {/* ---- Map ---- */}
      <div className="flex-grow h-full w-full relative z-0">
        <LeafletMap
          events={baseFiltered}
          selectedEventId={selectedEventId}
          onSelectEvent={setSelectedEventId}
          onBoundsChange={handleBoundsChange}
        />

        {/* Sidebar toggle */}
        <button
          onClick={() => setIsSidebarOpen((v) => !v)}
          className="absolute top-4 left-4 z-[1000] p-2 bg-slate-900/80 text-white rounded-lg shadow-lg border border-slate-700 hover:bg-slate-800 transition-colors"
        >
          {isSidebarOpen ? <X size={20} /> : <Layers size={20} />}
        </button>
      </div>

      {/* ---- Sidebar ---- */}
      {isSidebarOpen && (
        <div className="absolute top-0 left-0 bottom-0 z-[999] w-80 bg-slate-900/95 backdrop-blur-md border-r border-slate-700 shadow-2xl flex flex-col pt-16 md:pt-0">
          {/* Header */}
          <div className="p-4 border-b border-slate-800">
            <h2 className="text-lg text-white flex items-center gap-2">
              <MapIcon size={20} className="text-blue-500" />
              Global Analysis
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {visibleEvents.length} events in view · {baseFiltered.length} total
            </p>
          </div>

          <div className="p-4 space-y-5 overflow-y-auto flex-grow">
            {/* ===== Timeline ===== */}
            <div className="space-y-3">
              <label className="text-xs text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <CalendarRange size={12} /> Timeline
              </label>

              {/* Mode tabs */}
              <div className="flex rounded-lg bg-slate-800/60 p-0.5">
                {([['all', 'All Time'], ['year', 'By Year'], ['range', 'Custom Range']] as const).map(([mode, label]) => (
                  <button
                    key={mode}
                    onClick={() => {
                      setTimelineMode(mode as TimelineMode);
                      if (mode === 'all') setSelectedMonth(null);
                    }}
                    className={cn(
                      'flex-1 px-2 py-1.5 text-[11px] rounded-md transition-colors',
                      timelineMode === mode
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200',
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Year buttons (shown in 'year' mode) */}
              {timelineMode === 'year' && (
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1.5">
                    {YEARS.map((y) => (
                      <button
                        key={y}
                        onClick={() => handleSelectYear(y)}
                        className={cn(
                          'px-2.5 py-1 text-xs rounded border transition-colors',
                          selectedYear === y
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : 'border-slate-700 text-slate-400 hover:border-slate-500',
                        )}
                      >
                        {y}
                      </button>
                    ))}
                  </div>
                  {/* Month grid */}
                  <div className="grid grid-cols-6 gap-1">
                    {MONTHS.map((m, i) => {
                      const monthNum = i + 1;
                      const isActive = selectedMonth === monthNum;
                      return (
                        <button
                          key={m}
                          onClick={() => handleToggleMonth(monthNum)}
                          className={cn(
                            'py-1 text-[10px] rounded transition-colors',
                            isActive
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-800/80 text-slate-500 hover:bg-slate-700 hover:text-slate-300',
                          )}
                        >
                          {m}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-[10px] text-slate-600">
                    {selectedMonth !== null
                      ? `Showing ${MONTHS[selectedMonth - 1]} ${selectedYear}`
                      : `Showing all of ${selectedYear}`}
                  </p>
                </div>
              )}

              {/* Custom range (shown in 'range' mode) */}
              {timelineMode === 'range' && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500 w-8 shrink-0">From</span>
                    <select
                      value={rangeFrom.year}
                      onChange={(e) => setRangeFrom((p) => ({ ...p, year: Number(e.target.value) }))}
                      className="flex-1 bg-slate-800 border border-slate-700 text-slate-300 text-xs rounded px-2 py-1 focus:outline-none focus:border-blue-500"
                    >
                      {YEARS.slice().sort((a, b) => a - b).map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                    <select
                      value={rangeFrom.month}
                      onChange={(e) => setRangeFrom((p) => ({ ...p, month: Number(e.target.value) }))}
                      className="flex-1 bg-slate-800 border border-slate-700 text-slate-300 text-xs rounded px-2 py-1 focus:outline-none focus:border-blue-500"
                    >
                      {MONTHS.map((m, i) => (
                        <option key={m} value={i + 1}>{m}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500 w-8 shrink-0">To</span>
                    <select
                      value={rangeTo.year}
                      onChange={(e) => setRangeTo((p) => ({ ...p, year: Number(e.target.value) }))}
                      className="flex-1 bg-slate-800 border border-slate-700 text-slate-300 text-xs rounded px-2 py-1 focus:outline-none focus:border-blue-500"
                    >
                      {YEARS.slice().sort((a, b) => a - b).map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                    <select
                      value={rangeTo.month}
                      onChange={(e) => setRangeTo((p) => ({ ...p, month: Number(e.target.value) }))}
                      className="flex-1 bg-slate-800 border border-slate-700 text-slate-300 text-xs rounded px-2 py-1 focus:outline-none focus:border-blue-500"
                    >
                      {MONTHS.map((m, i) => (
                        <option key={m} value={i + 1}>{m}</option>
                      ))}
                    </select>
                  </div>
                  <p className="text-[10px] text-slate-600">
                    {MONTHS[rangeFrom.month - 1]} {rangeFrom.year} – {MONTHS[rangeTo.month - 1]} {rangeTo.year}
                  </p>
                </div>
              )}

              {timelineMode === 'all' && (
                <p className="text-[10px] text-slate-600">Showing events from all years</p>
              )}
            </div>

            {/* ===== Type Filter ===== */}
            <div className="space-y-2">
              <label className="text-xs text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Filter size={12} /> Disaster Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSelectedType('All')}
                  className={cn(
                    'px-2 py-1 text-xs rounded border text-left transition-colors',
                    selectedType === 'All'
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'border-slate-700 text-slate-400 hover:border-slate-600',
                  )}
                >
                  All Types
                </button>
                {TYPES.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedType(t)}
                    className={cn(
                      'px-2 py-1 text-xs rounded border text-left flex items-center gap-2 transition-colors',
                      selectedType === t
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'border-slate-700 text-slate-400 hover:border-slate-600',
                    )}
                  >
                    <GetIconForType type={t} size={12} /> {t}
                  </button>
                ))}
              </div>
            </div>

            {/* ===== Stats ===== */}
            <div className="space-y-2">
              <label className="text-xs text-slate-400 uppercase tracking-wider">
                {selectedType === 'All' ? 'Type Distribution' : `${selectedType} by Region`}
              </label>
              {pieData.length > 0 ? (
                <div className="flex items-center gap-2">
                  {/* Pie chart */}
                  <div className="w-[120px] h-[120px] shrink-0 relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={28}
                          outerRadius={52}
                          paddingAngle={2}
                          dataKey="value"
                          strokeWidth={0}
                          animationDuration={500}
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            background: '#1e293b',
                            border: '1px solid #334155',
                            borderRadius: '8px',
                            fontSize: '11px',
                            color: '#e2e8f0',
                          }}
                          formatter={(value: number) => [`${value} (${pieTotalCount > 0 ? ((value / pieTotalCount) * 100).toFixed(0) : 0}%)`, '']}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    {/* Center label */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-lg text-white">{pieTotalCount}</span>
                      <span className="text-[8px] text-slate-500 uppercase tracking-wider">Events</span>
                    </div>
                  </div>
                  {/* Legend */}
                  <div className="flex-1 space-y-1 min-w-0">
                    {pieData.map((d) => (
                      <div key={d.name} className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                        <span className="text-[10px] text-slate-400 truncate flex-1">{d.name}</span>
                        <span className="text-[10px] text-slate-300 tabular-nums">{d.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-[10px] text-slate-600 text-center py-4">No data in view</p>
              )}
            </div>

            {/* Sidebar hint */}
            <div className="border-t border-slate-800 pt-3">
              <p className="text-[10px] text-slate-600 text-center">
                Click a marker on the map to view event details
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ===== Futuristic Floating Event Panel ===== */}
      {selectedEvent && (
        <div
          className={cn(
            'absolute z-[1000] bottom-6 right-4 w-[380px] max-w-[calc(100vw-2rem)] transition-all duration-500 ease-out',
            panelVisible
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-8 scale-95',
          )}
        >
          {/* Outer glow ring */}
          <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-cyan-500/30 via-blue-500/20 to-purple-500/30 blur-[2px]" />

          <div className="relative rounded-2xl overflow-hidden border border-cyan-500/20 bg-slate-950/85 backdrop-blur-xl shadow-2xl shadow-cyan-500/10">
            {/* Top accent bar — animated gradient */}
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

            {/* Scan line overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.03]"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.08) 2px, rgba(0,255,255,0.08) 4px)',
              }}
            />

            {/* Header */}
            <div className="relative px-5 pt-4 pb-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  {/* Type icon with glow */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border"
                    style={{
                      backgroundColor: `${getTypeColor(selectedEvent.type)}15`,
                      borderColor: `${getTypeColor(selectedEvent.type)}30`,
                      boxShadow: `0 0 20px ${getTypeColor(selectedEvent.type)}15`,
                    }}
                  >
                    <GetIconForType type={selectedEvent.type} size={20} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm text-white truncate">{selectedEvent.title}</h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded-full uppercase tracking-wider"
                        style={{
                          color: getTypeColor(selectedEvent.type),
                          backgroundColor: `${getTypeColor(selectedEvent.type)}15`,
                        }}
                      >
                        {selectedEvent.type}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedEventId(null)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center bg-slate-800/80 border border-slate-700/50 text-slate-500 hover:text-white hover:border-cyan-500/30 hover:bg-slate-700/80 transition-all shrink-0"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="mx-5 h-[1px] bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

            {/* Body */}
            <div className="px-5 py-3 space-y-3 max-h-[50vh] overflow-y-auto">
              {/* Location line */}
              <p className="text-xs text-slate-400/90">{selectedEvent.description}</p>

              {/* --- Storm-specific rich panel --- */}
              {selectedEvent.stormDetail ? (() => {
                const d = selectedEvent.stormDetail;
                return (
                  <>
                    {/* Row 1: Duration & ID */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-slate-800/40 rounded-lg p-2.5 border border-slate-700/30">
                        <div className="flex items-center gap-1.5 mb-1">
                          <CalendarRange size={10} className="text-cyan-400/70" />
                          <span className="text-[9px] text-slate-500 uppercase tracking-wider">Duration</span>
                        </div>
                        <span className="text-[11px] text-slate-200 tabular-nums">{d.startDate}</span>
                        {d.startDate !== d.endDate && (
                          <span className="text-[11px] text-slate-500"> — {d.endDate}</span>
                        )}
                      </div>
                      <div className="bg-slate-800/40 rounded-lg p-2.5 border border-slate-700/30">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Info size={10} className="text-cyan-400/70" />
                          <span className="text-[9px] text-slate-500 uppercase tracking-wider">Event ID</span>
                        </div>
                        <span className="text-[10px] text-slate-300 tabular-nums">{d.disno}</span>
                      </div>
                    </div>

                    {/* Row 2: Max Wind & Max Rain */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-slate-800/40 rounded-lg p-2.5 border border-slate-700/30">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Wind size={10} className="text-cyan-400/70" />
                          <span className="text-[9px] text-slate-500 uppercase tracking-wider">Max Wind</span>
                        </div>
                        <span className="text-[13px] text-white tabular-nums">{d.maxWindMs.toFixed(1)}</span>
                        <span className="text-[10px] text-slate-500 ml-1">m/s</span>
                        <div className="text-[9px] text-slate-500 mt-0.5">{d.maxWindText}</div>
                      </div>
                      <div className="bg-slate-800/40 rounded-lg p-2.5 border border-slate-700/30">
                        <div className="flex items-center gap-1.5 mb-1">
                          <CloudRain size={10} className="text-cyan-400/70" />
                          <span className="text-[9px] text-slate-500 uppercase tracking-wider">Max Rain</span>
                        </div>
                        <span className="text-[13px] text-white tabular-nums">{d.maxRainMm.toFixed(1)}</span>
                        <span className="text-[10px] text-slate-500 ml-1">mm</span>
                        <div className="text-[9px] text-slate-500 mt-0.5">{d.maxRainText}</div>
                      </div>
                    </div>

                    {/* Row 3: Coverage bars */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-slate-800/40 rounded-lg p-2.5 border border-slate-700/30">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <Gauge size={10} className="text-cyan-400/70" />
                          <span className="text-[9px] text-slate-500 uppercase tracking-wider">Wind Range</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-700"
                            style={{ width: `${(d.windCoverageFrac * 100).toFixed(0)}%` }}
                          />
                        </div>
                        <div className="text-[9px] text-slate-500 mt-1">{d.windCoverageText} <span className="text-slate-400 tabular-nums">({(d.windCoverageFrac * 100).toFixed(0)}%)</span></div>
                      </div>
                      <div className="bg-slate-800/40 rounded-lg p-2.5 border border-slate-700/30">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <Gauge size={10} className="text-cyan-400/70" />
                          <span className="text-[9px] text-slate-500 uppercase tracking-wider">Rain Range</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-700"
                            style={{ width: `${(d.rainCoverageFrac * 100).toFixed(0)}%` }}
                          />
                        </div>
                        <div className="text-[9px] text-slate-500 mt-1">{d.rainCoverageText} <span className="text-slate-400 tabular-nums">({(d.rainCoverageFrac * 100).toFixed(0)}%)</span></div>
                      </div>
                    </div>

                    {/* Rainband type tag */}
                    <div className="flex items-center gap-2">
                      <CloudLightning size={10} className="text-cyan-400/50" />
                      <span className="text-[9px] text-slate-500 uppercase tracking-wider">Rainband</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800/80 border border-slate-700/40 text-slate-300 capitalize">{d.rainbandType}</span>
                    </div>

                    {/* Impact summary */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <Zap size={10} className="text-amber-500/70" />
                        <span className="text-[9px] text-slate-500 uppercase tracking-wider">Impact Assessment</span>
                      </div>
                      <p className="text-[10px] text-slate-400/80 leading-relaxed">{d.impactSummary}</p>
                    </div>
                  </>
                );
              })() : (
                /* --- Generic non-storm panel --- */
                <>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-slate-800/40 rounded-lg p-2.5 border border-slate-700/30">
                      <div className="flex items-center gap-1.5 mb-1">
                        <CalendarRange size={10} className="text-cyan-400/70" />
                        <span className="text-[9px] text-slate-500 uppercase tracking-wider">Date</span>
                      </div>
                      <span className="text-[11px] text-slate-200 tabular-nums">{selectedEvent.date}</span>
                    </div>
                    <div className="bg-slate-800/40 rounded-lg p-2.5 border border-slate-700/30">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Globe size={10} className="text-cyan-400/70" />
                        <span className="text-[9px] text-slate-500 uppercase tracking-wider">Region</span>
                      </div>
                      <span className="text-[11px] text-slate-200">{selectedEvent.affectedArea}</span>
                    </div>
                    <div className="bg-slate-800/40 rounded-lg p-2.5 border border-slate-700/30">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Zap size={10} className="text-cyan-400/70" />
                        <span className="text-[9px] text-slate-500 uppercase tracking-wider">Level</span>
                      </div>
                      <span
                        className={cn(
                          'text-[11px]',
                          selectedEvent.intensity === 'Extreme'
                            ? 'text-red-400'
                            : selectedEvent.intensity === 'Severe'
                              ? 'text-orange-400'
                              : 'text-yellow-400',
                        )}
                      >
                        {selectedEvent.intensity}
                      </span>
                    </div>
                  </div>
                </>
              )}

              {/* Coordinates footer */}
              <div className="flex items-center gap-3 text-[10px] text-slate-600">
                <div className="flex items-center gap-1">
                  <MapPin size={9} className="text-slate-600" />
                  <span className="tabular-nums">{selectedEvent.lat.toFixed(2)}°, {selectedEvent.lng.toFixed(2)}°</span>
                </div>
                <div className="flex-1 h-[1px] bg-gradient-to-r from-slate-800 to-transparent" />
                <span className="text-cyan-500/50 uppercase tracking-widest text-[8px]">{selectedEvent.stormDetail ? 'Storm Intel' : 'Event Intel'}</span>
              </div>
            </div>

            {/* Bottom accent bar */}
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
          </div>
        </div>
      )}

      {/* Legend */}
      <div className={cn(
        'absolute bottom-6 z-[900] bg-slate-900/90 p-2 rounded border border-slate-700 hidden md:block transition-all duration-300',
        selectedEvent ? 'right-[410px]' : 'right-4',
      )}>
        <div className="space-y-1">
          {TYPES.map((t) => (
            <div key={t} className="flex items-center gap-2 text-[10px] text-slate-300">
              <div className={cn('w-2 h-2 rounded-full', getTypeBgClass(t))} />
              <span>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;