// client/src/pages/AddProduct.jsx

import { useState, useEffect } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

function AddProduct() {

  const navigate = useNavigate();

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const [name, setName] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [category, setCategory] =
    useState("Vegetables");

  const [description, setDescription] =
    useState("");

  const [image, setImage] =
    useState("");

  const [stock, setStock] =
    useState("");

  const [unit, setUnit] =
    useState("kg");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    if (!userInfo) {

      navigate("/login");

    } else if (
      userInfo.user.role !== "farmer"
    ) {

      navigate("/");
    }

  }, []);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await axios.post(

        "https://agroconnect-api-e68t.onrender.com/api/products",

        {
          name,
          price,
          category,
          description,
          image,
          stock,
          unit,
        },

        {
          headers: {
            Authorization:
              `Bearer ${userInfo.token}`,
          },
        }
      );

      alert(
        "Product Added Successfully"
      );

      setName("");
      setPrice("");
      setCategory("Vegetables");
      setDescription("");
      setImage("");
      setStock("");
      setUnit("kg");

    } catch (error) {

      console.log(error);

      alert("Error Adding Product");

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="auth-page">

      <div className="auth-card">

        <h1 className="auth-title">
          Add Product
        </h1>

        <p className="auth-subtitle">
          Upload your fresh farm produce
        </p>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          {/* PRODUCT NAME */}

          <input
            className="auth-input"
            placeholder="Product Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
          />

          {/* PRICE */}

          <input
            className="auth-input"
            placeholder="Price"
            type="number"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
            required
          />

          {/* CATEGORY */}

          <select
            className="auth-input"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >

            <option>
              Vegetables
            </option>

            <option>
              Fruits
            </option>

            <option>
              Grains
            </option>

            <option>
              Pulses
            </option>

            <option>
              Dairy
            </option>

            <option>
              Organic
            </option>

            <option>
              Dry Fruits
            </option>

            <option>
              Seeds
            </option>

            <option>
              Spices
            </option>

          </select>

          {/* IMAGE */}

          <input
            className="auth-input"
            placeholder="Image URL"
            value={image}
            onChange={(e) =>
              setImage(e.target.value)
            }
          />

          {/* STOCK */}

          <input
            className="auth-input"
            placeholder="Stock"
            type="number"
            value={stock}
            onChange={(e) =>
              setStock(e.target.value)
            }
            required
          />

          {/* UNIT */}

          <select
            className="auth-input"
            value={unit}
            onChange={(e) =>
              setUnit(e.target.value)
            }
          >

            <option value="kg">
              Kilogram (kg)
            </option>

            <option value="gram">
              Gram
            </option>

          </select>

          {/* DESCRIPTION */}

          <textarea
            className="auth-input"
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            required
          />

          {/* BUTTON */}

          <button
            className="auth-btn"
            disabled={loading}
          >

            {loading

              ? "Adding Product..."

              : "Add Product"}

          </button>

        </form>

      </div>

    </div>
  );
}

export default AddProduct;