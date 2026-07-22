import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, Star, ShoppingBag, ZoomIn, Share2 } from "lucide-react";
import { Helmet } from "react-helmet-async";

import useCartStore from "@/store/cartStore";
import useAuthStore from "@/store/authStore";
import useAdminStore from "@/store/adminStore";
import useRecentStore from "@/store/recentStore";
import toast from "react-hot-toast";
import { ProductDetailsSkeleton } from "@/components/ui/Skeleton";
import ImageZoom from "@/components/ui/ImageZoom";
import RelatedProducts from "@/components/ui/RelatedProducts";
import ProductJsonLd from "@/components/seo/ProductJsonLd";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

const ProductDetails = () => {
  const { slug }  = useParams();
  const navigate  = useNavigate();
  const [loading, setLoading] = useState(true);
  const [zoomed, setZoomed]   = useState(false);

  const addRecent = useRecentStore((s) => s.addRecent);
  const adminProducts = useAdminStore((s) => s.products);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [slug]);

  const user   = useAuthStore((state) => state.user);
  const userId = user?.uid || "guest";

  const cartsMap            = useCartStore((state) => state.carts);
  const cart                = cartsMap[userId] || [];
  const addToCart           = useCartStore((state) => state.addToCart);
  const removeFromCart      = useCartStore((state) => state.removeFromCart);

  const favoritesMap        = useCartStore((state) => state.favorites);
  const favorites           = favoritesMap[userId] || [];
  const addToFavorites      = useCartStore((state) => state.addToFavorites);
  const removeFromFavorites = useCartStore((state) => state.removeFromFavorites);

  const product = useMemo(() => {
    // Helper to slugify title for comparison
    const slugify = (text) =>
      text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    
    return adminProducts.find(
      (p) =>
        slugify(p.title) === slug?.trim().toLowerCase() ||
        String(p.id) === String(slug)
    );
  }, [slug, adminProducts]);

  const isFavorite = favorites.some((item) => item.id === product?.id);
  const isInCart   = cart.some((item) => item.id === product?.id);

  useEffect(() => {
    if (product) addRecent(product);
  }, [addRecent, product]);

  const requireAuth = (action) => {
    if (!user) {
      toast.error("Please login to continue");
      navigate("/login");
      return;
    }
    action();
  };

  if (loading) return <ProductDetailsSkeleton />;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-gray-900 dark:text-gray-100">
        Product Not Found
      </div>
    );
  }

  const handleFavToggle = () => {
    if (product.inStock === false) return;
    requireAuth(() => {
      if (isFavorite) {
        removeFromFavorites(userId, product.id);
        toast("Removed from favorites");
      } else {
        addToFavorites(userId, product);
        toast.success("Added to favorites");
      }
    });
  };

  const handleCartToggle = () => {
    if (product.inStock === false) return;
    requireAuth(() => {
      if (isInCart) {
        removeFromCart(userId, product.id);
        toast("Removed from cart");
      } else {
        addToCart(userId, product);
        toast.success("Added to cart");
      }
    });
  };

  const handleShare = async () => {
    if (product.inStock === false) return;
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: `Check out ${product.title} on ClearSkin`,
          url,
        });
      } catch {
        toast.error("Unable to share this product right now");
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <>
      <Helmet>
        <title>{product.title} — ClearSkin</title>
        <meta name="description"           content={product.details} />
        <meta property="og:title"          content={`${product.title} — ClearSkin`} />
        <meta property="og:description"    content={product.details} />
        <meta property="og:image"          content={product.image} />
        <meta property="og:type"           content="product" />
        <meta property="og:url"            content={`https://clearskin.com/product/${product.slug || product.id}`} />
        <meta property="product:price:amount"   content={String(product.price)} />
        <meta property="product:price:currency" content="USD" />
      </Helmet>

      <ProductJsonLd product={product} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home",        path: "/"                                          },
          { name: "Explore",     path: "/explore"                                   },
          { name: product.title, path: `/product/${product.slug || product.id}`    },
        ]}
      />

      <ImageZoom
        src={product.image}
        alt={product.title}
        isOpen={zoomed}
        onClose={() => setZoomed(false)}
      />

      <div className={`px-4 md:px-10 py-12 bg-skin-base dark:bg-skin-bg text-skin-text ${product.inStock === false ? "opacity-70 grayscale" : ""}`}>
        <div className="grid md:grid-cols-2 gap-10">

          <div
            className={`relative skin-panel overflow-hidden group ${product.inStock === false ? "cursor-not-allowed" : "cursor-zoom-in"}`}
            onClick={() => product.inStock !== false && setZoomed(true)}
          >
            <img
              src={product.image}
              className={`w-full h-[400px] md:h-[600px] object-cover transition duration-300 mt-10
                 ${product.inStock === false ? "group-hover:scale-100" : "group-hover:scale-105"}`}
              alt={product.title}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-black/40 transition duration-300 flex items-center justify-center">
              <div className={`opacity-0 transition duration-300 bg-white/90 dark:bg-zinc-800 dark:text-white rounded-full px-4 py-2 flex items-center gap-2 text-sm font-medium shadow ${product.inStock === false ? "" : "group-hover:opacity-100"}`}>
                <ZoomIn size={16} />
                Click to zoom
              </div>
            </div>
          </div>

          <div className={`md:mt-35 ${product.inStock === false ? "text-gray-600 dark:text-gray-400" : ""}`}>
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <h2 className={`text-2xl sm:text-3xl font-semibold flex-1 min-w-0 ${product.inStock === false ? "text-gray-700 dark:text-gray-500" : "text-gray-900 dark:text-gray-100"}`}>
                {product.title}
              </h2>
              <button
                onClick={handleFavToggle}
                disabled={product.inStock === false}
                className={`shrink-0 p-3 rounded-full border transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
                  ${isFavorite
                    ? "bg-pink-500 border-pink-500 text-white"
                    : product.inStock === false
                    ? "border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500"
                    : "hover:bg-pink-50 dark:hover:bg-pink-950/30 border-gray-300 dark:border-gray-700"
                  }`}
              >
                <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
              </button>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <div className={`flex items-center gap-1 ${product.inStock === false ? "opacity-50" : "text-yellow-500"}`}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill={i < product.rating ? "currentColor" : "none"} className={product.inStock === false ? "" : "text-yellow-500"} />
                ))}
              </div>
              {product.reviews && (
                <span className={`text-sm ${product.inStock === false ? "text-gray-500 dark:text-gray-500" : "text-gray-500 dark:text-gray-400"}`}>
                  ({product.reviews.toLocaleString()} reviews)
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 mt-6">
              <p className={`text-3xl font-bold ${product.inStock === false ? "text-gray-700 dark:text-gray-600" : ""}`}>${product.price}</p>
              {product.oldPrice && (
                <p className={`text-lg line-through ${product.inStock === false ? "text-gray-500 dark:text-gray-600" : "text-gray-400"}`}>${product.oldPrice}</p>
              )}
              {product.badge && (
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${product.inStock === false ? "bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-600" : "bg-pink-100 dark:bg-pink-900/30 text-pink-500"}`}>
                  {product.badge}
                </span>
              )}
            </div>

            <p className={`mt-6 leading-relaxed ${product.inStock === false ? "text-gray-600 dark:text-gray-500" : "text-gray-600 dark:text-gray-300"}`}>
              {product.details}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button
                onClick={handleCartToggle}
                disabled={product.inStock === false}
                className={`flex-1 cursor-pointer px-8 py-4 rounded-xl transition flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed
                  ${isInCart
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : product.inStock === false
                    ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                    : "bg-black dark:bg-white dark:text-black text-white hover:bg-neutral-700 dark:hover:bg-gray-200"
                  }`}
              >
                <ShoppingBag size={18} />
                {isInCart ? "Remove from Cart" : "Add to Cart"}
              </button>

              <button
                onClick={handleShare}
                disabled={product.inStock === false}
                className={`px-4 py-4 rounded-xl border text-sm font-medium transition cursor-pointer flex items-center gap-2 
                  disabled:opacity-50 disabled:cursor-not-allowed justify-center
                  ${product.inStock === false 
                    ? "border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-100" 
                    : "border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-zinc-800"
                  }`}
                title="Share product"
              >
                <Share2 size={18} />
              </button>

              <button
                onClick={() => window.history.back()}
                className="px-6 py-4 rounded-xl border border-gray-300 dark:border-gray-700 text-sm font-medium hover:bg-gray-50 dark:hover:bg-zinc-800 transition cursor-pointer"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>

      <RelatedProducts currentProduct={product} />
    </>
  );
};

export default ProductDetails;