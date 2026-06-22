import ProductCard from "../components/ProductCard";
import "../components/Pages.css";

// This is the SHOP page - shows all products with category filter,
// sub-category filter (for Fashion) and search.

function ShopPage({
  products,
  categories,
  cart,
  wishlist,
  onAdd,
  onIncrease,
  onDecrease,
  onBuyNow,
  onToggleWishlist,
  filterCategory,
  setFilterCategory,
  filterSubCategory,
  setFilterSubCategory,
  filterRating,
  setFilterRating,
  filterPrice,
  setFilterPrice,
  search,
}) {
  const categoryButtons = ["All", ...categories.map((c) => c.name)];

  // Rating filter options: 0 means "no rating filter" (show everything)
  const ratingOptions = [4, 4.5];

  // Price filter options. "All" means "no price filter" (show everything).
  // Each option has a label to show on the button and a check function
  // that decides if a given product's price matches that option.
  const priceOptions = [
    { label: "Below ₹500", value: "low", check: (price) => price < 500 },
    { label: "₹500 - ₹1500", value: "medium", check: (price) => price >= 500 && price <= 1500 },
    { label: "Above ₹1500", value: "high", check: (price) => price > 1500 },
  ];

  // Find the selected category's sub-category list (only Fashion has one)
  const selectedCategoryData = categories.find((c) => c.name === filterCategory);
  const subCategoryButtons = selectedCategoryData && selectedCategoryData.subCategories
    ? ["All", ...selectedCategoryData.subCategories]
    : null;

  // Filter the products based on search text, category, sub-category,
  // minimum rating, AND price range. A product must pass every active
  // filter at the same time (this is why we use && between them).
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filterCategory === "All" || product.category === filterCategory;
    const matchesSubCategory =
      filterSubCategory === "All" || product.subCategory === filterSubCategory;
    const matchesRating = filterRating === 0 || product.rating >= filterRating;

    // Find the chosen price option (if any) and check the product's price against it
    const selectedPriceOption = priceOptions.find((option) => option.value === filterPrice);
    const matchesPrice = filterPrice === "All" || selectedPriceOption.check(product.price);

    return matchesSearch && matchesCategory && matchesSubCategory && matchesRating && matchesPrice;
  });

  function handleCategoryClick(cat) {
    setFilterCategory(cat);
    setFilterSubCategory("All");
  }

  // Clicking the same rating again turns the filter off (toggle behaviour)
  function handleRatingClick(rating) {
    if (filterRating === rating) {
      setFilterRating(0);
    } else {
      setFilterRating(rating);
    }
  }

  // Clicking the same price option again turns the filter off (toggle behaviour)
  function handlePriceClick(value) {
    if (filterPrice === value) {
      setFilterPrice("All");
    } else {
      setFilterPrice(value);
    }
  }

  return (
    <div className="page-wrapper">
      {/* Main category filter chips */}
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

      {/* Sub-category chips - only appear when a category with sub-categories is selected */}
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

      {/* Rating filter chips - click again to clear */}
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

      {/* Price filter chips - click again to clear */}
      <div className="subfilter-bar">
        <span className="subfilter-label">Price:</span>
        {priceOptions.map((option) => (
          <button
            key={option.value}
            className={
              filterPrice === option.value
                ? "subfilter-chip subfilter-chip-active"
                : "subfilter-chip subfilter-chip-inactive"
            }
            onClick={() => handlePriceClick(option.value)}
          >
            {option.label}
          </button>
        ))}
        {filterPrice !== "All" && (
          <button className="subfilter-chip subfilter-chip-inactive" onClick={() => setFilterPrice("All")}>
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
              const isWishlisted = wishlist.some((item) => item.id === product.id);
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  cartItem={cartItem}
                  onAdd={onAdd}
                  onIncrease={onIncrease}
                  onDecrease={onDecrease}
                  onBuyNow={onBuyNow}
                  isWishlisted={isWishlisted}
                  onToggleWishlist={onToggleWishlist}
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