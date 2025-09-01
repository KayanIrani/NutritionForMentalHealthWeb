import NavbarStyles from "./css/NavbarStyles.module.css";

const Navbar = () => {
  return (
    <nav id="navmenu" class={NavbarStyles.navmenu}>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="#">List</a>
        </li>
        <li>
          <a href="/chat">Chat</a>
        </li>
        <li>
          <a href="/ppt">Ppt</a>
        </li>
        <li>
          <a href="/">HelpLines</a>
        </li>
        <li>
          <a href="/">Blogs</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
