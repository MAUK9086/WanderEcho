import React, { useEffect, useState, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Link } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url).href,
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).href,
});

const createDot = (color) =>
  L.divIcon({
    className: "",
    html: `<div style="background:${color};width:14px;height:14px;border-radius:50%;border:2.5px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.35)"></div>`,
    iconAnchor: [7, 7],
  });

const createUserMarker = () =>
  L.divIcon({
    className: "",
    html: `<div style="background:#58CC02;width:18px;height:18px;border-radius:50%;border:3px solid white;box-shadow:0 0 0 4px rgba(88,204,2,0.3)"></div>`,
    iconAnchor: [9, 9],
  });

const POI_STYLE = {
  tourism:    { color: "#FFC800", label: "Attraction" },
  historic:   { color: "#8B5CF6", label: "Historic" },
  restaurant: { color: "#FF4B4B", label: "Restaurant" },
  cafe:       { color: "#F97316", label: "Café" },
};

const getPOIStyle = (poi) => {
  if (poi.tags?.tourism)               return POI_STYLE.tourism;
  if (poi.tags?.historic)              return POI_STYLE.historic;
  if (poi.tags?.amenity === "restaurant") return POI_STYLE.restaurant;
  if (poi.tags?.amenity === "cafe")    return POI_STYLE.cafe;
  return { color: "#777777", label: "Place" };
};

const RecenterMap = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) map.setView([lat, lng], 15);
  }, [lat, lng, map]);
  return null;
};

const Map = () => {
  const [position, setPosition] = useState(null);
  const [pois, setPois] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setError("Geolocation not supported in this browser.");
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
        setLoading(false);
        fetchPOIs(latitude, longitude);
      },
      () => {
        setError("Could not get your location. Please allow location access and refresh.");
        setLoading(false);
      }
    );
  }, []);

  const fetchPOIs = useCallback(async (lat, lng) => {
    const query = `
      [out:json][timeout:25];
      (
        node["tourism"~"attraction|museum|monument|viewpoint|artwork|gallery"](around:1000,${lat},${lng});
        node["historic"](around:1000,${lat},${lng});
        node["amenity"~"restaurant|cafe"](around:800,${lat},${lng});
      );
      out body 40;
    `;
    try {
      const res = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: query,
      });
      const data = await res.json();
      const named = (data.elements || []).filter((e) => e.tags?.name);
      setPois(named.slice(0, 35));
    } catch {
      // Non-critical — map still shows without POIs
    }
  }, []);

  if (loading) {
    return (
      <div className="h-[calc(100vh-57px)] flex flex-col items-center justify-center bg-duo-bg gap-4">
        <div className="w-14 h-14 rounded-2xl bg-duo-green flex items-center justify-center text-2xl shadow-[0_4px_0_#46A302] animate-bounce">
          📍
        </div>
        <p className="font-extrabold text-duo-text">Finding your location...</p>
        <p className="text-sm text-duo-muted font-semibold">Allow location access when prompted</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[calc(100vh-57px)] flex flex-col items-center justify-center bg-duo-bg gap-5 px-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#FFE5E5] flex items-center justify-center text-3xl">📍</div>
        <h2 className="font-black text-duo-text text-lg">Location Unavailable</h2>
        <p className="text-duo-muted font-semibold max-w-xs">{error}</p>
        <Link to="/chat" className="btn-duo-green px-6 py-3 text-sm">
          Go to Voice Tour instead
        </Link>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-57px)] relative">
      <MapContainer center={position} zoom={15} className="h-full w-full z-0">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        />
        <RecenterMap lat={position[0]} lng={position[1]} />

        <Marker position={position} icon={createUserMarker()}>
          <Popup>
            <strong className="font-extrabold">You are here 📍</strong>
          </Popup>
        </Marker>

        {pois.map((poi) => {
          const style = getPOIStyle(poi);
          return (
            <Marker
              key={poi.id}
              position={[poi.lat, poi.lon]}
              icon={createDot(style.color)}
              eventHandlers={{ click: () => setSelected(poi) }}
            >
              <Popup>{poi.tags?.name}</Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* POI count */}
      {pois.length > 0 && (
        <div className="absolute top-3 right-3 z-[1000] bg-white rounded-2xl border-2 border-duo-border px-3 py-1.5 text-xs font-extrabold text-duo-text shadow-sm">
          ✨ {pois.length} places nearby
        </div>
      )}

      {/* Legend */}
      <div className="absolute top-3 left-3 z-[1000] bg-white rounded-2xl border-2 border-duo-border p-3 text-xs font-bold text-duo-muted shadow-sm space-y-1.5">
        {Object.entries(POI_STYLE).map(([key, { color, label }]) => (
          <div key={key} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full border-2 border-white shadow-sm flex-shrink-0" style={{ background: color }} />
            <span>{label}</span>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: "#58CC02", boxShadow: "0 0 0 3px rgba(88,204,2,0.3)" }} />
          <span>You</span>
        </div>
      </div>

      {/* Selected POI panel */}
      {selected && (
        <div className="absolute bottom-0 left-0 right-0 z-[1000] bg-white rounded-t-3xl border-t-2 border-duo-border p-6 shadow-2xl">
          <button
            onClick={() => setSelected(null)}
            className="absolute top-4 right-5 w-8 h-8 rounded-full bg-duo-bg text-duo-muted hover:text-duo-text font-extrabold text-lg flex items-center justify-center transition-colors"
          >
            ×
          </button>
          <div
            className="inline-block text-xs font-extrabold uppercase tracking-wide px-2.5 py-1 rounded-full mb-2"
            style={{ background: `${getPOIStyle(selected).color}22`, color: getPOIStyle(selected).color }}
          >
            {getPOIStyle(selected).label}
          </div>
          <h3 className="font-black text-duo-text text-xl mb-4">{selected.tags?.name}</h3>
          <Link
            to="/chat"
            className="btn-duo-green inline-flex items-center gap-2 px-5 py-2.5 text-sm"
          >
            🎙️ Ask your guide about this
          </Link>
        </div>
      )}
    </div>
  );
};

export default Map;
