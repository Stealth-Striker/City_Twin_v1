import React, { useState, useEffect } from 'react';
import { useCity } from '../context/CityContext';
import { Siren, Clock, Navigation, CheckCircle2 } from 'lucide-react';
import { SectionHeader } from '../components/UI/SectionHeader';
import { Card } from '../components/UI/Card';
import { Badge } from '../components/UI/Badge';

export const EmergencyResponsePage: React.FC = () => {
  const { city, infraGeoJson, metrics, simulationResult } = useCity();

  const [incidentNode, setIncidentNode] = useState(city === 'mumbai' ? 'Bandra Kurla Complex (BKC)' : 'Ecospace Tech Park Bellandur');
  const [targetFacilityId, setTargetFacilityId] = useState(city === 'mumbai' ? 'mum-kem-hosp' : 'blr-manipal-hosp');

  // Keep incident location and facility selection synchronized with the active city
  useEffect(() => {
    if (city === 'mumbai') {
      setIncidentNode('Bandra Kurla Complex (BKC)');
      setTargetFacilityId('mum-kem-hosp');
    } else {
      setIncidentNode('Ecospace Tech Park Bellandur');
      setTargetFacilityId('blr-manipal-hosp');
    }
  }, [city]);

  const facilities = infraGeoJson?.features?.filter((f: any) => 
    f.properties.category === 'Hospital' || f.properties.category === 'Fire Station'
  ) || [];

  const baseTime = metrics?.emergency_response_min || 11.0;
  const delay = simulationResult ? simulationResult.emergency_delay_min : 2.7;
  const scenarioTime = Number((baseTime + delay).toFixed(1));

  return (
    <div className="space-y-4 pb-8 max-w-5xl mx-auto">
      <SectionHeader
        badgeText="Emergency Routing"
        provenance="MODEL ESTIMATE"
        title="Golden-Hour Medical & Rescue Transit Simulator"
        subtitle="Evaluates transit times between emergency incident nodes and designated Level-1 trauma centers or fire commands under scenario traffic stress."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card
          title="Incident Routing Configuration"
          subtitle="Select origin and destination facilities"
          icon={<Navigation className="w-4 h-4 text-purple-600" />}
        >
          <div className="space-y-3 pt-1">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Reported Incident Location
              </label>
              <input
                type="text"
                value={incidentNode}
                onChange={(e) => setIncidentNode(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Destination Medical / Rescue Facility
              </label>
              <select
                value={targetFacilityId}
                onChange={(e) => setTargetFacilityId(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              >
                {facilities.map((fac: any) => (
                  <option key={fac.properties.id} value={fac.properties.id}>
                    {fac.properties.name} ({fac.properties.category})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* Travel Time Comparison Result */}
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-purple-300 mb-2">
              Route Accessibility Comparison
            </div>
            <div className="grid grid-cols-3 gap-2.5 text-center my-3">
              <div className="bg-white/10 rounded-xl p-3 border border-white/5">
                <div className="text-[10px] text-purple-200 font-medium">Baseline</div>
                <div className="text-xl font-extrabold text-white mt-1">{baseTime} min</div>
              </div>

              <div className="bg-white/10 rounded-xl p-3 border border-white/5">
                <div className="text-[10px] text-purple-200 font-medium">With Scenario</div>
                <div className="text-xl font-extrabold text-white mt-1">{scenarioTime} min</div>
              </div>

              <div className="bg-rose-500/20 border border-rose-400/40 rounded-xl p-3">
                <div className="text-[10px] text-rose-300 font-medium">Delay</div>
                <div className="text-xl font-extrabold text-rose-400 mt-1">+{delay} min</div>
              </div>
            </div>
          </div>

          <div className="text-xs text-purple-200 bg-white/5 p-3 rounded-xl border border-white/10 flex items-center space-x-2">
            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-medium">
              {delay > 2.0 
                ? 'Transit delay exceeds standard golden-hour buffer. Alternate emergency green wave routing recommended.'
                : 'Optimal: Emergency response window remains within municipal safety guidelines.'
              }
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
