import { useState } from "react";
import "./ProductCard.css";


function ProductCard({ product, cartItem, onAdd, onIncrease, onDecrease, onBuyNow }) {
  const [imageFailed, setImageFailed] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
const [selectedSize, setSelectedSize] = useState("");
  const discountPercent = Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100
  );

  return (
    <div className="product-card">
      <div className="product-image-box" onClick={() => setShowDetails(!showDetails)}>
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

      <div className="product-info">
        <div className="product-category">
          {product.category}
          {product.subCategory ? " · " + product.subCategory : ""}
        </div>
        <div className="product-name">{product.name}</div>
       
        {product.category === "Fashion" && (
  <div style={{ margin: "8px 0" }}>
    <select>
      <option>Select Size</option>
      <option>XS</option>
      <option>S</option>
      <option>M</option>
      <option>L</option>
      <option>XL</option>
      <option>XXL</option>
    </select>
  </div>
)}
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

        {!cartItem && (
          <div className="button-row">
            <button className="add-cart-btn" onClick={() => onAdd(product)}>
              Add to Cart
            </button>
            <button className="buy-now-btn" onClick={() => onBuyNow(product)}>
              Buy Now
            </button>
          </div>
        )}

        {cartItem && (
          <div className="qty-and-buy">
            <div className="qty-box">
              <button className="qty-btn" onClick={() => onDecrease(product.id)}>−</button>
              <span className="qty-number">{cartItem.qty}</span>
              <button className="qty-btn" onClick={() => onIncrease(product.id)}>+</button>
            </div>
            <button className="buy-now-btn" onClick={() => onBuyNow(product)}>
              Buy Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
