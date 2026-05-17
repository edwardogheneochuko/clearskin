import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Heart, Star, ShoppingBag, ZoomIn } from "lucide-react";
import { motion } from "framer-motion";

import { allProducts } from "@/utils/product";
import useCartStore from "@/store/cartStore";
import useAuthStore from "@/store/authStore";
import toast from "react-hot-toast";
import { ProductDetailsSkeleton } from "@/components/ui/Skeleton";
import ImageZoom from "@/components/ui/ImageZoom"; 
import { useEffect } from "react";

const ProductDetails = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [zoomed, setZoomed] = useState(false); 

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
    <>
      {/* ✅ Lightbox */}
      <ImageZoom
        src={product.image}
        alt={product.title}
        isOpen={zoomed}
        onClose={() => setZoomed(false)}
      />

      <div className="px-4 md:px-10 py-10 mt-20">
        <div className="grid md:grid-cols-2 gap-10">

          {/* ✅ Image with zoom trigger */}
          <div
            className="relative bg-gray-100 rounded-2xl overflow-hidden group cursor-zoom-in"
            onClick={() => setZoomed(true)}
          >
            <img
              src={product.image}
              className="w-full h-[400px] md:h-[600px] object-cover transition duration-300 group-hover:scale-105"
              alt={product.title}
            />

            {/* Zoom hint overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition duration-300 bg-white/90 rounded-full px-4 py-2 flex items-center gap-2 text-sm font-medium shadow">
                <ZoomIn size={16} />
                Click to zoom
              </div>
            </div>
          </div>

          <div className="md:mt-10">
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

            {/* Stars + review count */}
            <div className="flex items-center gap-2 mt-4">
              <div className="flex items-center gap-1 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill={i < product.rating ? "currentColor" : "none"}
                  />
                ))}
              </div>
              {product.reviews && (
                <span className="text-sm text-gray-400">
                  ({product.reviews.toLocaleString()} reviews)
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 mt-6">
              <p className="text-3xl font-bold">${product.price}</p>
              {product.oldPrice && (
                <p className="text-lg text-gray-400 line-through">${product.oldPrice}</p>
              )}
              {product.badge && (
                <span className="text-xs font-semibold bg-pink-100 text-pink-500 px-2 py-1 rounded-full">
                  {product.badge}
                </span>
              )}
            </div>

            <p className="mt-6 text-gray-600 leading-relaxed">{product.details}</p>

            <div className="flex gap-3 mt-8">
              <button
                onClick={handleCartToggle}
                className={`
                  flex-1 cursor-pointer text-white px-8 py-4 rounded-xl transition flex items-center justify-center gap-3
                  ${isInCart ? "bg-red-600 hover:bg-red-700" : "bg-black hover:bg-neutral-700"}
                `}
              >
                <ShoppingBag size={18} />
                {isInCart ? "Remove from Cart" : "Add to Cart"}
              </button>

              {/* ✅ Back button */}
              <button
                onClick={() => window.history.back()}
                className="px-6 py-4 rounded-xl border text-sm font-medium hover:bg-gray-50 transition cursor-pointer"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;