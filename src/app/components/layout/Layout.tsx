import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe2, Search, Globe, ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Event Dashboard', path: '/dashboard' },
    { name: 'Reports', path: '/reports' },
    { name: 'Methodology', path: '/methodology' },
    { name: 'About', path: '/about' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-blue-200 selection:text-blue-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 group">
            <div className="relative bg-gradient-to-br from-blue-600 to-emerald-600 p-1.5 rounded-lg text-white group-hover:from-blue-700 group-hover:to-emerald-700 transition-all duration-300">
              <Globe2 size={24} strokeWidth={2.5} />
              {/* Add subtle animation to globe */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Clima<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">Empact</span>
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  cn(
                    "text-sm font-medium transition-colors hover:text-blue-600 relative py-1",
                    isActive ? "text-blue-600" : "text-slate-600"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-blue-600"
                        initial={false}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors">
              <Search size={20} />
            </button>
            <NavLink 
              to="/reports" 
              className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-full hover:bg-slate-800 transition-colors shadow-sm hover:shadow-md"
            >
              Latest Analysis
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-md"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-0 top-16 z-40 bg-white border-b border-slate-200"
          >
            <nav className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "text-lg font-medium py-2 border-b border-slate-100",
                      isActive ? "text-blue-600" : "text-slate-600"
                    )
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <NavLink 
                to="/reports"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-4 px-4 py-3 bg-blue-600 text-white text-center font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Latest Analysis
              </NavLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6 text-white">
                <Globe2 size={24} />
                <span className="text-xl font-bold">ClimaEmpact</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                ClimaEmpact delivers rapid impact analysis and prediction for extreme weather events, helping communities understand and prepare for climate-driven disasters.
              </p>
              <div className="flex gap-4">
                {/* Social icons placeholder */}
                <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <Globe size={16} />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-6">Explore</h3>
              <ul className="space-y-3 text-sm">
                <li><NavLink to="/reports" className="hover:text-blue-400 transition-colors">Extreme Events</NavLink></li>
                <li><NavLink to="/methodology" className="hover:text-blue-400 transition-colors">Methodology</NavLink></li>
                <li><NavLink to="/about" className="hover:text-blue-400 transition-colors">Team & Partners</NavLink></li>
                <li><NavLink to="/data" className="hover:text-blue-400 transition-colors">Data Access</NavLink></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-6">Resources</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Peer-reviewed Publications</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Press Kit</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">API Documentation</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Glossary</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-6">Stay Updated</h3>
              <p className="text-xs text-slate-400 mb-4">Subscribe to receive alerts about new extreme weather impact analyses.</p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="bg-slate-800 border-none text-white text-sm rounded-lg px-4 py-2 flex-grow focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Join
                </button>
              </form>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>&copy; {new Date().getFullYear()} ClimaEmpact. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;