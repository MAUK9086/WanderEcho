import { Link, useLocation } from 'react-router-dom';
import { FaCompass } from 'react-icons/fa';

const Navbar = () => {
  const location = useLocation();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/chat', label: 'Voice Tour' },
    { to: '/groupchat', label: 'Tour Log' },
    { to: '/map', label: 'Map' },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 w-full">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-cyan-700 hover:text-cyan-800 transition-colors">
          <FaCompass className="text-amber-500" size={22} />
          WanderEcho
        </Link>
        <div className="flex items-center gap-6">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`text-sm font-medium transition-colors duration-200 ${
                location.pathname === to
                  ? 'text-cyan-700 border-b-2 border-amber-400 pb-0.5'
                  : 'text-slate-500 hover:text-cyan-700'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
