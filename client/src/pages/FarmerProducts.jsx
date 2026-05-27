import { useEffect, useState } from "react";
import axios from "axios";

function FarmerProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [editProduct, setEditProduct] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
  });

  const [deleteId, setDeleteId] = useState(null);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const categories = [
    "All",
    "Vegetables",
    "Fruits",
    "Grains",
    "Pulses",
    "Dairy",
    "Organic",
    "Dry Fruits",
    "Seeds",
    "Spices",
  ];

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const fetchMyProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/products/my-products",
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  /* DELETE */
  const confirmDelete = (id) => {
    setDeleteId(id);
  };

  const deleteProduct = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/products/${deleteId}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      setProducts(products.filter((p) => p._id !== deleteId));
      setDeleteId(null);
    } catch (error) {
      console.log(error);
    }
  };

  /* EDIT */
  const openEdit = (product) => {
    setEditProduct(product);

    setEditForm({
      name: product.name,
      price: product.price,
      stock: product.stock,
      description: product.description,
    });
  };

  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/products/${editProduct._id}`,
        editForm,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      setProducts(
        products.map((p) =>
          p._id === editProduct._id ? data : p
        )
      );

      setEditProduct(null);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  if (loading) {
    return (
      <div className="container main-content">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="container main-content">

      {/* HEADER */}
      <div className="page-header">
        <h1 className="page-title">My Products</h1>
      </div>

      {/* TOPBAR */}
      <div className="products-topbar">
        <div className="category-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-btn ${
                selectedCategory === cat ? "active-category" : ""
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <input
          className="product-search"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* GRID */}
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product._id}>

            <img src={product.image} className="product-image" />

            <div className="product-content">
              <span className="badge">{product.category}</span>

              <h2>{product.name}</h2>

              <p className="product-price">₹{product.price}</p>

              <p className="product-description">
                {product.description}
              </p>

              <p className="product-meta">
                Stock: {product.stock}
              </p>

              <div className="product-actions">
                <button
                  className="btn btn-secondary"
                  onClick={() => openEdit(product)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => confirmDelete(product._id)}
                >
                  Delete
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* ================= DELETE MODAL ================= */}
      {deleteId && (
        <div className="delete-modal-overlay">
          <div className="delete-modal-card">

            <h2>Confirm Delete</h2>

            <p className="delete-modal-text">
              Are you sure you want to delete this product?
            </p>

            <div className="delete-modal-actions">

              <button
                className="btn btn-secondary"
                onClick={deleteProduct}
              >
                Delete
              </button>

              <button
                className="btn btn-danger"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>

            </div>

          </div>
        </div>
      )}

      {/* ================= EDIT MODAL (FIXED) ================= */}
      {editProduct && (
  <div className="edit-modal-overlay">
    <div className="edit-modal-card">

      <h2 className="edit-modal-title">Edit Product</h2>
      <p className="edit-modal-subtitle">Update product details</p>

      <form
        className="edit-modal-form"
        onSubmit={(e) => {
          e.preventDefault();
          updateProduct();
        }}
      >

        {/* NAME */}
        <div>
          <label className="auth-label">Product Name</label>
          <input
            className="auth-input"
            placeholder="Enter product name"
            value={editForm.name}
            onChange={(e) =>
              setEditForm({ ...editForm, name: e.target.value })
            }
            required
          />
        </div>

        {/* PRICE */}
        <div>
          <label className="auth-label">Price</label>
          <input
            className="auth-input"
            type="number"
            placeholder="Enter price"
            value={editForm.price}
            onChange={(e) =>
              setEditForm({ ...editForm, price: e.target.value })
            }
            required
          />
        </div>

        {/* STOCK */}
        <div>
          <label className="auth-label">Stock</label>
          <input
            className="auth-input"
            type="number"
            placeholder="Enter stock quantity"
            value={editForm.stock}
            onChange={(e) =>
              setEditForm({ ...editForm, stock: e.target.value })
            }
            required
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="auth-label">Description</label>
          <textarea
            className="auth-input"
            placeholder="Enter product description"
            value={editForm.description}
            onChange={(e) =>
              setEditForm({
                ...editForm,
                description: e.target.value,
              })
            }
            required
          />
        </div>

        {/* BUTTONS */}
        <div className="edit-modal-actions">

          <button className="btn btn-secondary" type="submit">
            Update Product
          </button>

          <button
            type="button"
            className="btn btn-danger"
            onClick={() => setEditProduct(null)}
          >
            Cancel
          </button>

        </div>

      </form>

    </div>
  </div>
)}
        

    </div>
  );
}

export default FarmerProducts;