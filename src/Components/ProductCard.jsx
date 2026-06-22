import { useState } from "react";
import { useWishlist } from "../context/WishlistContext";
import "./ProductCard.css";

const SIZES = ["S", "M", "L", "XL", "XXL"];

function StarRating({ rating }) {
  return (
    <div className="star-rating-row">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= Math.round(rating) ? "pc-star filled" : "pc-star"}>★</span>
      ))}
      <span className="pc-rating-num">{rating}</span>
    </div>
  );
}

function HighlightText({ text, query }) {
  if (!query || !query.trim()) return <span>{text}</span>;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? <mark key={i} className="search-highlight">{part}</mark> : part
      )}
    </span>
  );
}

function ProductCard({ product, cartItems, onAdd, onIncrease, onDecrease, onBuyNow, onPreview, searchQuery = "" }) {
  const [imageFailed, setImageFailed] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [sizeError, setSizeError] = useState(false);
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  const isFashion = product.category === "Fashion";
  const discountPercent = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);

  const cartItem = isFashion
    ? (selectedSize ? (cartItems || []).find((i) => i.id === product.id && i.size === selectedSize) : null)
    : (cartItems || []).find((i) => i.id === product.id);

  function handleAdd() {
    if (isFashion && !selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    onAdd(product, isFashion ? selectedSize : null);
  }

  function handleBuyNow() {
    if (isFashion && !selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    onBuyNow(product, isFashion ? selectedSize : null);
  }

  function handleSizeClick(size) {
    setSelectedSize(size);
    setSizeError(false);
  }

  const cartKey = isFashion ? { id: product.id, size: selectedSize } : { id: product.id };

  return (
    <div className="product-card">
      <div className="product-image-box" onClick={() => onPreview && onPreview(product)}>
        {!imageFailed ? (
          <img
            className="product-image"
            src={product.image}
            alt={product.name}
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="image-fallback">🛍️</div>
        )}
        <span className="discount-badge">-{discountPercent}%</span>

        <button
          className={`wishlist-heart-btn${wishlisted ? " wishlisted" : ""}`}
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
          title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          {wishlisted ? "❤️" : "🤍"}
        </button>

        <button
          className="details-toggle-btn"
          onClick={(e) => { e.stopPropagation(); onPreview && onPreview(product); }}
          title="Quick preview"
        >
          👁
        </button>
      </div>

      <div className="product-info">
        <div className="product-category">
          {product.category}{product.subCategory ? " · " + product.subCategory : ""}
        </div>
        <div className="product-name">
          <HighlightText text={product.name} query={searchQuery} />
        </div>
        <StarRating rating={product.rating} />

        <div className="price-row">
          <span className="price-now">₹{product.price.toLocaleString("en-IN")}</span>
          <span className="price-old">₹{product.oldPrice.toLocaleString("en-IN")}</span>
          <span className="price-discount">{discountPercent}% off</span>
        </div>
        <div className="price-savings">Save ₹{(product.oldPrice - product.price).toLocaleString("en-IN")}</div>

        {isFashion && (
          <div className="size-selector">
            <div className="size-label-row">
              <span className="size-label">Size:</span>
              {selectedSize && <span className="size-selected-tag">{selectedSize}</span>}
            </div>
            <div className="size-options">
              {SIZES.map((s) => (
                <button
                  key={s}
                  className={`size-btn${selectedSize === s ? " size-btn-active" : ""}`}
                  onClick={() => handleSizeClick(s)}
                >
                  {s}
                </button>
              ))}
            </div>
            {sizeError && <div className="size-error">Please select a size</div>}
          </div>
        )}

        {!cartItem && (
          <div className="button-row">
            <button className="add-cart-btn" onClick={handleAdd}>
              Add to Cart
            </button>
            <button className="buy-now-btn" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        )}

        {cartItem && (
          <div className="qty-and-buy">
            <div className="qty-box">
              <button className="qty-btn" onClick={() => onDecrease(product.id, isFashion ? selectedSize : null)}>−</button>
              <span className="qty-number">{cartItem.qty}</span>
              <button className="qty-btn" onClick={() => onIncrease(product.id, isFashion ? selectedSize : null)}>+</button>
            </div>
            <button className="buy-now-btn" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
