import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Calendar, MapPin, AlertTriangle } from 'lucide-react';
import { reports, Report } from '../data/reports';
import { NavLink } from 'react-router';

const reportTypes = ['All', 'Heatwave', 'Flood', 'Storm', 'Drought', 'Cold Spell', 'Wildfire'];

const Reports = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReports = reports.filter((report) => {
    const matchesType = activeFilter === 'All' || report.type === activeFilter;
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          report.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Analysis Reports</h1>
          <p className="text-slate-600">
            Browse our archive of impact studies, analyzing how extreme weather events affect communities worldwide.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            {reportTypes.map((type) => (
              <button
                key={type}
                onClick={() => setActiveFilter(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeFilter === type
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by location or event..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filteredReports.map((report) => (
              <motion.div
                key={report.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 flex flex-col h-full group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={report.imageUrl}
                    alt={report.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    {report.type}
                  </span>
                  <div className="absolute bottom-4 left-4 text-white flex items-center gap-4 text-xs font-medium">
                    <span className="flex items-center gap-1"><Calendar size={14} /> {report.date}</span>
                    <span className="flex items-center gap-1"><MapPin size={14} /> {report.location}</span>
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {report.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-3 flex-grow">
                    {report.summary}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                      <AlertTriangle size={14} className={
                        report.impactLevel === 'Critical' ? 'text-red-500' : 
                        report.impactLevel === 'Severe' ? 'text-orange-500' : 'text-yellow-500'
                      } />
                      {report.impactLevel} Impact
                    </div>
                    <NavLink to={`/reports/${report.id}`} className="text-blue-600 text-sm font-semibold hover:underline">
                      Read Analysis
                    </NavLink>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredReports.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            <Filter size={48} className="mx-auto mb-4 opacity-20" />
            <p className="text-lg">No reports found matching your criteria.</p>
            <button 
              onClick={() => { setActiveFilter('All'); setSearchQuery(''); }}
              className="mt-4 text-blue-600 font-medium hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;