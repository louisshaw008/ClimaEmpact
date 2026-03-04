import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart,
} from 'recharts';
import { arcticIce } from '../../data/arctic-ice';

const ArcticIceChart = () => {
  // Show every 2-3 years for cleaner visualization
  const filteredData = arcticIce.filter((_, index) => {
    const year = parseInt(arcticIce[index].year);
    return year % 2 === 0 || year >= 2020;
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200">
          <p className="font-semibold text-slate-900 mb-2">{label}</p>
          <div className="space-y-1 text-xs">
            {payload.map((entry: any) => (
              <div key={entry.dataKey} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                  <span className="text-slate-600">
                    {entry.dataKey === 'septMin' ? 'Sept Min' : 'March Max'}
                  </span>
                </div>
                <span className="font-medium text-slate-900">{entry.value} M km²</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[300px] w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={filteredData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorIceMin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
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
            domain={[3, 17]}
            label={{ value: 'M km²', position: 'insideLeft', fontSize: 11, fill: '#94a3b8' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }}
            iconType="line"
            formatter={(value) => value === 'septMin' ? 'September Min (critical)' : 'March Max'}
          />
          {/* Show March max as subtle background area */}
          <Line 
            type="monotone" 
            dataKey="marchMax" 
            stroke="#94a3b8" 
            strokeWidth={1.5}
            dot={false}
            strokeDasharray="3 3"
          />
          {/* Highlight September minimum - the critical metric */}
          <Line 
            type="monotone" 
            dataKey="septMin" 
            stroke="#06b6d4" 
            strokeWidth={3}
            dot={{ fill: '#06b6d4', r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ArcticIceChart;
