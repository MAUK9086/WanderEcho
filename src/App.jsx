import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Chat from './pages/Chat';
import Groupchat from './pages/Groupchat';
import Room from './pages/Room';
import Map from './pages/Map';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-duo-bg flex flex-col font-sans">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/"           element={<Home />} />
            <Route path="/chat"       element={<Chat />} />
            <Route path="/groupchat"  element={<Groupchat />} />
            <Route path="/room/:code" element={<Room />} />
            <Route path="/map"        element={<Map />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
