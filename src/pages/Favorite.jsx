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

        <div className="bg-pink-100 p-5 rounded-full mb-5">
          <Heart
            size={45}
            className="text-pink-500"
          />
        </div>

        <h1 className="text-2xl sm:text-3xl font-semibold">
          No Favorites Yet
        </h1>

        <p className="text-gray-500 mt-3 text-sm sm:text-base max-w-md leading-relaxed">
          Products you favorite will appear here.
        </p>

      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 md:px-10 py-20 md:py-24">

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          My Favorites
        </h1>

        <p className="text-sm text-gray-500">
          {favorites.length} items
        </p>
      </div>

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-6
        "
      >

        {favorites.map((item) => (
          <div
            key={item.id}
            className="
              group
              border
              rounded-3xl
              overflow-hidden
              bg-white
              shadow-sm
              hover:shadow-xl
              transition
              duration-300
            "
          >

            <div className="overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="
                  w-full
                  h-56
                  sm:h-64
                  object-cover
                  group-hover:scale-105
                  transition
                  duration-500
                "
              />
            </div>

            <div className="p-5">

              <h2 className="text-lg sm:text-xl font-semibold line-clamp-1">
                {item.title}
              </h2>

              <p className="text-pink-500 font-bold mt-2 text-lg">
                ${item.price}
              </p>

              <p className="text-gray-500 text-sm mt-3 line-clamp-3 leading-relaxed">
                {item.details}
              </p>

              <button
                onClick={() =>
                  removeFromFavorites(item.id)
                }
                className="
                  mt-5 w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded-xl
                  hover:bg-red-500 transition duration-300 cursor-pointer text-sm sm:text-base
                "
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