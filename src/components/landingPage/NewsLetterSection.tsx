import { motion, useAnimation } from "framer-motion"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { Button } from "../core/Button/Button"
import { InputComponent } from "../core/Input/Input"
import useHome from "../../pages/landing-page/useHome"

const NewsLetter = () => {
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: false })

  const { formData, setFormData, isLoading, handleSubmit } = useHome()

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.15 },
    },
  }

  const headingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const inputVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, delay: 0.3 },
    },
  }

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="flex flex-col items-center gap-6 sm:gap-8 md:gap-10 py-12 sm:py-16 md:py-20 lg:py-24 text-center w-full px-4 sm:px-6 md:px-8 max-w-screen-xl mx-auto"
    >
      {/* Heading Section */}
      <motion.div variants={headingVariants} className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl space-y-2 sm:space-y-3">
        <h3 className="font-custom text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-primary_100 leading-tight">
          Sign up for our Newsletter LiberTea
        </h3>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-primary_100/80 font-andada">
          Stay connected for updates on the next cohort.
        </p>
      </motion.div>

      {/* Form Section */}
      <motion.form
        variants={containerVariants}
        className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-3xl"
        onSubmit={handleSubmit}
      >
        <motion.div variants={inputVariants} className="w-full sm:flex-1">
          <InputComponent
            type="text"
            id="full_name"
            name="full_name"
            value={formData?.full_name}
            variant="primary w-full"
            placeholder="Full name"
            onChange={(e: any) => {
              setFormData((prevFormData) => ({
                ...prevFormData,
                full_name: e.target.value,
              }))
            }}
          />
        </motion.div>

        <motion.div variants={inputVariants} className="w-full sm:flex-1">
          <InputComponent
            type="email"
            id="email"
            name="email"
            variant="primary w-full"
            placeholder="Email address"
            value={formData?.email}
            onChange={(e: any) => {
              setFormData((prevFormData) => ({
                ...prevFormData,
                email: e.target.value,
              }))
            }}
          />
        </motion.div>

        <motion.div
          variants={buttonVariants}
          className="w-full sm:w-auto"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            disabled={formData?.email.length === 0 || formData?.full_name.length === 0}
            type="submit"
            className="w-full sm:w-auto whitespace-nowrap"
            loading={isLoading}
            theme="secondary"
            size="44"
          >
            <span className="text-primary_100 text-sm font-medium px-2">Submit</span>
          </Button>
        </motion.div>
      </motion.form>
    </motion.section>
  )
}

export default NewsLetter
