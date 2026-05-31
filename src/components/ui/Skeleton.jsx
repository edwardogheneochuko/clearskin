const Bone = ({ className = "" }) => (
  <div
    className={`
      relative overflow-hidden
      bg-gray-200 dark:bg-zinc-800
      rounded-xl
      ${className}
    `}
  >
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent" />
  </div>
);

// ─── ProductCard skeleton ────────────────────────────────────────────
export const ProductCardSkeleton = () => (
  <div className="rounded-2xl border bg-white dark:bg-zinc-900 dark:border-zinc-800 p-3 sm:p-4">
    <Bone className="h-40 sm:h-44 md:h-64 w-full" />
    <div className="mt-3 space-y-2">
      <Bone className="h-4 w-1/3" />
      <Bone className="h-3 w-2/3" />
      <Bone className="h-8 w-full mt-2" />
    </div>
  </div>
);

// ─── ProductDetails skeleton ─────────────────────────────────────────
export const ProductDetailsSkeleton = () => (
  <div className="px-4 md:px-10 py-10 mt-20">
    <div className="grid md:grid-cols-2 gap-10">
      <Bone className="h-[400px] md:h-[600px] w-full" />
      <div className="space-y-5 md:mt-30">
        <Bone className="h-10 w-3/4" />
        <div className="flex gap-2">
          {[...Array(5)].map((_, i) => (
            <Bone key={i} className="h-5 w-5 rounded-full" />
          ))}
        </div>
        <Bone className="h-8 w-1/4" />
        <div className="space-y-2">
          <Bone className="h-4 w-full" />
          <Bone className="h-4 w-5/6" />
          <Bone className="h-4 w-4/6" />
        </div>
        <Bone className="h-14 w-48" />
      </div>
    </div>
  </div>
);

// ─── Explore page skeleton ───────────────────────────────────────────
export const ExploreSkeleton = () => (
  <div className="px-4 md:px-10 py-22">
    <Bone className="h-8 w-40 mb-10" />
    {[...Array(2)].map((_, s) => (
      <div key={s} className="mb-14">
        <Bone className="h-7 w-40 mb-5" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    ))}
  </div>
);

// ─── BlogDetails skeleton ────────────────────────────────────────────
export const BlogDetailsSkeleton = () => (
  <div className="min-h-screen px-4 pt-24 md:px-10">
    <div className="mx-auto max-w-5xl space-y-5">
      <Bone className="h-4 w-24" />
      <Bone className="h-10 w-3/4" />
      <Bone className="h-4 w-1/3" />
      <Bone className="h-72 w-full" />
      <div className="space-y-3 mt-6">
        <Bone className="h-4 w-full" />
        <Bone className="h-4 w-5/6" />
        <Bone className="h-4 w-4/6" />
        <Bone className="h-4 w-full" />
        <Bone className="h-4 w-3/4" />
      </div>
      <div className="mt-16">
        <Bone className="h-7 w-48 mb-6" />
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="rounded-xl border bg-white dark:bg-zinc-900 dark:border-zinc-800 overflow-hidden"
            >
              <Bone className="h-40 w-full rounded-none" />
              <div className="p-4 space-y-2">
                <Bone className="h-4 w-full" />
                <Bone className="h-3 w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ─── Cart skeleton ───────────────────────────────────────────────────
export const CartSkeleton = () => (
  <div className="min-h-screen px-4 md:px-10 py-10 mt-20 bg-gray-50 dark:bg-zinc-950">
    <div className="flex items-center justify-between mb-8">
      <Bone className="h-9 w-48" />
    </div>

    <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
      <div className="space-y-5">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="flex gap-5 rounded-2xl bg-white dark:bg-zinc-900 p-4 shadow-sm dark:shadow-black/30"
          >
            <Bone className="h-24 w-24 shrink-0" />
            <div className="flex-1 space-y-3">
              <Bone className="h-5 w-2/3" />
              <Bone className="h-4 w-1/4" />
              <Bone className="h-4 w-1/3" />
              <div className="flex gap-3 mt-2">
                <Bone className="h-8 w-8 rounded-lg" />
                <Bone className="h-8 w-6 rounded" />
                <Bone className="h-8 w-8 rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-sm dark:shadow-black/30 space-y-4 h-fit">
        <Bone className="h-6 w-40" />
        <Bone className="h-4 w-full" />
        <Bone className="h-4 w-full" />
        <Bone className="h-12 w-full mt-4" />
      </div>
    </div>
  </div>
);

// ─── Favorite skeleton ───────────────────────────────────────────────
export const FavoriteSkeleton = () => (
  <div className="px-4 py-20 sm:px-6 md:px-10 md:py-24">
    <div className="flex items-center justify-between mb-8">
      <Bone className="h-9 w-48" />
      <Bone className="h-4 w-16" />
    </div>

    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="rounded-3xl border bg-white dark:bg-zinc-900 dark:border-zinc-800 overflow-hidden"
        >
          <Bone className="h-56 sm:h-64 w-full rounded-none" />
          <div className="p-5 space-y-3">
            <Bone className="h-5 w-3/4" />
            <Bone className="h-5 w-1/4" />
            <Bone className="h-4 w-full" />
            <Bone className="h-4 w-5/6" />
            <Bone className="h-12 w-full mt-2" />
          </div>
        </div>
      ))}
    </div>
  </div>
);