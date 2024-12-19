import React, { useState } from 'react';
import { MapPin, Menu, Home, Book, HelpCircle, AlertTriangle, Settings } from 'lucide-react';
import DroneMap from './components/DroneMap';
import VideoFeed from './components/VideoFeed';
import SideNav from './components/SideNav';
import Statistics from './components/Statistics';
import Controls from './components/Controls';
import EmergencyAlert from './components/EmergencyAlert';

function App() {
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Layout */}
      <div className="grid grid-cols-[60px_1fr] h-screen">
        {/* Side Navigation */}
        <SideNav />

        {/* Main Content */}
        <div className="grid grid-rows-[auto_1fr_auto] gap-4 p-4">
          {/* Top Section - Map Preview, Video Feed, and Drone Status */}
          <div className="grid grid-cols-[300px_1fr_300px] gap-4 h-[300px]">
            {/* Mini Map */}
            <div className="bg-white rounded-lg shadow-md p-2">
              <DroneMap minimap={true} />
            </div>

            {/* Video Feed */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <VideoFeed />
            </div>

            {/* Drone Status */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex flex-col h-full">
                <img 
                  src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80" 
                  alt="Drone"
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <EmergencyAlert 
                  show={showEmergencyAlert}
                  onClose={() => setShowEmergencyAlert(false)}
                />
              </div>
            </div>
          </div>

          {/* Middle Section - Main Map */}
          <div className="grid grid-cols-[250px_1fr_300px] gap-4">
            {/* Route Instructions */}
            <div className="bg-white rounded-lg shadow-md p-4 overflow-y-auto">
              <h3 className="font-semibold mb-4">Route Instructions</h3>
              {/* Route details component would go here */}
            </div>

            {/* Main Map */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <DroneMap />
            </div>

            {/* Statistics and Controls */}
            <div className="flex flex-col gap-4">
              <Statistics />
              <Controls />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;