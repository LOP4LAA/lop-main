// @ts-nocheck
import Footer from "../../components/landingPage/Footer"
import avatar from "../../assets/pngs/avatar.png"
import NewsLetter from "../../components/landingPage/NewsLetterSection"
import Mission from "../../components/landingPage/Mission"
import Teammate from "../../components/landingPage/Teammate"
import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

const Acknowledgment = () => {
  const teamData = {
    "Liberation Alliance Africa": [{ name: "Adekemi Oluwami", image: avatar, role: "Co-Founder" }],
    "The Design Team": [
      { name: "Adekemi Oluwami", image: avatar, role: "Co-Founder" },
      { name: "Adekemi Oluwami", image: avatar, role: "Co-Founder" },
      { name: "Adekemi Oluwami", image: avatar, role: "Co-Founder" },
    ],
    "The Content Team": [
      { name: "Adekemi Oluwami", image: avatar, role: "Co-Founder" },
      { name: "Adekemi Oluwami", image: avatar, role: "Co-Founder" },
      { name: "Adekemi Oluwami", image: avatar, role: "Co-Founder" },
    ],
  }

  const controlsTitle = useAnimation()
  const controlsDescription = useAnimation()
  const controlsTeam = useAnimation()

  const [refTitle, inViewTitle] = useInView({ threshold: 0.2 })
  const [, inViewDescription] = useInView({ threshold: 0.2 })
  const [refTeam, inViewTeam] = useInView({ threshold: 0.2 })

  useEffect(() => {
    if (inViewTitle) {
      controlsTitle.start("visible")
    } else {
      controlsTitle.start("hidden")
    }
  }, [controlsTitle, inViewTitle])

  useEffect(() => {
    if (inViewDescription) {
      controlsDescription.start("visible")
    } else {
      controlsDescription.start("hidden")
    }
  }, [controlsDescription, inViewDescription])

  useEffect(() => {
    if (inViewTeam) {
      controlsTeam.start("visible")
    } else {
      controlsTeam.start("hidden")
    }
  }, [controlsTeam, inViewTeam])

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  return (
    <motion.div className="w-full h-full grid place-items-center">
      {/* Title Section */}
      <motion.div
        ref={refTitle}
        initial="hidden"
        animate={controlsTitle}
        variants={fadeInUpVariants}
        className="w-full px-5 py-12 md:py-24 text-center place-items-center grid place-content-center gap-4"
      >
        <motion.h1
          animate={controlsTitle}
          variants={fadeInUpVariants}
          className="text-2xl md:text-3xl text-primary_100 lg:text-5xl font-custom"
        >
          Acknowledgments
        </motion.h1>
        <motion.div animate={controlsTitle} variants={fadeInUpVariants} className="flex items-center justify-center">
          <motion.p className="w-full max-w-screen-sm xl:max-w-screen-md text-primary_100 font-andada">
            The Human Library is an online repository established for lived experiences to be studied as decolonial
            theory —- in this library, human beings are the books. As the readers come in contact with these persons and
            read them, we hope they encounter a different perspective and expand their worldview...
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Team Section */}
      <motion.div
        ref={refTeam}
        className="w-full px-5 md:px-10 grid max-w-screen-lg pb-8 md:pb-24 mx-auto gap-5 md:gap-14"
        initial="hidden"
        animate={controlsTeam}
        variants={staggerContainer}
      >
        <motion.h2
          className="text-center text-primary_100 font-custom text-2xl md:text-3xl"
          variants={fadeInUpVariants}
        >
          The Team
        </motion.h2>

        {Object.keys(teamData).map((teams) => (
          <motion.div className="w-full grid gap-4" key={teams} variants={fadeInUpVariants}>
            <motion.h3 className="text-lg md:text-xl text-primary_100 font-custom" variants={fadeInUpVariants}>
              {teams}
            </motion.h3>

            <motion.div className="w-full flex-wrap flex items-center gap-4 md:gap-16" variants={fadeInUpVariants}>
              {teamData[teams].map((team: { name: string; image: string; role: string }, index: number) => (
                <motion.div key={index} variants={fadeInUpVariants}>
                  <Teammate name={team.name} image={team.image} role={team.role} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      <Mission />
      <NewsLetter />
      <Footer />
    </motion.div>
  )
}

export default Acknowledgment
