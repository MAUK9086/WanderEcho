import React from 'react';
import { Link } from 'react-router-dom'


export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-300 flex flex-col items-center justify-center px-4 py-10 md:py-20">
      {/* Header */}
      <header className="text-center mb-12 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-700 leading-tight">
          WanderEcho
        </h1>
        <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
          Your AI-powered travel guide. Talk, explore, and discover — no downloads needed.
        </p>
      </header>

      {/* Features */}
      <div className="w-full max-w-5xl grid gap-6 sm:grid-cols-2 lg:grid-cols-4 px-2 sm:px-6">
        <Feature icon="🎙️" title="Voice Chat/Call" />
        <Feature icon="📍" title="Location-Based" />
        <Feature icon="🎭" title="Guide Personalities" />
        <Feature icon="🌐" title="Multilingual" />
      </div>

      {/* CTA */}
     <Link to="/chat">
      <button className="mt-12 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-base sm:text-lg shadow-lg transition duration-300">
        Call Now
      </button>
    </Link>
    </div>
  );
}

function Feature({ icon, title }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all flex items-center gap-4">
      <span className="text-3xl">{icon}</span>
      <h2 className="text-base sm:text-lg font-semibold text-gray-800">{title}</h2>
    </div>
  );
}
