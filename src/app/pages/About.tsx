import React from 'react';
import { motion } from 'motion/react';
import { Users, Mail, Globe, Award } from 'lucide-react';
import AIAtmosphereAnimation from '../components/AIAtmosphereAnimation';

const About = () => {
  return (
    <div className="bg-white min-h-screen py-20 text-slate-900 font-sans">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About ClimaEmpact</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            A collaborative research initiative from NUS, dedicated to analyzing and predicting the real-world impacts of extreme weather events driven by climate change.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">
            <div className="order-2 md:order-1">
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-slate-600 mb-6 leading-relaxed">
                    As climate change intensifies extreme weather events worldwide, understanding their cascading impacts on communities, infrastructure, and ecosystems becomes critical. ClimaEmpact bridges the gap between climate science and actionable intelligence by delivering rapid impact analysis and future risk predictions.
                </p>
                <p className="text-slate-600 leading-relaxed">
                    Through advanced modeling and data-driven approaches, we quantify economic losses, displacement risks, and infrastructure vulnerabilities—empowering policymakers, emergency responders, and communities to prepare for and adapt to climate-driven extremes.
                </p>
            </div>
            <div className="order-1 md:order-2">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="rounded-3xl overflow-hidden shadow-2xl aspect-square"
                >
                    <AIAtmosphereAnimation />
                </motion.div>
            </div>
        </div>

        <div className="mb-20">
            <h2 className="text-3xl font-bold mb-12 text-center">Core Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[
                    { name: 'Gianmarco Mengaldo', role: 'Project Lead' },
                    { name: 'Luwei Xiao', role: 'Climate Modeler' },
                    { name: 'Xin Wang', role: 'Data Scientist' },
                    { name: 'Keane Ong', role: 'Machine Learning Specialist' },
                    { name: 'Jiawen Wei', role: 'Statistical Analyst' },
                    { name: 'Chenyu Dong', role: 'Extreme Events Researcher' },
                    { name: 'Zhou Fang', role: 'Atmospheric Physicist' },
                    { name: 'Bayan Abusalameh', role: 'Climate Data Analyst' },
                    { name: 'Vishal Srivastava', role: 'Computational Scientist' },
                    { name: 'Ethan Zhan', role: 'Geospatial Analyst' },
                    { name: 'Yuxuan Yang', role: 'Climate Impact Specialist' },
                    { name: 'Leonardo Pesce', role: 'Remote Sensing Researcher' },
                    { name: 'Emma Andrews', role: 'Climate Communication Analyst' },
                ].map((member, i) => (
                    <motion.div 
                        key={member.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-slate-50 p-6 rounded-xl border border-slate-100 hover:shadow-lg transition-shadow"
                    >
                        <div className="w-16 h-16 bg-slate-200 rounded-full mb-4 mx-auto overflow-hidden flex items-center justify-center text-slate-400">
                             <Users size={32} />
                        </div>
                        <h3 className="font-bold text-center text-slate-900">{member.name}</h3>
                        <div className="text-blue-600 text-sm font-medium text-center mb-1">{member.role}</div>
                        <div className="text-slate-500 text-xs text-center">NUS, Singapore</div>
                    </motion.div>
                ))}
            </div>
        </div>

        <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                    <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
                    <p className="text-slate-300 mb-6">
                        For press inquiries, collaboration opportunities, or general questions.
                    </p>
                    <div className="flex flex-col gap-4">
                        <a href="mailto:contact@climaempact.com" className="flex items-center gap-3 hover:text-blue-400 transition-colors">
                            <Mail size={20} />
                            <span>contact@climaempact.com</span>
                        </a>
                        <a href="https://twitter.com/climaempact" className="flex items-center gap-3 hover:text-blue-400 transition-colors">
                            <Globe size={20} />
                            <span>@ClimaEmpact</span>
                        </a>
                    </div>
                </div>
                
                <div className="w-full md:w-auto bg-slate-800 p-6 rounded-2xl min-w-[300px]">
                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label className="block text-xs font-medium text-slate-400 mb-1">Name</label>
                            <input type="text" className="w-full bg-slate-700 border-none rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-slate-400 mb-1">Email</label>
                            <input type="email" className="w-full bg-slate-700 border-none rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-slate-400 mb-1">Message</label>
                            <textarea className="w-full bg-slate-700 border-none rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 h-24"></textarea>
                        </div>
                        <button className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default About;