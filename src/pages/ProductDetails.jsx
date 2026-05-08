import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import content from "../assets/data/content.json";
import { Star } from "lucide-react";
import ProductDetailsSkeleton from "../components/ui/ProductDetailSkeleton";
import useCartStore from "../store/cartStore";

const ProductDetails = () => {
  const { id } = useParams();

  const loading = useCartStore((state) => state.loading);
  const setLoading = useCartStore((state) => state.setLoading);

  const allProducts = [
    ...content.products,
    ...content.under25Products,
  ];

  const product = allProducts.find(
    (item) => String(item.id) === id
  );

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return <ProductDetailsSkeleton />;
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Product Not Found
      </div>
    );
  }

  return (
    <div className="px-4 md:px-10 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        <div className="bg-gray-100 rounded-2xl overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[400px] md:h-[600px] object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-3xl md:text-5xl font-semibold">
            {product.title}
          </h1>

          <div className="flex items-center gap-2 mt-4">
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  fill={i < product.rating ? "currentColor" : "none"}
                />
              ))}
            </div>

            <span className="text-gray-500 text-sm">
              ({product.reviews} reviews)
            </span>
          </div>

          <div className="flex items-center gap-3 mt-6">
            {product.oldPrice && (
              <span className="text-gray-400 line-through text-lg">
                ${product.oldPrice}
              </span>
            )}

            <span className="text-3xl font-bold">
              ${product.price}
            </span>
          </div>

          <p className="mt-6 text-gray-600 leading-7">
            Premium quality product designed for comfort, durability,
            and everyday lifestyle use.
          </p>

          <button className="mt-8 w-full md:w-fit px-10 py-4 bg-black text-white rounded-xl hover:bg-green-900 transition duration-300">
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;