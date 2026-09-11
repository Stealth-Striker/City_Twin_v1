# CITYTWIN 2.0: AI-Powered Urban Digital Twin for Predictive City Planning

> **"Simulate today. Build smarter tomorrow."**  
> *Developed for Smart India Hackathon (SIH) 2026*

---

## 1. Project Overview

**CityTwin** is an enterprise-grade urban digital twin platform designed for municipal corporations, urban development authorities, traffic management commands, and disaster mitigation agencies. 

Urban infrastructure decisions—such as closing major arterial expressways, constructing flyovers, diverting traffic corridors, or upgrading stormwater drainage—often cause severe unintended consequences including gridlock, heightened accident risks, and delayed emergency services. 

CityTwin enables planners and administrators to **simulate proposed urban interventions virtually before implementing them in the real world**, predicting multi-physics systemic cross-impacts across traffic congestion, flood inundation, air pollution, emergency hospital transit, safety vulnerabilities, and civil budget requirements.

---

## 2. Core Workflow

```
REAL GIS DATA (OpenStreetMap)
   │
   ▼
MULTI-PHYSICS DIGITAL TWIN (Mumbai & Bengaluru)
   │
   ▼
WHAT-IF SCENARIO BUILDER (Road Closures, Diversions, Drainage Upgrades)
   │
   ▼
SIMULATION ENGINES (BPR Equilibrium Flow + Hydrological Runoff + Emissions)
   │
   ▼
PREDICTIVE AI / ML (Scikit-Learn Random Forest with Feature Attribution)
   │
   ▼
MULTI-CRITERIA SCENARIO OPTIMIZATION (Configurable Policy Weights)
   │
   ▼
DECISION SUPPORT & URBAN IMPACT REPORT (Social, Economic, Environmental, Governance)
```

---

## 3. Visual Design & UI System

CityTwin adheres strictly to a clean, futuristic municipal command-center aesthetic:
- **Primary Visual Direction**: Light futuristic smart-city dashboard with crisp off-white background (`#F8F9FD`), pure white cards (`#FFFFFF`), and refined elevation borders.
- **Color Semantics**:
  - **Deep Purple / Violet (`#7C3AED`)**: CityTwin AI active navigation, brand elements, and scenario selection.
  - **Emerald Green (`#10B981`)**: Low risk, positive impacts, and sustainability CTAs.
  - **Sky Blue (`#0284C7`)**: Hydrological water bodies, drainage channels, and GIS layers.
  - **Amber / Orange (`#F59E0B`)**: Moderate impact thresholds and warning buffers.
  - **Coral / Rose Red (`#EF4444`)**: Critical impact alerts, traffic bottlenecks, and severe flood basins.

---

## 4. Real City Maps (Mumbai & Bengaluru)

Unlike generic SaaS mockups that use fictional maps or AI-generated imagery, CityTwin integrates **real OpenStreetMap spatial geometry and authentic geographic coordinates**:

### 📍 Mumbai Twin (`[19.0760° N, 72.8777° E]`)
- **Arterial Corridors**: Western Express Highway (WEH), Eastern Express Highway (EEH), Bandra-Worli Sea Link (BWSL), Jogeshwari-Vikhroli Link Road (JVLR), BKC Connector, Swami Vivekanand (SV) Road, and LBS Marg.
- **Critical Infrastructure**: KEM Hospital Parel, Lilavati Hospital Bandra, P.D. Hinduja Hospital Mahim, Mumbai Fire Brigade HQ Byculla, Bandra Fire Command, BKC Regional Police Division, CSMT, and Metro Line 3 Aqua Line.
- **Hydrological Basins**: Arabian Sea shoreline, Mithi River channel, Powai Lake, and low-lying flood zones (Hindmata Dadar, Kurla West Basin, Milan Subway Santacruz, and BKC lowland).

### 📍 Bengaluru Twin (`[12.9716° N, 77.5946° E]`)
- **Arterial Corridors**: Outer Ring Road (ORR Silk Board to Marathahalli), Hebbal to KR Puram Expressway, Hosur Road Elevated Tollway, Old Airport Road, Bellary Airport Road, and Sarjapur Road.
- **Critical Infrastructure**: Victoria Hospital City Market, Manipal Hospital Old Airport Rd, Apollo Hospital Bannerghatta, State Fire HQ High Grounds, Electronic City Fire Post, Bengaluru Police HQ Infantry Rd, KSR Bengaluru Majestic Junction, and Silk Board Multi-Modal Interchange.
- **Hydrological Basins**: Bellandur Lake wetland, Ulsoor Lake reservoir, Varthur Lake, and low-lying flood zones (Ecospace Tech Park Bellandur, Silk Board Junction, and Rainbow Drive Sarjapur).

