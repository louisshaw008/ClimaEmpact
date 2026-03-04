import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  ReferenceLine,
} from 'recharts';
import { co2Concentration, co2Stats } from '../../data/co2-concentration';

const CO2Chart = () => {
  // Filter to show every 5 years before 1950, every 2 years after
  const filteredData = co2Concentration.filter((_, index) => {
    const year = parseInt(co2Concentration[index].year);
    if (year < 1950) {
      return year % 10 === 0;
    } else if (year < 2000) {
      return year % 5 === 0;
    } else {
      return true; // Show all years from 2000 onwards
    }
  });

  return (
    <div className="h-[300px] w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={filteredData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorCO2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis 
            dataKey="year" 
            tick={{fontSize: 12, fill: '#64748b'}} 
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            tick={{fontSize: 12, fill: '#64748b'}} 
            axisLine={false}
            tickLine={false}
            domain={[270, 440]}
            label={{ value: 'ppm', position: 'insideLeft', fontSize: 11, fill: '#94a3b8' }}
          />
          {/* Pre-industrial baseline reference */}
          <ReferenceLine 
            y={280} 
            stroke="#94a3b8" 
            strokeDasharray="5 5"
            label={{ value: 'Pre-industrial', position: 'insideTopRight', fontSize: 10, fill: '#64748b' }}
          />
          {/* Safe threshold reference */}
          <ReferenceLine 
            y={350} 
            stroke="#f59e0b" 
            strokeDasharray="3 3"
            label={{ value: 'Safe limit', position: 'insideTopRight', fontSize: 10, fill: '#f59e0b' }}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            itemStyle={{ color: '#1e293b' }}
            formatter={(value: number) => [`${value} ppm`, 'CO₂']}
            labelFormatter={(label) => `Year: ${label}`}
          />
          <Area 
            type="monotone" 
            dataKey="co2" 
            stroke="#3b82f6" 
            fillOpacity={1} 
            fill="url(#colorCO2)" 
            strokeWidth={2.5}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CO2Chart;
