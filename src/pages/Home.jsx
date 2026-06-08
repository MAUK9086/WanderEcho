import React from 'react';
import { Link } from 'react-router-dom';
import { FaMicrophone, FaMapMarkerAlt, FaUsers, FaGlobeAmericas, FaFire, FaStar } from 'react-icons/fa';

const features = [
  {
    icon: <FaMicrophone size={26} className="text-duo-green" />,
    title: 'Voice Tour Guide',
    desc: 'Talk naturally with an AI guide. Ask about history, culture, food — in real time.',
    bg: 'bg-[#E5F8D0]',
  },
  {
    icon: <FaMapMarkerAlt size={26} className="text-[#FF4B4B]" />,
    title: 'Location Aware',
    desc: 'Discover landmarks, hidden gems, and local favourites near where you stand.',
    bg: 'bg-[#FFE5E5]',
  },
  {
    icon: <FaUsers size={26} className="text-[#1CB0F6]" />,
    title: 'Group Rooms',
    desc: 'Create a room, share the code, and explore together with real-time group chat.',
    bg: 'bg-[#D5EFFF]',
  },
  {
    icon: <FaGlobeAmericas size={26} className="text-[#FFC800]" />,
    title: 'Multilingual',
    desc: 'Converse in your language. WanderEcho adapts to how you speak.',
    bg: 'bg-[#FFF8D5]',
  },
];

const stats = [
  { icon: <FaStar className="text-[#FFC800]" />, label: '4 Guide Modes' },
  { icon: <FaFire className="text-[#FF9600]" />, label: 'Real-Time AI' },
  { icon: <FaMapMarkerAlt className="text-[#FF4B4B]" />, label: 'Live Map POIs' },
  { icon: <FaUsers className="text-[#1CB0F6]" />, label: 'Group Rooms' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-duo-bg">
      {/* Hero */}
      <section className="bg-duo-green text-white py-16 px-4 relative overflow-hidden">
        {/* Background decorative circles */}
        <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full bg-white/10 pointer-events-none" />

        <div className="max-w-2xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-extrabold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest border border-white/30">
            🌍 AI-Powered Travel Companion
          </div>
          <h1 className="text-4xl sm:text-5xl font-black leading-tight mb-4">
            Explore the World.<br />
            <span className="text-[#FFC800]">Hear its Story.</span>
          </h1>
          <p className="text-green-100 text-lg mb-8 max-w-md mx-auto font-semibold">
            Your voice-first AI tour guide. Just talk — and let history, culture, and local secrets come alive around you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/chat" className="btn-duo-yellow text-base px-8 py-3">
              🎙️ Start Voice Tour
            </Link>
            <Link to="/map" className="btn-duo-white text-base px-8 py-3">
              📍 Explore Map
            </Link>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <div className="bg-white border-b-2 border-duo-border">
        <div className="max-w-4xl mx-auto px-4 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center justify-center gap-2">
              <span className="text-lg">{s.icon}</span>
              <span className="text-sm font-extrabold text-duo-text">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 py-14">
        <h2 className="text-center text-2xl font-black text-duo-text mb-2">
          Everything you need on the road
        </h2>
        <p className="text-center text-duo-muted font-semibold mb-8">Explore smarter, not harder.</p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="duo-card hover:shadow-md transition-all hover:-translate-y-1 cursor-default"
            >
              <div className={`w-12 h-12 ${f.bg} rounded-2xl flex items-center justify-center mb-4`}>
                {f.icon}
              </div>
              <h3 className="font-extrabold text-duo-text mb-1">{f.title}</h3>
              <p className="text-sm text-duo-muted font-semibold leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white border-t-2 border-duo-border py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-black text-duo-text mb-2">How it works</h2>
          <p className="text-duo-muted font-semibold mb-10">Three taps and you're exploring.</p>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { step: '1', emoji: '🌐', title: 'Open the app', desc: 'No login needed. WanderEcho works instantly from your browser.' },
              { step: '2', emoji: '🎙️', title: 'Tap & Talk', desc: 'Hit the mic and ask your AI guide anything about where you are.' },
              { step: '3', emoji: '✨', title: 'Discover', desc: 'Get stories, routes, tips, and hidden spots — hands-free.' },
            ].map((s) => (
              <div key={s.step} className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-duo-green flex items-center justify-center mb-3 text-2xl shadow-[0_4px_0_#46A302]">
                  {s.emoji}
                </div>
                <h3 className="font-extrabold text-duo-text mb-1">{s.title}</h3>
                <p className="text-sm text-duo-muted font-semibold">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/chat" className="btn-duo-green text-base px-8 py-3">
              Try it now — it's free 🚀
            </Link>
            <Link to="/groupchat" className="btn-duo-blue text-base px-8 py-3">
              Create a Room 👥
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
