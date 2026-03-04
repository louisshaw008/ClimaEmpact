import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CloudRain, ThermometerSun, Wind, Droplets, Flame, Info, TrendingUp, Waves, Snowflake, Zap, Activity, Check, BarChart3, Globe2, Database } from 'lucide-react';
import { NavLink } from 'react-router';
import TemperatureAnomalyChart from '../components/charts/TemperatureAnomalyChart';
import CO2Chart from '../components/charts/CO2Chart';
import SeaLevelChart from '../components/charts/SeaLevelChart';
import ArcticIceChart from '../components/charts/ArcticIceChart';
import OceanHeatChart from '../components/charts/OceanHeatChart';
import CarbonEmissionsChart from '../components/charts/CarbonEmissionsChart';
import ExtremeEventsChart from '../components/charts/ExtremeEventsChart';
import { reports, type Report } from '../data/reports';
import { climateStats } from '../data/global-temperature';
import { co2Stats } from '../data/co2-concentration';
import { seaLevelStats } from '../data/sea-level';
import { arcticIceStats } from '../data/arctic-ice';
import { oceanHeatStats } from '../data/ocean-heat';
import { emissionsStats } from '../data/carbon-emissions';
import { extremeEventStats } from '../data/extreme-events';

// Icon helper for report types
const ReportTypeIcon = ({ type, size = 14, className = '' }: { type: Report['type']; size?: number; className?: string }) => {
  switch (type) {
    case 'Heatwave': return <ThermometerSun size={size} className={`text-orange-500 ${className}`} />;
    case 'Storm': return <Wind size={size} className={`text-blue-500 ${className}`} />;
    case 'Flood': return <CloudRain size={size} className={`text-blue-700 ${className}`} />;
    case 'Drought': return <Droplets size={size} className={`text-yellow-600 ${className}`} />;
    case 'Wildfire': return <Flame size={size} className={`text-orange-600 ${className}`} />;
    default: return <CloudRain size={size} className={`text-slate-500 ${className}`} />;
  }
};

// Animated counter component
const AnimatedCounter = ({ end, duration = 2, suffix = '', prefix = '' }: { end: number; duration?: number; suffix?: string; prefix?: string }) => {
  const [count, setCount] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isInView]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

