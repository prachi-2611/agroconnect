import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";

function Navbar() {

  const navigate = useNavigate();

  const [showMenu, setShowMenu] =
    useState(false);

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const logoutHandler = () => {

    localStorage.removeItem(
      "userInfo"
    );

    navigate("/login");

    window.location.reload();
  };

  return (

    <header className="header">

      <div className="container navbar">

        {/* LOGO */}

        <Link
          to="/"
          className="logo"
        >
          AgroConnect
        </Link>

        {/* NAV LINKS */}

        <div className="nav-links">

          <Link to="/">
            Home
          </Link>

          {
  (!userInfo || userInfo.user.role !== "farmer") && (
    <Link to="/products">
      Products
    </Link>
  )
}

          {/* BEFORE LOGIN */}

          {
            !userInfo && (
              <>
                <Link to="/login">
                  Login
                </Link>

                <Link to="/register">
                  Register
                </Link>
              </>
            )
          }

          {/* BUYER */}

          

          {/* FARMER */}

          {
            userInfo &&
            userInfo.user.role ===
              "farmer" && (
                <>
                  <Link to="/farmer-products">
                    My Products
                  </Link>

                  <Link to="/add-product">
                    Add Product
                  </Link>
                </>
              )
          }

          {/* DASHBOARD */}

          {
            userInfo && (
              <Link to="/dashboard">
                Dashboard
              </Link>
            )
          }

          {/* PROFILE */}

          {
            userInfo && (

              <div className="profile-wrapper">

                {/* PROFILE ICON */}

                <div
                  className="profile-circle"
                  onClick={() =>
                    setShowMenu(
                      !showMenu
                    )
                  }
                >

                  {
                    userInfo.user.name
                      .charAt(0)
                      .toUpperCase()
                  }

                </div>

                {/* DROPDOWN */}

                {
                  showMenu && (

                    <div className="profile-dropdown">

                      {/* TOP */}

                      <div className="profile-top">

                        <div className="profile-avatar">

                          {
                            userInfo.user.name
                              .charAt(0)
                              .toUpperCase()
                          }

                        </div>

                        <div className="profile-user-info">

                          <h3>
                            {
                              userInfo.user.name
                            }
                          </h3>

                          <p>
                            {
                              userInfo.user.email
                            }
                          </p>

                        </div>

                      </div>

                      {/* LOGOUT */}

                      <button
                        className="logout-btn"
                        onClick={
                          logoutHandler
                        }
                      >
                        Logout
                      </button>

                    </div>
                  )
                }

              </div>
            )
          }

        </div>

      </div>

    </header>
  );
}

export default Navbar;