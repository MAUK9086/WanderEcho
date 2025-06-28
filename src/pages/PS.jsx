import React, { useState } from "react";

const options = [
  { label: "Historian", icon: "🧠" },
  { label: "Story Teller", icon: "🎭" },
  { label: "Explorer", icon: "🧭" },
  { label: "Local Guide", icon: "🏡" },
];

const PersonalitySelector = () => {
  const [selected, setSelected] = useState("Historian");

  return (
    <div className="mt-10 mb-2 sm:mt-28 flex flex-wrap justify-center gap-3 sm:gap-4">
      {options.map(({ label, icon }) => (
        <button
          key={label}
          onClick={() => setSelected(label)}
          className={`px-4 py-2 rounded-full border transition-all duration-300 text-sm sm:text-base font-medium
            ${selected === label
              ? "bg-purple-600 text-white border-purple-600"
              : "bg-white text-purple-600 border-purple-300 hover:bg-purple-100"}`}
        >
          <span className="mr-2">{icon}</span>
          {label}
        </button>
      ))}
    </div>
  );
};

export default PersonalitySelector;
