import { useState } from "react";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    category: "",
    stockQuantity: "",
    releaseDate: "",
    image: null,
    available: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add API call here to submit to backend
    alert("Product added successfully!");
    setFormData({
      name: "",
      brand: "",
      description: "",
      price: "",
      category: "",
      stockQuantity: "",
      releaseDate: "",
      image: null,
      available: true,
    });
  };

  return (
    <div style={{ padding: "6rem 2rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "2rem", color: "white" }}>Add Product</h2>
      <form onSubmit={handleSubmit} style={{ color: "white" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "0.5rem",
                border: "1px solid #ccc",
                fontSize: "1rem",
              }}
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Brand</label>
            <input
              type="text"
              name="brand"
              placeholder="Enter your Brand"
              value={formData.brand}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "0.5rem",
                border: "1px solid #ccc",
                fontSize: "1rem",
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Description</label>
          <textarea
            name="description"
            placeholder="Add product description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "1px solid #ccc",
              fontSize: "1rem",
              fontFamily: "inherit",
            }}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Price</label>
            <input
              type="number"
              name="price"
              placeholder="Eg: $1000"
              value={formData.price}
              onChange={handleChange}
              required
              step="0.01"
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "0.5rem",
                border: "1px solid #ccc",
                fontSize: "1rem",
              }}
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "0.5rem",
                border: "1px solid #ccc",
                fontSize: "1rem",
              }}
            >
              <option value="">Select category</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="books">Books</option>
              <option value="home">Home & Garden</option>
              <option value="sports">Sports</option>
            </select>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Stock Quantity</label>
            <input
              type="number"
              name="stockQuantity"
              placeholder="Stock Remaining"
              value={formData.stockQuantity}
              onChange={handleChange}
              required
              min="0"
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "0.5rem",
                border: "1px solid #ccc",
                fontSize: "1rem",
              }}
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Release Date</label>
            <input
              type="date"
              name="releaseDate"
              value={formData.releaseDate}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "0.5rem",
                border: "1px solid #ccc",
                fontSize: "1rem",
              }}
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "0.5rem",
                border: "1px solid #ccc",
                fontSize: "1rem",
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: "500" }}>
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
              style={{ width: "1.2rem", height: "1.2rem", cursor: "pointer" }}
            />
            Product Available
          </label>
        </div>

        <button
          type="submit"
          style={{
            padding: "0.75rem 2rem",
            backgroundColor: "#0d6efd",
            color: "white",
            border: "none",
            borderRadius: "0.5rem",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0b5ed7")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#0d6efd")}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
