  import { Route, Routes } from "react-router-dom";
  import Navbar from "./pages/Navbar.jsx";
  import Home from "./pages/Home.jsx";
  import HelpLine from "./pages/HelpLine.jsx";
  import List from "./pages/List.jsx";
  import Chat from "./pages/Chat.jsx";
  import PptRender from "./pages/PptRender.jsx";
  import HomeStyles from './pages/css/HomeStyles.module.css';
  import Blog from "./pages/Blog.jsx";
  import Create from "./pages/Create.jsx";
  import ViewBlog from "./pages/ViewBlog.jsx";
  function App() {
    return (
      <div className={HomeStyles.mainContainer}>
        <Navbar />
        <div style={{paddingTop:'60px',flex:1}}>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/list" element={<List />} />
          <Route path="/helplines" element={<HelpLine />} />
          <Route path="/ppt" element={<PptRender />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/create" element={<Create />} />
          <Route path="/view-blog" element={<ViewBlog/>} />
        </Routes>
        </div>
        <footer className="bg-dark text-center text-white py-3">
          <p className="mb-0">
            2025 - Mindful Nutrition {/* | About Us | Resources | Contact */}
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
