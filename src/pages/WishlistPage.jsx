import { useWishlist } from "../context/WishlistContext";
import "../Components/Pages.css";
import "./WishlistPage.css";

function StarRating({ rating }) {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= Math.round(rating) ? "star filled" : "star"}>★</span>
      ))}
      <span className="rating-num">{rating}</span>
    </div>
  );
}

function WishlistPage({ onAdd, setPage }) {
  const { wishlist, removeFromWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="page-wrapper">
        <div className="page-container">
          <div className="wishlist-empty">
            <div className="wishlist-empty-icon">🤍</div>
            <h2>Your wishlist is empty</h2>
            <p>Save items you love by clicking the heart icon on any product.</p>
            <button className="btn-primary" onClick={() => setPage("shop")}>
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  function handleMoveToCart(product) {
    onAdd(product, null);
    removeFromWishlist(product.id);
  }

  function handleMoveAllToCart() {
    wishlist.forEach((p) => onAdd(p, null));
    wishlist.forEach((p) => removeFromWishlist(p.id));
    setPage("cart");
  }

  return (
    <div className="page-wrapper">
      <div className="page-container">
        <div className="wishlist-header">
          <div>
            <h1 className="wishlist-title">❤️ My Wishlist</h1>
            <p className="wishlist-count">{wishlist.length} item{wishlist.length !== 1 ? "s" : ""} saved</p>
          </div>
          <button className="move-all-btn" onClick={handleMoveAllToCart}>
            🛒 Move All to Cart
          </button>
        </div>

        <div className="wishlist-grid">
          {wishlist.map((product) => {
            const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
            return (
              <div className="wishlist-card" key={product.id}>
                <div className="wishlist-card-image-wrap">
                  <img src={product.image} alt={product.name} className="wishlist-card-img" />
                  <span className="wl-discount-badge">-{discount}%</span>
                  <button
                    className="wl-remove-btn"
                    onClick={() => removeFromWishlist(product.id)}
                    title="Remove from wishlist"
                  >
                    ✕
                  </button>
                </div>
                <div className="wishlist-card-info">
                  <div className="wl-category">{product.category}{product.subCategory ? ` · ${product.subCategory}` : ""}</div>
                  <div className="wl-name">{product.name}</div>
                  <StarRating rating={product.rating} />
                  <div className="wl-price-row">
                    <span className="wl-price">₹{product.price.toLocaleString("en-IN")}</span>
                    <span className="wl-old-price">₹{product.oldPrice.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="wl-savings">You save ₹{(product.oldPrice - product.price).toLocaleString("en-IN")}</div>
                  <button className="wl-cart-btn" onClick={() => handleMoveToCart(product)}>
                    🛒 Move to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default WishlistPage;
