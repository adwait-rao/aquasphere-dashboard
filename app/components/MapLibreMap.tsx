import {
  FillLayer,
  Layer,
  Map,
  Source,
  Marker,
  MapEvent,
  MapMouseEvent,
} from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css"; // See notes below
import { useEffect, useRef, useState } from "react";

interface location {
  longitude: number;
  latitude: number;
}

export default function MapLibreMap() {
  const [mapData, setMapData] = useState<Object>({});
  const [markerPosition, setMarkerPosition] = useState<location>({
    longitude: 0,
    latitude: 0,
  });

  const handleMapClick = (event: any) => {
    const lngLat = event.lngLat;
    console.log(lngLat);
    setMarkerPosition({ longitude: lngLat.lng, latitude: lngLat.lat });
  };

  useEffect(() => {
    fetch(
      `https://api.maptiler.com/data/ef83daed-6e44-4807-a67c-aa30b8771a1f/features.json?key=${
        import.meta.env.VITE_MAPTILER_API_KEY
      }`
    )
      .then((result) => result.json())
      .then((json) => setMapData(json))
      .catch((err) => console.error("Error: ", err));
    console.log(mapData);
  }, []);

  useEffect(() => {}, [markerPosition.latitude, markerPosition.longitude]);

  const commandAreas: FillLayer = {
    id: "command-area",
    type: "fill",
    source: "maptiler",
    paint: {
      "fill-color": "#00a305",
      "fill-opacity": 0.3,
    },
  };

  return (
    <Map
      initialViewState={{
        longitude: 73.7533191,
        latitude: 18.4326149,
        zoom: 10,
      }}
      style={{ width: "100%", height: "35rem", borderRadius: "0.7rem" }}
      mapStyle="https://tiles.openfreemap.org/styles/bright"
      onClick={handleMapClick}
    >
      {markerPosition.latitude !== 0 && markerPosition.longitude !== 0 && (
        <Marker
          longitude={markerPosition.longitude}
          latitude={markerPosition.latitude}
          anchor="bottom"
        >
          <img src="/pin.svg" width="40px" height="40px" />
        </Marker>
      )}
      <Source type="geojson" data={mapData}>
        <Layer {...commandAreas} />
      </Source>
    </Map>
  );
}
