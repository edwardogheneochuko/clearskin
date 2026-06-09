import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  const navigate = useNavigate();

  const floatingPetals = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 18 + 8,
    left: Math.random() * 100,
    delay: Math.random() * 4,
    duration: Math.random() * 6 + 6,
    rotate: Math.random() * 360,
  }));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gradient-to-br dark:from-gray-950 dark:via-gray-900 dark:to-black flex items-center justify-center px-4 overflow-hidden relative transition-colors duration-300">
      {floatingPetals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute rounded-full bg-pink-200 dark:bg-pink-500/30 opacity-40 pointer-events-none"
          style={{
            width: petal.size,
            height: petal.size,
            left: `${petal.left}%`,
            top: "-20px",
            borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%",
          }}
          animate={{
            y: ["0vh", "110vh"],
            rotate: [petal.rotate, petal.rotate + 180],
            x: [0, Math.random() * 60 - 30],
            opacity: [0.4, 0.1],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      <div className="relative z-10 text-center max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative inline-block mb-2"
        >
          <span
            className="text-[9rem] sm:text-[12rem] font-black leading-none select-none"
            style={{
              background:
                "linear-gradient(135deg, #f9a8d4 0%, #ec4899 50%, #db2777 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.04em",
            }}
          >
            404
          </span>

          <motion.span
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl sm:text-5xl select-none pointer-events-none"
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            🌸
          </motion.span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-3"
        >
          Oops! Page not found
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="text-gray-500 dark:text-gray-400 text-sm sm:text-base mb-8 leading-relaxed"
        >
          The page you're looking for may have been moved,
          <br className="hidden sm:block" />
          deleted, or never existed.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/")}
            className="w-full sm:w-auto bg-pink-400 hover:bg-pink-500 text-white font-medium px-8 py-3 rounded-xl transition shadow-md shadow-pink-100 dark:shadow-pink-950/30 cursor-pointer"
          >
            Go back home
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 font-medium px-8 py-3 rounded-xl transition cursor-pointer"
          >
            Go back
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;