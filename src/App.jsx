import { useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import OffersPage from "./pages/OffersPage";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import SuccessPage from "./pages/SuccessPage";

import products from "./data/Products";
import offers from "./data/offers";
import categories from "./data/categories";

function App() {

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
  function addToCart(product) {
    const alreadyInCart = cart.find((item) => item.id === product.id);

    if (alreadyInCart) {
      const updatedCart = cart.map((item) => {
        if (item.id === product.id) {
          return { ...item, qty: item.qty + 1 };
        }
        return item;
      });
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  }


  function buyNow(product) {
    const alreadyInCart = cart.find((item) => item.id === product.id);

    if (alreadyInCart) {
      const updatedCart = cart.map((item) => {
        if (item.id === product.id) {
          return { ...item, qty: item.qty + 1 };
        }
        return item;
      });
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }

    setPage("order");
  }

  function increaseQty(id) {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        return { ...item, qty: item.qty + 1 };
      }
      return item;
    });
    setCart(updatedCart);
  }

  function decreaseQty(id) {
    const item = cart.find((item) => item.id === id);

    if (item.qty === 1) {
      const updatedCart = cart.filter((item) => item.id !== id);
      setCart(updatedCart);
    } else {
      const updatedCart = cart.map((item) => {
        if (item.id === id) {
          return { ...item, qty: item.qty - 1 };
        }
        return item;
      });
      setCart(updatedCart);
    }
  }

  function removeFromCart(id) {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  }

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

  
  return (
    <div>
      <Header
        page={page}
        setPage={setPage}
        search={search}
        setSearch={setSearch}
        totalItems={totalItems}
        products={products}
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
