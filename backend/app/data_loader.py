import json
import os
from typing import Dict, Any, List

DATA_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'data'))

class DataLoader:
    def __init__(self):
        self._cache: Dict[str, Dict[str, Any]] = {}
        self._load_all()

    def _load_all(self):
        for city in ['mumbai', 'bengaluru']:
            city_dir = os.path.join(DATA_DIR, city)
            self._cache[city] = {
                'meta': self._read_json(os.path.join(city_dir, 'city_meta.json')),
                'roads': self._read_json(os.path.join(city_dir, 'roads.geojson')),
                'infrastructure': self._read_json(os.path.join(city_dir, 'infrastructure.geojson')),
                'water_bodies': self._read_json(os.path.join(city_dir, 'water_bodies.geojson')),
                'flood_zones': self._read_json(os.path.join(city_dir, 'flood_zones.geojson')),
            }

    def _read_json(self, path: str) -> Any:
        if os.path.exists(path):
            with open(path, 'r', encoding='utf-8') as f:
                return json.load(f)
        return {}

    def reload(self):
        self._load_all()

    def get_city_meta(self, city: str) -> Dict[str, Any]:
        return self._read_json(os.path.join(DATA_DIR, city.lower(), 'city_meta.json'))

    def get_roads(self, city: str) -> Dict[str, Any]:
        return self._read_json(os.path.join(DATA_DIR, city.lower(), 'roads.geojson'))

    def get_infrastructure(self, city: str) -> Dict[str, Any]:
        return self._read_json(os.path.join(DATA_DIR, city.lower(), 'infrastructure.geojson'))

    def get_water_bodies(self, city: str) -> Dict[str, Any]:
        return self._read_json(os.path.join(DATA_DIR, city.lower(), 'water_bodies.geojson'))

    def get_flood_zones(self, city: str) -> Dict[str, Any]:
        return self._read_json(os.path.join(DATA_DIR, city.lower(), 'flood_zones.geojson'))

    def get_all_cities(self) -> List[Dict[str, Any]]:
        return [
            {
                'id': 'mumbai',
                'name': 'Mumbai',
                'state': 'Maharashtra',
                'country': 'India',
                'center': [19.0760, 72.8777],
                'population': '21.7M'
            },
            {
                'id': 'bengaluru',
                'name': 'Bengaluru',
                'state': 'Karnataka',
                'country': 'India',
                'center': [12.9716, 77.5946],
                'population': '13.6M'
            }
        ]

loader = DataLoader()
