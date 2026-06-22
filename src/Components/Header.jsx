import { useState } from "react";
import "./Header.css";
function Header({ page, setPage, search, setSearch, totalItems, products, onSelectProduct
 }) {
const [showSuggestions, setShowSuggestions] = useState(false);
function handleSearchChange(e) {
  setSearch(e.target.value);
  setShowSuggestions(true);
  setPage("shop");
}
const matchingProducts =
  search.trim() === ""
    ? []
    : products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.category.toLowerCase().includes(search.toLowerCase()) ||
            (p.subCategory &&
              p.subCategory.toLowerCase().includes(search.toLowerCase()))
        )
        .slice(0, 8);
function handleSuggestionClick(product) {
  setSearch(product.name.trim());
  setShowSuggestions(false);
  setPage("shop");
}
 return (
  
<div className="header-wrapper">
    <div className="top-bar">
        Free Delivery on orders above <strong>₹1,000</strong> | Use code <strong>FIRST5</strong> for 5% off
      </div>
<div className="navbar">
        <div className="logo" onClick={() => setPage("home")}>
          🛍️ ShopEasy
        </div>

        <button
          className={page === "home" ? "nav-link nav-link-active" : "nav-link"}
          onClick={() => setPage("home")}
        >
          Home
        </button>

        <button
          className={page === "shop" ? "nav-link nav-link-active" : "nav-link"}
          onClick={() => setPage("shop")}
        >
          Shop
        </button>

        <button
          className={page === "offers" ? "nav-link nav-link-active" : "nav-link"}
          onClick={() => setPage("offers")}
        >
          Offers 🔥
        </button>

        <div className="search-wrapper">
          <input
            className="search-input"
            type="text"
            placeholder="🔍 Search products..."
            value={search}
            onChange={handleSearchChange}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          />
{search && (
  <button
    className="search-clear-btn"
    onClick={() => {
      setSearch("");
      setPage("shop");
    }}
  >
    ✕
  </button>
)}
          {showSuggestions && matchingProducts.length > 0 && (
            <div className="search-suggestions">
              {matchingProducts.map((product) => (
                <div
                  key={product.id}
                  className="search-suggestion-item"
                  onClick={() => handleSuggestionClick(product)}
                >
                  <img className="search-suggestion-thumb" src={product.image} alt={product.name} />
                  <span className="search-suggestion-name">{product.name}</span>
                  <span className="search-suggestion-price">₹{product.price.toLocaleString("en-IN")}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          className={totalItems > 0 ? "cart-button cart-button-active" : "cart-button cart-button-empty"}
          onClick={() => setPage("cart")}
        >
          🛒 Cart {totalItems > 0 && "(" + totalItems + ")"}
        </button>
      </div>
    </div>
  );
}

export default Header;
