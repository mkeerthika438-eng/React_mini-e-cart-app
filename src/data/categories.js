// Main categories shown on the home page and in the Shop page filter.
// Some categories have "subCategories" (like Fashion -> Boys/Girls/Kids).
// A product's "category" field should match one of these names,
// and if it has a subCategory, the "subCategory" field should match too.

const categories = [
  {
    name: "Fashion",
    icon: "👕",
    color: "#FDF2F8",
    subCategories: ["Boys", "Girls", "Kids"],
  },
  { name: "Mobiles", icon: "📱", color: "#EEF2FF" },
  { name: "Electronics", icon: "💻", color: "#F5F3FF" },
  { name: "Beauty", icon: "💄", color: "#FFF1F2" },
  { name: "Home Appliances", icon: "🏠", color: "#ECFDF5" },
  { name: "Toys", icon: "🧸", color: "#FEFCE8" },
  { name: "Food", icon: "🍔", color: "#FFF7ED" },
  { name: "Healthcare", icon: "💊", color: "#F0FDFA" },
  { name: "Grocery", icon: "🛒", color: "#F7FEE7" },
  { name: "Sports & Equipment", icon: "🏏", color: "#EFF6FF" },
  { name: "Books", icon: "📚", color: "#FAF5FF" },
  { name: "Furniture", icon: "🛋️", color: "#FDF4FF" },
];

export default categories;
