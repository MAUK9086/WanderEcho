import React from "react";
import mapImg from "../assets/Map.png"; // adjust path if needed

const Map = () => {
  return (
    <div
      className="h-screen w-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${mapImg})` }}
    >
      {/* Optional overlay content */}
      <div className="h-full w-full flex items-center justify-center bg-black/20">
        {/* <h1 className="text-white text-3xl font-bold">Map View</h1> */}
      </div>
    </div>
  );
};

export default Map;
