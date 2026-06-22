import { useState } from "react";
import "../components/Pages.css";

function CartPage({
  cart,
  onIncrease,
  onDecrease,
  onRemove,
  setPage,
  appliedCoupon,
  setAppliedCoupon,
  totalItems,
  subtotal,
  discountAmount,
  deliveryCharge,
  grandTotal,
}) {
  const [failedImages, setFailedImages] = useState({});

  function markImageFailed(key) {
    setFailedImages((prev) => ({ ...prev, [key]: true }));
  }

  return (
    <div className="page-wrapper">
      <div className="page-container" style={{ paddingTop: "28px" }}>
        <h2 className="cart-title">🛒 Your Cart</h2>

        {cart.length === 0 && (
          <div className="empty-cart-box">
            <div className="empty-cart-icon">🛒</div>
            <div className="empty-cart-text">Your cart is empty</div>
            <div className="empty-cart-subtext">Add some products to get started</div>
            <button className="btn-blue" onClick={() => setPage("shop")}>Browse Products</button>
          </div>
        )}

        {cart.length > 0 && (
          <div className="cart-layout">
            <div className="cart-items-column">
              {cart.map((item) => {
                // Unique key per (product + size) combination
                const itemKey = item.size ? `${item.id}__${item.size}` : `${item.id}`;
                return (
                  <div key={itemKey} className="cart-item-row">
                    {!failedImages[itemKey] ? (
                      <img
                        className="cart-item-image"
                        src={item.image}
                        alt={item.name}
                        onError={() => markImageFailed(itemKey)}
                      />
                    ) : (
                      <div
                        className="cart-item-image"
                        style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px" }}
                      >
                        🛍️
                      </div>
                    )}

                    <div style={{ flex: "1" }}>
                      <div className="cart-item-name">{item.name}</div>
                      <div className="cart-item-category">
                        {item.category}{item.subCategory ? " · " + item.subCategory : ""}
                      </div>

                      {item.size && (
                        <div className="cart-item-size-badge">
                          Size: <strong>{item.size}</strong>
                        </div>
                      )}

                      <div className="cart-item-price">₹{item.price.toLocaleString("en-IN")}</div>
                    </div>

                    <div className="cart-item-actions">
                      <div className="cart-item-total">
                        ₹{(item.price * item.qty).toLocaleString("en-IN")}
                      </div>
                      <div className="qty-controls">
                        <button className="qty-small-btn" onClick={() => onDecrease(item.id, item.size || null)}>−</button>
                        <span style={{ fontWeight: "700", minWidth: "20px", textAlign: "center" }}>
                          {item.qty}
                        </span>
                        <button className="qty-small-btn" onClick={() => onIncrease(item.id, item.size || null)}>+</button>
                        <button className="remove-btn" onClick={() => onRemove(item.id, item.size || null)}>🗑</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="summary-box">
              <div className="summary-title">Order Summary</div>

              {appliedCoupon && (
                <div className="coupon-applied-box">
                  <div>
                    <div className="coupon-code-text">🎉 {appliedCoupon.code} applied</div>
                    <div className="coupon-discount-text">-{appliedCoupon.discount}% discount</div>
                  </div>
                  <button className="coupon-remove-btn" onClick={() => setAppliedCoupon(null)}>✕</button>
                </div>
              )}

              {!appliedCoupon && (
                <div className="coupon-suggest-box" onClick={() => setPage("offers")}>
                  🏷️ Have a coupon? View Offers
                </div>
              )}

              <div className="summary-line">
                <span>Subtotal ({totalItems} items)</span>
                <span style={{ fontWeight: "600" }}>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>

              {discountAmount > 0 && (
                <div className="summary-line">
                  <span style={{ color: "#047857" }}>Discount</span>
                  <span style={{ fontWeight: "700", color: "#047857" }}>
                    - ₹{discountAmount.toLocaleString("en-IN")}
                  </span>
                </div>
              )}

              <div className="summary-line">
                <span>Delivery</span>
                <span style={{ fontWeight: "600", color: deliveryCharge === 0 ? "#047857" : "#1e1b3a" }}>
                  {deliveryCharge === 0 ? "FREE" : "₹" + deliveryCharge}
                </span>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-total-line">
                <span>Total</span>
                <span style={{ color: "#3730a3" }}>₹{grandTotal.toLocaleString("en-IN")}</span>
              </div>

              <button className="proceed-btn" onClick={() => setPage("order")}>
                Proceed to Order →
              </button>

              <button className="continue-shopping-btn" onClick={() => setPage("shop")}>
                ← Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
