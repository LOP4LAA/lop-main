import { motion, useAnimation } from "framer-motion"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import womenGroup from "../../assets/pngs/womenGroup.png"
import text from "../../assets/pngs/text.png"
import power from "../../assets/pngs/power.png"
import swiper from "../../assets/pngs/swiper.png"

const SwiperSection = () => {
  const controlsSwiper = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: false })

  const layeredVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: i * 0.25,
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  }

  const floatAnimation = {
    y: [0, -8, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }

  useEffect(() => {
    if (inView) {
      controlsSwiper.start("visible")
    }
  }, [controlsSwiper, inView])

  return (
    <div
      ref={ref}
      style={{ backgroundImage: `url(${swiper})` }}
      className="min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] w-full bg-cover bg-center flex items-center justify-center py-8 sm:py-12 md:py-16 px-4"
    >
      <motion.div
        className="w-full max-w-xs sm:max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-screen-xl flex items-center justify-center relative"
        initial="hidden"
        animate={controlsSwiper}
      >
        {/* Main center image */}
        <motion.div
          className="z-30 w-[85%] sm:w-[75%] md:w-[65%] lg:w-[60%]"
          custom={0}
          variants={layeredVariants}
          whileInView={floatAnimation}
        >
          <img
            src={womenGroup}
            alt="Group of Women"
            className="w-full rounded-lg shadow-2xl"
          />
        </motion.div>

        {/* Left overlay image */}
        <motion.div
          className="absolute top-1/3 sm:top-1/2 -left-2 sm:left-0 w-[45%] sm:w-[40%] md:w-[32%] lg:w-[29%] z-20"
          custom={1}
          variants={layeredVariants}
          whileHover={{ scale: 1.05, rotate: -2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img
            src={text}
            alt="Text"
            className="w-full rounded-lg shadow-xl"
          />
        </motion.div>

        {/* Right bottom overlay image */}
        <motion.div
          className="absolute -bottom-4 sm:bottom-0 -right-2 sm:right-0 w-[70%] sm:w-[60%] md:w-[55%] lg:w-[50%] z-30"
          custom={2}
          variants={layeredVariants}
          whileHover={{ scale: 1.03, rotate: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img
            src={power}
            alt="Power"
            className="w-full rounded-lg shadow-xl"
          />
        </motion.div>
      </motion.div>
    </div>
  )
}

export default SwiperSection
