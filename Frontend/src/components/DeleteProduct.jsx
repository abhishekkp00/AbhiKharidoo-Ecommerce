import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const DeleteProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/product/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await axios.delete(`http://localhost:8080/api/product/${id}`);
      alert("Product deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product");
      setDeleting(false);
    }
  };

  if (loading) {
    return <h2 className="text-center" style={{ padding: "10rem" }}>Loading...</h2>;
  }

  if (error) {
    return <h2 className="text-center" style={{ padding: "10rem" }}>{error}</h2>;
  }

  if (!product) {
    return <h2 className="text-center" style={{ padding: "10rem" }}>Product not found</h2>;
  }

  return (
    <div className="container">
      <div className="center-container" style={{ padding: "5rem" }}>
        <h2>Delete Product</h2>
        <div style={{ margin: "2rem 0" }}>
          <p style={{ fontSize: "1.1rem" }}>
            Are you sure you want to delete <strong>{product.name}</strong>?
          </p>
          <p style={{ color: "gray" }}>This action cannot be undone.</p>
        </div>

        <div style={{ marginTop: "2rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <p>
              <strong>Product ID:</strong> {product.id}
            </p>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>Price:</strong> ${product.price}
            </p>
          </div>
        </div>

        <div style={{ marginTop: "2rem" }}>
          <button
            className="btn btn-danger"
            onClick={handleDelete}
            disabled={deleting}
            style={{ marginRight: "1rem" }}
          >
            {deleting ? "Deleting..." : "Delete Product"}
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/")}
            disabled={deleting}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