---

## 5. Multi-Physics Simulation Engines

### A. Traffic Equilibrium Model
- Utilizes the **Bureau of Public Roads (BPR)** equilibrium link delay function:
  $$\tau = \tau_0 \cdot \left[ 1 + \alpha \cdot \left( \frac{V}{C} \right)^\beta \right]$$
  *(where $\alpha = 0.15$, $\beta = 4.0$, $V$ is volume, $C$ is capacity)*
- When a road is closed or restricted, flow is dynamically redistributed to parallel secondary corridors.
- Calculates vehicle diversion ($veh/hr$), average speed drop ($km/h$), and saturated intersections.
- Includes integration hooks for microscopic traffic simulation with Eclipse SUMO.

### B. Hydrological Flood Inundation Model
- Evaluates stormwater accumulation based on the Rational Runoff formula:
  $$Q = C \cdot I \cdot A$$
- Simulates monsoon precipitation stress (up to $250\text{ mm/day}$) against stormwater drainage capacity.
- Evaluates water accumulation relief and lists protected critical infrastructure.

### C. Vehicular Emissions & AQI Estimator
- Dynamically estimates $PM_{2.5}$ and $NO_x$ emissions surging during stop-and-go idling below $20\text{ km/h}$.
- Projects air quality index (AQI) adjustments and calculates clean air corridor lengths.

### D. Emergency Response Isochrone Routing
- Evaluates transit travel times between emergency incident nodes and designated Level-1 trauma centers or fire stations.
- Demonstrates whether proposed road closures compromise the "golden hour" medical response window.

### E. Multi-Factor Urban Safety Index
- Computes a deterministic Safety Score ($0\text{--}100$) by synthesizing intersection saturation, emergency delays, pedestrian density friction, and flood hazards.
- Provides explicit explanations: *"Why did safety change?"*

### F. CPWD Standard Cost Estimation
- Generates realistic municipal capital and operational cost estimates in Crores INR ($\text{₹ Cr}$) based on Central Public Works Department (CPWD) benchmarks.

---

## 6. Machine Learning & Transparent AI

CityTwin uses **Scikit-Learn Random Forest Regressors** trained on synthetic urban physics observations.

### Non-Black-Box AI Explainability:
Every recommendation exposes **true feature importances**:
- Road Capacity: **42%**
- Traffic Volume: **31%**
- Intersection Utilization: **18%**
- Other Local Factors: **9%**

The system never outputs generic text like *"AI recommends Scenario C."* Instead, it explicitly states:
> *"Scenario C ranked highest because under configured weights (Traffic 30%, Flood 20%, Safety 20%, Cost 15%), it optimizes the Pareto frontier: it reduces corridor congestion by 12% and protects emergency transit times below 10.0 minutes at a cost-effective budget of ₹1.8 Cr."*

---

## 7. City Impact Summary (Four Pillars)

Every simulated scenario generates an **Urban Impact Assessment**:
1. **Social Impact**: Golden hour emergency transit changes, protected populations ($18,400\text{ citizens}$), and transit commuter throughput.
2. **Economic Impact**: Implementation capital expenditure ($\text{₹ Cr}$), potential avoided disaster loss, and commercial throughput efficiency.
3. **Environmental Impact**: Emission reductions ($-14.2\%$), stormwater inundation reduction ($-22.4\%$), and clean air corridors.
4. **Governance Impact**: Multi-scenario evaluation transparency, audit trail verification, and evidence-based decision confidence.

---

## 8. Data Provenance Framework

To maintain scientific integrity and avoid misleading authorities, every data point displays a clear provenance badge:
- **`REAL DATA`**: Authentic OpenStreetMap geospatial polylines and verified facility coordinates.
- **`DEMO DATA`**: Synthesized municipal baseline sensor feeds (traffic and weather).
- **`SIMULATED`**: Computed by physical models (BPR flow redistribution, hydrological runoff).
- **`MODEL ESTIMATE`**: Statistical predictions from trained Scikit-Learn regressors.
- **`FUTURE INTEGRATION`**: Planned real-world IoT telemetry and municipal sensor APIs.

