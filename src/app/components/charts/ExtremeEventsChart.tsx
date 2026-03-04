import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { extremeEvents } from '../../data/extreme-events';

const ExtremeEventsChart = () => {
  // Show every 5 years for cleaner visualization
  const filteredData = extremeEvents.filter((_, index) => {
    const year = parseInt(extremeEvents[index].year);
    return year % 5 === 0 || year >= 2020;
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const total = payload.reduce((sum: number, entry: any) => sum + entry.value, 0);
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200">
          <p className="font-semibold text-slate-900 mb-2">{label}</p>
          <div className="space-y-1 text-xs">
            {payload.reverse().map((entry: any) => (
              <div key={entry.dataKey} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: entry.color }} />
                  <span className="text-slate-600 capitalize">{entry.dataKey}</span>
                </div>
                <span className="font-medium text-slate-900">{entry.value}</span>
              </div>
            ))}
            <div className="pt-2 mt-2 border-t border-slate-200 flex justify-between">
              <span className="font-semibold text-slate-700">Total</span>
              <span className="font-bold text-slate-900">{total}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[300px] w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={filteredData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
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
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(148, 163, 184, 0.1)' }} />
          <Legend 
            wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }}
            iconType="rect"
            iconSize={10}
          />
          <Bar dataKey="wildfires" stackId="events" fill="#f97316" name="Wildfires" />
          <Bar dataKey="heatwaves" stackId="events" fill="#ef4444" name="Heatwaves" />
          <Bar dataKey="droughts" stackId="events" fill="#eab308" name="Droughts" />
          <Bar dataKey="floods" stackId="events" fill="#3b82f6" name="Floods" />
          <Bar dataKey="storms" stackId="events" fill="#06b6d4" name="Storms" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExtremeEventsChart;
