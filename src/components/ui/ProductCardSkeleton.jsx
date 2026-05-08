import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div className="bg-white p-3 sm:p-4 rounded-2xl border animate-pulse">
      
      <div className="w-full h-40 sm:h-44 md:h-64 bg-gray-200 rounded-xl" />

      <div className="mt-3 space-y-2">
        <div className="h-4 w-20 bg-gray-200 rounded" />

        <div className="h-5 w-28 bg-gray-200 rounded" />

        <div className="h-3 w-32 bg-gray-200 rounded" />

        <div className="h-10 w-full bg-gray-200 rounded-lg mt-3" />
      </div>

    </div>
  );
};

export default ProductCardSkeleton;