import { useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import WishlistPage from "./pages/WishlistPage";
import OffersPage from "./pages/OffersPage";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import SuccessPage from "./pages/SuccessPage";

import products from "./data/products";
import offers from "./data/offers";
import categories from "./data/categories";

function App() {
  // -----------------------------------------
  // STATE
  // -----------------------------------------

  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterSubCategory, setFilterSubCategory] = useState("All");
  const [filterRating, setFilterRating] = useState(0);
  const [filterPrice, setFilterPrice] = useState("All");
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [payment, setPayment] = useState("cod");
  const [formErrors, setFormErrors] = useState({});

  const [orderId, setOrderId] = useState("");

  // -----------------------------------------
  // -----------------------------------------
  // WISHLIST FUNCTION
  // -----------------------------------------
  //
  // The wishlist is a simple list of products the user marked with the
  // heart ❤️ icon. Unlike the cart, a wishlist item does NOT need a size
  // or quantity - it is just "I am interested in this product."
  //
  // toggleWishlist works like a light switch: if the product is already
  // in the wishlist, clicking the heart again REMOVES it. If it is not
  // in the wishlist yet, clicking the heart ADDS it.

  function toggleWishlist(product) {
    const alreadyInWishlist = wishlist.find((item) => item.id === product.id);

    if (alreadyInWishlist) {
      const updatedWishlist = wishlist.filter((item) => item.id !== product.id);
      setWishlist(updatedWishlist);
    } else {
      setWishlist([...wishlist, product]);
    }
  }

  // -----------------------------------------
  // CART FUNCTIONS  (Key Feature: Add/remove from cart)
  // -----------------------------------------
  //
  // IMPORTANT CHANGE FOR THE SIZE FEATURE:
  // A product can now be added with a size (for clothes/shoes) or
  // without one (for everything else). Because of this, two cart rows
  // with the SAME product id but a DIFFERENT size must be treated as
  // two separate cart lines (example: "Boys Shirt - size M" and
  // "Boys Shirt - size L" are two rows, not one). To do this, every
  // function below matches a cart row using BOTH id AND size together.

  function addToCart(product, size) {
    const alreadyInCart = cart.find(
      (item) => item.id === product.id && item.size === size
    );

    if (alreadyInCart) {
      const updatedCart = cart.map((item) => {
        if (item.id === product.id && item.size === size) {
          return { ...item, qty: item.qty + 1 };
        }
        return item;
      });
      setCart(updatedCart);
    } else {
      // size will be undefined for products that don't need a size,
      // which is fine - it just won't show up on the cart page.
      setCart([...cart, { ...product, qty: 1, size: size }]);
    }
  }

  // "Buy Now" adds the product to the cart (same as Add to Cart) and
  // then immediately jumps to the checkout page, skipping the cart page.
  function buyNow(product, size) {
    const alreadyInCart = cart.find(
      (item) => item.id === product.id && item.size === size
    );

    if (alreadyInCart) {
      const updatedCart = cart.map((item) => {
        if (item.id === product.id && item.size === size) {
          return { ...item, qty: item.qty + 1 };
        }
        return item;
      });
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, qty: 1, size: size }]);
    }

    setPage("order");
  }

  // Key Feature: Quantity management
  function increaseQty(id, size) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.size === size) {
        return { ...item, qty: item.qty + 1 };
      }
      return item;
    });
    setCart(updatedCart);
  }

  function decreaseQty(id, size) {
    const item = cart.find((item) => item.id === id && item.size === size);

    if (item.qty === 1) {
      const updatedCart = cart.filter(
        (item) => !(item.id === id && item.size === size)
      );
      setCart(updatedCart);
    } else {
      const updatedCart = cart.map((item) => {
        if (item.id === id && item.size === size) {
          return { ...item, qty: item.qty - 1 };
        }
        return item;
      });
      setCart(updatedCart);
    }
  }

  function removeFromCart(id, size) {
    const updatedCart = cart.filter((item) => !(item.id === id && item.size === size));
    setCart(updatedCart);
  }

  // -----------------------------------------
  // PRICE CALCULATIONS  (Key Feature: Total price calculation)
  // -----------------------------------------

  let totalItems = 0;
  for (let i = 0; i < cart.length; i++) {
    totalItems = totalItems + cart[i].qty;
  }

  let subtotal = 0;
  for (let i = 0; i < cart.length; i++) {
    subtotal = subtotal + cart[i].price * cart[i].qty;
  }

  let discountAmount = 0;
  if (appliedCoupon) {
    discountAmount = Math.round((subtotal * appliedCoupon.discount) / 100);
  }

  let deliveryCharge = 199;
  if (subtotal > 1000) {
    deliveryCharge = 0;
  }

  const grandTotal = subtotal - discountAmount + deliveryCharge;

  // -----------------------------------------
  // CHECKOUT FORM VALIDATION
  // -----------------------------------------

  function validateForm() {
    const errors = {};

    if (name.trim() === "") errors.name = "Please enter your name";
    if (!email.includes("@")) errors.email = "Please enter a valid email";
    if (phone.length !== 10) errors.phone = "Phone must be 10 digits";
    if (address.trim() === "") errors.address = "Please enter your address";
    if (city.trim() === "") errors.city = "Please enter your city";
    if (pincode.length !== 6) errors.pincode = "Pincode must be 6 digits";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function placeOrder() {
    const isFormValid = validateForm();

    if (isFormValid) {
      const randomNumber = Math.floor(Math.random() * 90000000) + 10000000;
      const newOrderId = "ORD" + randomNumber;
      setOrderId(newOrderId);

      setCart([]);
      setAppliedCoupon(null);

      setPage("done");
    }
  }

  function resetFormAndGoShopping() {
    setPage("shop");
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setCity("");
    setPincode("");
    setPayment("cod");
  }

  // -----------------------------------------
  // PAGE RENDERING
  // -----------------------------------------

  return (
    <div>
      <Header
        page={page}
        setPage={setPage}
        search={search}
        setSearch={setSearch}
        totalItems={totalItems}
        wishlistCount={wishlist.length}
        products={products}
      />

      {page === "home" && (
        <HomePage
          products={products}
          categories={categories}
          cart={cart}
          wishlist={wishlist}
          onAdd={addToCart}
          onIncrease={increaseQty}
          onDecrease={decreaseQty}
          onBuyNow={buyNow}
          onToggleWishlist={toggleWishlist}
          setPage={setPage}
          setFilterCategory={setFilterCategory}
          setFilterSubCategory={setFilterSubCategory}
          setSearch={setSearch}
        />
      )}

      {page === "shop" && (
        <ShopPage
          products={products}
          categories={categories}
          cart={cart}
          wishlist={wishlist}
          onAdd={addToCart}
          onIncrease={increaseQty}
          onDecrease={decreaseQty}
          onBuyNow={buyNow}
          onToggleWishlist={toggleWishlist}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          filterSubCategory={filterSubCategory}
          setFilterSubCategory={setFilterSubCategory}
          filterRating={filterRating}
          setFilterRating={setFilterRating}
          filterPrice={filterPrice}
          setFilterPrice={setFilterPrice}
          search={search}
        />
      )}

      {page === "wishlist" && (
        <WishlistPage
          wishlist={wishlist}
          cart={cart}
          onAdd={addToCart}
          onIncrease={increaseQty}
          onDecrease={decreaseQty}
          onBuyNow={buyNow}
          onToggleWishlist={toggleWishlist}
          setPage={setPage}
        />
      )}

      {page === "offers" && (
        <OffersPage
          offers={offers}
          setPage={setPage}
          setAppliedCoupon={setAppliedCoupon}
          setFilterCategory={setFilterCategory}
          setFilterSubCategory={setFilterSubCategory}
        />
      )}

      {page === "cart" && (
        <CartPage
          cart={cart}
          onIncrease={increaseQty}
          onDecrease={decreaseQty}
          onRemove={removeFromCart}
          setPage={setPage}
          appliedCoupon={appliedCoupon}
          setAppliedCoupon={setAppliedCoupon}
          totalItems={totalItems}
          subtotal={subtotal}
          discountAmount={discountAmount}
          deliveryCharge={deliveryCharge}
          grandTotal={grandTotal}
        />
      )}

      {page === "order" && (
        <OrderPage
          setPage={setPage}
          name={name} setName={setName}
          email={email} setEmail={setEmail}
          phone={phone} setPhone={setPhone}
          address={address} setAddress={setAddress}
          city={city} setCity={setCity}
          pincode={pincode} setPincode={setPincode}
          payment={payment} setPayment={setPayment}
          formErrors={formErrors}
          totalItems={totalItems}
          subtotal={subtotal}
          discountAmount={discountAmount}
          appliedCoupon={appliedCoupon}
          deliveryCharge={deliveryCharge}
          grandTotal={grandTotal}
          onPlaceOrder={placeOrder}
        />
      )}

      {page === "done" && (
        <SuccessPage
          orderId={orderId}
          name={name}
          email={email}
          payment={payment}
          address={address}
          city={city}
          pincode={pincode}
          grandTotal={grandTotal}
          setPage={setPage}
          onContinueShopping={resetFormAndGoShopping}
        />
      )}

      <Footer
        setPage={setPage}
        setFilterCategory={setFilterCategory}
        setFilterSubCategory={setFilterSubCategory}
        setSearch={setSearch}
      />
    </div>
  );
}

export default App;