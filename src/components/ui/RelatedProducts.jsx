import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { allProducts } from "@/utils/product";

const RelatedProducts = ({ currentProduct }) => {
  const navigate = useNavigate();

  const related = allProducts
    .filter((p) => {
      if (p.id === currentProduct.id) return false;
      const priceDiff = Math.abs(p.price - currentProduct.price);
      return priceDiff <= 15;
    })
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="px-4 md:px-10 py-10 border-t mt-10">
      <h2 className="text-xl font-bold mb-6">You Might Also Like</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {related.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            onClick={() => navigate(`/product/${product.slug || product.id}`)}
            className="group cursor-pointer bg-white rounded-2xl border shadow-sm hover:shadow-md transition duration-300 overflow-hidden"
          >
            <div className="overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                loading="lazy"
                className="w-full h-40 md:h-52 object-cover transition duration-300 group-hover:scale-105"
              />
            </div>

            <div className="p-3">
              <p className="text-sm font-medium line-clamp-2 group-hover:text-pink-400 transition">
                {product.title}
              </p>

              <div className="flex items-center gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={10}
                    className={i < product.rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-200 fill-gray-200"
                    }
                  />
                ))}
                {product.reviews && (
                  <span className="text-[10px] text-gray-400 ml-1">
                    ({product.reviews.toLocaleString()})
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 mt-2">
                {product.oldPrice && (
                  <span className="text-xs text-gray-400 line-through">
                    ${product.oldPrice}
                  </span>
                )}
                <span className="text-sm font-bold">${product.price}</span>
                {product.badge && (
                  <span className="text-[10px] font-semibold bg-pink-100 text-pink-500 px-1.5 py-0.5 rounded-full">
                    {product.badge}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;