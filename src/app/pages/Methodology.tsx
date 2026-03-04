import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Target, CheckCircle, Database } from 'lucide-react';

const Methodology = () => {
  return (
    <div className="bg-white min-h-screen py-16 text-slate-900 font-serif">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-blue-600 font-sans font-bold tracking-wide uppercase text-sm mb-4 block">Our Approach</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-sans">Rapid Attribution Methodology</h1>
          <p className="text-xl text-slate-600 font-sans max-w-2xl mx-auto">
            How we determine the role of climate change in extreme weather events within hours of their occurrence.
          </p>
        </motion.div>

        {/* Introduction */}
        <div className="prose prose-lg prose-slate mx-auto mb-16 first-letter:text-5xl first-letter:font-bold first-letter:text-blue-600 first-letter:mr-2 first-letter:float-left">
          <p>
            Extreme weather attribution is a rapidly evolving field of climate science that seeks to determine whether and to what extent human-caused climate change has altered the probability or intensity of specific weather events. While traditional peer-reviewed studies can take months or years, ClimaAtlas employs a peer-reviewed methodology designed for rapid analysis, providing immediate context when it matters most.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 font-sans">
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
              <Database size={24} />
            </div>
            <h3 className="text-xl font-bold mb-4">1. Data Collection</h3>
            <p className="text-slate-600 leading-relaxed">
              We collect observational data from global weather stations and reanalysis datasets (ERA5) to characterize the event in terms of meteorological variables like temperature, precipitation, and pressure patterns.
            </p>
          </div>
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
              <Target size={24} />
            </div>
            <h3 className="text-xl font-bold mb-4">2. Analogue Selection</h3>
            <p className="text-slate-600 leading-relaxed">
              Using historical climate records dating back to 1950, we identify past weather patterns (analogues) that closely resemble the current event's atmospheric circulation.
            </p>
          </div>
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
              <BookOpen size={24} />
            </div>
            <h3 className="text-xl font-bold mb-4">3. Comparison</h3>
            <p className="text-slate-600 leading-relaxed">
              We compare the selected analogues from the past (1979-2001) with those from the present (2001-2023). This comparison reveals how similar weather patterns behave differently in a warmer world.
            </p>
          </div>
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6">
              <CheckCircle size={24} />
            </div>
            <h3 className="text-xl font-bold mb-4">4. Attribution Statement</h3>
            <p className="text-slate-600 leading-relaxed">
              Based on the statistical difference between past and present analogues, we quantify the change in intensity and likelihood, assigning a confidence level to the role of climate change.
            </p>
          </div>
        </div>

        {/* Detailed Explanation */}
        <div className="bg-slate-900 text-slate-300 p-8 md:p-12 rounded-3xl font-sans mb-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            
            <h3 className="text-2xl font-bold text-white mb-6 relative z-10">Why "Rapid" Matters</h3>
            <p className="mb-6 leading-relaxed relative z-10">
              The news cycle moves fast. By the time a traditional attribution study is published, the public's attention has often moved on. Rapid attribution bridges this gap, injecting scientific evidence into the conversation while the event is still unfolding.
            </p>
            <p className="leading-relaxed relative z-10">
              Our methods are conservative. We only issue statements when the signal is clear and statistically significant. This approach prioritizes reliability over speed, ensuring that our findings stand up to scrutiny.
            </p>
        </div>

        {/* References */}
        <div className="border-t border-slate-200 pt-12">
            <h4 className="font-sans font-bold text-lg mb-6 text-slate-900">Key References</h4>
            <ul className="space-y-4 text-sm text-slate-600 font-sans">
                <li className="flex gap-4">
                    <span className="font-mono text-slate-400">[1]</span>
                    <p>Faranda, D., et al. (2022). A boosted-boosting approach to extreme weather event attribution. <em>Weather and Climate Dynamics</em>.</p>
                </li>
                <li className="flex gap-4">
                    <span className="font-mono text-slate-400">[2]</span>
                    <p>Yiou, P., et al. (2020). Rapid attribution of the 2019 French heatwaves. <em>Weather and Climate Extremes</em>.</p>
                </li>
            </ul>
        </div>
      </div>
    </div>
  );
};

export default Methodology;