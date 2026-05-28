import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/Context";

const Home = () => {
  const { data: products, addToCart, isError, isLoading } = useContext(AppContext);

  if (isError) {
    return (
      <h2 className="text-center" style={{ padding: "10rem" }}>
        Something went wrong...
      </h2>
    );
  }

  if (isLoading) {
    return (
      <h2 className="text-center" style={{ padding: "10rem" }}>
        Loading products...
      </h2>
    );
  }

  if (!products.length) {
    return (
      <h2 className="text-center" style={{ padding: "10rem" }}>
        No products found.
      </h2>
    );
  }

  return (
    <>
      <div className="grid">
        {products.map((product) => (
          <div
            className="card mb-3"
            key={product.id}
            style={{
              width: "270px",
              height: "210px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              borderRadius: "10px",
              overflow: "hidden",

              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "stretch",
            }}
          >
            <div
              className="card-body"
              style={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "10px",
              }}
            >
              <div>
                <h5
                  className="card-title"
                  style={{ margin: "0 0 10px 0", fontSize: "1.2rem" }}
                >
                  {product.name.toUpperCase()}
                </h5>
                <i
                  className="card-brand"
                  style={{ fontStyle: "italic", fontSize: "0.8rem" }}
                >
                  {"by " + product.brand}
                </i>
              </div>
              <hr className="hr-line" style={{ margin: "10px 0" }} />
              <div className="home-cart-price">
                <h5
                  className="card-text"
                  style={{
                    fontWeight: "600",
                    fontSize: "1.1rem",
                    marginBottom: "5px",
                  }}
                >
                  <i className="bi bi-currency-rupee"></i>
                  {product.price}
                </h5>
              </div>
              <div style={{ display: "flex", gap: "0.5rem", marginTop: "auto" }}>
                <button
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                  onClick={() => addToCart(product)}
                >
                  Add To Cart
                </button>
                <Link
                  to={`/product/${product.id}`}
                  className="btn btn-outline-primary"
                  style={{ flex: 1 }}
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
