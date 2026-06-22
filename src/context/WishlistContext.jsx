import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("shopeasy_wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("shopeasy_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  function toggleWishlist(product) {
    setWishlist((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) return prev.filter((p) => p.id !== product.id);
      return [...prev, product];
    });
  }

  function isWishlisted(productId) {
    return wishlist.some((p) => p.id === productId);
  }

  function removeFromWishlist(productId) {
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
  }

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
