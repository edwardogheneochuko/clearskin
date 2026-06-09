import { motion } from "framer-motion";

const particles = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  size: Math.random() * 12 + 6,
  left: Math.random() * 100,
  delay: Math.random() * 5,
  duration: Math.random() * 9 + 7,
  xMove: Math.random() * 70 - 35,
  rotate: Math.random() * 360,
}));

const orbs = Array.from({ length: 5 }, (_, i) => ({
  id: i,
  size: Math.random() * 220 + 120,
  top: Math.random() * 100,
  left: Math.random() * 100,
  delay: Math.random() * 4,
}));

const GlobalParticles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">

      {/* ================= ORBS ================= */}
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="
            absolute rounded-full blur-3xl
            bg-pink-500/15 dark:bg-pink-500/15
          "
          style={{
            width: orb.size,
            height: orb.size,
            top: `${orb.top}%`,
            left: `${orb.left}%`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 10,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="hidden dark:block">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="
              absolute rounded-full blur-[0.5px]
              bg-pink-400/50
              shadow-[0_0_25px_rgba(236,72,153,0.25)]
            "
            style={{
              width: p.size,
              height: p.size,
              left: `${p.left}%`,
              top: "-20px",
            }}
            animate={{
              y: ["0vh", "120vh"],
              x: [0, p.xMove],
              rotate: [p.rotate, p.rotate + 180],
              opacity: [0.8, 0.3],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="dark:hidden">
        {particles.slice(0, 8).map((p) => (
          <motion.div
            key={"light-" + p.id}
            className="
              absolute rounded-full
              bg-pink-300/20 blur-sm
            "
            style={{
              width: p.size - 2,
              height: p.size - 2,
              left: `${p.left}%`,
              top: "-20px",
            }}
            animate={{
              y: ["0vh", "120vh"],
              x: [0, p.xMove],
              rotate: [p.rotate, p.rotate + 180],
              opacity: [0.35, 0.1],
            }}
            transition={{
              duration: p.duration + 2,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

    </div>
  );
};

export default GlobalParticles;