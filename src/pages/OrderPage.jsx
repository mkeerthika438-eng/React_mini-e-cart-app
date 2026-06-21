import "../components/Pages.css";
function OrderPage(
    {
setPage,
name, setName,
  email, setEmail,
  phone, setPhone,
  address, setAddress,
  city, setCity,
  pincode, setPincode,
  payment, setPayment,
  formErrors,
  totalItems,
  subtotal,
  discountAmount,
  appliedCoupon,
  deliveryCharge,
  grandTotal,
  onPlaceOrder,
}) {
  return (
    <div className="page-wrapper">
      <div className="order-page-container">
        <button className="back-link" onClick={() => setPage("cart")}>← Back to Cart</button>

        <h2 className="order-title">📦 Delivery Details</h2>

        <div className="order-form-box">
          <div className="form-section-title">Contact Information</div>

          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input
              className={formErrors.name ? "form-input form-input-error" : "form-input"}
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {formErrors.name && <div className="error-text">{formErrors.name}</div>}
          </div>

          <div className="form-row">
            <div className="form-half">
              <label className="form-label">Email *</label>
              <input
                className={formErrors.email ? "form-input form-input-error" : "form-input"}
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {formErrors.email && <div className="error-text">{formErrors.email}</div>}
            </div>

            <div className="form-half">
              <label className="form-label">Phone *</label>
              <input
                className={formErrors.phone ? "form-input form-input-error" : "form-input"}
                type="text"
                placeholder="10-digit number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {formErrors.phone && <div className="error-text">{formErrors.phone}</div>}
            </div>
          </div>

          <div className="form-section-title">Delivery Address</div>

          <div className="form-group">
            <label className="form-label">Full Address *</label>
            <input
              className={formErrors.address ? "form-input form-input-error" : "form-input"}
              type="text"
              placeholder="House no, Street, Area"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {formErrors.address && <div className="error-text">{formErrors.address}</div>}
          </div>

          <div className="form-row">
            <div className="form-half">
              <label className="form-label">City *</label>
              <input
                className={formErrors.city ? "form-input form-input-error" : "form-input"}
                type="text"
                placeholder="Chennai"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              {formErrors.city && <div className="error-text">{formErrors.city}</div>}
            </div>

            <div className="form-half">
              <label className="form-label">Pincode *</label>
              <input
                className={formErrors.pincode ? "form-input form-input-error" : "form-input"}
                type="text"
                placeholder="600001"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
              {formErrors.pincode && <div className="error-text">{formErrors.pincode}</div>}
            </div>
          </div>

          <div className="form-section-title">Payment Method</div>

          <div
            className={payment === "cod" ? "payment-option payment-option-selected" : "payment-option"}
            onClick={() => setPayment("cod")}
          >
            <input type="radio" checked={payment === "cod"} onChange={() => setPayment("cod")} />
            <div>
              <div className="payment-option-title">💵 Cash on Delivery</div>
              <div className="payment-option-desc">Pay when your order arrives</div>
            </div>
          </div>

          <div
            className={payment === "upi" ? "payment-option payment-option-selected" : "payment-option"}
            onClick={() => setPayment("upi")}
          >
            <input type="radio" checked={payment === "upi"} onChange={() => setPayment("upi")} />
            <div>
              <div className="payment-option-title">📱 UPI / Net Banking</div>
              <div className="payment-option-desc">Google Pay, PhonePe, Paytm</div>
            </div>
          </div>

          <div
            className={payment === "card" ? "payment-option payment-option-selected" : "payment-option"}
            onClick={() => setPayment("card")}
            style={{ marginBottom: "26px" }}
          >
            <input type="radio" checked={payment === "card"} onChange={() => setPayment("card")} />
            <div>
              <div className="payment-option-title">💳 Credit / Debit Card</div>
              <div className="payment-option-desc">All major cards accepted</div>
            </div>
          </div>

          <div className="price-summary-box">
            <div className="price-summary-line">
              <span>{totalItems} items</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>

            {discountAmount > 0 && (
              <div className="price-summary-line">
                <span style={{ color: "#047857" }}>Discount ({appliedCoupon.code})</span>
                <span style={{ color: "#047857" }}>- ₹{discountAmount.toLocaleString("en-IN")}</span>
              </div>
            )}

            <div className="price-summary-line">
              <span>Delivery</span>
              <span style={{ color: deliveryCharge === 0 ? "#047857" : "#1e1b3a" }}>
                {deliveryCharge === 0 ? "FREE" : "₹" + deliveryCharge}
              </span>
            </div>

            <div className="price-summary-total">
              <span>Total Payable</span>
              <span style={{ color: "#3730a3" }}>₹{grandTotal.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <button className="place-order-btn" onClick={onPlaceOrder}>
            ✅ Place Order · ₹{grandTotal.toLocaleString("en-IN")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
