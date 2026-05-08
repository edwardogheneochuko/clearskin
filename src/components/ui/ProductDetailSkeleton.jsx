import React from "react";

const ProductDetailsSkeleton = () => {
  return (
    <div className="px-4 md:px-10 py-10 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        <div className="bg-gray-200 h-[400px] md:h-[600px] rounded-2xl" />

        <div className="space-y-5">

          <div className="h-10 bg-gray-200 w-3/4 rounded" />

          <div className="h-5 bg-gray-200 w-1/2 rounded" />

          <div className="h-8 bg-gray-200 w-1/3 rounded" />

          <div className="space-y-3 mt-6">
            <div className="h-4 bg-gray-200 w-full rounded" />
            <div className="h-4 bg-gray-200 w-5/6 rounded" />
            <div className="h-4 bg-gray-200 w-2/3 rounded" />
          </div>

          <div className="h-12 bg-gray-300 w-full md:w-1/2 rounded-xl mt-8" />

        </div>

      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;