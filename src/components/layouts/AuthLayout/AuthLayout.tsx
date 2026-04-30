import { ReactNode, useState, useCallback, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { RedirectIfToken } from "../../hoc/RedirectIfToken/RedirectIfToken"
import { RenderIf } from "../../hoc/RenderIf/RenderIf"
import LaaLogo from "@/assets/logos/laa-logo.svg"
import LopLogo from "@/assets/logos/lop-logo.svg"
import AuthAttachment from "@/assets/svg/AuthAttachment"
import { Button } from "../../core/Button/Button"
import SplashScreen from "../../landingPage/SplashScreen"
import "./authlayout.css"
import lopauth from "@/assets/svg/lop-auth.svg"

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  // Show splash every time the register page is opened
  const isRegisterPage = pathname === "/register"
  const [showSplash, setShowSplash] = useState(isRegisterPage)
  const [contentReady, setContentReady] = useState(!isRegisterPage)

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false)
    setContentReady(true)
  }, [])

  // Lock body scroll during splash
  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [showSplash])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.4, staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  return (
    <RedirectIfToken>
      {/* Splash Screen for Register Page */}
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      </AnimatePresence>

      {/* Main Auth Content */}
      <AnimatePresence>
        {contentReady && (
          <motion.main
            className="page-background z-10 min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              className="content-container flex flex-col lg:flex-row gap-4 lg:gap-6 overflow-y-auto"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {/* Left Side - Branding */}
              <motion.div
                className="flex w-full lg:w-1/2"
                variants={itemVariants}
              >
                <div className="flex flex-col justify-between gap-y-4 w-full">
                  {/* Logo */}
                  <motion.div
                    className="place-self-center lg:place-self-start cursor-pointer"
                    onClick={() => navigate("/")}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    variants={itemVariants}
                  >
                    <img
                      src={LopLogo}
                      alt="Library of Perspectives"
                      className="w-24 sm:w-28 md:w-32 lg:w-36"
                    />
                  </motion.div>

                  {/* Main Image */}
                  <motion.div
                    className="py-2 sm:py-4 flex justify-center"
                    variants={imageVariants}
                  >
                    <img
                      src={lopauth}
                      alt="auth-bg"
                      className="w-full max-w-[200px] sm:max-w-[280px] md:max-w-[350px] lg:max-w-none lg:w-[90%]"
                    />
                  </motion.div>

                  {/* Footer Info - Desktop Only */}
                  <motion.div
                    className="hidden lg:block space-y-3"
                    variants={itemVariants}
                  >
                    <h1 className="font-medium text-primary work-sans text-sm lg:text-base">
                      Library of Perspectives. A project by Liberation Alliance Africa
                    </h1>
                    <img src={LaaLogo} alt="LAA Logo" className="w-20 lg:w-24" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Right Side - Form */}
              <motion.div
                className="w-full lg:w-1/2 h-full flex flex-col justify-between gap-4"
                variants={itemVariants}
              >
                {/* Top Navigation */}
                <motion.div
                  className="flex gap-x-3 sm:gap-x-4 items-center justify-center lg:justify-end flex-wrap"
                  variants={itemVariants}
                >
                  <RenderIf condition={pathname !== "/register"}>
                    <p className="text-grey font-normal text-xs sm:text-sm">Don't have an account?</p>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button onClick={() => navigate("/register")} size="40" theme="primary">
                        <span className="text-xs sm:text-sm">Request Access</span>
                      </Button>
                    </motion.div>
                  </RenderIf>
                  <RenderIf condition={pathname === "/register"}>
                    <p className="text-grey font-normal text-xs sm:text-sm">Already have an account?</p>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button onClick={() => navigate("/login")} size="40" theme="primary">
                        <span className="text-xs sm:text-sm">Log In</span>
                      </Button>
                    </motion.div>
                  </RenderIf>
                </motion.div>

                {/* Form Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={pathname}
                    className="pt-4 z-[100] overflow-y-auto flex-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {children}
                  </motion.div>
                </AnimatePresence>

                {/* Spacer */}
                <div className="hidden lg:block" />
              </motion.div>

              {/* Decorative Attachment */}
              <motion.div
                className="attachment hidden lg:block"
                initial={{ opacity: 0, rotate: -10 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <AuthAttachment />
              </motion.div>
            </motion.div>
          </motion.main>
        )}
      </AnimatePresence>
    </RedirectIfToken>
  )
}

export default AuthLayout
