import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface DroneMapProps {
  minimap?: boolean;
}

const DroneMap: React.FC<DroneMapProps> = ({ minimap = false }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      // Initialize map
      const map = L.map(mapRef.current).setView([51.505, -0.09], minimap ? 15 : 13);
      
      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(map);

      // Add route if not minimap
      if (!minimap) {
        const route = [
          [51.505, -0.09],
          [51.51, -0.1],
          [51.52, -0.12]
        ];

        // Planned route in green
        L.polyline(route, { color: 'green', weight: 3 }).addTo(map);
        
        // Actual route in blue (zigzag pattern)
        const actualRoute = generateZigzagRoute(route);
        L.polyline(actualRoute, { color: 'blue', weight: 3 }).addTo(map);

        // Add drone marker
        const droneIcon = L.divIcon({
          className: 'drone-marker',
          html: '<div class="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>',
        });

        const marker = L.marker(route[0], { icon: droneIcon }).addTo(map);
        animateDrone(marker, actualRoute);
      }

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [minimap]);

  // Helper function to generate zigzag route
  const generateZigzagRoute = (baseRoute: number[][]) => {
    const zigzagRoute = [];
    for (let i = 0; i < baseRoute.length - 1; i++) {
      const start = baseRoute[i];
      const end = baseRoute[i + 1];
      const midPoint = [
        (start[0] + end[0]) / 2,
        (start[1] + end[1]) / 2 + 0.005
      ];
      zigzagRoute.push(start, midPoint, end);
    }
    return zigzagRoute;
  };

  // Helper function to animate drone movement
  const animateDrone = (marker: L.Marker, route: number[][]) => {
    let i = 0;
    const animate = () => {
      if (i < route.length) {
        marker.setLatLng(route[i] as L.LatLngExpression);
        i++;
        setTimeout(animate, 1000);
      }
    };
    animate();
  };

  return <div ref={mapRef} className={`w-full ${minimap ? 'h-full' : 'h-[600px]'}`} />;
};

export default DroneMap;