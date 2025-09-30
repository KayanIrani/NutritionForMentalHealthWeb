// import NavbarStyles from "./css/NavbarStyles.module.css";

// const Navbar = () => {
//   return (
//     <nav id="navmenu" className={NavbarStyles.navmenu}>
//       <ul>
//         <li>
//           <a href="/">Home</a>
//         </li>
//         <li>
//           <a href="/">List</a>
//         </li>
//         <li>
//           <a href="/chat">Chat</a>
//         </li>
//         <li>
//           <a href="/ppt">Ppt</a>
//         </li>
//         <li>
//           <a href="/helplines">HelpLines</a>
//         </li>
//         <li>
//           <a href="/blog">Blogs</a>
//         </li>
//       </ul>
//       <div style={{width: '100%',display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
//         <div style={{ height: '1px',width: '80%',flex: 1, border: '1px solid gray'}}>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { useState } from "react";
import NavbarStyles from "./css/NavbarStyles.module.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav id="navmenu" className={NavbarStyles.navmenu}>
      {/* Hamburger button */}
      <button
        className={`${NavbarStyles.hamburger} ${isOpen ? NavbarStyles.open : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
        style={{marginTop:'4px'}}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>


      {/* Menu links */}
      <ul className={`${NavbarStyles.menu} ${isOpen ? NavbarStyles.open : ""}`}>
        <li><a href="/">Home</a></li>
        <li><a href="/">List</a></li>
        <li><a href="/chat">Chat</a></li>
        <li><a href="/ppt">Ppt</a></li>
        <li><a href="/helplines">HelpLines</a></li>
        <li><a href="/blog">Blogs</a></li>
      </ul>

      {/* Divider (desktop only) */}
      <div className={NavbarStyles.divider}>
        <div></div>
      </div>
    </nav>
  );
};

export default Navbar;
