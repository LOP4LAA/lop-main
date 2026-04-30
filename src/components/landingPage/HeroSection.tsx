// @ts-nocheck
import { motion, useAnimation } from "framer-motion"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { useNavigate } from "react-router-dom"
import group1 from "../../assets/pngs/group1.png"
import knowledge from "../../assets/svg/knowledge.svg"

const HeroSection = () => {
  const navigate = useNavigate()
  const controlsHero = useAnimation()
  const [refHero, inViewHero] = useInView({ threshold: 0.2, triggerOnce: false })

  useEffect(() => {
    if (inViewHero) {
      controlsHero.start("visible")
    } else {
      controlsHero.start("hidden")
    }
  }, [controlsHero, inViewHero])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.4, staggerChildren: 0.12 },
    },
  }

  const textVariants = {
    hidden: { opacity: 0, y: 40, clipPath: "inset(100% 0 0 0)" },
    visible: {
      opacity: 1,
      y: 0,
      clipPath: "inset(0% 0 0 0)",
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const descriptionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, delay: 0.2 },
    },
    hover: {
      scale: 1.03,
      boxShadow: "0 10px 30px rgba(248, 177, 51, 0.4)",
      transition: { duration: 0.25 },
    },
    tap: { scale: 0.97 },
  }

  return (
    <div ref={refHero}>
      <div className="bg-gradient-to-b from-primary_100 via-primary_100 to-primary min-h-[100svh] md:min-h-0 md:h-full relative z-0 overflow-hidden">
        {/* ===== Mobile Layout ===== */}
        <div className="block md:hidden px-4 sm:px-6 py-10 sm:py-12">
          <motion.div
            initial="hidden"
            animate={controlsHero}
            variants={containerVariants}
            className="flex flex-col items-center text-center"
          >
            <motion.h1 variants={textVariants} className="text-3xl sm:text-4xl font-custom text-white leading-tight">
              Knowledge
            </motion.h1>
            <motion.h1 variants={textVariants} className="text-3xl sm:text-4xl font-custom text-white leading-tight">
              Living
            </motion.h1>
            <motion.h1
              variants={textVariants}
              className="text-3xl sm:text-4xl font-custom leading-tight bg-gradient-to-r from-secondary via-secondary_1 to-secondary bg-clip-text text-transparent"
            >
              Legacy
            </motion.h1>
          </motion.div>

          {/* Knowledge flower image */}
          <motion.div
            initial="hidden"
            animate={controlsHero}
            variants={imageVariants}
            className="my-8 flex justify-center"
          >
            <img
              src={knowledge}
              alt="Knowledge flower"
              className="w-full max-w-[240px] sm:max-w-[300px] drop-shadow-2xl"
            />
          </motion.div>

          {/* Description */}
          <motion.div
            initial="hidden"
            animate={controlsHero}
            variants={containerVariants}
            className="text-white font-poppins font-light text-sm sm:text-base px-1"
          >
            <motion.p variants={descriptionVariants} className="mb-4 leading-relaxed text-white/85">
              The Library of Perspectives is an interdisciplinary platform that uses feminist multimedia and the
              archiving of oral knowledge to raise critical consciousness and inspire liberatory praxis. We honor our
              engagements with the peoples, lives, histories, and ideas as part of the decolonial process.
            </motion.p>
            <motion.p variants={descriptionVariants} className="mb-6 leading-relaxed text-white/85">
              Register to explore the library — Join other readers to engage with the human books in the Library of
              Perspectives!
            </motion.p>

            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => navigate("/register")}
              className="w-full bg-gradient-to-r from-secondary to-secondary_1 font-medium text-primary_100 py-3.5 px-6 rounded-lg shadow-xl shadow-secondary/20"
            >
              Sign up to experience The Human Books
            </motion.button>
          </motion.div>
        </div>

        {/* ===== Desktop Layout ===== */}
        <div className="hidden md:grid grid-cols-2 relative pl-6 lg:pl-10 xl:pl-16">
          {/* Left column - Heading */}
          <motion.div
            initial="hidden"
            animate={controlsHero}
            variants={containerVariants}
            className="flex flex-col text-white justify-end items-end text-end py-10 lg:py-14 pr-6 lg:pr-8"
          >
            <motion.h1
              variants={textVariants}
              className="text-5xl lg:text-6xl xl:text-[72px] font-custom leading-[1.1]"
            >
              Knowledge
            </motion.h1>
            <motion.h1
              variants={textVariants}
              className="text-5xl lg:text-6xl xl:text-[72px] font-custom leading-[1.1]"
            >
              Living
            </motion.h1>
            <motion.h1
              variants={textVariants}
              className="text-5xl lg:text-6xl xl:text-[72px] font-custom leading-[1.1] bg-gradient-to-r from-secondary via-secondary_1 to-secondary bg-clip-text text-transparent"
            >
              Legacy
            </motion.h1>
          </motion.div>

          {/* Right column - Knowledge flower */}
          <div className="items-start row-span-2 flex justify-center lg:justify-start py-6">
            <motion.img
              src={knowledge}
              alt="Knowledge flower"
              className="w-full max-w-[350px] lg:max-w-[420px] xl:max-w-[500px] drop-shadow-2xl"
              initial="hidden"
              animate={controlsHero}
              variants={imageVariants}
            />
          </div>

          {/* Left column row 2 - Description */}
          <motion.div
            initial="hidden"
            animate={controlsHero}
            variants={containerVariants}
            className="col-span-1 text-white w-full py-4 lg:py-6 font-poppins px-4 lg:px-8 font-light"
          >
            <motion.p
              variants={descriptionVariants}
              className="mb-4 leading-relaxed text-sm lg:text-base text-white/85"
            >
              The Library of Perspectives is an interdisciplinary platform that uses feminist multimedia and the
              archiving of oral knowledge to raise critical consciousness and inspire liberatory praxis. We honor our
              engagements with the peoples, lives, histories, and ideas as part of the decolonial process.
            </motion.p>
            <motion.p
              variants={descriptionVariants}
              className="mb-6 leading-relaxed text-sm lg:text-base text-white/85"
            >
              Register to explore the library — Join other readers to engage with the human books in the Library of
              Perspectives!
            </motion.p>

            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => navigate("/register")}
              className="bg-gradient-to-r from-secondary to-secondary_1 font-medium text-primary_100 py-2.5 lg:py-3.5 px-8 lg:px-10 rounded-lg shadow-xl shadow-secondary/20 transition-all duration-300"
            >
              Sign up to experience The Human Books
            </motion.button>
          </motion.div>
        </div>

        {/* Group image */}
        <motion.div className="w-full h-fit" initial="hidden" animate={controlsHero} variants={imageVariants}>
          <img src={group1} alt="Group of 3 women" className="hidden md:block w-full object-cover" />
        </motion.div>
      </div>
    </div>
  )
}

export default HeroSection
