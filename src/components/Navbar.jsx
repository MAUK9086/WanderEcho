import { Link, useLocation } from 'react-router-dom';
import { FaCompass, FaFire } from 'react-icons/fa';
import { useXP } from '../hooks/useXP';

const Navbar = () => {
  const location = useLocation();
  const { xp, streak } = useXP();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/chat', label: 'Voice Tour' },
    { to: '/groupchat', label: 'Rooms' },
    { to: '/map', label: 'Map' },
  ];

  return (
    <nav className="bg-white border-b-2 border-duo-border sticky top-0 z-50 w-full">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-extrabold text-xl text-duo-green hover:opacity-80 transition-opacity">
          <FaCompass className="text-duo-yellow" size={22} />
          WanderEcho
        </Link>

        {/* Links */}
        <div className="hidden sm:flex items-center gap-6">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`text-sm font-bold transition-colors duration-200 ${
                location.pathname === to
                  ? 'text-duo-green border-b-2 border-duo-green pb-0.5'
                  : 'text-duo-muted hover:text-duo-text'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* XP + Streak */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-[#FFF3CD] text-[#A07800] text-xs font-extrabold px-3 py-1.5 rounded-full border border-[#FFE08A]">
            <FaFire className="text-[#FF9600]" size={12} />
            <span>{streak}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#E5F8D0] text-duo-green-dark text-xs font-extrabold px-3 py-1.5 rounded-full border border-[#B8E986]">
            <span>✨</span>
            <span>{xp} XP</span>
          </div>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <div className="sm:hidden flex border-t border-duo-border">
        {links.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`flex-1 text-center py-2 text-xs font-bold transition-colors ${
              location.pathname === to ? 'text-duo-green' : 'text-duo-muted'
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
