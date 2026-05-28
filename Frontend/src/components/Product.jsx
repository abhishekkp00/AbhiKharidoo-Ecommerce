import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import API from "../api";
import { AppContext } from "../context/Context";

const Product = () => {
  const { id } = useParams();
  const { addToCart } = useContext(AppContext);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await API.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Unable to load product details.");
      }
    };

    fetchProduct();
  }, [id]);

  const isAvailable = product?.available ?? product?.productAvailable ?? true;

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
        <div className="left-column" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img
            src={product.imageUrl || product.image || "https://via.placeholder.com/500x500?text=Product"}
            alt={product.name}
            className="left-column-img"
            style={{ objectFit: "cover" }}
          />
        </div>
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
              className={`cart-btn ${!isAvailable ? "disabled-btn" : ""}`}
              disabled={!isAvailable}
              onClick={() => addToCart(product)}
            >
              {isAvailable ? "Add to cart" : "Out of Stock"}
            </button>
            <h6>
              Stock Available :{" "}
              <i style={{ color: "green", fontWeight: "bold" }}>
                {product.stockQuantity}
              </i>
            </h6>
            <p className="release-date">
              <h6>Product listed on:</h6>
              <i>{product.releaseDate}</i>
            </p>
          </div>
          <div className="update-button ">
            <button
              className="btn btn-primary"
              type="button"
          
            >
              Update
            </button>
        
            <button
              className="btn btn-primary"
              type="button"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;