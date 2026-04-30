import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import pattern from "../../assets/pngs/pattern.png";

const Steps = ({ active, onClick }: { active: boolean; onClick: () => void }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
        active ? "bg-secondary_1 scale-110" : "bg-primary_100 hover:bg-primary_100/70"
      }`}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      aria-label={`Go to slide ${active ? "(current)" : ""}`}
    />
  );
};

const Swiper1 = () => {
  const quotes = [
    {
      quote:
        '"The African decolonization/decolonial project must pay particular attention to the education sector to seize back the minds of its people. The Academy has been described as "the epicentre of colonial hegemony, indoctrination, and mental colonisation."',
      author: "Sylvia Tamale",
    },
    {
      quote:
        '"Decolonization is not a metaphor. It is a profound transformation of the institutions, epistemologies, and power relations that govern the lives of colonized peoples."',
      author: "Tuck and Yang",
    },
    {
      quote:
        '"Education is the most powerful weapon which you can use to change the world. When the oppressed understand their history, they become unstoppable."',
      author: "Nelson Mandela",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setDirection(1);
      setActiveIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [quotes.length, isPaused]);

  const handleDotClick = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const slideVariants = {
    initial: (direction: number) => ({
      x: direction > 0 ? "30%" : "-30%",
      opacity: 0,
      scale: 0.95,
    }),
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-30%" : "30%",
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <motion.div
      style={{ backgroundImage: `url(${pattern})` }}
      className="w-full bg-cover bg-center relative grid place-content-center px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16 min-h-[300px] sm:min-h-[350px] md:min-h-[400px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated Quotes */}
      <div className="relative w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto min-h-[200px] sm:min-h-[180px] flex items-center justify-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeIndex}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={direction}
            className="absolute w-full text-primary_100 grid text-center gap-4 sm:gap-6 px-2"
          >
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed font-andada">
              {quotes[activeIndex].quote}
            </h3>
            <motion.p
              className="text-sm sm:text-base md:text-lg lg:text-xl font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              — {quotes[activeIndex].author}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots for navigation */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center gap-2 sm:gap-3">
          {quotes.map((_, index) => (
            <Steps
              active={index === activeIndex}
              key={index}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-primary_100/10">
        <motion.div
          className="h-full bg-secondary_1"
          initial={{ width: "0%" }}
          animate={{ width: isPaused ? `${((activeIndex + 1) / quotes.length) * 100}%` : "100%" }}
          transition={{ duration: isPaused ? 0 : 5, ease: "linear" }}
          key={activeIndex}
        />
      </div>
    </motion.div>
  );
};

export default Swiper1;
