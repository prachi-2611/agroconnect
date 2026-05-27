// client/src/pages/Home.jsx

import { Link } from "react-router-dom";

function Home() {

  return (

    <div className="home-page">

      {/* HERO SECTION */}

      <section className="hero-section">

        <div className="container hero-container">

          {/* LEFT */}

          <div className="hero-left">

            <span className="hero-badge">
              🌱 100% Fresh & Organic
            </span>

            <h1 className="hero-title">

              Fresh Farm Products
              <br />

              <span>
                Directly From Farmers
              </span>

            </h1>

            <p className="hero-subtitle">

              AgroConnect helps buyers
              purchase fresh vegetables,
              fruits, grains, and organic
              products directly from
              trusted farmers without
              middlemen.

            </p>

            <div className="hero-buttons">

              <Link
                to="/products"
                className="
                  btn
                  btn-primary
                "
              >
                Explore Products
              </Link>

              <Link
                to="/register"
                className="
                  btn
                  btn-secondary
                "
              >
                Become Seller
              </Link>

            </div>

            {/* STATS */}

            <div className="hero-stats">

              <div className="stat-card">

                <h2>500+</h2>

                <p>Farmers</p>

              </div>

              <div className="stat-card">

                <h2>1200+</h2>

                <p>Products</p>

              </div>

              <div className="stat-card">

                <h2>24/7</h2>

                <p>Support</p>

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="hero-right">

            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e"
              alt="Fresh Products"
              className="hero-image"
            />

          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section className="container section-space">

        <div className="section-header">

          <h2 className="section-title">
            Why Choose AgroConnect?
          </h2>

          <p className="section-subtitle">

            A smarter platform connecting
            farmers and buyers directly.

          </p>

        </div>

        <div className="feature-grid">

          <div className="feature-card">

            <div className="feature-icon">
              🌱
            </div>

            <h3>
              Fresh Products
            </h3>

            <p>

              Organic and freshly harvested
              products directly from farms.

            </p>

          </div>

          <div className="feature-card">

            <div className="feature-icon">
              🚜
            </div>

            <h3>
              Direct Farmer Connection
            </h3>

            <p>

              Buy directly from trusted
              farmers without middlemen.

            </p>

          </div>

          <div className="feature-card">

            <div className="feature-icon">
              🚚
            </div>

            <h3>
              Fast Delivery
            </h3>

            <p>

              Safe and quick delivery
              system for all your orders.

            </p>

          </div>

        </div>

      </section>

      {/* CATEGORIES */}

      <section className="container section-space">

        <div className="section-header">

          <h2 className="section-title">
            Product Categories
          </h2>

          <p className="section-subtitle">
            Browse products by category
          </p>

        </div>

        <div className="category-grid">

          <div className="category-card">

            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e"
              alt="Vegetables"
              className="category-image"
            />

            <div className="category-overlay">
              <h3>Vegetables</h3>
            </div>

          </div>

          <div className="category-card">

            <img
              src="https://images.unsplash.com/photo-1619566636858-adf3ef46400b"
              alt="Fruits"
              className="category-image"
            />

            <div className="category-overlay">
              <h3>Fruits</h3>
            </div>

          </div>

          <div className="category-card">

            <img
              src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b"
              alt="Grains"
              className="category-image"
            />

            <div className="category-overlay">
              <h3>Grains</h3>
            </div>

          </div>

          <div className="category-card">

            <img
              src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6"
              alt="Organic"
              className="category-image"
            />

            <div className="category-overlay">
              <h3>Organic</h3>
            </div>

          </div>

        </div>

      </section>

      {/* HOW IT WORKS */}

      <section className="container section-space">

        <div className="section-header">

          <h2 className="section-title">
            How It Works
          </h2>

          <p className="section-subtitle">
            Simple process to connect
            buyers and farmers
          </p>

        </div>

        <div className="steps-grid">

          <div className="step-card">

            <div className="step-number">
              1
            </div>

            <h3>
              Farmers Add Products
            </h3>

            <p>

              Farmers upload products
              with pricing and stock
              details.

            </p>

          </div>

          <div className="step-card">

            <div className="step-number">
              2
            </div>

            <h3>
              Buyers Explore Products
            </h3>

            <p>

              Buyers search and explore
              fresh products easily.

            </p>

          </div>

          <div className="step-card">

            <div className="step-number">
              3
            </div>

            <h3>
              Direct Purchase
            </h3>

            <p>

              Buyers place orders directly
              from farmers instantly.

            </p>

          </div>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="footer">

        <div className="container footer-content">

          <h2 className="logo">
            AgroConnect
          </h2>

          <p className="footer-text">

            Connecting Farmers &
            Buyers Directly

          </p>

          <div className="footer-links">

            <Link to="/">
              Home
            </Link>

            <Link to="/products">
              Products
            </Link>

            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Register
            </Link>

          </div>

          <p className="copyright">

            © 2026 AgroConnect.
            All Rights Reserved.

          </p>

        </div>

      </footer>

    </div>
  );
}

export default Home;