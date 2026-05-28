import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/Context";

const Navbar = () => {
  const { cart } = useContext(AppContext);
  const getInitialTheme = () => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? storedTheme : "light-theme";
  };

  const [theme, setTheme] = useState(getInitialTheme());

  const toggleTheme = () => {
    const newTheme = theme === "dark-theme" ? "light-theme" : "dark-theme";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg fixed-top">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              AbhiKharidoo
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/add_product">
                    Add Product
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    Cart ({cart.length})
                  </Link>
                </li>
              </ul>
              <button className="theme-btn" onClick={() => toggleTheme()}>
                {theme === "dark-theme" ? (
                  <i className="bi bi-moon-fill"></i>
                ) : (
                  <i className="bi bi-sun-fill"></i>
                )}
              </button>
              <div className="d-flex align-items-center cart">
                <i
                  className="bi bi-cart me-2"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  Cart
                </i>

                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
