import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SearchProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [products, setProducts] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      alert("Please enter a search query");
      return;
    }

    setLoading(true);
    setError("");
    setHasSearched(true);

    try {
      const response = await axios.get(
        `http://localhost:8080/api/products/search?q=${searchQuery}`
      );
      
      // Fetch images for search results
      const productsWithImages = await Promise.all(
        response.data.map(async (product) => {
          try {
            const imageResponse = await axios.get(
              `http://localhost:8080/api/product/${product.id}/image`,
              { responseType: "blob" }
            );
            const imageUrl = URL.createObjectURL(imageResponse.data);
            return { ...product, imageUrl };
          } catch (err) {
            console.error("Error fetching image for product:", product.id, err);
            return { ...product, imageUrl: null };
          }
        })
      );

      setSearchResults(productsWithImages);
      setProducts(productsWithImages);
      setLoading(false);
    } catch (err) {
      console.error("Error searching products:", err);
      setError("Error searching products. Please check the search query.");
      setSearchResults([]);
      setProducts([]);
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setProducts([]);
    setHasSearched(false);
    setError("");
  };

  return (
    <div className="container" style={{ padding: "2rem 0" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h2>Search Products</h2>
        <form onSubmit={handleSearch}>
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              marginBottom: "1rem",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              className="form-control"
              placeholder="Search by product name, brand, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ maxWidth: "500px" }}
            />
            <button type="submit" className="btn btn-primary">
              Search
            </button>
            {hasSearched && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClearSearch}
              >
                Clear
              </button>
            )}
          </div>
        </form>

        {loading && (
          <h3 className="text-center" style={{ padding: "2rem" }}>
            Searching...
          </h3>
        )}

        {error && (
          <h3 className="text-center" style={{ padding: "2rem", color: "red" }}>
            {error}
          </h3>
        )}

        {hasSearched && !loading && searchResults.length === 0 && !error && (
          <h3
            className="text-center"
            style={{
              padding: "2rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            No products found for &quot;{searchQuery}&quot;
          </h3>
        )}

        {searchResults.length > 0 && (
          <div>
            <p style={{ marginBottom: "1rem", fontSize: "1.1rem", color: "gray" }}>
              Found <strong>{searchResults.length}</strong> product(s)
            </p>
          </div>
        )}
      </div>

      <div className="grid">
        {products.map((product) => {
          const { id, brand, name, price, productAvailable, imageUrl } = product;
          return (
            <div
              className="card mb-3"
              style={{
                width: "18rem",
                height: "24rem",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 2px 3px",
                backgroundColor: productAvailable ? "#fff" : "#ccc",
                margin: "10px",
                display: "flex",
                flexDirection: "column",
              }}
              key={id}
            >
              <Link
                to={`/product/${id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img
                  src={imageUrl || "placeholder-image-url"}
                  alt={name}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "0.375rem 0.375rem 0 0",
                  }}
                />
              </Link>
              <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p style={{ margin: "5px 0", color: "gray", fontSize: "14px" }}>
                  {brand}
                </p>
                <p style={{ margin: "0", color: "green", fontWeight: "bold" }}>
                  ${price}
                </p>
                <div style={{ marginTop: "10px" }}>
                  <span
                    style={{
                      backgroundColor: productAvailable ? "#d4edda" : "#f8d7da",
                      padding: "3px 8px",
                      borderRadius: "3px",
                      fontSize: "12px",
                      color: productAvailable ? "#155724" : "#721c24",
                    }}
                  >
                    {productAvailable ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchProducts;
