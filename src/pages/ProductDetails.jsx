import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Star } from "lucide-react";

import { allProducts } from "../utils/product";
import useCartStore from "../store/cartStore";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { slug } = useParams();
  const addToCart = useCartStore((state) => state.addToCart);

  const product = useMemo(() => {
    return allProducts.find((p) => p.slug === slug);
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Product Not Found
      </div>
    );
  }

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
          <h1 className="text-4xl font-bold">{product.title}</h1>

          <div className="flex items-center gap-2 mt-4 text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                fill={i < product.rating ? "currentColor" : "none"}
              />
            ))}
          </div>

          <p className="text-3xl font-bold mt-6">
            ${product.price}
          </p>

          <p className="mt-6 text-gray-600">
            {product.details}
          </p>

          <button
            onClick={() => {
              addToCart(product)
              toast.success('Add to cart')
            }}
            className="mt-8 bg-black cursor-pointer text-white px-8 py-4 rounded-xl
             hover:bg-neutral-700 transition"
          >
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;