import { useState } from "react";
import SizeSelector from "./SizeSelector";
import "./ProductCard.css";

// This component shows ONE product box (images, name, price, size picker,
// add to cart / buy now buttons). It also has a small "i" button that
// opens a quick-view details panel for that single product.
//
// NEW IN THIS VERSION:
// 1. Image gallery - if a product has more than one picture, small
//    thumbnail dots appear under the main picture. Clicking a thumbnail
//    swaps the main picture. Clicking the main picture opens a bigger
//    full-screen preview (the "lightbox").
// 2. Size selection - if the product is clothing or shoes, a row of size
//    buttons appears. The user must pick one size before the product can
//    be added to the cart or bought.

function ProductCard({ product, cartItem, onAdd, onIncrease, onDecrease, onBuyNow, isWishlisted, onToggleWishlist }) {
  const [imageFailed, setImageFailed] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Which picture in product.images is shown big right now
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Whether the full screen image preview is open
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Which size the user picked (starts as nothing picked)
  const [selectedSize, setSelectedSize] = useState(null);

  // Whether to show the "please pick a size" warning message
  const [showSizeWarning, setShowSizeWarning] = useState(false);

  const discountPercent = Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100
  );

  // A product needs a size only if it has a sizeType (clothing or shoes)
  const needsSize = Boolean(product.sizeType);

  // This runs before Add to Cart actually adds the product.
  // If a size is required but not picked yet, we stop and show a warning.
  function handleAddToCart() {
    if (needsSize && !selectedSize) {
      setShowSizeWarning(true);
      return;
    }
    setShowSizeWarning(false);
    onAdd(product, selectedSize);
  }

  // Same size check, but for the Buy Now button.
  function handleBuyNow() {
    if (needsSize && !selectedSize) {
      setShowSizeWarning(true);
      return;
    }
    setShowSizeWarning(false);
    onBuyNow(product, selectedSize);
  }

  return (
    <div className="product-card">
      <div className="product-image-box" onClick={() => setLightboxOpen(true)}>
        {!imageFailed ? (
          <img
            className="product-image"
            src={product.images[activeImageIndex]}
            alt={product.name}
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="image-fallback">🛍️</div>
        )}
        <span className="discount-badge">-{discountPercent}%</span>
        <button
          className="wishlist-heart-btn"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isWishlisted ? "❤️" : "🤍"}
        </button>
        <button
          className="details-toggle-btn"
          onClick={(e) => {
            e.stopPropagation();
            setShowDetails(!showDetails);
          }}
          title="View details"
        >
          i
        </button>
      </div>

      {/* Thumbnail dots - only shown if the product has more than 1 picture */}
      {product.images.length > 1 && (
        <div className="card-thumb-row">
          {product.images.map((imageLink, index) => (
            <div
              key={index}
              className={
                index === activeImageIndex ? "card-thumb card-thumb-active" : "card-thumb"
              }
              onClick={(e) => {
                e.stopPropagation();
                setActiveImageIndex(index);
              }}
            >
              <img src={imageLink} alt={product.name + " " + (index + 1)} />
            </div>
          ))}
        </div>
      )}

      <div className="product-info">
        <div className="product-category">
          {product.category}
          {product.subCategory ? " · " + product.subCategory : ""}
        </div>
        <div className="product-name">{product.name}</div>
        <div className="product-rating">⭐ {product.rating}</div>

        <div className="price-row">
          <span className="price-now">₹{product.price.toLocaleString("en-IN")}</span>
          <span className="price-old">₹{product.oldPrice.toLocaleString("en-IN")}</span>
        </div>

        {showDetails && (
          <div className="quick-view-panel">
            <div className="quick-view-row">
              <span>Category</span>
              <span>{product.category}</span>
            </div>
            {product.subCategory && (
              <div className="quick-view-row">
                <span>Type</span>
                <span>{product.subCategory}</span>
              </div>
            )}
            <div className="quick-view-row">
              <span>Rating</span>
              <span>⭐ {product.rating} / 5</span>
            </div>
            <div className="quick-view-row">
              <span>You save</span>
              <span>₹{(product.oldPrice - product.price).toLocaleString("en-IN")}</span>
            </div>
          </div>
        )}

        {/* Size picker - renders nothing if this product has no sizeType */}
        <SizeSelector
          sizeType={product.sizeType}
          selectedSize={selectedSize}
          onSelectSize={(size) => {
            setSelectedSize(size);
            setShowSizeWarning(false);
          }}
          showWarning={showSizeWarning}
        />

        {/* For products that need a size, we always show Add to Cart +
            Buy Now, because each size choice becomes its own separate
            row in the cart. For products with no size, we switch to a
            quantity +/- stepper once it is already in the cart. */}
        {(!cartItem || needsSize) && (
          <div className="button-row">
            <button className="add-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="buy-now-btn" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        )}

        {cartItem && !needsSize && (
          <div className="qty-and-buy">
            <div className="qty-box">
              <button className="qty-btn" onClick={() => onDecrease(product.id, cartItem.size)}>−</button>
              <span className="qty-number">{cartItem.qty}</span>
              <button className="qty-btn" onClick={() => onIncrease(product.id, cartItem.size)}>+</button>
            </div>
            <button className="buy-now-btn" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        )}
      </div>

      {/* Full screen lightbox preview - opens when the main image is clicked */}
      {lightboxOpen && (
        <div className="lightbox-overlay" onClick={() => setLightboxOpen(false)}>
          <button
            className="lightbox-close-btn"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxOpen(false);
            }}
          >
            ✕
          </button>

          <div className="lightbox-image-box" onClick={(e) => e.stopPropagation()}>
            <img className="lightbox-image" src={product.images[activeImageIndex]} alt={product.name} />

            {product.images.length > 1 && (
              <div className="lightbox-thumb-row">
                {product.images.map((imageLink, index) => (
                  <div
                    key={index}
                    className={
                      index === activeImageIndex
                        ? "lightbox-thumb lightbox-thumb-active"
                        : "lightbox-thumb"
                    }
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <img src={imageLink} alt={product.name + " " + (index + 1)} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductCard;