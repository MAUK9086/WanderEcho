import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// ✅ Fix marker icons for Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url).href,
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).href,
});

// ✅ Component to recenter the map once position is available
const RecenterMap = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], 15);
    }
  }, [lat, lng, map]);
  return null;
};

const Map = () => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          console.log("📍 User location:", latitude, longitude); // ✅ Debug log
          setPosition([latitude, longitude]);
        },
        (error) => {
          console.error("❌ Geolocation error:", error);
        }
      );
    } else {
      console.warn("Geolocation not supported in this browser.");
    }
  }, []);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      {position ? (
        <MapContainer center={position} zoom={15} className="h-full w-full z-0">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>You are here 📍</Popup>
          </Marker>
          <RecenterMap lat={position[0]} lng={position[1]} />
        </MapContainer>
      ) : (
        <div className="h-full flex items-center justify-center bg-black text-white text-lg">
          📡 Getting your location...
        </div>
      )}
    </div>
  );
};

export default Map;
