import "../Components/Pages.css";
function OffersPage({ offers, setPage, setAppliedCoupon, setFilterCategory, setFilterSubCategory }) {

  function applyOffer(offer) {
    setAppliedCoupon(offer);
    setFilterCategory("All");
    setFilterSubCategory("All");
    setPage("cart");
  }

  function browseShop() {
    setFilterCategory("All");
    setFilterSubCategory("All");
    setPage("shop");
  }

  return (
    <div className="page-wrapper">
      <div className="offers-hero">
        <h1 style={{ fontSize: "34px", fontWeight: "800", margin: "0 0 10px" }}>
          🔥 Today's Best Offers
        </h1>
        <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.9)", margin: "0" }}>
          Apply a coupon code at checkout to save money
        </p>
      </div>

      <div className="offers-grid">
        {offers.map((offer) => (
          <div key={offer.id} className="offer-card">
            <div className="offer-top" style={{ background: offer.bg }}>
              <div className="offer-emoji">{offer.emoji}</div>
              <div className="offer-title">{offer.title}</div>
              <div className="offer-desc">{offer.desc}</div>
              <div className="offer-code-row">
                <div className="offer-code">{offer.code}</div>
                <span className="offer-percent">{offer.discount}% OFF</span>
              </div>
            </div>

            <div className="offer-bottom">
              <button className="offer-btn offer-btn-primary" onClick={() => applyOffer(offer)}>
                Apply & Shop
              </button>
              <button className="offer-btn offer-btn-secondary" onClick={browseShop}>
                Browse Shop
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OffersPage;
