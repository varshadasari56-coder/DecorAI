import {
  ArrowLeft,
  Upload,
  Image as ImageIcon,
  Sparkles,
  ShoppingCart,
} from "lucide-react";
import { useEffect, useState } from "react";
import products from "../data/products";
import { getAvailableProducts } from "../services/productService";

function AIAnalyzer() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [matchedProducts, setMatchedProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    localStorage.setItem("decorai-cart", JSON.stringify(cart));
  }, [cart]);

  const findMatchingProducts = (shoppingList) => {
    const matches = [];
    const availableProducts = getAvailableProducts();

    shoppingList.forEach((item) => {
      const itemColor = item.color?.toLowerCase().trim() || "";
      const itemCategory = item.category?.toLowerCase().trim() || "";
      const itemStyle = item.style?.toLowerCase().trim() || "";
      const itemName = item.itemName?.toLowerCase().trim() || "";

      const matchingProducts = availableProducts
        .filter((product) => product.availability)
        .map((product) => {
          const productCategory = product.category.toLowerCase();
          const productColors = product.colors.map((color) =>
            color.toLowerCase()
          );
          const productStyle = product.style.toLowerCase();
          const productName = product.name.toLowerCase();

          let score = 0;

          // CATEGORY MATCH
          if (
            productCategory === itemCategory ||
            productCategory.includes(itemCategory) ||
            itemCategory.includes(productCategory) ||
            (itemCategory.includes("balloon") &&
              productCategory.includes("balloon"))
          ) {
            score += 50;
          }

          // COLOR MATCH
          const colorMatch = productColors.some(
            (color) =>
              itemColor.includes(color) ||
              color.includes(itemColor)
          );

          if (colorMatch) {
            score += 30;
          }

          // STYLE MATCH
          if (
            itemStyle &&
            (productStyle.includes(itemStyle) ||
              itemStyle.includes(productStyle))
          ) {
            score += 20;
          }

          // PRODUCT NAME MATCH
          const nameWords = itemName.split(" ");

          const nameMatch = nameWords.some(
            (word) =>
              word.length > 3 &&
              productName.includes(word)
          );

          if (nameMatch) {
            score += 10;
          }

          return {
            product,
            score,
          };
        })
        .filter((item) => item.score >= 50)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .map((item) => item.product);

      matches.push({
        requirement: item,
        products: matchingProducts,
      });
    });

    return matches;
  };

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
              ...item,
              quantity: item.quantity + 1,
            }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  const increaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId
          ? {
            ...item,
            quantity: item.quantity + 1,
          }
          : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? {
              ...item,
              quantity: item.quantity - 1,
            }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
    setAnalysis("");
    setError("");
  };

  return (
    <main className="min-h-screen bg-[#f8f7ff]">

      {/* Header */}
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center px-5 py-5 lg:px-8">

          <a
            href="/"
            className="flex items-center gap-2"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-sm font-bold text-white">
              D
            </div>

            <span className="text-xl font-bold tracking-tight text-gray-900">
              Decor<span className="text-violet-600">AI</span>
            </span>
          </a>

          <button
            type="button"
            onClick={() => {
              document
                .getElementById("cart-section")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="relative ml-auto flex items-center gap-2 rounded-xl bg-violet-50 px-4 py-2.5 text-sm font-bold text-violet-700 transition hover:bg-violet-100"
          >
            <ShoppingCart size={18} />
            Cart

            {cart.length > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-violet-600 px-1 text-xs text-white">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </button>

        </div>
      </div>

      {/* Main */}
      <div className="mx-auto max-w-5xl px-5 py-12 lg:px-8">

        {/* Back */}
        <a
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-violet-600"
        >
          <ArrowLeft size={16} />
          Back to Home
        </a>

        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">

          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
            <Sparkles size={26} />
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-[#171536] sm:text-4xl">
            Turn Your Inspiration Into a Plan
          </h1>

          <p className="mt-4 text-sm leading-6 text-gray-500 sm:text-base">
            Upload a decoration image and let DecorAI analyze the
            style, colors, theme, and decoration elements.
          </p>

        </div>

        {/* Upload Card */}
        <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

          {!preview ? (
            <label
              htmlFor="decorationImage"
              className="flex min-h-[320px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-violet-200 bg-violet-50/40 px-6 text-center transition hover:border-violet-400 hover:bg-violet-50"
            >

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
                <Upload size={28} />
              </div>

              <h2 className="mt-5 text-lg font-bold text-gray-900">
                Upload your decoration image
              </h2>

              <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
                Choose an image from your device to get an
                AI-powered decoration analysis.
              </p>

              <span className="mt-5 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-violet-100">
                Choose Image
              </span>

              <input
                id="decorationImage"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleImageChange}
                className="hidden"
              />

              <p className="mt-4 text-xs text-gray-400">
                PNG, JPG or WEBP
              </p>

            </label>
          ) : (
            <div>

              {/* Image Preview */}
              <div className="relative overflow-hidden rounded-2xl bg-gray-100">

                <img
                  src={preview}
                  alt="Selected decoration"
                  className="max-h-[500px] w-full object-contain"
                />

              </div>

              {/* Selected file */}
              <div className="mt-5 flex items-center gap-3 rounded-xl bg-violet-50 p-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                  <ImageIcon size={19} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-900">
                    {selectedImage?.name}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Image selected successfully
                  </p>
                </div>

              </div>

              {/* Analyze Button */}
              {/* Analyze Button */}
              <button
                type="button"
                disabled={loading}
                onClick={() => {
                  if (!selectedImage) {
                    return;
                  }

                  setLoading(true);
                  setError("");
                  setAnalysis("");

                  const reader = new FileReader();

                  reader.onloadend = async () => {
                    try {
                      const base64Image = reader.result;

                      const response = await fetch(
                        "http://localhost:5000/api/ai/analyze",
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            image: base64Image,
                          }),
                        }
                      );

                      const data = await response.json();

                      console.log("AI response:", data);

                      if (!response.ok) {
                        throw new Error(data.message || "AI analysis failed");
                      }

                      setAnalysis(data.analysis);

                      const matches = findMatchingProducts(data.analysis.shoppingList);

                      setMatchedProducts(matches);
                    } catch (error) {
                      console.error("AI analysis error:", error);
                      setError(error.message || "Something went wrong");
                    } finally {
                      setLoading(false);
                    }
                  };

                  reader.readAsDataURL(selectedImage);
                }}
                className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-violet-600 text-sm font-bold text-white shadow-lg shadow-violet-100 transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Sparkles size={18} />
                {loading ? "Analyzing..." : "Analyze With AI"}
              </button>

              {error && (
                <p className="mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-600">
                  {error}
                </p>
              )}

              {analysis && (
                <div className="mt-8 space-y-6">

                  {/* AI Summary */}
                  <div className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm">

                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-xl">
                        ✨
                      </div>

                      <div>
                        <h2 className="text-xl font-bold text-[#171536]">
                          AI Decoration Analysis
                        </h2>

                        <p className="text-sm text-gray-500">
                          Here's what DecorAI found in your inspiration image.
                        </p>
                      </div>
                    </div>

                    {/* Theme */}
                    <div className="mt-6">
                      <p className="text-xs font-bold uppercase tracking-wide text-violet-600">
                        Decoration Theme
                      </p>

                      <p className="mt-1 text-lg font-bold text-gray-900">
                        {analysis.theme}
                      </p>
                    </div>

                    {/* Colors */}
                    <div className="mt-5">
                      <p className="text-xs font-bold uppercase tracking-wide text-violet-600">
                        Color Palette
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {analysis.colors?.map((color, index) => (
                          <span
                            key={index}
                            className="rounded-full bg-violet-50 px-3 py-1.5 text-sm font-medium text-violet-700"
                          >
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Decoration Elements */}
                    <div className="mt-5">
                      <p className="text-xs font-bold uppercase tracking-wide text-violet-600">
                        Decoration Elements
                      </p>

                      <ul className="mt-3 space-y-2">
                        {analysis.decorationElements?.map((element, index) => (
                          <li
                            key={index}
                            className="text-sm text-gray-600"
                          >
                            • {element}
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* Shopping List */}
                  <div className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm">

                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-bold text-[#171536]">
                          What You Need
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                          Items identified by AI for recreating this decoration.
                        </p>
                      </div>

                      <span className="rounded-full bg-violet-100 px-3 py-1 text-sm font-bold text-violet-700">
                        {analysis.shoppingList?.length || 0} items
                      </span>
                    </div>

                    <div className="mt-5 space-y-3">
                      {analysis.shoppingList?.map((item, index) => (
                        <div
                          key={index}
                          className="rounded-xl bg-gray-50 p-4"
                        >
                          <div className="flex items-start justify-between gap-4">

                            <div>
                              <h3 className="font-bold text-gray-900">
                                {item.itemName}
                              </h3>

                              <p className="mt-1 text-sm text-gray-500">
                                {item.description}
                              </p>

                              <div className="mt-2 flex flex-wrap gap-2">

                                <span className="rounded-full bg-white px-2.5 py-1 text-xs text-gray-600">
                                  Qty: {item.quantity}
                                </span>

                                <span className="rounded-full bg-white px-2.5 py-1 text-xs text-gray-600">
                                  Color: {item.color}
                                </span>

                              </div>
                            </div>

                            <span className="shrink-0 font-bold text-gray-900">
                              ₹{item.estimatedPrice}
                            </span>

                          </div>
                        </div>
                      ))}
                    </div>

                  </div>

                  {/* Estimated Cost */}
                  <div className="rounded-2xl bg-violet-600 p-6 text-white shadow-lg">

                    <p className="text-sm font-medium text-violet-100">
                      Estimated Decoration Cost
                    </p>

                    <p className="mt-1 text-3xl font-extrabold">
                      ₹{analysis.estimatedTotalCost}
                    </p>

                    <p className="mt-2 text-sm text-violet-100">
                      Approximate cost based on the items identified by AI.
                    </p>

                  </div>

                </div>
              )}

              {analysis && (
                <div className="mt-8">
                  <div className="mb-5">
                    <h2 className="text-2xl font-bold text-[#171536]">
                      Products You May Need
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Products matched to the decoration style, colors and requirements
                      detected by AI.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {matchedProducts.map((match, index) => (
                      <div key={index}>
                        <div className="mb-3">
                          <h3 className="font-bold text-gray-900">
                            {match.requirement.itemName}
                          </h3>

                          <p className="text-sm text-gray-500">
                            Required: {match.requirement.quantity}
                          </p>
                        </div>

                        {match.products.length > 0 ? (
                          <div className="grid gap-4 sm:grid-cols-2">
                            {match.products.map((product) => (
                              <div
                                key={product.id}
                                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
                              >
                                <div className="flex items-start justify-between">
                                  <div className="h-32 w-full overflow-hidden rounded-xl bg-gray-100">
                                    <img
                                      src={product.image}
                                      alt={product.name}
                                      className="h-full w-full object-cover"
                                    />
                                  </div>

                                  <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-600">
                                    {product.category}
                                  </span>
                                </div>

                                <h3 className="mt-4 font-bold text-gray-900">
                                  {product.name}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-gray-500">
                                  {product.description}
                                </p>

                                <div className="mt-3 flex flex-wrap gap-2">
                                  {product.colors.map((color) => (
                                    <span
                                      key={color}
                                      className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600"
                                    >
                                      {color}
                                    </span>
                                  ))}
                                </div>

                                <div className="mt-4 flex items-center justify-between">
                                  <span className="text-lg font-extrabold text-gray-900">
                                    ₹{product.price}
                                  </span>

                                  <button
                                    type="button"
                                    onClick={() => addToCart(product)}
                                    className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-violet-700"
                                  >
                                    Add to Cart
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-4 text-sm text-gray-500">
                            No matching product is currently available in the DecorAI
                            catalog.
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Cart Section */}
              <div
                id="cart-section"
                className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Your Cart
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      {cart.length === 0
                        ? "Your cart is empty."
                        : `${cart.reduce(
                          (total, item) => total + item.quantity,
                          0
                        )} item(s) in your cart`}
                    </p>
                  </div>

                  <ShoppingCart
                    className="text-violet-600"
                    size={24}
                  />
                </div>

                {cart.length > 0 && (
                  <div className="mt-6 space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col gap-4 rounded-xl border border-gray-100 p-4 sm:flex-row sm:items-center"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-20 w-20 shrink-0 rounded-xl object-cover"
                        />

                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {item.name}
                          </h3>

                          <div className="mt-2 flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => decreaseQuantity(item.id)}
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-lg font-bold text-gray-700 transition hover:bg-gray-50"
                            >
                              −
                            </button>

                            <span className="flex h-8 min-w-8 items-center justify-center rounded-lg bg-violet-50 px-2 text-sm font-bold text-violet-700">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() => increaseQuantity(item.id)}
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-lg font-bold text-gray-700 transition hover:bg-gray-50"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <p className="self-end font-bold text-gray-900 sm:self-auto">
                          ₹{item.price * item.quantity}
                        </p>
                      </div>
                    ))}

                    <div className="flex items-center justify-between border-t pt-5">
                      <span className="text-lg font-bold text-gray-900">
                        Total
                      </span>

                      <span className="text-xl font-bold text-violet-600">
                        ₹
                        {cart.reduce(
                          (total, item) =>
                            total + item.price * item.quantity,
                          0
                        )}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        window.location.href = "/checkout";
                      }}
                      className="w-full rounded-xl bg-violet-600 px-5 py-3 font-bold text-white transition hover:bg-violet-700"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                )}
              </div>

            </div>
          )}

        </div>

      </div>

    </main>
  );
}

export default AIAnalyzer;