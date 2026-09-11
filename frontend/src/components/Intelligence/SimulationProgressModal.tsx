import React from 'react';
import { useCity } from '../../context/CityContext';
import { 
  CheckCircle2, 
  Loader2, 
  X, 
  ArrowRight, 
  ShieldCheck, 
  Droplets, 
  Car, 
  Coins, 
  FileText,
  Clock
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const SimulationProgressModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { 
    isSimulating, 
    simulationStep, 
    simulationMessage, 
    simulationResult, 
    runSimulation,
    setActiveView 
  } = useCity();

  if (!isOpen) return null;

  const steps = [
    'Initializing Digital Twin State',
    'Loading GIS & Road Network Topology',
    'Building Interconnected Flow Graph',
    'Running BPR Traffic Equilibrium Simulation',
    'Computing Hydrological Runoff & Flood Inundation',
    'Estimating Dynamic Vehicular AQI & Emission Dispersion',
    'Calculating Critical Emergency Response Isochrones',
    'Synthesizing Multi-Factor Urban Safety Index',
    'Performing CPWD Standard Cost Estimation',
    'Running Scikit-Learn Feature Importance & AI Analysis',
    'Finalizing Multi-Criteria Scenario Optimization'
  ];

  return (
    <div className="fixed inset-0 z-[2000] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-purple-600 uppercase tracking-wide">
                What-If Engine
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-700">
                11-Stage Pipeline
              </span>
            </div>
            <h3 className="text-base font-extrabold text-slate-900 mt-0.5">
              Digital Twin Simulation Execution
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress status */}
        <div className="my-5">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-slate-700">
              {isSimulating ? simulationMessage : simulationResult ? 'All 11 Simulation Modules Completed' : 'Simulation Engine Idle'}
            </span>
            <span className="font-bold text-purple-700">
              {isSimulating ? `${Math.round((simulationStep / 11) * 100)}%` : simulationResult ? '100%' : '0%'}
            </span>
          </div>

          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-500 h-full rounded-full transition-all duration-300"
              style={{
                width: isSimulating ? `${(simulationStep / 11) * 100}%` : simulationResult ? '100%' : '5%'
              }}
            />
          </div>
        </div>

        {/* 11 Steps Checklist */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1 my-4">
          {steps.map((step, idx) => {
            const stepNum = idx + 1;
            const isCompleted = (!isSimulating && simulationResult) || (isSimulating && simulationStep > stepNum);
            const isCurrent = isSimulating && simulationStep === stepNum;

            return (
              <div
                key={idx}
                className={`flex items-center space-x-2.5 p-2 rounded-xl text-xs transition-colors ${
                  isCurrent
                    ? 'bg-purple-50 text-purple-800 font-bold border border-purple-200'
                    : isCompleted
                    ? 'bg-slate-50 text-slate-800 font-medium'
                    : 'text-slate-400 font-normal'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-purple-600 animate-spin shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-[9px] text-slate-400 shrink-0">
                    {stepNum}
                  </div>
                )}
                <span className="truncate">{step}</span>
              </div>
            );
          })}
        </div>

        {/* Calculated Result Summary (if complete) */}
        {simulationResult && !isSimulating && (
          <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-purple-50/70 to-indigo-50/70 border border-purple-100">
            <div className="text-xs font-extrabold text-purple-900 mb-2">
              Calculated Simulation Impact Summary
            </div>
            <div className="grid grid-cols-4 gap-3 text-center text-xs">
              <div className="bg-white rounded-xl p-2 border border-purple-100/70">
                <div className="text-[10px] text-slate-500 font-medium">Traffic Load</div>
                <div className="text-sm font-extrabold text-slate-800">
                  {simulationResult.traffic_load_scenario}%
                </div>
                <div className={`text-[10px] font-bold ${simulationResult.traffic_load_delta_pct > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {simulationResult.traffic_load_delta_pct > 0 ? '+' : ''}{simulationResult.traffic_load_delta_pct}%
                </div>
              </div>

              <div className="bg-white rounded-xl p-2 border border-purple-100/70">
                <div className="text-[10px] text-slate-500 font-medium">Flood Risk</div>
                <div className="text-sm font-extrabold text-slate-800">
                  {simulationResult.flood_risk_level}
                </div>
                <div className="text-[10px] font-bold text-emerald-600">
                  -{simulationResult.water_accumulation_reduction_pct}% water
                </div>
              </div>

              <div className="bg-white rounded-xl p-2 border border-purple-100/70">
                <div className="text-[10px] text-slate-500 font-medium">Safety Score</div>
                <div className="text-sm font-extrabold text-slate-800">
                  {simulationResult.safety_score_scenario}/100
                </div>
                <div className={`text-[10px] font-bold ${simulationResult.safety_score_delta < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {simulationResult.safety_score_delta} pts
                </div>
              </div>

              <div className="bg-white rounded-xl p-2 border border-purple-100/70">
                <div className="text-[10px] text-slate-500 font-medium">Est. Capex</div>
                <div className="text-sm font-extrabold text-slate-800">
                  ₹{simulationResult.estimated_cost_cr.toFixed(1)} Cr
                </div>
                <div className="text-[10px] text-slate-500">
                  {simulationResult.cost_confidence}% conf.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-4 mt-2 border-t border-slate-100">
          <button
            onClick={() => runSimulation()}
            disabled={isSimulating}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors disabled:opacity-50"
          >
            Re-run Simulation
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => { onClose(); setActiveView('reports'); }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 transition-colors flex items-center space-x-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>View Full Assessment</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white shadow-sm shadow-purple-600/30 transition-all"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
