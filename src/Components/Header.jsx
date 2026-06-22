import { useState } from "react";
import "./Header.css";

// This component shows the top bar, logo, menu links, search box and cart button.
// It is used on every page.

function Header({ page, setPage, search, setSearch, totalItems, wishlistCount, products, onSelectProduct }) {
  // Whether the suggestion dropdown should be visible right now
  const [showSuggestions, setShowSuggestions] = useState(false);

  // This runs every time the user types in the search box.
  // We only switch to the shop page ONCE per visit to the search box,
  // not on every keystroke - that bug used to make the input lose focus.
  function handleSearchChange(e) {
    setSearch(e.target.value);
    setShowSuggestions(true);
  }

  // Find up to 6 products whose name contains the typed text.
  // This list updates on every single letter typed, so typing "s" shows
  // every product with an "s" in the name, typing "so" narrows it down, etc.
  //
  // SAFETY CHECK: we also make sure every product actually has a non-empty
  // "images" array before including it. This stops the whole page from
  // crashing if one product in products.js is ever missing its images.
  const matchingProducts =
    search.trim() === ""
      ? []
      : products
          .filter((p) => Array.isArray(p.images) && p.images.length > 0)
          .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
          .slice(0, 6);

  function handleSuggestionClick(product) {
    setSearch(product.name);
    setShowSuggestions(false);
    setPage("shop");
  }

  return (
    <div className="header-wrapper">
      {/* Top announcement strip */}
      <div className="top-bar">
        Free Delivery on orders above <strong>₹1,000</strong> | Use code <strong>FIRST5</strong> for 5% off
      </div>

      {/* Main navbar */}
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

          {showSuggestions && matchingProducts.length > 0 && (
            <div className="search-suggestions">
              {matchingProducts.map((product) => (
                <div
                  key={product.id}
                  className="search-suggestion-item"
                  onClick={() => handleSuggestionClick(product)}
                >
                  <img className="search-suggestion-thumb" src={product.images[0]} alt={product.name} />
                  <span className="search-suggestion-name">{product.name}</span>
                  <span className="search-suggestion-price">₹{product.price.toLocaleString("en-IN")}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          className={wishlistCount > 0 ? "cart-button cart-button-active" : "cart-button cart-button-empty"}
          onClick={() => setPage("wishlist")}
        >
          ❤️ Wishlist {wishlistCount > 0 && "(" + wishlistCount + ")"}
        </button>

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