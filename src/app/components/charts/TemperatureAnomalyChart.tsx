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
  AreaChart
} from 'recharts';
import { globalTemperatureAnomaly } from '../../data/global-temperature';

// Filter data to show every 5-10 years for better visualization
// Full annual data available but chart would be too dense
const getFilteredData = () => {
  return globalTemperatureAnomaly.filter((_, index) => {
    // Show every 5th year before 1950, then every 2nd year after
    const year = parseInt(globalTemperatureAnomaly[index].year);
    if (year < 1950) {
      return index % 5 === 0;
    } else if (year < 2000) {
      return index % 2 === 0;
    } else {
      // Show every year from 2000 onwards
      return true;
    }
  });
};

const TemperatureAnomalyChart = () => {
  const data = getFilteredData();
  
  return (
    <div className="h-[300px] w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorAnomaly" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
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
            domain={[-0.5, 1.5]}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            itemStyle={{ color: '#1e293b' }}
            formatter={(value: number) => [`${value > 0 ? '+' : ''}${value.toFixed(2)}°C`, 'Anomaly']}
            labelFormatter={(label) => `Year: ${label}`}
          />
          <Area 
            type="monotone" 
            dataKey="anomaly" 
            stroke="#ef4444" 
            fillOpacity={1} 
            fill="url(#colorAnomaly)" 
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TemperatureAnomalyChart;