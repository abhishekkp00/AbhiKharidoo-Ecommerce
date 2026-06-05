import { useParams, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AppContext from "../context/Context";
import api from "../api";
const Product = () => {
  const { id } = useParams();
  const { addToCart } =
    useContext(AppContext);
  const [product, setProduct] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/product/${id}`);
        setProduct(response.data);
        if (response.data.imageName) {
          fetchImage();
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Product not found or server unavailable.");
      }
    };

    const fetchImage = async () => {
      try {
        const response = await api.get(`/product/${id}/image`, {
          responseType: "blob",
        });
        setImageUrl(URL.createObjectURL(response.data));
      } catch (error) {
        console.error("Error fetching product image:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handlAddToCart = () => {
    addToCart(product);
    alert("Product added to cart");
  };
  if (error) {
    return (
      <h2 className="text-center" style={{ padding: "10rem" }}>
        {error}
      </h2>
    );
  }
  if (!product) {
    return (
      <h2 className="text-center" style={{ padding: "10rem" }}>
        Loading...
      </h2>
    );
  }
  return (
    <>
      <div className="containers">
        <img
          className="left-column-img"
          src={imageUrl}
          alt={product.imageName}
        />

        <div className="right-column">
          <div className="product-description">
            <span>{product.category}</span>
            <h1>{product.name}</h1>
            <h5>{product.brand}</h5>
            <p>{product.description}</p>
          </div>

          <div className="product-price">
            <span>{"$" + product.price}</span>
            <button
              className={`cart-btn ${
                !product.productAvailable ? "disabled-btn" : ""
              }`}
              onClick={handlAddToCart}
              disabled={!product.productAvailable}
            >
              {product.productAvailable ? "Add to cart" : "Out of Stock"}
            </button>
            <h6>
              Stock Available :{" "}
              <i style={{ color: "green", fontWeight: "bold" }}>
                {product.stockQuantity}
              </i>
            </h6>
            <p className="release-date">
              <h6>Product listed on:</h6>
              <i> {new Date(product.releaseDate).toLocaleDateString()}</i>
            </p>
          </div>
          <div className="update-button" style={{ marginTop: "1rem", display: "flex", gap: "10px" }}>
            <Link to={`/product/update/${id}`} className="btn btn-warning">
              Update
            </Link>
            <Link to={`/product/delete/${id}`} className="btn btn-danger">
              Delete
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;