import React, { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
// import "./map.css";

// Define the type for the coordinates
interface Coordinates {
  lng: number;
  lat: number;
}

const Map: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<maptilersdk.Map | null>(null);

  // Define location coordinates and zoom level
  // const location: Coordinates = ;
  const [location, setLocation] = useState<Coordinates>({
    lat: 18.4326149,
    lng: 73.7533191,
  });
  const zoom = 14;

  // Set your MapTiler API key
  maptilersdk.config.apiKey = import.meta.env.VITE_MAPTILER_API_KEY!;
  console.log(import.meta.env.VITE_MAPTILER_API_KEY);

  useEffect(() => {
    if (map.current) return; // Prevents re-initialization

    // Initialize the map
    if (mapContainer.current) {
      map.current = new maptilersdk.Map({
        container: mapContainer.current,
        style: maptilersdk.MapStyle.STREETS,
        center: [location.lng, location.lat],
        zoom: zoom,
      });
    }
  }, [location.lng, location.lat, zoom]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map rounded-b-lg" />
    </div>
  );
};

export default Map;
