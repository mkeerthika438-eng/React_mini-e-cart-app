import { useState } from "react";
import { WishlistProvider } from "./context/WishlistContext";

import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import OffersPage from "./pages/OffersPage";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import SuccessPage from "./pages/SuccessPage";
import WishlistPage from "./pages/WishlistPage";

import products from "./data/products";
import offers from "./data/offers";
import categories from "./data/categories";

function AppInner() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterSubCategory, setFilterSubCategory] = useState("All");
  const [filterRating, setFilterRating] = useState(0);
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

  // ---- Cart functions ----
  // size is passed for Fashion products, null for all others.
  // Cart items are uniquely identified by (id, size) — so the same
  // product in two different sizes appears as two separate cart rows.
  function cartKey(id, size) {
    return size ? `${id}__${size}` : `${id}`;
  }

  function addToCart(product, size = null) {
    setCart((prev) => {
      const key = cartKey(product.id, size);
      const exists = prev.find((i) => cartKey(i.id, i.size) === key);
      if (exists) {
        return prev.map((i) => cartKey(i.id, i.size) === key ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...product, size, qty: 1 }];
    });
  }

  function buyNow(product, size = null) {
    addToCart(product, size);
    setPage("order");
  }

  function increaseQty(id, size = null) {
    const key = cartKey(id, size);
    setCart((prev) => prev.map((i) => cartKey(i.id, i.size) === key ? { ...i, qty: i.qty + 1 } : i));
  }

  function decreaseQty(id, size = null) {
    const key = cartKey(id, size);
    setCart((prev) => {
      const item = prev.find((i) => cartKey(i.id, i.size) === key);
      if (!item) return prev;
      if (item.qty === 1) return prev.filter((i) => cartKey(i.id, i.size) !== key);
      return prev.map((i) => cartKey(i.id, i.size) === key ? { ...i, qty: i.qty - 1 } : i);
    });
  }

  function removeFromCart(id, size = null) {
    const key = cartKey(id, size);
    setCart((prev) => prev.filter((i) => cartKey(i.id, i.size) !== key));
  }

  // ---- Calculations ----
  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const discountAmount = appliedCoupon ? Math.round((subtotal * appliedCoupon.discount) / 100) : 0;
  const deliveryCharge = subtotal > 1000 ? 0 : 199;
  const grandTotal = subtotal - discountAmount + deliveryCharge;

  // ---- Order / form ----
  function validateForm() {
    const errors = {};
    if (!name.trim()) errors.name = "Please enter your name";
    if (!email.includes("@")) errors.email = "Please enter a valid email";
    if (phone.length !== 10) errors.phone = "Phone must be 10 digits";
    if (!address.trim()) errors.address = "Please enter your address";
    if (!city.trim()) errors.city = "Please enter your city";
    if (pincode.length !== 6) errors.pincode = "Pincode must be 6 digits";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function placeOrder() {
    if (validateForm()) {
      setOrderId("ORD" + (Math.floor(Math.random() * 90000000) + 10000000));
      setCart([]);
      setAppliedCoupon(null);
      setPage("done");
    }
  }

  function resetFormAndGoShopping() {
    setPage("shop");
    setName(""); setEmail(""); setPhone(""); setAddress(""); setCity(""); setPincode(""); setPayment("cod");
  }

  // When user clicks search suggestion → go to shop with search pre-filled
  function handleHeaderPreview(product) {
    setSearch(product.name);
    setPage("shop");
  }

  return (
    <div>
      <Header
        page={page}
        setPage={setPage}
        search={search}
        setSearch={setSearch}
        totalItems={totalItems}
        products={products}
        onPreview={handleHeaderPreview}
      />

      {page === "home" && (
        <HomePage
          products={products}
          categories={categories}
          cart={cart}
          onAdd={addToCart}
          onIncrease={increaseQty}
          onDecrease={decreaseQty}
          onBuyNow={buyNow}
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
          onAdd={addToCart}
          onIncrease={increaseQty}
          onDecrease={decreaseQty}
          onBuyNow={buyNow}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          filterSubCategory={filterSubCategory}
          setFilterSubCategory={setFilterSubCategory}
          filterRating={filterRating}
          setFilterRating={setFilterRating}
          search={search}
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

      {page === "wishlist" && (
        <WishlistPage
          onAdd={addToCart}
          setPage={setPage}
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

function App() {
  return (
    <WishlistProvider>
      <AppInner />
    </WishlistProvider>
  );
}

export default App;
