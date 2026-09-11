import React, { useState } from 'react';
import { useCity } from '../context/CityContext';
import { Building2, Hospital, Flame, Shield, Train, CheckCircle2 } from 'lucide-react';
import { SectionHeader } from '../components/UI/SectionHeader';
import { Card } from '../components/UI/Card';
import { Badge } from '../components/UI/Badge';

export const InfrastructurePage: React.FC = () => {
  const { city, infraGeoJson } = useCity();
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const items = infraGeoJson?.features || [];
  const filtered = filterCategory === 'All' 
    ? items 
    : items.filter((item: any) => item.properties.category === filterCategory);

  const categories = ['All', 'Hospital', 'Fire Station', 'Police Station', 'Railway Station', 'Metro Station', 'School'];

  const getIcon = (cat: string) => {
    switch(cat) {
      case 'Hospital': return <Hospital className="w-4 h-4 text-rose-600" />;
      case 'Fire Station': return <Flame className="w-4 h-4 text-orange-600" />;
      case 'Police Station': return <Shield className="w-4 h-4 text-blue-600" />;
      case 'Railway Station':
      case 'Metro Station': return <Train className="w-4 h-4 text-purple-600" />;
      default: return <Building2 className="w-4 h-4 text-indigo-600" />;
    }
  };

  return (
    <div className="space-y-4 pb-8 max-w-[1600px] mx-auto">
      <SectionHeader
        badgeText="Infrastructure Directory"
        provenance="REAL DATA"
        title={`Critical Public Assets & Emergency Facilities (${city.toUpperCase()})`}
        subtitle="Geocoded facilities with operational status, trauma capacities, and rapid access emergency corridors."
      />

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterCategory === cat
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Infrastructure Cards */}
      {filtered.length === 0 ? (
        <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center text-slate-500">
          <p className="text-sm font-bold text-slate-800">No assets found for category "{filterCategory}"</p>
          <p className="text-xs text-slate-400 mt-1">Select "All" to view the complete municipal infrastructure directory.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((item: any) => {
            const p = item.properties;
            const coords = item.geometry.coordinates;
            return (
              <Card
                key={p.id || `${coords[0]}-${coords[1]}`}
                hoverEffect={true}
                title={p.name}
                subtitle={`${p.category} · ${p.capacity}`}
                icon={getIcon(p.category)}
                headerAction={
                  <Badge variant="emerald" size="xs">
                    {p.status}
                  </Badge>
                }
                className="flex flex-col justify-between"
              >
                {p.emergency_unit && (
                  <p className="text-[11px] text-purple-700 font-semibold mb-3">
                    Unit: {p.emergency_unit}
                  </p>
                )}

                <div className="pt-2 border-t border-slate-100 mt-2 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Coordinates:</span>
                  <span className="font-mono text-slate-700 font-bold">
                    {coords[1].toFixed(4)}° N, {coords[0].toFixed(4)}° E
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
