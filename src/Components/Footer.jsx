import "./Footer.css";

function Footer({ setPage, setFilterCategory, setFilterSubCategory, setSearch }) {
  const categoryList = [
    "Fashion",
    "Mobiles",
    "Electronics",
    "Beauty",
    "Home Appliances",
    "Toys",
    "Sports & Equipment",
    "Books",
  ];

  const helpList = ["Track Order", "Returns", "FAQs", "Contact Us"];

  function goToCategory(categoryName) {
    setFilterCategory(categoryName);
    setFilterSubCategory("All");
    setSearch("");
    setPage("shop");
  }

  
  function handleHelpClick(linkName) {
    alert(linkName + " page is coming soon!");
  }

  return (
    <div className="footer">
      <div className="footer-columns">
        <div>
          <div className="footer-logo">🛍️ ShopEasy</div>
          <p className="footer-text">
            India's trusted online store for fashion, electronics, groceries
            and more. Best prices, genuine products.
          </p>
        </div>

        <div>
          <div className="footer-heading">Categories</div>
          {categoryList.map((cat) => (
            <div key={cat} className="footer-link" onClick={() => goToCategory(cat)}>
              {cat}
            </div>
          ))}
        </div>

        <div>
          <div className="footer-heading">Help</div>
          {helpList.map((link) => (
            <div key={link} className="footer-link" onClick={() => handleHelpClick(link)}>
              {link}
            </div>
          ))}
        </div>

        <div>
          <div className="footer-heading">Contact</div>
          <div className="footer-text">📞 1800-000-SHOP</div>
          <div className="footer-text">📧 support@shopeasy.in</div>
          <div className="footer-text">📍 Chennai, Tamil Nadu</div>
        </div>
      </div>

      <div className="footer-bottom">
        © 2025 ShopEasy. All rights reserved. Made with ❤️ in India.
      </div>
    </div>
  );
}

export default Footer;
