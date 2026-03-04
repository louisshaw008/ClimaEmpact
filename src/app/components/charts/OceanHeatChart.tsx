import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { oceanHeat } from '../../data/ocean-heat';

const OceanHeatChart = () => {
  // Filter to show every 5 years before 1990, then every 2-3 years
  const filteredData = oceanHeat.filter((_, index) => {
    const year = parseInt(oceanHeat[index].year);
    if (year < 1990) {
      return year % 5 === 0;
    } else if (year < 2010) {
      return year % 3 === 0;
    } else {
      return year % 2 === 0 || year >= 2020;
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
            <linearGradient id="colorOceanHeat" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
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
            domain={[-160, 180]}
            label={{ value: 'ZJ', position: 'insideLeft', fontSize: 11, fill: '#94a3b8' }}
          />
          {/* Baseline reference */}
          <ReferenceLine 
            y={0} 
            stroke="#94a3b8" 
            strokeDasharray="5 5"
            label={{ value: '1981-2010 avg', position: 'insideTopRight', fontSize: 10, fill: '#64748b' }}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            itemStyle={{ color: '#1e293b' }}
            formatter={(value: number) => [
              `${value > 0 ? '+' : ''}${value} ZJ`,
              'Heat Content'
            ]}
            labelFormatter={(label) => `Year: ${label}`}
          />
          <Area 
            type="monotone" 
            dataKey="heat" 
            stroke="#f97316" 
            fillOpacity={1} 
            fill="url(#colorOceanHeat)" 
            strokeWidth={2.5}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OceanHeatChart;
