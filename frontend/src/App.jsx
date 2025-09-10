import { Route, Routes } from "react-router-dom";
import Navbar from "./pages/Navbar.jsx";
import Home from "./pages/Home.jsx";
import HelpLine from "./pages/HelpLine.jsx";
import MeetDoc from "./pages/MeetDoc.jsx";
import Chat from "./pages/Chat.jsx";
import PptRender from "./pages/PptRender.jsx";
import HomeStyles from './pages/css/HomeStyles.module.css';
function App() {
  return (
    <div className={HomeStyles.mainContainer}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/meetdoc" element={<MeetDoc />} />
        <Route path="/helplines" element={<HelpLine />} />
        <Route path="/ppt" element={<PptRender />} />
      </Routes>
      <footer className="bg-dark text-center text-white py-3">
        <p className="mb-0">
          © 2025 Mindful Nutrition | About Us | Resources | Contact
        </p>
      </footer>

    </div >
  );
}

export default App;
