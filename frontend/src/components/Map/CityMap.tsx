import React, { useEffect, useRef, useState } from 'react';
import { useCity } from '../../context/CityContext';
import L from 'leaflet';
import { 
  Search, 
  Compass, 
  Layers, 
  Crosshair, 
  Plus, 
  Minus, 
  ChevronUp, 
  ChevronDown,
  Building,
  Check,
  ShieldCheck,
  Droplets,
  Car,
  AlertTriangle,
  Flame,
  Wind,
  Users
} from 'lucide-react';
import { RoadDetailModal } from './RoadDetailModal';
import { RoadFeature } from '../../types';

export const CityMap: React.FC = () => {
  const { 
    city, 
    roadsGeoJson, 
    infraGeoJson, 
    floodGeoJson, 
    waterGeoJson, 
    layers, 
    toggleLayer, 
    selectedRoad, 
    setSelectedRoad,
    activeScenario
  } = useCity();

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layersGroupRef = useRef<L.LayerGroup | null>(null);

  const [layersOpen, setLayersOpen] = useState(true);
  const [is3D, setIs3D] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Array<{ name: string; type: string; coords: [number, number]; feature?: any }>>([]);

  // Invalidate map size when switching between 2D and 3D
  useEffect(() => {
    if (!is3D && mapInstanceRef.current) {
      setTimeout(() => {
        mapInstanceRef.current?.invalidateSize();
      }, 150);
    }
  }, [is3D]);

  // Setup Leaflet map instance
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const initialCenter: [number, number] = city === 'mumbai' ? [19.0760, 72.8777] : [12.9716, 77.5946];
      const map = L.map(mapContainerRef.current, {
        center: initialCenter,
        zoom: 12,
        zoomControl: false,
        attributionControl: false
      });

      // Standard OpenStreetMap tile layer (reliable, completely free, no API key or watermark)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      layersGroupRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    return () => {};
  }, []);

  // Update map view when city changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const targetCenter: [number, number] = city === 'mumbai' ? [19.0760, 72.8777] : [12.9716, 77.5946];
    mapInstanceRef.current.flyTo(targetCenter, 12, { duration: 1.5 });
  }, [city]);

  // Search indexing and handling
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const q = searchQuery.toLowerCase();
    const results: Array<{ name: string; type: string; coords: [number, number]; feature?: any }> = [];

    // Search roads
    if (roadsGeoJson?.features) {
      roadsGeoJson.features.forEach((f: any) => {
        if (f.properties?.name?.toLowerCase().includes(q) || f.properties?.corridor?.toLowerCase().includes(q)) {
          const firstCoord = f.geometry?.coordinates?.[0];
          if (firstCoord) {
            results.push({
              name: f.properties.name,
              type: 'Road Corridor',
              coords: [firstCoord[1], firstCoord[0]],
              feature: f
            });
          }
        }
      });
    }

    // Search infrastructure
    if (infraGeoJson?.features) {
      infraGeoJson.features.forEach((f: any) => {
        if (f.properties?.name?.toLowerCase().includes(q) || f.properties?.category?.toLowerCase().includes(q)) {
          const coords = f.geometry?.coordinates;
          if (coords) {
            results.push({
              name: f.properties.name,
              type: f.properties.category,
              coords: [coords[1], coords[0]],
              feature: f
            });
          }
        }
      });
    }

    // Search flood zones
    if (floodGeoJson?.features) {
      floodGeoJson.features.forEach((f: any) => {
        if (f.properties?.name?.toLowerCase().includes(q)) {
          const coords = f.geometry?.coordinates?.[0]?.[0];
          if (coords) {
            results.push({
              name: f.properties.name,
              type: 'Flood Vulnerability Zone',
              coords: [coords[1], coords[0]],
              feature: f
            });
          }
        }
      });
    }

    setSearchResults(results.slice(0, 5));
  }, [searchQuery, roadsGeoJson, infraGeoJson, floodGeoJson]);

  const handleSelectSearchResult = (res: { name: string; type: string; coords: [number, number]; feature?: any }) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(res.coords, 14, { duration: 1.2 });
    }
    if (res.feature && res.feature.geometry?.type === 'LineString') {
      setSelectedRoad(res.feature as RoadFeature);
    }
    setSearchQuery('');
    setSearchResults([]);
  };

  // Re-render GIS layers whenever data or layer toggles change
  useEffect(() => {
    if (!mapInstanceRef.current || !layersGroupRef.current) return;
    const group = layersGroupRef.current;
    group.clearLayers();

    // 1. Water Bodies Layer (Mithi River, Powai Lake, Ulsoor Lake, Bellandur Lake, Coastline)
    if (waterGeoJson && waterGeoJson.features) {
      // Pass 1: Subtle riparian boundary / river bank
      L.geoJSON(waterGeoJson, {
        style: (feature) => {
          const isPolygon = feature?.geometry?.type === 'Polygon';
          return {
            color: '#0369a1',
            weight: isPolygon ? 2.5 : 6,
            opacity: 0.6,
            lineCap: 'round',
            lineJoin: 'round'
          };
        }
      }).addTo(group);

      // Pass 2: Core water surface
      L.geoJSON(waterGeoJson, {
        style: (feature) => {
          const isPolygon = feature?.geometry?.type === 'Polygon';
          return {
            color: '#38bdf8',
            weight: isPolygon ? 1.5 : 3.5,
            fillColor: '#0ea5e9',
            fillOpacity: isPolygon ? 0.5 : 0.9,
            lineCap: 'round',
            lineJoin: 'round'
          };
        },
        onEachFeature: (feature, layer) => {
          const p = feature.properties;
          layer.bindTooltip(`
            <div class="font-sans text-xs p-1.5">
              <div class="font-black text-sky-900">${p.name}</div>
              <div class="text-sky-700 font-semibold">${p.type}</div>
              ${p.risk_factor ? `<div class="text-amber-700 text-[10px] mt-0.5 font-medium">Risk: ${p.risk_factor}</div>` : ''}
            </div>
          `);
        }
      }).addTo(group);
    }

    // 2. Flood Risk Inundation Zones Layer
    if (layers.floodRisk && floodGeoJson && floodGeoJson.features) {
      L.geoJSON(floodGeoJson, {
        style: (feature) => {
          const risk = feature?.properties?.risk_level;
          let color = '#3b82f6';
          let fill = '#93c5fd';
          let fillOpacity = 0.35;

          if (risk === 'Critical') {
            color = '#dc2626';
            fill = '#f87171';
            fillOpacity = 0.45;
          } else if (risk === 'High') {
            color = '#ea580c';
            fill = '#fb923c';
            fillOpacity = 0.40;
          } else if (risk === 'Medium') {
            color = '#eab308';
            fill = '#fde047';
            fillOpacity = 0.35;
          }

          return {
            color: color,
            weight: 2,
            dashArray: '5, 5',
            fillColor: fill,
            fillOpacity: fillOpacity
          };
        },
        onEachFeature: (feature, layer) => {
          const p = feature.properties;
          const riskColor = p.risk_level === 'Critical' ? 'text-red-700 bg-red-50' : p.risk_level === 'High' ? 'text-orange-700 bg-orange-50' : 'text-amber-700 bg-amber-50';
          
          layer.bindTooltip(`
            <div class="font-sans text-xs p-1.5 max-w-xs">
              <div class="font-black text-slate-900 leading-tight">${p.name}</div>
              <div class="inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] font-bold ${riskColor}">
                ${p.risk_level} Inundation Risk (${p.vulnerability_score}/100)
              </div>
              <div class="text-slate-600 mt-1 text-[11px] space-y-0.5">
                <div>Historical waterlogging: <strong class="text-slate-900">${p.historical_waterlogging_cm} cm</strong></div>
                <div>Drainage capacity: <strong>${p.drainage_capacity_mm_hr} mm/hr</strong></div>
                <div>Elevation: <strong>${p.elevation_m} m</strong></div>
              </div>
            </div>
          `);
        }
      }).addTo(group);
    }

    // 3. Population Density Heatmap Overlay Layer
    if (layers.populationDensity) {
      // High density urban clusters for Mumbai & Bengaluru
      const densityCenters = city === 'mumbai' ? [
        { lat: 19.0178, lng: 72.8478, name: 'Dadar - Parel Density Node', pop: '68,000 / km²', radius: 1800, color: '#dc2626' },
        { lat: 19.0650, lng: 72.8790, name: 'Kurla - BKC Commuter Cluster', pop: '54,000 / km²', radius: 2200, color: '#ea580c' },
        { lat: 19.1197, lng: 72.8468, name: 'Andheri West Commercial Hub', pop: '61,000 / km²', radius: 2400, color: '#dc2626' },
        { lat: 18.9322, lng: 72.8347, name: 'Fort - Nariman Point Office Core', pop: '42,000 / km²', radius: 1600, color: '#eab308' }
      ] : [
        { lat: 12.9230, lng: 77.6750, name: 'Bellandur Tech Corridor Density', pop: '45,000 / km²', radius: 2500, color: '#dc2626' },
        { lat: 12.9170, lng: 77.6230, name: 'Silk Board - BTM Commuter Node', pop: '52,000 / km²', radius: 2000, color: '#dc2626' },
        { lat: 12.9716, lng: 77.5946, name: 'CBD - MG Road Transit Core', pop: '38,000 / km²', radius: 1800, color: '#ea580c' },
        { lat: 12.9980, lng: 77.5920, name: 'Hebbal - Bellary Interchange Node', pop: '34,000 / km²', radius: 2200, color: '#eab308' }
      ];

      densityCenters.forEach(node => {
        const circle = L.circle([node.lat, node.lng], {
          radius: node.radius,
          color: node.color,
          weight: 1.5,
          dashArray: '3, 6',
          fillColor: node.color,
          fillOpacity: 0.18
        }).addTo(group);

        circle.bindTooltip(`
          <div class="font-sans text-xs p-1.5">
            <div class="font-black text-slate-900">${node.name}</div>
            <div class="text-rose-600 font-bold text-[11px]">Population Density: ${node.pop}</div>
            <div class="text-slate-500 text-[10px]">High Human Exposure Zone</div>
          </div>
        `);
      });
    }

    // 4. Air Pollution AQI Hotspot Plumes Layer
    if (layers.pollution) {
      const aqiHotspots = city === 'mumbai' ? [
        { lat: 19.0680, lng: 72.8680, name: 'BKC - Sion Industrial/Traffic Junction', aqi: 172, status: 'Unhealthy', radius: 2000, color: '#b91c1c' },
        { lat: 19.0300, lng: 72.8550, name: 'Wadala - Harbor Goods Terminal', aqi: 145, status: 'Unhealthy for Sensitive Groups', radius: 1800, color: '#d97706' },
        { lat: 19.1150, lng: 72.8500, name: 'Andheri WEH Bottleneck Plume', aqi: 158, status: 'Unhealthy', radius: 2100, color: '#b91c1c' }
      ] : [
        { lat: 12.9160, lng: 77.6200, name: 'Central Silk Board Diesel Plume', aqi: 184, status: 'Severe / Unhealthy', radius: 2200, color: '#991b1b' },
        { lat: 12.9280, lng: 77.6850, name: 'Bellandur - ORR Heavy Transit Corridor', aqi: 162, status: 'Unhealthy', radius: 2400, color: '#b91c1c' },
        { lat: 12.9900, lng: 77.5850, name: 'Hebbal Flyover Junction', aqi: 138, status: 'Moderate-High', radius: 1900, color: '#d97706' }
      ];

      aqiHotspots.forEach(spot => {
        const circle = L.circle([spot.lat, spot.lng], {
          radius: spot.radius,
          color: spot.color,
          weight: 2,
          fillColor: spot.color,
          fillOpacity: 0.25
        }).addTo(group);

        circle.bindTooltip(`
          <div class="font-sans text-xs p-1.5">
            <div class="font-black text-slate-900">${spot.name}</div>
            <div class="text-rose-700 font-bold">AQI Index: ${spot.aqi} · ${spot.status}</div>
            <div class="text-slate-500 text-[10px]">Vehicular NOx & PM2.5 Concentration</div>
          </div>
        `);
      });
    }

    // 5. Roads & Traffic Flow Dynamic Polylines Layer (Dual-Stroke GIS Rendering)
    if (layers.roads && roadsGeoJson && roadsGeoJson.features) {
      // Pass 1: Dark Casing Underlay for Crisp GIS Contrast & Road Width
      L.geoJSON(roadsGeoJson, {
        style: (feature) => {
          const isSelected = selectedRoad && selectedRoad.properties.id === feature?.properties?.id;
          const isClosed = activeScenario && activeScenario.road_id === feature?.properties?.id;
          return {
            color: isSelected ? '#581c87' : isClosed ? '#7f1d1d' : '#0f172a',
            weight: isSelected ? 10 : isClosed ? 8 : 6.5,
            opacity: 0.85,
            lineCap: 'round',
            lineJoin: 'round'
          };
        }
      }).addTo(group);

      // Pass 2: Colored Core Line for Traffic Speed & Congestion State
      L.geoJSON(roadsGeoJson, {
        style: (feature) => {
          const p = feature?.properties;
          const isSelected = selectedRoad && selectedRoad.properties.id === p?.id;
          const isClosed = activeScenario && activeScenario.road_id === p?.id;
          
          let color = '#818cf8'; // Default crisp indigo
          let weight = 4;

          // When traffic density layer is on, color by actual congestion percentage
          if (layers.traffic) {
            const cong = p?.congestion_pct || 60;
            if (cong >= 80) color = '#ef4444';       // Heavy congestion / bottleneck
            else if (cong >= 65) color = '#f59e0b';  // Moderate congestion
            else color = '#10b981';                  // Smooth flow
          }

          // Active closed road styling
          if (isClosed) {
            color = '#dc2626';
            weight = 5.5;
          }

          // Selected Road glow highlight
          if (isSelected) {
            color = '#c084fc';
            weight = 6.5;
          }

          return {
            color: color,
            weight: weight,
            opacity: 1.0,
            lineCap: 'round',
            lineJoin: 'round'
          };
        },
        onEachFeature: (feature, layer) => {
          const p = feature.properties;
          const isRoadClosed = activeScenario && activeScenario.road_id === p.id;
          const cong = p.congestion_pct || 60;
          const congColor = cong >= 80 ? 'text-rose-600' : cong >= 65 ? 'text-amber-600' : 'text-emerald-600';

          layer.bindTooltip(`
            <div class="font-sans text-xs p-1.5 max-w-xs">
              <div class="flex items-center justify-between gap-2">
                <span class="font-black text-slate-900">${p.name}</span>
                ${isRoadClosed ? '<span class="px-1.5 py-0.5 bg-rose-100 text-rose-800 rounded font-bold text-[9px] uppercase">Closed</span>' : ''}
              </div>
              <div class="text-slate-500 font-semibold text-[11px] mt-0.5">${p.type} · ${p.lanes} Lanes (${p.length_km} km)</div>
              <div class="mt-1 pt-1 border-t border-slate-100 flex justify-between text-[11px]">
                <span class="${congColor} font-bold">Congestion: ${cong}%</span>
                <span class="font-bold text-slate-800">${p.average_speed} km/h (Limit ${p.speed_limit})</span>
              </div>
              <div class="text-purple-700 font-bold text-[11px] mt-0.5">Flow Demand: ${p.current_traffic} veh/hr</div>
              <div class="text-[10px] text-slate-400 mt-1 font-medium">Click road to open corridor controls</div>
            </div>
          `);

          layer.on('click', () => {
            setSelectedRoad(feature as unknown as RoadFeature);
          });
        }
      }).addTo(group);
    }

    // 6. Infrastructure & Emergency Facilities Layer
    if ((layers.infrastructure || layers.emergencyServices) && infraGeoJson && infraGeoJson.features) {
      infraGeoJson.features.forEach((feature: any) => {
        const cat = feature.properties.category;
        const isEmergency = cat === 'Hospital' || cat === 'Fire Station' || cat === 'Police Station';

        if (!layers.emergencyServices && isEmergency) return;
        if (!layers.infrastructure && !isEmergency) return;

        const coords = feature.geometry.coordinates;
        const latLng: [number, number] = [coords[1], coords[0]];

        let markerColor = 'bg-indigo-600';
        let label = '🏢';
        let badgeBg = 'bg-indigo-50 text-indigo-700';

        if (cat === 'Hospital') {
          markerColor = 'bg-rose-500';
          label = '🏥';
          badgeBg = 'bg-rose-50 text-rose-700';
        } else if (cat === 'Fire Station') {
          markerColor = 'bg-orange-500';
          label = '🚒';
          badgeBg = 'bg-orange-50 text-orange-700';
        } else if (cat === 'Police Station') {
          markerColor = 'bg-blue-600';
          label = '👮';
          badgeBg = 'bg-blue-50 text-blue-700';
        } else if (cat === 'Railway Station' || cat === 'Metro Station') {
          markerColor = 'bg-purple-600';
          label = '🚇';
          badgeBg = 'bg-purple-50 text-purple-700';
        }

        const customIcon = L.divIcon({
          className: 'custom-poi-marker',
          html: `
            <div class="w-7 h-7 rounded-full ${markerColor} text-white text-xs flex items-center justify-center shadow-md border-2 border-white transform hover:scale-125 transition-transform cursor-pointer">
              <span>${label}</span>
            </div>
          `,
          iconSize: [28, 28],
          iconAnchor: [14, 14]
        });

        const marker = L.marker(latLng, { icon: customIcon }).addTo(group);
        marker.bindTooltip(`
          <div class="font-sans text-xs p-1.5 max-w-xs">
            <div class="font-black text-slate-900 leading-tight">${feature.properties.name}</div>
            <div class="inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] font-bold ${badgeBg}">
              ${cat} ${feature.properties.emergency_unit ? `· ${feature.properties.emergency_unit}` : ''}
            </div>
            <div class="text-slate-600 text-[11px] mt-1">
              <div>Capacity: <strong class="text-slate-900">${feature.properties.capacity}</strong></div>
              <div>Operational Status: <strong class="text-emerald-600">${feature.properties.status}</strong></div>
            </div>
          </div>
        `);
      });
    }

  }, [roadsGeoJson, infraGeoJson, floodGeoJson, waterGeoJson, layers, selectedRoad, activeScenario, city]);

  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();
  const handleResetLoc = () => {
    const center: [number, number] = city === 'mumbai' ? [19.0760, 72.8777] : [12.9716, 77.5946];
    mapInstanceRef.current?.flyTo(center, 12, { duration: 1.2 });
  };

  return (
    <div className="relative w-full h-full min-h-[500px] lg:min-h-[580px] rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs bg-slate-100 isolate z-0">
      {/* Leaflet Map DOM Element (Always mounted for immediate switching) */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* 3D Digital Twin City Model View matching reference */}
      {is3D && (
        <div className="absolute inset-0 z-10 overflow-hidden bg-slate-900">
          <img
            src="/assets/illustrations/city_digital_twin_3d.jpg"
            alt="3D Digital Twin View"
            className="w-full h-full object-cover object-center animate-in fade-in duration-300 select-none"
          />

          {/* Interactive Landmark Badges matching reference */}
          <div className="absolute inset-0 pointer-events-auto">
            {/* City Center */}
            <div 
              onClick={() => handleResetLoc()}
              className="absolute top-[34%] left-[45%] transform -translate-x-1/2 -translate-y-1/2 flex items-center space-x-1.5 px-3 py-1 bg-[#1570EF]/95 backdrop-blur-md text-white rounded-full shadow-lg border border-blue-400 text-[11px] font-extrabold cursor-pointer hover:scale-105 transition-transform"
            >
              <Building className="w-3.5 h-3.5" />
              <span>City Center</span>
            </div>

            {/* Tech Corridor */}
            <div 
              onClick={() => handleResetLoc()}
              className="absolute top-[26%] left-[63%] transform -translate-x-1/2 -translate-y-1/2 flex items-center space-x-1.5 px-3 py-1 bg-[#7F56D9]/95 backdrop-blur-md text-white rounded-full shadow-lg border border-purple-400 text-[11px] font-extrabold cursor-pointer hover:scale-105 transition-transform"
            >
              <Building className="w-3.5 h-3.5" />
              <span>Tech Corridor</span>
            </div>

            {/* Central Hospital */}
            <div 
              onClick={() => handleResetLoc()}
              className="absolute top-[43%] left-[39%] transform -translate-x-1/2 -translate-y-1/2 flex items-center space-x-1.5 px-3 py-1 bg-[#D92D20]/95 backdrop-blur-md text-white rounded-full shadow-lg border border-red-400 text-[11px] font-extrabold cursor-pointer hover:scale-105 transition-transform"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Central Hospital</span>
            </div>

            {/* Riverside Park */}
            <div 
              onClick={() => handleResetLoc()}
              className="absolute top-[46%] left-[55%] transform -translate-x-1/2 -translate-y-1/2 flex items-center space-x-1.5 px-3 py-1 bg-[#027A48]/95 backdrop-blur-md text-white rounded-full shadow-lg border border-emerald-400 text-[11px] font-extrabold cursor-pointer hover:scale-105 transition-transform"
            >
              <Droplets className="w-3.5 h-3.5" />
              <span>Riverside Park</span>
            </div>

            {/* Main Station */}
            <div 
              onClick={() => handleResetLoc()}
              className="absolute top-[56%] left-[47%] transform -translate-x-1/2 -translate-y-1/2 flex items-center space-x-1.5 px-3 py-1 bg-[#6941C6]/95 backdrop-blur-md text-white rounded-full shadow-lg border border-purple-400 text-[11px] font-extrabold cursor-pointer hover:scale-105 transition-transform"
            >
              <Car className="w-3.5 h-3.5" />
              <span>Main Station</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Search Bar with Live Dropdown */}
      <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20 w-72 sm:w-84 max-w-[calc(100%-8rem)]">
        <div className="relative flex items-center">
          <Search className="absolute left-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search location, area or road..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-xl text-xs text-slate-800 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-medium"
          />
        </div>

        {/* Live Search Autocomplete Results */}
        {searchResults.length > 0 && (
          <div className="mt-1.5 bg-white/98 backdrop-blur-md border border-slate-200 rounded-xl shadow-xl overflow-hidden py-1 divide-y divide-slate-100 animate-in fade-in duration-100">
            {searchResults.map((res, i) => (
              <button
                key={i}
                onClick={() => handleSelectSearchResult(res)}
                className="w-full px-3.5 py-2 text-left hover:bg-purple-50 transition-colors flex items-center justify-between group text-xs cursor-pointer"
              >
                <div>
                  <div className="font-bold text-slate-800 group-hover:text-purple-700 truncate">
                    {res.name}
                  </div>
                  <div className="text-[10px] text-slate-400 font-semibold">
                    {res.type}
                  </div>
                </div>
                <span className="text-[10px] text-purple-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  Pan Map →
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 2D / 3D Mode Toggle Pill matching reference */}
      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 flex items-center bg-white/95 backdrop-blur-md p-1 rounded-xl border border-slate-200/90 shadow-sm">
        <button
          onClick={() => setIs3D(false)}
          className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            !is3D ? 'bg-[#53389E] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          2D
        </button>
        <button
          onClick={() => setIs3D(true)}
          className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            is3D ? 'bg-[#53389E] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          3D
        </button>
      </div>

      {/* Floating Map Layers Control & Legend Panel matching reference */}
      <div className="absolute top-14 sm:top-16 left-3 sm:left-4 z-20 w-60 sm:w-68 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-3.5 shadow-xl transition-all">
        <div 
          onClick={() => setLayersOpen(!layersOpen)}
          className="flex items-center justify-between cursor-pointer pb-2 border-b border-slate-100"
        >
          <span className="text-xs font-black text-slate-900">Map Layers</span>
          <button className="text-slate-400 hover:text-slate-600 cursor-pointer">
            {layersOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {layersOpen && (
          <div className="pt-2.5 space-y-2.5 animate-in fade-in duration-150">
            {/* Layer Checkboxes matching reference */}
            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {[
                { id: 'roads', label: 'Roads', icon: Car },
                { id: 'traffic', label: 'Traffic', icon: Flame },
                { id: 'floodRisk', label: 'Flood Risk', icon: Droplets },
                { id: 'pollution', label: 'Pollution', icon: Wind },
                { id: 'infrastructure', label: 'Infrastructure', icon: Building },
                { id: 'emergencyServices', label: 'Emergency Services', icon: ShieldCheck },
                { id: 'populationDensity', label: 'Population Density', icon: Users },
                { id: 'landUse', label: 'Land Use', icon: Layers }
              ].map((item) => {
                const isChecked = layers[item.id as keyof typeof layers] ?? false;
                const IconComponent = item.icon;
                return (
                  <label
                    key={item.id}
                    onClick={() => toggleLayer(item.id as keyof typeof layers)}
                    className="flex items-center justify-between text-xs text-slate-700 cursor-pointer hover:bg-slate-50 p-1 rounded-lg transition-colors select-none"
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <div className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                        isChecked ? 'bg-[#7F56D9] border-transparent text-white' : 'border-slate-300 bg-white'
                      }`}>
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <IconComponent className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-[11px] font-semibold text-slate-800 truncate">{item.label}</span>
                    </div>
                  </label>
                );
              })}
            </div>

            {/* Impact Legend Section matching reference */}
            <div className="pt-2 border-t border-slate-100">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Legend
              </div>
              <div className="space-y-1 text-[11px] text-slate-600 font-semibold">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#12B76A] shrink-0"></span>
                  <span>Low Impact</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FDB022] shrink-0"></span>
                  <span>Moderate Impact</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F79009] shrink-0"></span>
                  <span>High Impact</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D92D20] shrink-0"></span>
                  <span>Critical Impact</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Right Map Controls Toolbar matching reference */}
      <div className="absolute top-14 sm:top-16 right-3 sm:right-4 z-20 flex flex-col space-y-1.5 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-xl p-1.5 shadow-sm">
        <button
          onClick={handleResetLoc}
          className="p-2 rounded-lg text-slate-600 hover:bg-purple-50 hover:text-purple-600 transition-colors cursor-pointer"
          title="Recenter City Center"
        >
          <Crosshair className="w-4 h-4" />
        </button>
        <button
          onClick={() => toggleLayer('traffic')}
          className={`p-2 rounded-lg transition-colors cursor-pointer ${layers.traffic ? 'bg-purple-100 text-purple-700' : 'text-slate-600 hover:bg-slate-100'}`}
          title="Toggle Traffic Layer"
        >
          <Layers className="w-4 h-4" />
        </button>
        <button
          onClick={() => toggleLayer('floodRisk')}
          className={`p-2 rounded-lg transition-colors cursor-pointer ${layers.floodRisk ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'}`}
          title="Measure / Tools"
        >
          <svg className="w-4 h-4 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m18 2 4 4-12 12H6v-4L18 2z" />
          </svg>
        </button>
        <div className="w-full h-px bg-slate-200 my-0.5"></div>
        <button
          onClick={handleZoomIn}
          className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          title="Zoom In"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          title="Zoom Out"
        >
          <Minus className="w-4 h-4" />
        </button>
        <div className="w-full h-px bg-slate-200 my-0.5"></div>
        <div className="p-2 flex items-center justify-center text-slate-400" title="North Pointer">
          <Compass className="w-4 h-4 text-purple-600" />
        </div>
      </div>

      {/* Scale Bar matching reference */}
      <div className="absolute bottom-3 right-3 sm:right-4 z-20 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-lg border border-slate-200/80 text-[10px] font-bold text-slate-700 shadow-2xs">
        500 m
      </div>

      {/* Interactive Selected Road Modal Drawer */}
      {selectedRoad && (
        <RoadDetailModal 
          road={selectedRoad} 
          onClose={() => setSelectedRoad(null)} 
        />
      )}
    </div>
  );
};
