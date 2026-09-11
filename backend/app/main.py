from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import cities, scenarios, optimization, reports, analytics

app = FastAPI(
    title="CITYTWIN API - Urban Digital Twin for Predictive City Planning",
    description="Backend microservices for Smart India Hackathon 2026",
    version="2.0.0"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Routers
app.include_router(cities.router)
app.include_router(scenarios.router)
app.include_router(optimization.router)
app.include_router(reports.router)
app.include_router(analytics.router)

@app.get("/")
def root():
    return {
        "app": "CITYTWIN",
        "tagline": "Simulate today. Build smarter tomorrow.",
        "description": "AI-Powered Urban Digital Twin for Predictive City Planning",
        "status": "Operational",
        "supported_cities": ["Mumbai", "Bengaluru"],
        "docs_url": "/docs"
    }

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "service": "citytwin-backend"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
