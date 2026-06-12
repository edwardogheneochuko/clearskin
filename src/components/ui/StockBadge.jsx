import { Check, AlertCircle } from "lucide-react";

const StockBadge = ({ inStock, quantity = null }) => {
  if (!inStock) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm font-medium">
        <AlertCircle size={16} />
        Out of Stock
      </div>
    );
  }

  if (quantity !== null && quantity <= 5) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 text-sm font-medium">
        <AlertCircle size={16} />
        Only {quantity} left
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium">
      <Check size={16} />
      In Stock
    </div>
  );
};

export default StockBadge;
