import Footer from "../../components/landingPage/Footer"
// import { Button } from "../../components/core/Button/Button"
import { motion, useAnimation } from "framer-motion"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import swiper from "../../assets/pngs/swiper.png"
import text2 from "../../assets/pngs/text2.png"
import group1 from "../../assets/pngs/group1.png"
import NewsLetter from "../../components/landingPage/NewsLetterSection"
import Mission from "../../components/landingPage/Mission"

const About = () => {
  const controls1 = useAnimation()
  const controls2 = useAnimation()
  const controls3 = useAnimation()

  const [ref1, inView1] = useInView({ threshold: 0.2 })
  const [ref2, inView2] = useInView({ threshold: 0.2 })
  const [ref3, inView3] = useInView({ threshold: 0.2 })

  useEffect(() => {
    if (inView1) controls1.start("visible")
    else controls1.start("hidden")

    if (inView2) controls2.start("visible")
    else controls2.start("hidden")

    if (inView3) controls3.start("visible")
    else controls3.start("hidden")
  }, [controls1, controls2, controls3, inView1, inView2, inView3])

  // Animation variants for fading in and sliding up
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  const imageVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  }

  return (
    <div className="w-full h-full grid place-items-center">
      {/* First Section */}
      <motion.div
        ref={ref1}
        initial="hidden"
        animate={controls1}
        variants={fadeInUpVariants}
        className="w-full px-5 pt-12 md:pt-24 text-center place-items-center grid place-content-center gap-4 relative"
      >
        <motion.h1 className="text-2xl md:text-3xl text-primary_100 lg:text-5xl font-custom">
          About The Library of Perspectives
        </motion.h1>
        <motion.div className="flex flex-col items-center justify-center gap-y-[40px]">
          <motion.p className="w-full max-w-screen-sm xl:max-w-screen-md text-primary_100 font-andada text-base md:text-xl">
            The Human Library is an online repository established for lived experiences to be studied as decolonial
            theory —- in this library, human beings are the books. As the readers come in contact with these persons and
            read them, we hope they encounter a different perspective and expand their worldview. The human library
            allows readers to cultivate knowledge which acknowledges the embodied struggle for liberation and our
            embeddedness in a world full of inequalities. The human books contain lived experiences, stories, and ideas
            that engender liberatory praxis. It seeks to diversify how people come in contact with knowledge and
            democratise access to information. In the library of perspective experience, readers and human books are
            invited to confront their prejudices, biases, and socialisations and potentially build meaningful
            solidarity.
          </motion.p>
          <motion.p className="w-full max-w-screen-sm xl:max-w-screen-md text-primary_100 font-andada text-base md:text-xl">
            Library of Perspectives is funded by the Open Society Foundations through its Ideas Workshop, which supports
            unconventional ideas globally and seeks out new forms of cultural production where open society and
            expression intersect.
          </motion.p>
        </motion.div>
        <motion.div>
          {/* <Button className="w-fit" theme="secondary" size="40">
            <span className="text-primary_100">Meet the Team</span>
          </Button> */}
        </motion.div>

        <motion.div animate={controls1} variants={imageVariants} className="w-full">
          <img src={group1} alt="Group of 3 women" className="w-full h-fit" />
        </motion.div>
      </motion.div>

      {/* Mission Section */}
      <motion.div ref={ref2} initial="hidden" animate={controls2} variants={fadeInUpVariants} className="w-full">
        <Mission />
      </motion.div>

      {/* Third Section with Image */}
      <motion.div
        ref={ref3}
        initial="hidden"
        animate={controls3}
        variants={fadeInUpVariants}
        style={{ backgroundImage: `url(${swiper})` }}
        className="w-full bg-cover grid place-content-center px-5 py-12 md:py-16 lg:py-20 xl:py-24"
      >
        <motion.div className="w-33% md:w-50% md:max-w-screen-md xl:max-w-screen-lg">
          <img src={text2} alt="text" className="w-full" />
        </motion.div>
      </motion.div>

      {/* Newsletter Section */}
      <NewsLetter />

      {/* Footer Section */}
      <Footer />
    </div>
  )
}

export default About
