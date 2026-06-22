import { useState } from "react";
import "./Header.css";

function Header({
  page,
  setPage,
  search,
  setSearch,
  totalItems,
  wishlistCount = 0,
  products = [],
  onSelectProduct,
}) {
  const [showSuggestions, setShowSuggestions] = useState(false);

  function handleSearchChange(e) {
    setSearch(e.target.value);
    setShowSuggestions(true);

    if (page !== "shop") {
      setPage("shop");
    }
  }

  const matchingProducts =
    search.trim() === ""
      ? []
      : products
          .filter(
            (p) =>
              p?.name &&
              p.name.toLowerCase().includes(search.toLowerCase())
          )
          .slice(0, 8);

  function handleSuggestionClick(product) {
    setSearch(product.name);
    setShowSuggestions(false);

    if (onSelectProduct) {
      onSelectProduct(product);
    }

    setPage("shop");
  }

  return (
    <div className="header-wrapper">
      <div className="top-bar">
        Free Delivery on orders above <strong>₹1,000</strong> | Use code{" "}
        <strong>FIRST5</strong> for 5% off
      </div>

      <div className="navbar">
        <div className="logo" onClick={() => setPage("home")}>
          🛍️ ShopEasy
        </div>

        <button
          className={
            page === "home"
              ? "nav-link nav-link-active"
              : "nav-link"
          }
          onClick={() => setPage("home")}
        >
          Home
        </button>

        <button
          className={
            page === "shop"
              ? "nav-link nav-link-active"
              : "nav-link"
          }
          onClick={() => setPage("shop")}
        >
          Shop
        </button>

        <button
          className={
            page === "offers"
              ? "nav-link nav-link-active"
              : "nav-link"
          }
          onClick={() => setPage("offers")}
        >
          Offers 🔥
        </button>

        <div className="search-wrapper">
          <input
            className="search-input"
            type="text"
            placeholder="🔍 Search products, brands and more..."
            value={search}
            onChange={handleSearchChange}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() =>
              setTimeout(() => setShowSuggestions(false), 200)
            }
          />

          {search && (
            <button
              className="search-clear-btn"
              onClick={() => {
                setSearch("");
                setShowSuggestions(false);
              }}
            >
              ✕
            </button>
          )}

          {showSuggestions && matchingProducts.length > 0 && (
            <div className="search-suggestions">
              <div className="search-suggestions-header">
                Products
              </div>

              {matchingProducts.map((product) => (
                <div
                  key={product.id}
                  className="search-suggestion-item"
                  onClick={() =>
                    handleSuggestionClick(product)
                  }
                >
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="search-suggestion-thumb"
                  />

                  <div className="suggestion-text">
                    <div className="search-suggestion-name">
                      {product.name}
                    </div>

                    <div className="suggestion-category">
                      {product.category}
                    </div>
                  </div>

                  <div className="search-suggestion-price">
                    ₹{product.price?.toLocaleString("en-IN")}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          className={
            wishlistCount > 0
              ? "cart-button cart-button-active"
              : "cart-button cart-button-empty"
          }
          onClick={() => setPage("wishlist")}
        >
          ❤️ Wishlist
          {wishlistCount > 0 && ` (${wishlistCount})`}
        </button>

        <button
          className={
            totalItems > 0
              ? "cart-button cart-button-active"
              : "cart-button cart-button-empty"
          }
          onClick={() => setPage("cart")}
        >
          🛒 Cart
          {totalItems > 0 && ` (${totalItems})`}
        </button>
      </div>
    </div>
  );
}

export default Header;