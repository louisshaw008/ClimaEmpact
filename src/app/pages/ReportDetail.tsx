import React from 'react';
import { useParams, NavLink, Navigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, MapPin, Share2, Printer, AlertTriangle } from 'lucide-react';
import { reports } from '../data/reports';
import TemperatureAnomalyChart from '../components/charts/TemperatureAnomalyChart';

const ReportDetail = () => {
  const { id } = useParams();
  const report = reports.find(r => r.id === id);

  if (!report) {
    return <Navigate to="/reports" replace />;
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Hero Header */}
      <div className="relative h-[60vh] w-full">
        <img 
          src={report.imageUrl} 
          alt={report.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-white">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="container mx-auto max-w-4xl"
          >
            <NavLink to="/reports" className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-6 transition-colors">
              <ArrowLeft size={20} /> Back to Reports
            </NavLink>
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                {report.type}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-2 ${
                 report.attribution.includes('Very likely') ? 'bg-red-500' : 'bg-orange-500'
              }`}>
                <AlertTriangle size={14} />
                {report.attribution} Attribution
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">{report.title}</h1>
            <div className="flex flex-wrap gap-6 text-sm md:text-base text-slate-300">
              <span className="flex items-center gap-2"><Calendar size={18} /> {report.date}</span>
              <span className="flex items-center gap-2"><MapPin size={18} /> {report.location}</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl -mt-10 relative z-10">
        <div className="bg-white rounded-t-3xl p-8 md:p-12 shadow-xl border border-slate-100">
            <div className="flex justify-between items-start mb-8 border-b border-slate-100 pb-8">
                <div className="prose prose-lg prose-slate">
                    <p className="lead text-xl text-slate-600 font-medium">
                        {report.summary}
                    </p>
                </div>
                <div className="flex gap-2">
                    <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors bg-slate-50 rounded-full">
                        <Share2 size={20} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors bg-slate-50 rounded-full">
                        <Printer size={20} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="md:col-span-2 space-y-8 text-slate-700 leading-relaxed text-lg">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Event Description</h2>
                        <p>
                            Starting on {report.date}, {report.location} experienced severe conditions characterized by persistent high pressure systems and unusual atmospheric circulation patterns. Meteorological stations recorded values exceeding historical averages by significant margins.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Analysis Results</h2>
                        <p className="mb-4">
                            Our rapid attribution analysis compares the observed event with historical analogues from the 1979-2001 period. We found that the atmospheric circulation patterns associated with this event have become more frequent and intense in the recent climate (2001-2023).
                        </p>
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 my-6">
                            <h4 className="font-bold text-slate-900 mb-2">Key Finding</h4>
                            <p className="text-slate-600 italic">
                                "Events similar to the {report.title} are now 3 times more likely to occur than they were in the late 20th century due to human-induced climate change."
                            </p>
                        </div>
                        <p>
                            The increase in global mean temperature has likely contributed to the intensity of the event, providing more energy to the system and altering the jet stream dynamics.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Impact Assessment</h2>
                        <p>
                            The event caused widespread disruption, including infrastructure damage, agricultural losses, and significant impacts on public health. Adaptation measures need to be strengthened to cope with the increasing frequency of such events.
                        </p>
                    </div>
                </div>

                <div className="md:col-span-1 space-y-8">
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                        <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wide">Data Sources</h3>
                        <ul className="space-y-3 text-sm text-slate-600">
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                ERA5 Reanalysis
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                NOAA GFS
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                Local Station Data
                            </li>
                        </ul>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                        <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wide">Temperature Trend</h3>
                        <div className="h-40 w-full">
                            <TemperatureAnomalyChart />
                        </div>
                        <p className="text-xs text-slate-500 mt-2">
                            Global temperature anomaly context for the event period.
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;
