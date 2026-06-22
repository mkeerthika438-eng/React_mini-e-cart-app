function SizeSelector({
  sizeType,
  selectedSize,
  onSelectSize,
  showWarning,
}) {
  if (!sizeType) return null;

  const sizes =
    sizeType === "shoe"
      ? [6, 7, 8, 9, 10]
      : ["S", "M", "L", "XL"];

  return (
    <div>
      <div className="size-row">
        {sizes.map((size) => (
          <button
            key={size}
            type="button"
            onClick={() => onSelectSize(size)}
            className={selectedSize === size ? "size-active" : ""}
          >
            {size}
          </button>
        ))}
      </div>

      {showWarning && (
        <p>Please select a size</p>
      )}
    </div>
  );
}

export default SizeSelector;