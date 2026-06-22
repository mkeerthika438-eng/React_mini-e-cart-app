import ProductCard from "../components/ProductCard";
import "../components/Pages.css";
function HomePage({ products, categories, cart, onAdd, onIncrease, onDecrease, onBuyNow, setPage, setFilterCategory, setFilterSubCategory, setSearch }) {
  const badgeList = [
    { icon: "🚚", title: "Free Delivery", desc: "On orders above ₹1,000" },
    { icon: "↩️", title: "Easy Returns", desc: "7 day hassle-free returns" },
    { icon: "🔒", title: "Secure Payment", desc: "100% safe transactions" },
    { icon: "✅", title: "Genuine Products", desc: "100% original products" },
  ];

const featuredProducts = products.slice(0, 4);
function goToCategory(categoryName) {
    setFilterCategory(categoryName);
    setFilterSubCategory("All");
    setSearch("");
    setPage("shop");
  }

return (
    <div className="page-wrapper">
      <div className="hero-section">
        <div className="hero-small-text">SUMMER MEGA SALE 2025</div>
        <h1 className="hero-title">Everything You Need, One Click Away 🔥</h1>
        <p className="hero-subtitle">
          Fashion, Mobiles, Electronics, Grocery, Toys & more — Up to 30% off today only!
        </p>
        <div className="hero-buttons">
          <button className="btn-yellow" onClick={() => setPage("shop")}>Shop Now →</button>
          <button className="btn-outline" onClick={() => setPage("offers")}>View Offers</button>
        </div>
      </div>

      <div className="page-container" style={{ marginTop: "40px" }}>
        <h2 className="section-heading" style={{ marginBottom: "20px" }}>Shop by Category</h2>
        <div className="category-grid">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="category-card"
              style={{ backgroundColor: cat.color }}
              onClick={() => goToCategory(cat.name)}
            >
              <div className="category-icon">{cat.icon}</div>
              <div className="category-name">{cat.name}</div>
            </div>
          ))}
        </div>
      </div>

<div className="page-container" style={{ marginTop: "40px" }}>
        <div className="section-heading-row">
          <h2 className="section-heading">🌟 Featured Products</h2>
          <button className="view-all-btn" onClick={() => setPage("shop")}>View All</button>
        </div>

<div className="product-grid">
          {featuredProducts.map((product) => {
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
      </div>

<div className="page-container" style={{ marginTop: "40px" }}>
        <div className="badge-grid">
          {badgeList.map((badge) => (
            <div key={badge.title} className="badge-card">
              <span className="badge-icon">{badge.icon}</span>
              <div>
                <div className="badge-title">{badge.title}</div>
                <div className="badge-desc">{badge.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
