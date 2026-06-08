import React from "react";

const PERSONALITIES = [
  { id: "Historian",   icon: "🧠", color: "bg-[#E8D5FF] text-[#6B21A8] border-[#C084FC]" },
  { id: "Storyteller", icon: "🎭", color: "bg-[#FFE4D5] text-[#9A3412] border-[#FB923C]" },
  { id: "Explorer",    icon: "🧭", color: "bg-[#D1FAE5] text-[#065F46] border-[#34D399]" },
  { id: "Local Guide", icon: "🏡", color: "bg-[#DBEAFE] text-[#1E40AF] border-[#60A5FA]" },
];

const PersonalitySelector = ({ selected, onSelect, compact = false }) => {
  if (compact) {
    return (
      <div className="flex gap-1">
        {PERSONALITIES.map((p) => (
          <button
            key={p.id}
            onClick={() => onSelect(p.id)}
            title={p.label}
            className={`w-9 h-9 rounded-xl text-base font-bold border-2 transition-all ${
              selected === p.id
                ? `${p.color} scale-110 shadow-sm`
                : 'bg-duo-bg border-duo-border hover:border-gray-300'
            }`}
          >
            {p.icon}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center py-3 px-4">
      {PERSONALITIES.map((p) => (
        <button
          key={p.id}
          onClick={() => onSelect(p.id)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-sm font-extrabold border-2 transition-all ${
            selected === p.id
              ? `${p.color} scale-105 shadow-sm`
              : 'bg-white text-duo-muted border-duo-border hover:border-gray-300'
          }`}
        >
          <span>{p.icon}</span>
          <span>{p.id}</span>
        </button>
      ))}
    </div>
  );
};

export default PersonalitySelector;