const Home = () => {
  const featuredReport = reports[0];
  const recentReports = reports.slice(1, 4);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Climate Visualization Background */}
        <div className="absolute inset-0 z-0 bg-slate-950">
          
          {/* Base gradient - dark atmospheric backdrop */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900" />
          
          {/* Rotating Earth Globe - Central focal point */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-40">
            {/* Outer glow - atmosphere */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle at 35% 35%, rgba(59, 130, 246, 0.3) 0%, rgba(14, 165, 233, 0.2) 40%, transparent 70%)',
                filter: 'blur(30px)',
              }}
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Main globe body with real Earth texture */}
            <motion.div 
              className="absolute inset-0 rounded-full overflow-hidden"
              style={{
                boxShadow: 'inset -60px -60px 120px rgba(0,0,0,0.8), inset 30px 30px 60px rgba(100,149,237,0.15)',
              }}
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 120,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {/* Real Earth texture image */}
              <div className="absolute inset-0 w-full h-full">
                <img 
                  src="https://images.unsplash.com/photo-1679729354919-2fe6201b1146?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlYXJ0aCUyMGZyb20lMjBzcGFjZSUyMG5hc2ElMjBzYXRlbGxpdGUlMjB2aWV3fGVufDF8fHx8MTc3MjUxOTUwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Earth"
                  className="w-full h-full object-cover scale-105"
                />
              </div>

              {/* Sphere lighting overlay */}
              <div className="absolute inset-0 rounded-full" style={{
                background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.15) 0%, transparent 50%, rgba(0,0,0,0.4) 100%)',
              }} />
            </motion.div>

            {/* Rotating cloud layer */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(ellipse 200px 100px at 40% 30%, rgba(255,255,255,0.2) 0%, transparent 50%), radial-gradient(ellipse 150px 80px at 70% 60%, rgba(255,255,255,0.15) 0%, transparent 50%)',
              }}
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 80,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            {/* Terminator line (day/night division) */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(120deg, transparent 0%, transparent 45%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.8) 100%)',
                }}
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 120,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>

            {/* City lights on night side */}
            <motion.div
              className="absolute inset-0 rounded-full overflow-hidden"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 120,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-yellow-300/60 rounded-full blur-[0.5px]"
                  style={{
                    left: `${20 + Math.random() * 30}%`,
                    top: `${20 + Math.random() * 60}%`,
                    boxShadow: '0 0 2px rgba(253, 224, 71, 0.8)',
                  }}
                />
              ))}
            </motion.div>
          </div>
          
          {/* Rotating hurricane/cyclone vortex - top right */}
          <motion.div 
            className="absolute -top-40 -right-40 w-[800px] h-[800px] opacity-25"
            style={{
              background: 'radial-gradient(circle at center, transparent 15%, rgba(59, 130, 246, 0.4) 25%, rgba(29, 78, 216, 0.3) 40%, transparent 65%)',
              filter: 'blur(2px)',
            }}
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 60,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {/* Spiral arms */}
            <div className="absolute inset-0">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-[600px] h-[3px] bg-gradient-to-r from-transparent via-blue-400/40 to-transparent origin-left"
                  style={{
                    transform: `rotate(${i * 72}deg)`,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Heat dome - pulsing red/orange mass bottom left */}
          <motion.div 
            className="absolute -bottom-32 -left-32 w-[700px] h-[700px]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="absolute inset-0 bg-gradient-radial from-orange-500/40 via-red-500/30 to-transparent blur-3xl" />
            {/* Heat wave ripples */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border-2 border-orange-500/20"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{
                  scale: [0.5, 1.5],
                  opacity: [0.6, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 1.3,
                  ease: "easeOut"
                }}
              />
            ))}
          </motion.div>

          {/* Flowing cloud layer - SVG-like organic shapes */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-full opacity-20"
            animate={{
              x: [0, -100, 0],
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <svg className="w-[200%] h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="noise">
                  <feTurbulence type="fractalNoise" baseFrequency="0.008" numOctaves="4" />
                  <feColorMatrix type="saturate" values="0" />
                  <feBlend mode="multiply" in="SourceGraphic" />
                </filter>
              </defs>
              <rect width="100%" height="100%" fill="rgba(100, 116, 139, 0.3)" filter="url(#noise)" />
            </svg>
          </motion.div>

          {/* Temperature anomaly heat map - flowing horizontal bands */}
          <div className="absolute inset-0 opacity-30">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-24 w-full"
                style={{
                  top: `${i * 16}%`,
                  background: `linear-gradient(90deg, 
                    transparent 0%, 
                    ${i % 2 === 0 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(59, 130, 246, 0.2)'} 50%, 
                    transparent 100%)`,
                  filter: 'blur(40px)',
                }}
                animate={{
                  x: ['-100%', '100%'],
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                  duration: 20 + i * 3,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 2,
                }}
              />
            ))}
          </div>

          {/* Lightning flash effect - random pulses */}
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            animate={{
              opacity: [0, 0, 0, 0, 0, 0, 0, 0, 0.3, 0, 0.5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.75, 0.77, 0.8, 1],
            }}
          >
            <div className="absolute inset-0 bg-blue-200/20" />
          </motion.div>

          {/* Precipitation particles - rain/snow effect */}
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-8 bg-gradient-to-b from-cyan-300/40 to-transparent"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10%`,
              }}
              animate={{
                y: ['0vh', '110vh'],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear"
              }}
            />
          ))}

          {/* Meteorological grid overlay */}
          <div className="absolute inset-0 opacity-10">
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '80px 80px'
              }}
            />
            {/* Latitude/longitude lines */}
            <div className="absolute inset-0">
              {[...Array(5)].map((_, i) => (
                <div key={`h-${i}`} className="absolute w-full h-px bg-cyan-400/20" style={{ top: `${20 * (i + 1)}%` }} />
              ))}
              {[...Array(7)].map((_, i) => (
                <div key={`v-${i}`} className="absolute h-full w-px bg-cyan-400/20" style={{ left: `${12.5 * (i + 1)}%` }} />
              ))}
            </div>
          </div>

          {/* Atmospheric pressure contours */}
          <motion.div 
            className="absolute top-1/4 left-1/3 w-96 h-96"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="absolute inset-0 rounded-full border border-emerald-400/10"
                style={{
                  transform: `scale(${1 - i * 0.2})`,
                  filter: 'blur(1px)',
                }}
              />
            ))}
          </motion.div>

          {/* Data point clusters - simulating weather stations */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
              }}
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            >
              <div className="w-full h-full rounded-full bg-cyan-400/50 blur-sm" />
              <div className="absolute inset-0 rounded-full border border-cyan-300/60" />
            </motion.div>
          ))}

          {/* Gradient overlays for depth and readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-slate-950/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 z-10 relative text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-400/30 mb-8">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-sm font-medium text-blue-100">Scientific Climate Attribution Platform</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
              Rapid Attribution of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400">
                Extreme Weather Events
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 mb-10 leading-relaxed max-w-3xl mx-auto">
              ClimaAtlas provides immediate scientific context for extreme weather events, analyzing how climate change influences their intensity and likelihood.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <NavLink 
                to="/reports" 
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2 group"
              >
                Explore Reports
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </NavLink>
              <NavLink 
                to="/methodology" 
                className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold rounded-xl transition-all border border-white/20 flex items-center justify-center"
              >
                Our Methodology
              </NavLink>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <motion.div
              className="w-1 h-2 bg-white/60 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Featured Report Section - Redesigned */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-blue-600 font-semibold tracking-wide uppercase text-sm mb-3 px-4 py-1 bg-blue-50 rounded-full">
              Featured Analysis
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Latest Attribution Study</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our most recent rapid attribution analysis of an extreme weather event
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Image side */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative group"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity" />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                  <img 
                    src={featuredReport.imageUrl} 
                    alt={featuredReport.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-3 text-white">
                      <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                        <ReportTypeIcon type={featuredReport.type} size={24} className="text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-blue-200">{featuredReport.type} Event</div>
                        <div className="font-semibold">{featuredReport.location}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Content side */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="px-3 py-1 bg-slate-100 rounded-full text-sm text-slate-600 font-medium">
                    {featuredReport.date}
                  </div>
                  <div className="px-3 py-1 bg-red-50 rounded-full text-sm text-red-600 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    {featuredReport.attribution}
                  </div>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                  {featuredReport.title}
                </h3>
                
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  {featuredReport.summary}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-5 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-2 mb-2">
                      <ThermometerSun size={20} className="text-blue-600" />
                      <div className="text-sm text-slate-500">Climate Signal</div>
                    </div>
                    <div className="text-2xl font-bold text-slate-900">Strong</div>
                  </div>
                  <div className="p-5 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart3 size={20} className="text-emerald-600" />
                      <div className="text-sm text-slate-500">Confidence</div>
                    </div>
                    <div className="text-2xl font-bold text-slate-900">High</div>
                  </div>
                </div>

                <NavLink 
                  to={`/reports/${featuredReport.id}`} 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/20 group"
                >
                  Read Full Analysis 
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </NavLink>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Wave Divider - Transition to dark section */}
      <div className="relative h-24 bg-white">
        <svg className="absolute bottom-0 w-full h-24" preserveAspectRatio="none" viewBox="0 0 1440 120">
          <path 
            d="M0,64 C360,100 720,20 1440,64 L1440,120 L0,120 Z" 
            fill="url(#waveGradient)"
          />
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="50%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Climate Vital Signs Dashboard */}
      <section className="py-28 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm px-5 py-2.5 rounded-full border border-blue-400/30 mb-6">
              <Activity size={18} className="text-blue-400" />
              <span className="text-sm font-semibold text-blue-100 tracking-wide">PLANETARY HEALTH MONITOR</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Climate Vital Signs
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Six critical indicators tracking the health of our planet's climate system, based on the latest satellite and in-situ measurements from NASA, NOAA, and leading research institutions.
            </p>
          </motion.div>

          {/* Stats Grid - Key Numbers */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
            {[
              { label: 'Temperature', value: `+${climateStats.currentAnomaly}°C`, icon: ThermometerSun, color: 'from-red-500 to-orange-500', trend: '+0.18°C/decade' },
              { label: 'CO₂ Level', value: `${co2Stats.current}ppm`, icon: TrendingUp, color: 'from-blue-500 to-cyan-500', trend: `+${co2Stats.percentIncrease}% since 1800` },
              { label: 'Sea Level', value: `+${seaLevelStats.totalRiseSince1880Cm.toFixed(1)}cm`, icon: Waves, color: 'from-cyan-500 to-blue-500', trend: `${seaLevelStats.currentRate}mm/year` },
              { label: 'Arctic Ice', value: `${arcticIceStats.recent2020s}M km²`, icon: Snowflake, color: 'from-cyan-400 to-blue-400', trend: `-${arcticIceStats.percentDecline}% since 1980s` },
              { label: 'Ocean Heat', value: `+${oceanHeatStats.current}ZJ`, icon: Flame, color: 'from-orange-500 to-red-500', trend: `${oceanHeatStats.heatAbsorption}% of warming` },
              { label: 'Emissions', value: `${emissionsStats.current}Gt`, icon: Zap, color: 'from-slate-500 to-slate-700', trend: `Peak: ${emissionsStats.peakYear}` },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all group cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  <stat.icon size={22} className="text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider mb-2 font-semibold">{stat.label}</div>
                <div className="text-xs text-slate-500 leading-tight">{stat.trend}</div>
              </motion.div>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {/* Temperature Anomaly */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-7 hover:bg-white/10 hover:border-white/20 transition-all group"
            >
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1.5">Global Temperature</h3>
                  <p className="text-sm text-slate-400">Anomaly relative to 1850-1900 baseline</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg">
                  <ThermometerSun size={22} className="text-white" />
                </div>
              </div>
              <TemperatureAnomalyChart />
              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-2">
                  <Database size={12} />
                  NASA, NOAA, Berkeley Earth
                </span>
                <span className="text-red-400 font-semibold">↑ {climateStats.warmingRatePerDecade}°C/decade</span>
              </div>
            </motion.div>

            {/* CO2 Concentration */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-7 hover:bg-white/10 hover:border-white/20 transition-all group"
            >
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1.5">Atmospheric CO₂</h3>
                  <p className="text-sm text-slate-400">Parts per million (Mauna Loa)</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                  <TrendingUp size={22} className="text-white" />
                </div>
              </div>
              <CO2Chart />
              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-2">
                  <Database size={12} />
                  Scripps Institution / NOAA
                </span>
                <span className="text-red-400 font-semibold">+{co2Stats.currentGrowthRate}ppm/year</span>
              </div>
            </motion.div>

            {/* Sea Level Rise */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-7 hover:bg-white/10 hover:border-white/20 transition-all group"
            >
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1.5">Global Sea Level</h3>
                  <p className="text-sm text-slate-400">Millimeters above 1993-2008 average</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg">
                  <Waves size={22} className="text-white" />
                </div>
              </div>
              <SeaLevelChart />
              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-2">
                  <Database size={12} />
                  NASA Satellite Altimetry
                </span>
                <span className="text-orange-400 font-semibold">{seaLevelStats.acceleration}</span>
              </div>
            </motion.div>

            {/* Arctic Sea Ice */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-7 hover:bg-white/10 hover:border-white/20 transition-all group"
            >
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1.5">Arctic Sea Ice</h3>
                  <p className="text-sm text-slate-400">September minimum extent (million km²)</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-400 flex items-center justify-center shadow-lg">
                  <Snowflake size={22} className="text-white" />
                </div>
              </div>
              <ArcticIceChart />
              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-2">
                  <Database size={12} />
                  NSIDC Satellite Data
                </span>
                <span className="text-red-400 font-semibold">↓ {arcticIceStats.declineRate}</span>
              </div>
            </motion.div>

            {/* Ocean Heat Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-7 hover:bg-white/10 hover:border-white/20 transition-all group"
            >
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1.5">Ocean Heat Content</h3>
                  <p className="text-sm text-slate-400">Zettajoules (0-2000m depth)</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg">
                  <Flame size={22} className="text-white" />
                </div>
              </div>
              <OceanHeatChart />
              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-2">
                  <Database size={12} />
                  NOAA Ocean Measurements
                </span>
                <span className="text-orange-400 font-semibold text-[10px] leading-tight">{oceanHeatStats.bombsPerDay}</span>
              </div>
            </motion.div>

            {/* Carbon Emissions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-7 hover:bg-white/10 hover:border-white/20 transition-all group"
            >
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1.5">CO₂ Emissions</h3>
                  <p className="text-sm text-slate-400">Gigatons per year (fossil fuel + land use)</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-500 to-slate-700 flex items-center justify-center shadow-lg">
                  <Zap size={22} className="text-white" />
                </div>
              </div>
              <CarbonEmissionsChart />
              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-2">
                  <Database size={12} />
                  Global Carbon Project
                </span>
                <span className="text-yellow-400 font-semibold text-[10px] leading-tight">{emissionsStats.reductionRateNeeded} for 2050</span>
              </div>
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <p className="text-slate-400 mb-6 text-sm">
              All data updated through March 2026 from authoritative scientific sources
            </p>
            <NavLink 
              to="/methodology"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold rounded-xl transition-all border border-white/20 shadow-lg"
            >
              <Database size={18} />
              Learn about our data sources
              <ArrowRight size={18} />
            </NavLink>
          </motion.div>
        </div>
      </section>

      {/* Wave Divider - Transition back to light */}
      <div className="relative h-24 bg-slate-900">
        <svg className="absolute bottom-0 w-full h-24" preserveAspectRatio="none" viewBox="0 0 1440 120">
          <path 
            d="M0,64 C360,20 720,100 1440,64 L1440,120 L0,120 Z" 
            fill="#f8fafc"
          />
        </svg>
      </div>

      {/* Recent Reports Grid - Enhanced */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="inline-block text-blue-600 font-semibold tracking-wide uppercase text-sm mb-3 px-4 py-1 bg-blue-50 rounded-full">
                Recent Studies
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">Latest Analyses</h2>
              <p className="text-lg text-slate-600">Rapid attribution studies from our team of climate scientists</p>
            </div>
            <NavLink 
              to="/reports" 
              className="hidden md:flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/20 group"
            >
              View all reports 
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </NavLink>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentReports.map((report, index) => (
              <motion.div 
                key={report.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:border-blue-200 transition-all duration-300"
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={report.imageUrl} 
                    alt={report.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-slate-900 shadow-lg flex items-center gap-1.5">
                    <ReportTypeIcon type={report.type} size={16} className="" />
                    {report.type}
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-slate-500 text-xs font-medium mb-3 flex items-center gap-2">
                    <span>{report.date}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span>{report.location}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                    {report.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-5 line-clamp-3 leading-relaxed">
                    {report.summary}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                    <span className="text-xs font-bold px-3 py-1.5 bg-red-50 text-red-600 rounded-lg">
                      {report.attribution}
                    </span>
                    <ArrowRight size={20} className="text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <NavLink 
              to="/reports" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/20"
            >
              View all reports 
              <ArrowRight size={18} />
            </NavLink>
          </div>
        </div>
      </section>

      {/* Why This Matters Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-emerald-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/20 via-emerald-500/20 to-blue-500/20" />
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block text-emerald-600 font-semibold tracking-wide uppercase text-sm mb-3 px-4 py-1 bg-emerald-50 rounded-full">
              Impact & Importance
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Why Attribution Matters</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Understanding the role of climate change in extreme weather events is crucial for adaptation, policy, and resilience planning
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Globe2,
                title: 'Scientific Clarity',
                description: 'Provides evidence-based answers to the question: "Did climate change cause this event?" using rigorous statistical methods and climate models.',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: BarChart3,
                title: 'Risk Assessment',
                description: 'Quantifies how much more likely and intense extreme events have become, enabling better disaster preparedness and infrastructure planning.',
                color: 'from-emerald-500 to-teal-500'
              },
              {
                icon: Check,
                title: 'Policy Action',
                description: 'Informs climate litigation, insurance, and policy decisions by establishing the link between emissions and specific climate impacts.',
                color: 'from-orange-500 to-red-500'
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity" />
                <div className="relative p-8 bg-white rounded-2xl border border-slate-200 hover:border-transparent hover:shadow-xl transition-all h-full">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 shadow-lg`}>
                    <item.icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;