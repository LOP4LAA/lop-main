import { motion, useAnimation } from "framer-motion"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { useNavigate, NavLink } from "react-router-dom"
import { LopLogo } from "../../assets/logos/LopLogo"
import { Button } from "../core/Button/Button"

const Footer = () => {
  const controls = useAnimation()
  const navigate = useNavigate()
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: false })

  const links = [
    {
      url: "/about",
      name: "About",
    },
    {
      url: "/human-books",
      name: "Human Books",
    },
  ]

  const footerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const textDropVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.15 + i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  }

  const linkHoverVariants = {
    hover: {
      x: 4,
      color: "#F8B133",
      transition: { duration: 0.2 },
    },
  }

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])

  return (
    <motion.footer
      ref={ref}
      className="bg-primary_100 pt-8 sm:pt-12 md:pt-16 pb-6 sm:pb-8 font-andada grid gap-8 sm:gap-12 md:gap-20 lg:gap-28 font-light text-white w-full px-4 sm:px-8 md:px-16 lg:px-24"
      initial="hidden"
      animate={controls}
      variants={footerVariants}
    >
      {/* Main Footer Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-6 w-full">
        {/* Left Column - Logo and Info */}
        <motion.div className="grid w-full gap-4 sm:gap-6 order-2 sm:order-1">
          <motion.div
            className="w-24 sm:w-28 md:w-32"
            custom={0}
            variants={textDropVariants}
          >
            <LopLogo width="100%" height="auto" />
          </motion.div>

          <motion.p
            className="text-xs sm:text-sm font-andada font-light text-white/90"
            custom={1}
            variants={textDropVariants}
          >
            A Project by{" "}
            <a
              href="https://liberationallianceafrica.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal_1 hover:text-secondary transition-colors duration-300 underline-offset-2 hover:underline"
            >
              Liberation Alliance Africa
            </a>
          </motion.p>

          <motion.div
            custom={2}
            variants={textDropVariants}
            className="mt-4 sm:mt-6 md:mt-10"
          >
            <Button
              onClick={() => navigate("/register")}
              className="bg-teal_1 hover:bg-teal_1/90 text-left w-full sm:w-auto transition-all duration-300 hover:shadow-lg"
            >
              <span className="text-primary_100 w-full text-xs sm:text-sm font-poppins font-medium rounded-sm py-2 px-3 sm:py-2.5 sm:px-4">
                Register for the next Cohort
              </span>
            </Button>
          </motion.div>
        </motion.div>

        {/* Right Column - Navigation Links */}
        <nav className="order-1 sm:order-2">
          <ul className="text-white w-full flex flex-row sm:flex-col sm:items-end gap-4 sm:gap-3 md:gap-4 text-sm font-poppins">
            {links.map((item, index) => (
              <motion.li
                key={item.name}
                custom={index + 3}
                variants={textDropVariants}
              >
                <motion.div variants={linkHoverVariants} whileHover="hover">
                  <NavLink
                    to={item.url}
                    className={({ isActive }) =>
                      `text-sm sm:text-base transition-colors duration-300 ${
                        isActive
                          ? "text-secondary font-medium"
                          : "text-white hover:text-secondary"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </motion.div>
              </motion.li>
            ))}
            <motion.li custom={5} variants={textDropVariants}>
              <motion.a
                href="https://liberationallianceafrica.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal_1 text-sm sm:text-base hover:text-secondary transition-colors duration-300"
                variants={linkHoverVariants}
                whileHover="hover"
              >
                Liberation Alliance Africa
              </motion.a>
            </motion.li>
          </ul>
        </nav>
      </div>

      {/* Copyright */}
      <motion.div
        className="text-center w-full border-t border-white/10 pt-6"
        custom={6}
        variants={textDropVariants}
      >
        <span className="text-xs sm:text-sm text-white/70">
          Copyright {new Date().getFullYear()} Library of Perspectives. All rights reserved.
        </span>
      </motion.div>
    </motion.footer>
  )
}

export default Footer
