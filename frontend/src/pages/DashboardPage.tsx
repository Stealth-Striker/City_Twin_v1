import React, { useState } from 'react';
import { useCity } from '../context/CityContext';
import { KPIGrid } from '../components/KPIGrid';
import { CityMap } from '../components/Map/CityMap';
import { ActiveScenarioCard } from '../components/Intelligence/ActiveScenarioCard';
import { AIInsightCard } from '../components/Intelligence/AIInsightCard';
import { SimulationProgressModal } from '../components/Intelligence/SimulationProgressModal';
import { TrafficChart } from '../components/Analytics/TrafficChart';
import { FloodRiskMap } from '../components/Analytics/FloodRiskMap';
import { PollutionChart } from '../components/Analytics/PollutionChart';
import { EmergencyChart } from '../components/Analytics/EmergencyChart';
import { Leaf, PlusCircle, ArrowRight, Boxes } from 'lucide-react';
import { Button } from '../components/UI/Button';

export const DashboardPage: React.FC = () => {
  const { setActiveView } = useCity();
  const [progressModalOpen, setProgressModalOpen] = useState(false);

  return (
    <div className="space-y-3 sm:space-y-4 pb-8 w-full">
      {/* 1. Top City KPI Row */}
      <KPIGrid />

      {/* 2. Middle Row: Main Central Map (approx 65%) + Right Intelligence Panel (approx 35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
        {/* Central GIS Map */}
        <div className="lg:col-span-8 xl:col-span-8 h-[500px] sm:h-[550px] lg:h-[580px]">
          <CityMap />
        </div>

        {/* Right Intelligence Panel: Active Scenario & AI Insights */}
        <div className="lg:col-span-4 xl:col-span-4 flex flex-col space-y-3 sm:space-y-4">
          <ActiveScenarioCard onOpenProgress={() => setProgressModalOpen(true)} />
          <AIInsightCard />
        </div>
      </div>

      {/* 3. Bottom Row: 4 Purposeful Analytics Bento Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        <TrafficChart />
        <FloodRiskMap />
        <PollutionChart />
        <EmergencyChart />
      </div>

      {/* 4. Bottom Scenario CTA Banner matching reference */}
      <div className="relative bg-white border border-slate-200/90 rounded-2xl p-3.5 px-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 overflow-hidden">
        {/* Left: Leaf and Slogan */}
        <div className="relative z-10 flex items-center space-x-3 text-slate-800">
          <div className="w-9 h-9 rounded-full bg-emerald-100 text-[#12B76A] flex items-center justify-center shrink-0">
            <Leaf className="w-5 h-5 fill-[#12B76A]/20 text-[#12B76A]" />
          </div>
          <span className="text-[13px] font-bold text-slate-900 leading-tight">
            Simulate urban decisions. Minimize risks. Maximize impact.
          </span>
        </div>

        {/* Center / Right: Action Button & Skyline Logo */}
        <div className="relative z-10 flex items-center space-x-6">
          <button
            onClick={() => setActiveView('scenario-builder')}
            className="px-4 py-2 bg-[#027A48] hover:bg-[#05603A] text-white text-xs font-bold rounded-xl flex items-center space-x-2 shadow-sm shadow-emerald-700/20 transition-all cursor-pointer group"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Create What-If Scenario</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Far Right: Skyline & Slogan matching reference */}
          <div className="hidden lg:flex items-center space-x-2.5 pl-4 border-l border-slate-200">
            <div className="w-14 h-7 overflow-hidden opacity-60">
              <img 
                src="/assets/illustrations/footer_skyline.jpg" 
                alt="City Silhouette" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-right select-none leading-none">
              <div className="text-[10px] font-semibold text-slate-500">
                Smart Cities
              </div>
              <div className="text-[10px] font-semibold text-slate-400 mt-0.5">
                Sustainable Futures
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simulation Progress Modal */}
      <SimulationProgressModal
        isOpen={progressModalOpen}
        onClose={() => setProgressModalOpen(false)}
      />
    </div>
  );
};
