import { useState, useRef, useEffect } from "react";
import { useWishlist } from "../context/WishlistContext";
import "./Header.css";

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function HighlightMatch({ text, query }) {
  if (!query.trim()) return <span>{text}</span>;
  const regex = new RegExp(`(${escapeRegex(query)})`, "gi");
  const parts = txt.split(regex);
  return (
    <span>
      {parts.map((p, i) =>
        regex.test(p) ? <mark key={i} style={{ background: "#fef08a", borderRadius: "2px", padding: "0 1px" }}>{p}</mark> : p
      )}
    </span>
  );
}

function Header({ page, setPage, search, setSearch, totalItems, products, onPreview }) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);
  const { wishlist } = useWishlist();

  useEffect(() => {
    function handleClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSearchChange(e) {
    setSearch(e.target.value);
    setShowSuggestions(true);
  }

  function handleSearchKeyDown(e) {
    if (e.key === "Enter" && search.trim()) {
      setShowSuggestions(false);
      setPage("shop");
    }
    if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  }

  const q = search.toLowerCase().trim();
  const matchingProducts = q === ""
    ? []
    : products.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.subCategory && p.subCategory.toLowerCase().includes(q))
      ).slice(0, 7);

  function handleSuggestionClick(product) {
    setSearch(product.name);
    setShowSuggestions(false);
    setPage("shop");
    if (onPreview) onPreview(product);
  }

  function handleSearchSubmit() {
    if (search.trim()) {
      setShowSuggestions(false);
      setPage("shop");
    }
  }

  const showDropdown = showSuggestions && q !== "";

  return (
    <div className="header-wrapper">
      <div className="top-bar">
        Free Delivery on orders above <strong>₹1,000</strong> | Use code <strong>FIRST5</strong> for 5% off
      </div>

      <div className="navbar">
        <div className="logo" onClick={() => setPage("home")}>🛍️ ShopEasy</div>

        <button className={page === "home" ? "nav-link nav-link-active" : "nav-link"} onClick={() => setPage("home")}>Home</button>
        <button className={page === "shop" ? "nav-link nav-link-active" : "nav-link"} onClick={() => setPage("shop")}>Shop</button>
        <button className={page === "offers" ? "nav-link nav-link-active" : "nav-link"} onClick={() => setPage("offers")}>Offers 🔥</button>

        <div className="search-wrapper" ref={wrapperRef}>
          <input
            className="search-input"
            type="text"
            placeholder="🔍 Search products, categories..."
            value={search}
            onChange={handleSearchChange}
            onFocus={() => search.trim() && setShowSuggestions(true)}
            onKeyDown={handleSearchKeyDown}
          />
          {search.trim() && (
            <button className="search-clear-btn" onClick={() => { setSearch(""); setShowSuggestions(false); }}>✕</button>
          )}

          {showDropdown && (
            <div className="search-suggestions">
              {matchingProducts.length > 0 ? (
                <>
                  <div className="search-suggestions-header">Products matching "{search}"</div>
                  {matchingProducts.map((product) => (
                    <div key={product.id} className="search-suggestion-item" onClick={() => handleSuggestionClick(product)}>
                      <img className="search-suggestion-thumb" src={product.image} alt={product.name} />
                      <div className="suggestion-text">
                        <div className="search-suggestion-name">
                          <HighlightMatch text={product.name} query={search} />
                        </div>
                        <div className="suggestion-category">
                          <HighlightMatch text={product.category + (product.subCategory ? ` · ${product.subCategory}` : "")} query={search} />
                        </div>
                      </div>
                      <span className="search-suggestion-price">₹{product.price.toLocaleString("en-IN")}</span>
                    </div>
                  ))}
                  <div className="search-see-all" onClick={handleSearchSubmit}>
                    See all results for "<strong>{search}</strong>" →
                  </div>
                </>
              ) : (
                <div className="search-no-results">
                  <span>🔍</span> No products found for "<strong>{search}</strong>"
                </div>
              )}
            </div>
          )}
        </div>

        <button
          className={page === "wishlist" ? "wishlist-nav-btn wishlist-nav-active" : "wishlist-nav-btn"}
          onClick={() => setPage("wishlist")}
          title="Wishlist"
        >
          {wishlist.length > 0 ? "❤️" : "🤍"}
          {wishlist.length > 0 && <span className="wishlist-count-badge">{wishlist.length}</span>}
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
