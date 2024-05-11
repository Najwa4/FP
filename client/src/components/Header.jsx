import "../styles/header.css";

function Header(props) {
  return (
    <header>
      <div className="header-container">
        <div>
          <span className="logo1">H</span>
          <span className="logo2">resource</span>
        </div>
        <nav>
          <ul className="navigation">
            <a href="/" className="navigation-link">
              About
            </a>

            <a href="/announce" className="navigation-link">
              Announce
            </a>

            <a href="/login" className="navigation-link">
              Login
            </a>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
