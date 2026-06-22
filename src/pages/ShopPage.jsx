import { useState } from "react";
import ProductCard from "../components/ProductCard";
import QuickPreviewModal from "../components/QuickPreviewModal";
import "../components/Pages.css";
import "./ShopPage.css";

const SORT_OPTIONS = [
  { value: "default", label: "Relevance" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating-desc", label: "Top Rated" },
  { value: "discount-desc", label: "Best Discount" },
];

function ShopPage({
  products, categories, cart,
  onAdd, onIncrease, onDecrease, onBuyNow,
  filterCategory, setFilterCategory,
  filterSubCategory, setFilterSubCategory,
  filterRating, setFilterRating,
  search,
}) {
  const [sortBy, setSortBy] = useState("default");
  const [previewProduct, setPreviewProduct] = useState(null);

  const categoryButtons = ["All", ...categories.map((c) => c.name)];
  const ratingOptions = [4, 4.5];

  const selectedCategoryData = categories.find((c) => c.name === filterCategory);
  const subCategoryButtons = selectedCategoryData?.subCategories
    ? ["All", ...selectedCategoryData.subCategories]
    : null;

 let filtered = products.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.subCategory && p.subCategory.toLowerCase().includes(q));
    const matchCat = filterCategory === "All" || p.category === filterCategory;
    const matchSub = filterSubCategory === "All" || p.subCategory === filterSubCategory;
    const matchRating = filterRating === 0 || p.rating >= filterRating;
    return matchSearch && matchCat && matchSub && matchRating;
  });

  
  filtered = [...filtered].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "rating-desc") return b.rating - a.rating;
    if (sortBy === "discount-desc") {
      const da = ((a.oldPrice - a.price) / a.oldPrice);
      const db = ((b.oldPrice - b.price) / b.oldPrice);
      return db - da;
    }
    return 0;
  });

  function handleCategoryClick(cat) {
    setFilterCategory(cat);
    setFilterSubCategory("All");
  }

  function handleRatingClick(rating) {
    setFilterRating(filterRating === rating ? 0 : rating);
  }

  const activeFiltersCount =
    (filterCategory !== "All" ? 1 : 0) +
    (filterSubCategory !== "All" ? 1 : 0) +
    (filterRating !== 0 ? 1 : 0) +
    (search.trim() ? 1 : 0);

  function clearAllFilters() {
    setFilterCategory("All");
    setFilterSubCategory("All");
    setFilterRating(0);
  }

  return (
    <div className="page-wrapper">
      {/* Category filter bar */}
      <div className="filter-bar">
        {categoryButtons.map((cat) => (
          <button
            key={cat}
            className={filterCategory === cat ? "filter-chip filter-chip-active" : "filter-chip filter-chip-inactive"}
            onClick={() => handleCategoryClick(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
            <div className="filter-secondary-bar">
        {subCategoryButtons && (
          <div className="subfilter-group">
            <span className="subfilter-label">Type:</span>
            {subCategoryButtons.map((sub) => (
              <button
                key={sub}
                className={filterSubCategory === sub ? "subfilter-chip subfilter-chip-active" : "subfilter-chip subfilter-chip-inactive"}
                onClick={() => setFilterSubCategory(sub)}
              >
                {sub}
              </button>
            ))}
          </div>
        )}

        <div className="subfilter-group">
          <span className="subfilter-label">Rating:</span>
          {ratingOptions.map((r) => (
            <button
              key={r}
              className={filterRating === r ? "subfilter-chip subfilter-chip-active" : "subfilter-chip subfilter-chip-inactive"}
              onClick={() => handleRatingClick(r)}
            >
              ⭐ {r}+
            </button>
          ))}
        </div>

        <div className="sort-group">
          <label className="sort-label" htmlFor="sort-select">Sort:</label>
          <select
            id="sort-select"
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="page-container">
        <div className="results-bar">
          <div className="results-count">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
            {search.trim() && <span className="results-query"> for "<strong>{search}</strong>"</span>}
          </div>
          {activeFiltersCount > 0 && (
            <button className="clear-filters-btn" onClick={clearAllFilters}>
              Clear filters ({activeFiltersCount}) ✕
            </button>
          )}
        </div>
      </div>

      <div className="page-container">
        {filtered.length === 0 ? (
          <div className="empty-message">
            <div style={{ fontSize: "48px" }}>🔍</div>
            <div style={{ fontWeight: "700", fontSize: "18px", marginTop: "12px" }}>No products found</div>
            <div style={{ fontSize: "13px", marginTop: "6px", color: "var(--color-text-medium)" }}>
              Try a different search or clear your filters
            </div>
            {activeFiltersCount > 0 && (
              <button className="clear-filters-btn" style={{ marginTop: "16px" }} onClick={clearAllFilters}>
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <div className="product-grid" style={{ paddingTop: "8px", paddingBottom: "48px" }}>
            {filtered.map((product) => {
              const cartItems = cart.filter((item) => item.id === product.id);
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  cartItems={cartItems}
                  onAdd={onAdd}
                  onIncrease={onIncrease}
                  onDecrease={onDecrease}
                  onBuyNow={onBuyNow}
                  onPreview={setPreviewProduct}
                  searchQuery={search}
                />
              );
            })}
          </div>
        )}
      </div>

      {previewProduct && (
        <QuickPreviewModal
          product={previewProduct}
          onClose={() => setPreviewProduct(null)}
          onAdd={onAdd}
          onBuyNow={onBuyNow}
          cartItems={cart.filter((i) => i.id === previewProduct.id)}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
        />
      )}
    </div>
  );
}

export default ShopPage;
