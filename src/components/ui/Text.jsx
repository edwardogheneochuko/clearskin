import { ArrowRight } from "lucide-react";

const Text = ({ title, products }) => {
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-200">
      <h1 className="text-3xl md:text-4xl font-semibold text-gray-800">
        {title}
      </h1>

      <div className="flex items-center gap-2 text-sm md:text-base text-gray-500 cursor-pointer group">
        <span className="group-hover:text-black transition-colors duration-300">
          {products}
        </span>
        <ArrowRight />
      </div>
    </div>
  );
};

export default Text;