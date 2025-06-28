import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Chat from './pages/Chat';
import Groupchat from './pages/Groupchat';
import {Link} from "react-router-dom";
import Map from './pages/Map'; // Assuming this is the correct import for your Map componentp



function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black flex flex-col items-center justify-center w-screen ">
        <Navbar />
        {/* <Chat/> */}
        <main className="w-screen">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/chat" element={<Chat/>} />
                <Route path="/groupchat" element={<Groupchat/>} />
                <Route path="/map" element={<Map/>} />
                {/* <Route path="/map" element={<div className="h-screen w-screen bg-cover bg-center" style={{ backgroundImage: `url(${require('./assets/Map.png')})` }} />} /> */}
              </Routes>
        </main>
        {/* import { Link } from "react-router-dom"; */}
      <Link
        to="/map"
        className="fixed bottom-4 left-4 z-50 w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center shadow-lg transition"
        title="Open Map"
      >
        📍
      </Link>

      </div>
    </Router>
  );
}

export default App;
