import React from "react";
import { Trash2, Heart } from "lucide-react";

import useCartStore from "../store/cartStore";

const Favorite = () => {
  const favorites = useCartStore(
    (state) => state.favorites
  );

  const removeFromFavorites = useCartStore(
    (state) => state.removeFromFavorites
  );

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-10">

        <Heart
          size={50}
          className="text-pink-400 mb-4"
        />

        <h1 className="text-2xl sm:text-3xl font-semibold">
          No Favorites Yet
        </h1>

        <p className="text-gray-500 mt-2 text-sm sm:text-base max-w-sm">
          Products you favorite will appear here.
        </p>

      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 md:px-10 py-20 md:py-24">

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 md:mb-10">
        My Favorites
      </h1>

      <div
        className="grid 
        grid-cols-1 
        sm:grid-cols-3
        lg:grid-cols-4 
        xl:grid-cols-8 
        gap-5 md:gap-5"
      >

        {favorites.map((item) => (
          <div
            key={item.id}
            className="border rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition duration-300"
          >

            <div className="overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-52 sm:h-60 md:h-64 object-cover hover:scale-105 transition duration-300"
              />
            </div>

            <div className="p-4 md:p-5">

              <h2 className="text-lg sm:text-xl font-semibold line-clamp-1">
                {item.title}
              </h2>

              <p className="text-pink-500 font-bold mt-2 text-base sm:text-lg">
                ${item.price}
              </p>

              <p className="text-gray-500 text-sm mt-3 line-clamp-3 leading-relaxed">
                {item.details}
              </p>

              <button
                onClick={() =>
                  removeFromFavorites(item.id)
                }
                className="mt-5 w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded-xl hover:bg-red-800 transition duration-300 cursor-pointer text-sm sm:text-base"
              >
                <Trash2 size={18} />
                Remove Favorite
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default Favorite;