import React from 'react';
import { useCity } from '../context/CityContext';
import { ActiveView } from '../types';
import { 
  LayoutDashboard, 
  Boxes, 
  GitFork, 
  Car, 
  Waves, 
  Wind, 
  Siren, 
  Building2, 
  Sliders, 
  Sparkles, 
  FileText,
  MapPin,
  ChevronRight,
  ArrowRight,
  PlusCircle,
  Leaf,
  Layers,
  Sparkle
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { city, setCity, activeView, setActiveView, mobileMenuOpen, setMobileMenuOpen } = useCity();

  const navItems: { id: ActiveView; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'digital-twin', label: 'Digital Twin', icon: Boxes },
    { id: 'scenario-builder', label: 'Scenario Builder', icon: GitFork },
    { id: 'traffic', label: 'Traffic Analysis', icon: Car },
    { id: 'flood', label: 'Flood Risk', icon: Waves },
    { id: 'pollution', label: 'Air Pollution', icon: Wind },
    { id: 'emergency', label: 'Emergency Response', icon: Siren },
    { id: 'infrastructure', label: 'Infrastructure', icon: Building2 },
    { id: 'compare', label: 'Compare Scenarios', icon: Sliders },
    { id: 'recommendations', label: 'Recommendations', icon: Sparkles },
    { id: 'reports', label: 'Reports', icon: FileText }
  ];

  const handleNavClick = (id: ActiveView) => {
    setActiveView(id);
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:static top-0 lg:top-auto left-0 h-screen w-60 sm:w-64 bg-transparent flex flex-col p-3 sm:p-3.5 z-40 shrink-0 transition-transform duration-200 ease-out select-none lg:translate-x-0 overflow-y-auto overflow-x-hidden ${
          mobileMenuOpen ? 'translate-x-0 bg-white/95 backdrop-blur-md shadow-2xl' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col">
          {/* Brand Header matching reference: directly above Dashboard */}
          <div 
            onClick={() => handleNavClick('dashboard')}
            className="flex items-center space-x-3 px-2 py-1.5 mb-3 cursor-pointer group select-none shrink-0"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-xs border border-purple-200/50 group-hover:scale-105 transition-transform shrink-0 bg-white">
              <img 
                src="/assets/brand/citytwin_banner_logo.jpg" 
                alt="CityTwin Brand" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xl font-black tracking-tight text-[#0A132F] leading-tight">
                  City<span className="text-[#6941C6]">Twin</span>
                </span>
              </div>
              <p className="text-[11px] text-[#475467] font-semibold leading-none mt-0.5">
                Simulate today. Build smarter tomorrow.
              </p>
            </div>
          </div>

          {/* Navigation Items List */}
          <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-[13px] font-semibold transition-all text-left cursor-pointer group ${
                  isActive
                    ? 'bg-gradient-to-r from-[#805AD5] to-[#6B46C1] text-white shadow-md shadow-purple-500/25 font-bold'
                    : 'text-[#4A5568] hover:text-[#1A202C] hover:bg-slate-200/50'
                }`}
              >
                <div className="flex items-center space-x-3 truncate">
                  <Icon
                    className={`w-[18px] h-[18px] shrink-0 transition-colors ${
                      isActive ? 'text-white' : 'text-[#718096] group-hover:text-[#4A5568]'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>
              </button>
            );
          })}
        </div>
        </div>

        {/* Bottom Section matching reference */}
        <div className="mt-auto pt-4 space-y-3 shrink-0 pb-4">
          {/* Current City Card matching reference */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-3.5 shadow-xs">
            <div className="text-[11px] font-semibold text-slate-400 mb-1">
              Current City
            </div>
            <div className="flex items-center space-x-1.5 font-bold text-xs text-slate-800">
              <MapPin className="w-3.5 h-3.5 text-slate-700 shrink-0" />
              <span>{city === 'mumbai' ? 'Mumbai, India' : city === 'bengaluru' ? 'Bengaluru, India' : 'Demo City, India'}</span>
            </div>
            <button
              onClick={() => setCity(city === 'mumbai' ? 'bengaluru' : 'mumbai')}
              className="mt-2 text-[11px] font-semibold text-slate-500 hover:text-purple-700 flex items-center space-x-1 cursor-pointer transition-colors"
            >
              <span>Change City</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Sustainable Cities Promo Card Matching Reference Design media_1789089449086.png */}
          <div className="relative h-64 rounded-3xl overflow-hidden border border-purple-100/70 shadow-xs flex flex-col justify-between p-4 select-none">
            {/* Full Background Painting matching reference */}
            <img 
              src="/assets/illustrations/sustainable_cities_bg.jpg" 
              alt="Sustainable Cities Stronger Tomorrows" 
              className="absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none"
            />

            {/* Overlaid Typography and Leaf Badge matching reference */}
            <div className="relative z-10">
              <h3 className="text-[15px] font-extrabold text-[#1E293B] leading-[1.22] tracking-tight">
                Sustainable<br />Cities<br />Stronger<br />Tomorrows
              </h3>
              <div className="mt-2.5">
                <svg className="w-5 h-5 drop-shadow-xs" viewBox="0 0 24 24" fill="none">
                  <path 
                    d="M20.24 3.76A6 6 0 0 0 16 2a11.8 11.8 0 0 0-8 3.5c-3.5 3.5-4 8.5-1.5 11.5s8 2 11.5-1.5A11.8 11.8 0 0 0 21.5 7.5a6 6 0 0 0-1.26-3.74Z" 
                    fill="#B49AF7" 
                  />
                  <path 
                    d="M8.5 15.5c2.5-2.5 5.5-4.5 8.5-5.5" 
                    stroke="#FFFFFF" 
                    strokeWidth="1.2" 
                    strokeLinecap="round" 
                  />
                  <path 
                    d="M6.5 17.5L4 20" 
                    stroke="#B49AF7" 
                    strokeWidth="1.8" 
                    strokeLinecap="round" 
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
