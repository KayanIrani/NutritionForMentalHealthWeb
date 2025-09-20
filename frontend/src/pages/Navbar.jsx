import NavbarStyles from "./css/NavbarStyles.module.css";

const Navbar = () => {
  return (
    <nav id="navmenu" className={NavbarStyles.navmenu}>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/">List</a>
        </li>
        <li>
          <a href="/chat">Chat</a>
        </li>
        <li>
          <a href="/ppt">Ppt</a>
        </li>
        <li>
          <a href="/helplines">HelpLines</a>
        </li>
        <li>
          <a href="/">Blogs</a>
        </li>
      </ul>
      <div style={{width: '100%',display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div style={{ height: '1px',width: '80%',flex: 1, border: '1px solid gray'}}>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
