import React, { useState, useRef, useEffect } from 'react';
import { useCity } from '../context/CityContext';
import { 
  Building2, 
  Sun, 
  MapPin, 
  Bell, 
  ChevronDown, 
  Sparkles, 
  GitBranch, 
  BarChart3, 
  FileText, 
  CheckCircle2, 
  Menu, 
  X, 
  LogIn, 
  User, 
  Settings, 
  LogOut, 
  ShieldCheck, 
  AlertTriangle,
  Flame,
  Droplets
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    city, 
    setCity, 
    activeView, 
    setActiveView, 
    mobileMenuOpen, 
    setMobileMenuOpen, 
    currentUser, 
    setCurrentUser, 
    setIsLoginModalOpen, 
    showToast 
  } = useCity();

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifMenuOpen, setNotifMenuOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const notifMenuRef = useRef<HTMLDivElement>(null);
  const cityDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setUserMenuOpen(false);
      }
      if (notifMenuRef.current && !notifMenuRef.current.contains(target)) {
        setNotifMenuOpen(false);
      }
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(target)) {
        setCityDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="relative w-full px-4 lg:px-5 py-2.5 flex items-center justify-between sticky top-0 z-30 select-none min-h-[60px] bg-transparent">
      {/* Background Panoramic City Skyline Image */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute right-0 top-0 bottom-0 w-[78%] min-w-[500px] opacity-90">
          <img 
            src="/assets/illustrations/header_panorama.jpg" 
            alt="Urban Skyline" 
            className="w-full h-full object-cover object-[center_65%]"
          />
          {/* Subtle horizontal gradient to blend seamlessly into background from the left */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#F0F2F9] via-[#F0F2F9]/30 to-transparent" />
        </div>
      </div>

      {/* Left: Mobile Toggle (lg:hidden) + Greeting & Sun Icon */}
      <div className="relative z-10 flex items-center space-x-3">
        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-1.5 rounded-xl text-[#344054] hover:bg-slate-200/60 transition-colors cursor-pointer mr-1"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-500 flex items-center justify-center shrink-0 shadow-2xs">
          <Sun className="w-5 h-5 fill-amber-400 stroke-amber-500" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-black text-[#0A132F] tracking-tight leading-snug">
            Good Morning, Planner
          </h2>
          <p className="text-xs text-[#475467] font-semibold leading-tight mt-0.5">
            Real data. Simulated insights. Better decisions.
          </p>
        </div>
      </div>

      {/* Right: Date/Time, Alerts, Profile & Reference Slogan */}
      <div className="relative z-10 flex items-center space-x-3 sm:space-x-5">
        {/* Date & Time Matching Reference */}
        <div className="hidden sm:block text-right">
          <div className="text-xs font-bold text-[#475467] tracking-tight">
            Wed, 24 May 2024
          </div>
          <div className="text-base font-black text-[#0A132F] leading-tight">
            10:24 AM
          </div>
        </div>

        {/* Notification Bell with Interactive Dropdown */}
        <div className="relative" ref={notifMenuRef}>
          <button 
            onClick={() => setNotifMenuOpen(!notifMenuOpen)}
            className="relative p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
            title="Urban AI Alerts"
          >
            <Bell className="w-4 h-4 text-slate-700" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-black flex items-center justify-center shadow-xs">
              3
            </span>
          </button>

          {/* Notification Dropdown Menu */}
          {notifMenuOpen && (
            <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150 divide-y divide-slate-100">
              <div className="px-4 py-2.5 flex items-center justify-between">
                <span className="text-xs font-black text-slate-900">Active Urban Alerts</span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-rose-50 text-rose-600">3 New</span>
              </div>
              <div className="py-1 max-h-64 overflow-y-auto divide-y divide-slate-50">
                <div 
                  onClick={() => { setNotifMenuOpen(false); setActiveView('traffic'); }}
                  className="px-4 py-2.5 hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center space-x-2 text-amber-700 text-xs font-bold">
                    <Flame className="w-3.5 h-3.5 text-amber-500" />
                    <span>Traffic Gridlock Spike</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    MG Road corridor traffic exceeds 88% capacity. Alternate routing advised.
                  </p>
                </div>
                <div 
                  onClick={() => { setNotifMenuOpen(false); setActiveView('flood'); }}
                  className="px-4 py-2.5 hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center space-x-2 text-blue-700 text-xs font-bold">
                    <Droplets className="w-3.5 h-3.5 text-blue-500" />
                    <span>Flood Inundation Warning</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Runoff basin near Mithi River reaching 65cm. Drainage pumps activated.
                  </p>
                </div>
                <div 
                  onClick={() => { setNotifMenuOpen(false); setActiveView('recommendations'); }}
                  className="px-4 py-2.5 hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center space-x-2 text-purple-700 text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                    <span>AI Scenario Calibrated</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Road Closure simulation completed with 82% confidence rating.
                  </p>
                </div>
              </div>
              <div className="px-4 py-2">
                <button
                  onClick={() => { setNotifMenuOpen(false); setActiveView('recommendations'); }}
                  className="w-full text-center text-xs font-bold text-purple-600 hover:text-purple-800 cursor-pointer py-1"
                >
                  View All Actionable Recommendations →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile matching reference: RP avatar with 'Ramesh P / Urban Planner' */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center space-x-2.5 hover:opacity-95 transition-opacity cursor-pointer group text-left p-1 rounded-xl hover:bg-white/80"
            title="Account Settings"
          >
            <div className="w-9 h-9 rounded-full bg-[#7F56D9] text-white font-black text-xs flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 transition-transform">
              {currentUser?.initials || 'RP'}
            </div>
            <div className="hidden lg:block text-left">
              <div className="flex items-center space-x-1">
                <span className="text-xs font-black text-[#0A132F] leading-tight group-hover:text-purple-700 transition-colors">
                  {currentUser?.name || 'Ramesh P'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-[#667085]" />
              </div>
              <div className="flex items-center space-x-1 mt-0.5">
                <span className="text-[11px] text-[#475467] font-semibold leading-none">
                  {currentUser?.role || 'Urban Planner'}
                </span>
                <ChevronDown className="w-2.5 h-2.5 text-[#667085]" />
              </div>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-[#667085] transition-transform ml-0.5 ${userMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* User Dropdown Menu - now cleanly visible without overflow clipping */}
          {userMenuOpen && (
            <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-slate-200/90 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150 divide-y divide-slate-100">
              <div className="px-3.5 py-2">
                <div className="font-extrabold text-xs text-slate-900 truncate">
                  {currentUser?.name || 'Ramesh P'}
                </div>
                <div className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                  {currentUser?.email || 'ramesh.planner@citytwin.gov.in'}
                </div>
                <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-purple-50 text-purple-700 border border-purple-200/60">
                  {currentUser?.role || 'Urban Planner'}
                </span>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    setIsLoginModalOpen(true);
                  }}
                  className="w-full px-3.5 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center space-x-2.5 transition-colors cursor-pointer"
                >
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Profile Details</span>
                </button>
                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    showToast('Workspace settings synchronized');
                  }}
                  className="w-full px-3.5 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center space-x-2.5 transition-colors cursor-pointer"
                >
                  <Settings className="w-3.5 h-3.5 text-slate-400" />
                  <span>Workspace Settings</span>
                </button>
              </div>

              <div className="pt-1">
                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    setActiveView('login');
                  }}
                  className="w-full px-3.5 py-2 text-left text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center space-x-2.5 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-500" />
                  <span>Switch Session / Sign In</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 'Cities for People, Planet and Progress' Cursive Slogan matching reference with green underline */}
        <div className="hidden xl:flex flex-col text-right select-none -rotate-3 transform origin-center pl-2">
          <span 
            className="text-[13px] font-bold tracking-tight text-[#1D2939] leading-none"
            style={{ fontFamily: "'Caveat', 'Segoe Print', 'Bradley Hand', 'Comic Sans MS', cursive" }}
          >
            Cities for
          </span>
          <span 
            className="text-[14px] font-black tracking-tight text-[#101828] leading-tight mt-0.5"
            style={{ fontFamily: "'Caveat', 'Segoe Print', 'Bradley Hand', 'Comic Sans MS', cursive" }}
          >
            People, Planet
          </span>
          <div className="relative inline-block mt-0.5">
            <span 
              className="text-[14px] font-black tracking-tight text-[#101828] leading-none"
              style={{ fontFamily: "'Caveat', 'Segoe Print', 'Bradley Hand', 'Comic Sans MS', cursive" }}
            >
              and Progress
            </span>
            <div className="w-full h-1 bg-[#12B76A] rounded-full mt-0.5 -rotate-1 transform" />
          </div>
        </div>
      </div>
    </header>
  );
};
