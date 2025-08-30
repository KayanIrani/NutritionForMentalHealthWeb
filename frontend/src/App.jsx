import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home.jsx"
import HelpLine from "./pages/HelpLine.jsx";
import MeetDoc from "./pages/MeetDoc.jsx";
import Chat from "./pages/Chat.jsx";
import PptRender from "./pages/PptRender.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/chat" element={<Chat/>}/>
        <Route path="/meetdoc" element={<MeetDoc/>}/>
        <Route path="/helplines" element={<HelpLine/>}/>
        <Route path="/ppt" element={<PptRender/>}/>
      </Routes>
    </>
  )
}

export default App
