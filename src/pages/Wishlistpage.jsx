import ProductCard from "../components/ProductCard";
import "../components/Pages.css";

// This is the WISHLIST page - shows every product the user marked with
// the heart ❤️ icon on a product card. It reuses the same ProductCard
// component used on Home and Shop, so Add to Cart / Buy Now / sizes all
// keep working exactly the same way here.

function WishlistPage({ wishlist, cart, onAdd, onIncrease, onDecrease, onBuyNow, onToggleWishlist, setPage }) {
  return (
    <div className="page-wrapper">
      <div className="page-container" style={{ paddingTop: "28px" }}>
        <h2 className="cart-title">❤️ Your Wishlist</h2>

        {wishlist.length === 0 && (
          <div className="empty-cart-box">
            <div className="empty-cart-icon">💔</div>
            <div className="empty-cart-text">Your wishlist is empty</div>
            <div className="empty-cart-subtext">Tap the heart icon on any product to save it here</div>
            <button className="btn-blue" onClick={() => setPage("shop")}>Browse Products</button>
          </div>
        )}

        {wishlist.length > 0 && (
          <div className="product-grid" style={{ paddingBottom: "44px" }}>
            {wishlist.map((product) => {
              const cartItem = cart.find((item) => item.id === product.id);
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  cartItem={cartItem}
                  onAdd={onAdd}
                  onIncrease={onIncrease}
                  onDecrease={onDecrease}
                  onBuyNow={onBuyNow}
                  isWishlisted={true}
                  onToggleWishlist={onToggleWishlist}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default WishlistPage;