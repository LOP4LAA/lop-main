import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

interface SplashScreenProps {
  onComplete: () => void
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [phase, setPhase] = useState<"enter" | "hold" | "exit">("enter")

  const lines = [
    { text: "Welcome", delay: 0.3 },
    { text: "to the", delay: 0.8 },
    { text: "Library of", delay: 1.3 },
    { text: "Perspectives.", delay: 1.8 },
  ]

  useEffect(() => {
    const holdTimer = setTimeout(() => setPhase("hold"), 6800)
    const exitTimer = setTimeout(() => setPhase("exit"), 7600)
    const completeTimer = setTimeout(() => onComplete(), 8400)

    return () => {
      clearTimeout(holdTimer)
      clearTimeout(exitTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  // Animated gradient line that draws across
  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 1.2,
        delay: 2.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  // Container exit
  const containerExit = {
    opacity: 0,
    scale: 1.05,
    filter: "blur(10px)",
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  }

  return (
    <AnimatePresence>
      {phase !== "exit" ? null : null}
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-primary overflow-hidden"
        exit={containerExit}
        animate={phase === "exit" ? containerExit : {}}
      >
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-secondary/10"
              style={{
                width: `${60 + i * 40}px`,
                height: `${60 + i * 40}px`,
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.3, 0.1],
                scale: [0, 1.5, 2],
                y: [0, -30, -60],
              }}
              transition={{
                duration: 3,
                delay: 0.2 + i * 0.3,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        {/* Radial glow behind text */}
        <motion.div
          className="absolute w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(248,177,51,0.08) 0%, rgba(31,31,57,0) 70%)",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />

        {/* Main text content */}
        <div className="relative z-10 text-center px-6">
          {/* Staggered text lines */}
          <div className="space-y-1 sm:space-y-2 md:space-y-3">
            {lines.map((line, index) => (
              <div key={index} className="overflow-hidden">
                <motion.h1
                  className={`font-custom text-white leading-tight ${
                    index === 3
                      ? "text-3xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-secondary via-secondary_1 to-secondary bg-clip-text text-transparent"
                      : "text-3xl sm:text-5xl md:text-6xl lg:text-7xl"
                  }`}
                  initial={{
                    y: "100%",
                    opacity: 0,
                    rotateX: 45,
                  }}
                  animate={{
                    y: "0%",
                    opacity: 1,
                    rotateX: 0,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: line.delay,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {line.text}
                </motion.h1>
              </div>
            ))}
          </div>

          {/* Decorative line */}
          <motion.div
            className="mx-auto mt-6 sm:mt-8 h-[2px] w-32 sm:w-48 md:w-64 origin-left"
            style={{
              background: "linear-gradient(90deg, transparent, #F8B133, #FC8619, transparent)",
            }}
            variants={lineVariants}
            initial="hidden"
            animate="visible"
          />

          {/* Subtitle that appears last */}
          <motion.p
            className="text-white/50 text-xs sm:text-sm md:text-base font-poppins font-light mt-4 sm:mt-6 tracking-widest uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 2.8,
              ease: "easeOut",
            }}
          >
            Knowledge &middot; Living &middot; Legacy
          </motion.p>

          {/* Description paragraphs */}
          <div className="mt-6 sm:mt-8 max-w-xl mx-auto space-y-4">
            <motion.p
              className="text-white/60 text-xs sm:text-sm font-poppins font-light leading-relaxed"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 3.2,
                ease: "easeOut",
              }}
            >
              The voices that make up this library are extraordinary people who tell their stories through their own
              lens. The narratives that you will find in this library are stories that anchor daily resistance and
              refusal. Stories of unbridled hope, joy and solidarity invite us to reflection and action in small and big
              ways. Perspectives that shape our personal and political journeys. This library is a mirror. A way of
              looking at ourselves through the experiences of others. It is a perspective on self-definition.
            </motion.p>
            <motion.p
              className="text-white/60 text-xs sm:text-sm font-poppins font-light leading-relaxed"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 3.8,
                ease: "easeOut",
              }}
            >
              In this library, the archive speaks. It is reparative. It is embodied and rooted in local experiences.
              Expansive in its Pan-African, diasporic outlook. As you enter this space, gently greet yourself. Take a
              moment to honour every moment, person and place that shapes your perspective.
            </motion.p>
          </div>

          {/* Loading progress bar */}
          <div className="mt-8 sm:mt-10 mx-auto w-40 sm:w-56 md:w-64">
            <div className="h-[1px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-secondary to-secondary_1 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 7.2,
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </div>
          </div>
        </div>

        {/* Corner decorations */}
        <motion.div
          className="absolute top-6 left-6 sm:top-10 sm:left-10 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-l-2 border-secondary/30 rounded-tl-lg"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        />
        <motion.div
          className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 w-8 h-8 sm:w-12 sm:h-12 border-b-2 border-r-2 border-secondary/30 rounded-br-lg"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        />
      </motion.div>
    </AnimatePresence>
  )
}

export default SplashScreen