---

## 9. SIH 2026 Judge Demo Flow (2-Minute Walkthrough)

1. **Launch Dashboard**: Open CityTwin (`http://localhost:5173`). Observe the command-center layout matching the reference design.
2. **Explore Mumbai Map**: Observe the real Mumbai map with Western Express Highway, KEM Hospital, Mithi River, and flood basins.
3. **Interactive Road Selection**: Click on **Western Express Highway** directly on the map. Notice the contextual road card appear displaying traffic volume, speed, and affected vehicles.
4. **Launch Scenario Builder**: Click `[Create Scenario]`. Modify capacity change to $-50\%$ and drainage improvement to $+35\%$.
5. **Run Simulation**: Click `[RUN SIMULATION]`. Watch the **11-step simulation pipeline** progress in real time.
6. **Review Immediate Impact**: Examine updated KPIs, Traffic Trend line chart (baseline vs scenario), Flood Risk map, AQI chart, and Emergency Response delay.
7. **Compare Scenarios**: Navigate to **Compare Scenarios** to inspect the multi-scenario comparison matrix (Scenarios A, B, C, D).
8. **Test AI Optimization**: Open **Recommendations**, adjust the priority weight sliders, and observe the dynamic recalculation of the Pareto-optimal scenario.
9. **Switch City**: Toggle city to **Bengaluru**. The map smoothly transitions to Outer Ring Road, Silk Board, and Bellandur Lake with all metrics recalculated.
10. **Export Report**: Open **Reports** to review the Four Pillars Urban Impact Assessment and trigger `[Export PDF]`.

---

## 10. Quickstart & Installation

### Option A: Docker Compose (Recommended)
```bash
# Clone and navigate to the project directory
cd citytwin

# Launch PostgreSQL (PostGIS), FastAPI Backend, and React Frontend
docker compose up --build
```
- Frontend: `http://localhost:5173`
- Backend API Docs: `http://localhost:8000/docs`

---

### Option B: Manual Local Setup

#### 1. Backend (Python FastAPI in Virtual Environment)
```bash
cd citytwin/backend

# Create virtual environment
python -m venv venv

# Activate virtual environment (Windows PowerShell)
.\venv\Scripts\Activate.ps1
# or (Windows Command Prompt)
.\venv\Scripts\activate.bat
# or (Linux/macOS)
source venv/bin/activate

# Install dependencies inside the virtual environment
pip install -r requirements.txt

# Run the FastAPI development server
python -m uvicorn app.main:app --host 0.0.0.0 --port 8008 --reload
```

> **Automated One-Click Script**: You can also double-click `citytwin/setup_venv.bat` or run `citytwin/run_backend.bat` to automatically create the virtual environment, install `requirements.txt`, and start the backend service.

#### 2. Frontend (React + TypeScript + Vite)
```bash
cd citytwin/frontend

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

---

## 11. Technology Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Leaflet, React-Leaflet, Recharts, Lucide React.
- **Backend**: Python 3.13 / 3.11, FastAPI, Pydantic v2, Uvicorn, NumPy, Scikit-Learn, Shapely.
- **Geospatial & Simulation**: OpenStreetMap GeoJSON, CartoDB Voyager Positron cartography, Bureau of Public Roads (BPR) Equilibrium Engine, Eclipse SUMO integration hooks.
- **Database**: PostgreSQL 16 with PostGIS spatial extensions.

---

## 12. References & Academic Standards

1. **OpenStreetMap Foundation**: Geospatial vector road network datasets ([openstreetmap.org](https://www.openstreetmap.org)).
2. **Bureau of Public Roads (BPR)**: Traffic Assignment Manual, U.S. Dept. of Commerce, Urban Planning and Highway Capacity Studies.
3. **Eclipse SUMO**: Simulation of Urban MObility ([eclipse.dev/sumo](https://eclipse.dev/sumo)).
4. **CPWD Analysis of Rates & Standards**: Central Public Works Department, Government of India, Schedule of Rates 2025-26.
5. **Grieves, M., & Vickers, J.**: *Digital Twin: Mitigating Unpredictable, Undesirable Emergent Behavior in Complex Systems*, Transdisciplinary Perspectives on System Complexity, 2017.

---
*CityTwin — AI-Powered Urban Digital Twin for Predictive City Planning · SIH 2026*

