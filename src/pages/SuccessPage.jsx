import "../components/Pages.css";

function SuccessPage({ orderId, name, email, payment, address, city, pincode, grandTotal, setPage, onContinueShopping }) {
  let paymentText = "Cash on Delivery";
  if (payment === "upi") paymentText = "UPI / Net Banking";
  if (payment === "card") paymentText = "Card";

  return (
    <div className="page-wrapper">
      <div className="success-container">
        <div className="success-box">
          <div className="success-icon">🎉</div>
          <h2 className="success-title">Order Placed Successfully!</h2>
          <div className="success-subtitle">
            Thank you, <strong>{name}</strong>! Your order is confirmed.
          </div>

          <div className="success-details-box">
            <div className="success-detail-line">
              <span style={{ fontSize: "13px", color: "#6B7280" }}>Order ID</span>
              <span style={{ fontWeight: "800", fontFamily: "monospace", fontSize: "14px" }}>#{orderId}</span>
            </div>
            <div className="success-detail-line">
              <span style={{ fontSize: "13px", color: "#6B7280" }}>Payment</span>
              <span style={{ fontWeight: "700" }}>{paymentText}</span>
            </div>
            <div className="success-detail-line">
              <span style={{ fontSize: "13px", color: "#6B7280" }}>Deliver to</span>
              <span style={{ fontWeight: "600", fontSize: "13px", textAlign: "right", maxWidth: "60%" }}>
                {address}, {city} - {pincode}
              </span>
            </div>
            <div className="success-detail-line" style={{ marginBottom: "0" }}>
              <span style={{ fontSize: "13px", color: "#6B7280" }}>Amount Paid</span>
              <span style={{ fontWeight: "800", fontSize: "16px", color: "#3730a3" }}>
                ₹{grandTotal.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          <div className="success-email-note">📧 Confirmation sent to <strong>{email}</strong></div>

          <div className="success-buttons">
            <button className="btn-blue" onClick={onContinueShopping}>Continue Shopping</button>
            <button className="btn-gray" onClick={() => setPage("home")}>Go to Home</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;
