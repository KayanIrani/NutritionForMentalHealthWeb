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
          2025 - Mindful Nutrition {/* | About Us | Resources | Contact */}
          <br />
          <br />
        </p>
        <div>
        <p>Citations for Nutrition Research Paper</p>
        <p style={{marginTop:'-15px'}}>
          Grajek M, Krupa-Kotara K, Białek-Dratwa A, Sobczyk K, Grot M, Kowalski O, Staśkiewicz W. Nutrition and mental health: A review of current knowledge about the impact of diet on mental health. Front Nutr. 2022 Aug 22;9:943998. doi: 10.3389/fnut.2022.943998. PMID: 36071944; PMCID: PMC9441951.
        </p>
        </div>
      </footer>
    </div >
  );
}

export default App;
