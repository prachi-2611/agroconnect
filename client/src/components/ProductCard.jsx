function ProductCard() {
  return (
    <div className="card product-card">
      <img
        src="https://images.unsplash.com/photo-1542838132-92c53300491e"
        alt="vegetable"
        className="product-image"
      />

      <div className="product-content">
        <span className="badge badge-primary">
          Fresh
        </span>

        <h3 className="product-title">
          Fresh Tomatoes
        </h3>

        <p className="product-price">
          ₹40 / kg
        </p>

        <button className="btn btn-primary btn-full">
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default ProductCard;