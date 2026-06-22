import { useState, useEffect } from "react";
import { useWishlist } from "../context/WishlistContext";
import "./QuickPreviewModal.css";

const SIZES = ["S", "M", "L", "XL", "XXL"];

function StarRating({ rating }) {
  return (
    <div className="qp-stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= Math.round(rating) ? "qp-star filled" : "qp-star"}>★</span>
      ))}
      <span className="qp-rating-num">{rating} / 5</span>
    </div>
  );
}

function QuickPreviewModal({ product, onClose, onAdd, onBuyNow, cartItems = [], onIncrease, onDecrease }) {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [activeImg, setActiveImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [sizeError, setSizeError] = useState(false);
  const wishlisted = isWishlisted(product.id);

  const isFashion = product.category === "Fashion";
  const discountPercent = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);

  // Find cart entry for current size (or non-fashion item)
  const cartItem = isFashion
    ? (selectedSize ? cartItems.find((i) => i.size === selectedSize) : null)
    : cartItems.find((i) => i.id === product.id);

  const gallery = [
    product.image,
    product.image.replace("w=500&h=500", "w=500&h=500&sat=-30"),
    product.image.replace("fit=crop", "fit=crop&flip=h"),
    product.image.replace("q=80", "q=60"),
  ];

  useEffect(() => {
    function onKey(e) { if (e.key === "Escape") onClose(); }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  function handleAdd() {
    if (isFashion && !selectedSize) { setSizeError(true); return; }
    setSizeError(false);
    onAdd(product, isFashion ? selectedSize : null);
    onClose();
  }

  function handleBuyNow() {
    if (isFashion && !selectedSize) { setSizeError(true); return; }
    setSizeError(false);
    onBuyNow(product, isFashion ? selectedSize : null);
    onClose();
  }

  return (
    <div className="qp-overlay" onClick={onClose}>
      <div className="qp-modal" onClick={(e) => e.stopPropagation()}>
        <button className="qp-close" onClick={onClose}>✕</button>

        {/* Image gallery */}
        <div className="qp-gallery">
          <div className="qp-main-img-wrap">
            <img src={gallery[activeImg]} alt={product.name} className="qp-main-img" />
            <span className="qp-discount-badge">-{discountPercent}%</span>
          </div>
          <div className="qp-thumbs">
            {gallery.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`View ${i + 1}`}
                className={`qp-thumb${activeImg === i ? " qp-thumb-active" : ""}`}
                onClick={() => setActiveImg(i)}
              />
            ))}
          </div>
        </div>

        {/* Product info */}
        <div className="qp-info">
          <div className="qp-category">
            {product.category}{product.subCategory ? ` › ${product.subCategory}` : ""}
          </div>
          <h2 className="qp-name">{product.name}</h2>
          <StarRating rating={product.rating} />

          <div className="qp-price-block">
            <span className="qp-price">₹{product.price.toLocaleString("en-IN")}</span>
            <span className="qp-old-price">₹{product.oldPrice.toLocaleString("en-IN")}</span>
            <span className="qp-off">{discountPercent}% off</span>
          </div>
          <div className="qp-savings">
            You save ₹{(product.oldPrice - product.price).toLocaleString("en-IN")}
          </div>

          <div className="qp-meta">
            <div className="qp-meta-row"><span>Category</span><span>{product.category}</span></div>
            {product.subCategory && <div className="qp-meta-row"><span>Type</span><span>{product.subCategory}</span></div>}
            <div className="qp-meta-row"><span>Rating</span><span>⭐ {product.rating}/5</span></div>
            <div className="qp-meta-row"><span>In Stock</span><span className="qp-instock">✓ Available</span></div>
          </div>

          {/* Size selector inside modal — Fashion only */}
          {isFashion && (
            <div className="qp-size-selector">
              <div className="qp-size-label-row">
                <span className="qp-size-label">Select Size:</span>
                {selectedSize && <span className="qp-size-selected">{selectedSize}</span>}
              </div>
              <div className="qp-size-options">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    className={`qp-size-btn${selectedSize === s ? " qp-size-btn-active" : ""}`}
                    onClick={() => { setSelectedSize(s); setSizeError(false); }}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {sizeError && <div className="qp-size-error">Please select a size to continue</div>}
            </div>
          )}

          <div className="qp-actions">
            {!cartItem ? (
              <>
                <button className="qp-add-btn" onClick={handleAdd}>
                  🛒 Add to Cart
                </button>
                <button className="qp-buy-btn" onClick={handleBuyNow}>
                  ⚡ Buy Now
                </button>
              </>
            ) : (
              <>
                <div className="qp-qty-row">
                  <button className="qp-qty-btn" onClick={() => onDecrease(product.id, isFashion ? selectedSize : null)}>−</button>
                  <span className="qp-qty-num">{cartItem.qty}</span>
                  <button className="qp-qty-btn" onClick={() => onIncrease(product.id, isFashion ? selectedSize : null)}>+</button>
                </div>
                <button className="qp-buy-btn" onClick={handleBuyNow}>
                  ⚡ Buy Now
                </button>
              </>
            )}
            <button
              className={`qp-wishlist-btn${wishlisted ? " wishlisted" : ""}`}
              onClick={() => toggleWishlist(product)}
            >
              {wishlisted ? "❤️ Wishlisted" : "🤍 Wishlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuickPreviewModal;
