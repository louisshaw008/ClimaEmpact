import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { carbonEmissions } from '../../data/carbon-emissions';

const CarbonEmissionsChart = () => {
  // Filter to show every 10 years before 1990, then every 3-5 years
  const filteredData = carbonEmissions.filter((_, index) => {
    const year = parseInt(carbonEmissions[index].year);
    if (year < 1950) {
      return year % 10 === 0;
    } else if (year < 1990) {
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
            <linearGradient id="colorFossilFuel" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#64748b" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#64748b" stopOpacity={0.3}/>
            </linearGradient>
            <linearGradient id="colorLandUse" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.7}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
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
            domain={[0, 50]}
            label={{ value: 'Gt CO₂', position: 'insideLeft', fontSize: 11, fill: '#94a3b8' }}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            itemStyle={{ color: '#1e293b' }}
            formatter={(value: number, name: string) => {
              const label = name === 'fossilFuel' ? 'Fossil Fuel & Industry' : 'Land Use';
              return [`${value.toFixed(1)} Gt CO₂`, label];
            }}
            labelFormatter={(label) => `Year: ${label}`}
          />
          <Legend 
            verticalAlign="top" 
            height={36}
            formatter={(value) => value === 'fossilFuel' ? 'Fossil Fuel & Industry' : 'Land Use Change'}
            iconType="rect"
            wrapperStyle={{ fontSize: '12px' }}
          />
          <Area 
            type="monotone" 
            dataKey="fossilFuel" 
            stackId="1"
            stroke="#64748b" 
            fillOpacity={1} 
            fill="url(#colorFossilFuel)" 
            strokeWidth={2}
          />
          <Area 
            type="monotone" 
            dataKey="landUse" 
            stackId="1"
            stroke="#10b981" 
            fillOpacity={1} 
            fill="url(#colorLandUse)" 
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CarbonEmissionsChart;
