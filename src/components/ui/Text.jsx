import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Text = ({ title, subtitle }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center justify-between py-4 border-b
      border-gray-200 dark:border-gray-800"
    >
      <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-pink-500">
        {title}
      </h1>

      <button
        onClick={() => navigate("/explore")}
        className="flex items-center gap-2
        text-sm md:text-base
        text-gray-500 dark:text-gray-400
        cursor-pointer group
        transition-all duration-300
        hover:text-black dark:hover:text-pink-400"
      >
        <span className="font-medium">{subtitle}</span>

        <ArrowRight
          size={18}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </button>
    </div>
  );
};

export default Text;