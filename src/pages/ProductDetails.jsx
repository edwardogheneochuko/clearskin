import React, { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Heart, Star, ShoppingBag } from "lucide-react";

import { allProducts } from "../utils/product";
import useCartStore from "../store/cartStore";
import useAuthStore from "../store/authStore";
import toast from "react-hot-toast";
import { ProductDetailsSkeleton } from "../components/ui/Skeleton";

const ProductDetails = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [slug]);

  const user = useAuthStore((state) => state.user);
  const userId = user?.uid || "guest";

  const cartsMap = useCartStore((state) => state.carts);
  const cart = cartsMap[userId] || [];
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const favoritesMap = useCartStore((state) => state.favorites);
  const favorites = favoritesMap[userId] || [];
  const addToFavorites = useCartStore((state) => state.addToFavorites);
  const removeFromFavorites = useCartStore((state) => state.removeFromFavorites);

  const product = useMemo(() => {
    return allProducts.find(
      (p) =>
        p.slug?.trim().toLowerCase() === slug?.trim().toLowerCase() ||
        String(p.id) === String(slug)
    );
  }, [slug]);

  const isFavorite = favorites.some((item) => item.id === product?.id);
  const isInCart = cart.some((item) => item.id === product?.id);

  // ✅ Skeleton shows while loading
  if (loading) return <ProductDetailsSkeleton />;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Product Not Found
      </div>
    );
  }

  const handleFavToggle = () => {
    if (isFavorite) {
      removeFromFavorites(userId, product.id);
      toast("Removed from favorites");
    } else {
      addToFavorites(userId, product);
      toast.success("Added to favorites");
    }
  };

  const handleCartToggle = () => {
    if (isInCart) {
      removeFromCart(userId, product.id);
      toast("Removed from cart");
    } else {
      addToCart(userId, product);
      toast.success("Added to cart");
    }
  };

  return (
    <div className="px-4 md:px-10 py-10 mt-20">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="bg-gray-100 rounded-2xl overflow-hidden">
          <img
            src={product.image}
            className="w-full h-[400px] md:h-[600px] object-cover"
            alt={product.title}
          />
        </div>

        <div className="md:mt-30">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <h1 className="text-3xl md:text-4xl font-bold flex-1 min-w-0">
              {product.title}
            </h1>

            <button
              onClick={handleFavToggle}
              className={`
                shrink-0 p-3 rounded-full border transition cursor-pointer
                ${isFavorite
                  ? "bg-pink-500 border-pink-500 text-white"
                  : "hover:bg-pink-50"
                }
              `}
            >
              <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
            </button>
          </div>

          <div className="flex items-center gap-2 mt-4 text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} fill={i < product.rating ? "currentColor" : "none"} />
            ))}
          </div>

          <p className="text-3xl font-bold mt-6">${product.price}</p>
          <p className="mt-6 text-gray-600">{product.details}</p>

          <button
            onClick={handleCartToggle}
            className={`
              mt-8 cursor-pointer text-white px-8 py-4 rounded-xl transition flex items-center gap-3
              ${isInCart ? "bg-red-600 hover:bg-red-700" : "bg-black hover:bg-neutral-700"}
            `}
          >
            <ShoppingBag size={18} />
            {isInCart ? "Remove from Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;