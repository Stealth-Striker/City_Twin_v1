import numpy as np
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from typing import Dict, Any, Tuple

class UrbanMLPredictor:
    def __init__(self):
        self._traffic_model = None
        self._flood_model = None
        self._feature_names = [
            'traffic_volume',
            'road_capacity',
            'rainfall_mm',
            'drainage_capacity',
            'population_density',
            'closure_status',
            'diversion_ratio'
        ]
        self._train_models()

    def _train_models(self):
        # Generate representative synthetic training dataset
        np.random.seed(42)
        n_samples = 1200
        
        # Features
        traffic_vol = np.random.uniform(500, 4500, n_samples)
        capacity = np.random.uniform(1000, 5000, n_samples)
        rainfall = np.random.uniform(0, 200, n_samples)
        drainage = np.random.uniform(10, 80, n_samples)
        pop_density = np.random.uniform(2000, 25000, n_samples)
        closure = np.random.choice([0, 1], n_samples, p=[0.75, 0.25])
        diversion = np.random.uniform(0.1, 0.9, n_samples)
        
        X = np.column_stack([traffic_vol, capacity, rainfall, drainage, pop_density, closure, diversion])
        
        # Target: congestion load %
        y_traffic = (
            0.42 * (traffic_vol / capacity * 100) +
            0.28 * (closure * 25) +
            0.15 * (1.0 - diversion) * 20 +
            np.random.normal(0, 3, n_samples)
        )
        y_traffic = np.clip(y_traffic, 20, 100)
        
        # Target: flood risk score (0-100)
        y_flood = (
            0.48 * (rainfall / 200 * 100) -
            0.32 * (drainage / 80 * 60) +
            0.12 * (pop_density / 25000 * 30) +
            np.random.normal(0, 4, n_samples)
        )
        y_flood = np.clip(y_flood, 10, 100)
        
        # Train Random Forest Regressors
        self._traffic_model = RandomForestRegressor(n_estimators=50, max_depth=6, random_state=42)
        self._traffic_model.fit(X, y_traffic)
        
        self._flood_model = GradientBoostingRegressor(n_estimators=50, max_depth=4, random_state=42)
        self._flood_model.fit(X, y_flood)

    def predict(self, feature_dict: Dict[str, float]) -> Dict[str, Any]:
        features = np.array([[
            feature_dict.get('traffic_volume', 2500),
            feature_dict.get('road_capacity', 3200),
            feature_dict.get('rainfall_mm', 60),
            feature_dict.get('drainage_capacity', 35),
            feature_dict.get('population_density', 12000),
            feature_dict.get('closure_status', 0),
            feature_dict.get('diversion_ratio', 0.4)
        ]])
        
        pred_traffic = float(self._traffic_model.predict(features)[0])
        pred_flood = float(self._flood_model.predict(features)[0])
        
        importances = self._traffic_model.feature_importances_
        factor_map = {
            'Road capacity': round(float(importances[1] * 100), 1),
            'Traffic volume': round(float(importances[0] * 100), 1),
            'Closure & diversion': round(float((importances[5] + importances[6]) * 100), 1),
            'Hydrological / Urban Density': round(float((importances[2] + importances[3] + importances[4]) * 100), 1)
        }
        
        return {
            'predicted_traffic_load': round(pred_traffic, 1),
            'predicted_flood_risk': round(pred_flood, 1),
            'top_contributing_factors': factor_map,
            'model_provenance': 'Scikit-Learn RandomForestRegressor (Trained on demo/synthetic dataset)'
        }

# Global singleton instance
predictor = UrbanMLPredictor()
