import { motion, useAnimation } from "framer-motion"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { Button } from "../../components/core/Button/Button"
import NewsLetter from "../../components/landingPage/NewsLetterSection"
import Footer from "../../components/landingPage/Footer"
import Quotes from "../../components/landingPage/Quotes"
import HeroSection from "../../components/landingPage/HeroSection"
import TextSection from "../../components/landingPage/Text"
import Swiper1 from "../../components/landingPage/Swiper1"
import { useNavigate } from "react-router-dom"

const LandingPage = () => {
  const controlsTextSection = useAnimation()
  const controlsButton = useAnimation()
  const navigate = useNavigate()

  const [refTextSection, inViewTextSection] = useInView({ threshold: 0.2, triggerOnce: false })
  const [refButton, inViewButton] = useInView({ threshold: 0.5, triggerOnce: false })

  useEffect(() => {
    if (inViewTextSection) {
      controlsTextSection.start("visible")
    } else {
      controlsTextSection.start("hidden")
    }
  }, [controlsTextSection, inViewTextSection])

  useEffect(() => {
    if (inViewButton) {
      controlsButton.start("visible")
    } else {
      controlsButton.start("hidden")
    }
  }, [controlsButton, inViewButton])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
  }

  const wordVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  const words = ["Knowledge", "Living", "Legacy", "Decolonial", "Liberation", "Archived"]

  return (
    <motion.main
      className="w-full relative min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Hero Section */}
      <section className="w-full">
        <HeroSection />
      </section>

      {/* Swiper */}
      <section className="w-full">
        <Swiper1 />
      </section>

      {/* Text/Image Section */}
      <section className="w-full">
        <TextSection />
      </section>

      {/* Keywords Section */}
      <motion.section
        ref={refTextSection}
        className="w-full px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24 lg:py-32 text-center overflow-hidden"
        initial="hidden"
        animate={controlsTextSection}
        variants={containerVariants}
      >
        <h3 className="flex mx-auto w-full justify-center text-primary_100 font-custom text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl items-center gap-2 sm:gap-3 md:gap-6 lg:gap-8 xl:gap-10 flex-wrap max-w-6xl">
          {words.map((word, index) => (
            <motion.span
              key={word}
              variants={wordVariants}
              className="inline-block hover:text-secondary_1 transition-colors duration-300 cursor-default"
              whileHover={{ scale: 1.05, color: "#FC8619" }}
              custom={index}
            >
              {word}
            </motion.span>
          ))}
        </h3>
      </motion.section>

      {/* Quotes */}
      <section className="w-full">
        <Quotes />
      </section>

      {/* CTA Button */}
      <motion.section
        ref={refButton}
        className="w-full flex py-12 sm:py-16 md:py-20 items-center justify-center px-4"
        initial="hidden"
        animate={controlsButton}
        variants={buttonVariants}
      >
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            className="w-full sm:w-auto px-6 sm:px-8 md:px-10"
            theme="secondary"
            size="44"
            onClick={() => navigate("/register")}
          >
            <span className="text-primary_100 text-sm sm:text-base whitespace-nowrap">
              Sign up to Experience the Human Books
            </span>
          </Button>
        </motion.div>
      </motion.section>

      {/* NewsLetter */}
      <section className="w-full bg-gray-50/50">
        <NewsLetter />
      </section>

      {/* Footer */}
      <Footer />
    </motion.main>
  )
}

export default LandingPage
