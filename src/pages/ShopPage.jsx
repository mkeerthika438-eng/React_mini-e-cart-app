import ProductCard from "../components/ProductCard";
import "../components/Pages.css";
function ShopPage({
  products,
  categories,
  cart,
  onAdd,
  onIncrease,
  onDecrease,
  onBuyNow,
  filterCategory,
  setFilterCategory,
  filterSubCategory,
  setFilterSubCategory,
  filterRating,
  setFilterRating,
  search,
}) {
  const categoryButtons = ["All", ...categories.map((c) => c.name)];
  const ratingOptions = [4, 4.5];
  const selectedCategoryData = categories.find((c) => c.name === filterCategory);
  const subCategoryButtons = selectedCategoryData && selectedCategoryData.subCategories
    ? ["All", ...selectedCategoryData.subCategories]
    : null;
  const filteredProducts = products.filter((product) => {
const matchesSearch =
  search.trim() === "" ||
  product.name.toLowerCase().includes(search.toLowerCase());    const matchesCategory = filterCategory === "All" || product.category === filterCategory;
    const matchesSubCategory =
      filterSubCategory === "All" || product.subCategory === filterSubCategory;
    const matchesRating = filterRating === 0 || product.rating >= filterRating;
    return matchesSearch && matchesCategory && matchesSubCategory && matchesRating;
  });
  console.log("SEARCH =", search);
console.log("FILTERED PRODUCTS =", filteredProducts);

  function handleCategoryClick(cat) {
    setFilterCategory(cat);
    setFilterSubCategory("All");
  }

  function handleRatingClick(rating) {
    if (filterRating === rating) {
      setFilterRating(0);
    } else {
      setFilterRating(rating);
    }
  }

  return (
    <div className="page-wrapper">
      <div className="filter-bar">
        {categoryButtons.map((cat) => (
          <button
            key={cat}
            className={
              filterCategory === cat
                ? "filter-chip filter-chip-active"
                : "filter-chip filter-chip-inactive"
            }
            onClick={() => handleCategoryClick(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {subCategoryButtons && (
        <div className="subfilter-bar">
          <span className="subfilter-label">Type:</span>
          {subCategoryButtons.map((sub) => (
            <button
              key={sub}
              className={
                filterSubCategory === sub
                  ? "subfilter-chip subfilter-chip-active"
                  : "subfilter-chip subfilter-chip-inactive"
              }
              onClick={() => setFilterSubCategory(sub)}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      <div className="subfilter-bar">
        <span className="subfilter-label">Rating:</span>
        {ratingOptions.map((rating) => (
          <button
            key={rating}
            className={
              filterRating === rating
                ? "subfilter-chip subfilter-chip-active"
                : "subfilter-chip subfilter-chip-inactive"
            }
            onClick={() => handleRatingClick(rating)}
          >
            ⭐ {rating}+
          </button>
        ))}
        {filterRating !== 0 && (
          <button className="subfilter-chip subfilter-chip-inactive" onClick={() => setFilterRating(0)}>
            Clear ✕
          </button>
        )}
      </div>

      <div className="page-container">
        <div className="results-count">{filteredProducts.length} products found</div>
      </div>

      <div className="page-container">
        {filteredProducts.length === 0 ? (
          <div className="empty-message">
            <div style={{ fontSize: "48px" }}>🔍</div>
            <div style={{ fontWeight: "700", fontSize: "18px", marginTop: "12px" }}>
              No products found
            </div>
            <div style={{ fontSize: "13px", marginTop: "6px" }}>
              Try a different category or clear the search box
            </div>
          </div>
        ) : (
          <div className="product-grid" style={{ paddingTop: "8px", paddingBottom: "44px" }}>
            {filteredProducts.map((product) => {
              const cartItem = cart.find((item) => item.id === product.id);
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  cartItem={cartItem}
                  onAdd={onAdd}
                  onIncrease={onIncrease}
                  onDecrease={onDecrease}
                  onBuyNow={onBuyNow}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default ShopPage;
