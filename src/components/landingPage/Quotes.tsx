import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const Quotes = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: false });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const quoteVariant = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const textVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.4 },
    },
  };

  const authorVariant = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, delay: 0.7 },
    },
  };

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-40 w-full py-8 sm:py-12 md:py-16">
      <div className="w-full relative" ref={ref}>
        {/* Left Quote */}
        <motion.span
          className="text-6xl sm:text-7xl md:text-8xl lg:text-[150px] xl:text-[200px] text-secondary_1/30 sm:text-secondary_1/50 md:text-secondary_1 font-arial absolute -top-4 sm:-top-6 md:-top-12 lg:-top-16 -left-2 sm:left-0 select-none z-0"
          variants={quoteVariant}
          initial="hidden"
          animate={controls}
        >
          &ldquo;
        </motion.span>

        {/* Right Quote */}
        <motion.span
          className="text-6xl sm:text-7xl md:text-8xl lg:text-[150px] xl:text-[200px] text-secondary_1/30 sm:text-secondary_1/50 md:text-secondary_1 font-arial absolute -bottom-4 sm:-bottom-6 md:-bottom-8 lg:-bottom-4 -right-2 sm:right-0 select-none z-0"
          variants={quoteVariant}
          initial="hidden"
          animate={controls}
        >
          &rdquo;
        </motion.span>

        {/* Text Content */}
        <div className="relative z-10 py-8 sm:py-12 md:py-16">
          <motion.div
            className="font-andada px-4 sm:px-8 md:px-12 lg:px-16 grid mx-auto gap-4 sm:gap-6 md:gap-8 text-primary_100 text-base sm:text-lg md:text-xl lg:text-2xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-center"
            variants={textVariant}
            initial="hidden"
            animate={controls}
          >
            <h3 className="leading-relaxed">
              Education should be a process of self-discovery, where students learn to think critically, question
              authority, and challenge the status quo.
            </h3>
            <motion.p
              className="text-sm sm:text-base md:text-lg font-medium text-primary_100/80"
              variants={authorVariant}
              initial="hidden"
              animate={controls}
            >
              — Bell Hooks
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Quotes;
