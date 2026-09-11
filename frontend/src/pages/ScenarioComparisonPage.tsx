import React from 'react';
import { useCity } from '../context/CityContext';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { SectionHeader } from '../components/UI/SectionHeader';
import { Button } from '../components/UI/Button';
import { Card } from '../components/UI/Card';

export const ScenarioComparisonPage: React.FC = () => {
  const { city, setActiveView, metrics } = useCity();

  const isMum = city === 'mumbai';
  const baseTraffic = metrics ? `${metrics.traffic_load}%` : isMum ? '72%' : '78%';
  const baseSpeed = metrics ? `${metrics.average_speed}` : isMum ? '28' : '19';
  const baseAqi = metrics ? `${metrics.air_quality_aqi}` : isMum ? '78' : '68';
  const baseEmerg = metrics ? `${metrics.emergency_response_min}` : isMum ? '11.0' : '14.5';
  const baseSafety = metrics ? `${metrics.safety_score}` : isMum ? '82' : '76';

  const comparisonRows = [
    { metric: 'Traffic Load (%)', baseline: baseTraffic, scenA: isMum ? '81%' : '86%', scenB: isMum ? '76%' : '79%', scenC: isMum ? '63%' : '67%', scenD: isMum ? '67%' : '71%', best: 'Scenario C' },
    { metric: 'Avg Speed (km/h)', baseline: baseSpeed, scenA: isMum ? '22' : '14', scenB: isMum ? '25' : '18', scenC: isMum ? '31' : '26', scenD: isMum ? '29' : '23', best: 'Scenario C' },
    { metric: 'Flood Risk (0-100)', baseline: isMum ? '64' : '71', scenA: isMum ? '64' : '71', scenB: isMum ? '58' : '62', scenC: isMum ? '48' : '51', scenD: isMum ? '42' : '45', best: 'Scenario D' },
    { metric: 'Pollution (AQI)', baseline: baseAqi, scenA: isMum ? '88' : '79', scenB: isMum ? '82' : '72', scenC: isMum ? '65' : '56', scenD: isMum ? '69' : '61', best: 'Scenario C' },
    { metric: 'Emergency (min)', baseline: baseEmerg, scenA: isMum ? '14.2' : '17.8', scenB: isMum ? '12.5' : '15.4', scenC: isMum ? '9.8' : '12.2', scenD: isMum ? '10.5' : '13.1', best: 'Scenario C' },
    { metric: 'Safety Score (0-100)', baseline: baseSafety, scenA: isMum ? '69' : '65', scenB: isMum ? '75' : '71', scenC: isMum ? '89' : '84', scenD: isMum ? '87' : '82', best: 'Scenario C' },
    { metric: 'Est. Cost (₹ Cr)', baseline: '—', scenA: '₹2.1 Cr', scenB: '₹3.4 Cr', scenC: '₹1.8 Cr', scenD: '₹2.6 Cr', best: 'Scenario C' },
    { metric: 'Overall MCDA Score', baseline: '74.0', scenA: isMum ? '62.5' : '59.8', scenB: isMum ? '71.0' : '68.4', scenC: isMum ? '87.4' : '85.2', scenD: isMum ? '83.2' : '81.0', best: 'Scenario C' }
  ];

  const scenarioHeaders = [
    { id: 'baseline', name: 'Baseline State', subtitle: 'Current City Status' },
    { id: 'scenA', name: 'Scenario A', subtitle: 'Corridor Closure' },
    { id: 'scenB', name: 'Scenario B', subtitle: 'Partial Diversion' },
    { id: 'scenC', name: 'Scenario C (Best)', subtitle: 'Optimized Flow & Signals' },
    { id: 'scenD', name: 'Scenario D', subtitle: 'Drainage + Diversion' }
  ];

  const actions = (
    <Button
      variant="primary"
      size="sm"
      onClick={() => setActiveView('recommendations')}
      icon={<Sparkles className="w-4 h-4" />}
    >
      View AI Optimization
    </Button>
  );

  return (
    <div className="space-y-4 pb-8 max-w-[1600px] mx-auto">
      <SectionHeader
        badgeText="Multi-Scenario Comparison"
        provenance="SIMULATED"
        title={`Comparative Scenario Decision Matrix (${city.toUpperCase()})`}
        subtitle="Cross-evaluate multi-physics simulation runs across baseline conditions and candidate planning interventions to identify the Pareto-optimal solution."
        actions={actions}
      />

      {/* Comparison Matrix Table */}
      <Card padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-800">
                <th className="p-3.5 font-bold">Evaluation Dimension</th>
                {scenarioHeaders.map((scen) => (
                  <th key={scen.id} className={`p-3.5 font-bold ${scen.id === 'scenC' ? 'text-emerald-800 bg-emerald-50/40' : ''}`}>
                    <div>{scen.name}</div>
                    <div className="text-[10px] font-normal text-slate-500">{scen.subtitle}</div>
                  </th>
                ))}
                <th className="p-3.5 font-bold text-purple-700">Top Performer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className={idx === comparisonRows.length - 1 ? 'bg-purple-50/50 font-bold' : 'hover:bg-slate-50/60'}>
                  <td className="p-3.5 text-slate-900 font-bold">{row.metric}</td>
                  <td className="p-3.5 text-slate-600 font-semibold">{row.baseline}</td>
                  <td className="p-3.5 text-rose-700 font-bold">{row.scenA}</td>
                  <td className="p-3.5 text-amber-700 font-bold">{row.scenB}</td>
                  <td className="p-3.5 text-emerald-700 font-black bg-emerald-50/20">{row.scenC}</td>
                  <td className="p-3.5 text-indigo-700 font-bold">{row.scenD}</td>
                  <td className="p-3.5 font-extrabold text-emerald-700 flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{row.best}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
