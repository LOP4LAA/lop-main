import { ReactNode } from "react"
import { motion } from "framer-motion"

interface AuthFormProps {
  children: ReactNode
  title: string
  caption?: string
  onSubmit?: any
  className?: string
}

const AuthForm = ({ children, title, caption, onSubmit, className }: AuthFormProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.4, staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  }

  return (
    <motion.div
      className={`${className} auth-form`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="text-center lg:text-start space-y-2 sm:space-y-3 lg:space-y-6 mb-6 sm:mb-8 lg:mb-10"
        variants={itemVariants}
      >
        <motion.h1
          className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-normal text-primary tracking-wide font-custom leading-tight"
          variants={itemVariants}
        >
          {title}
        </motion.h1>
        {caption && (
          <motion.p
            className="text-primary_100/80 font-medium text-xs sm:text-sm"
            variants={itemVariants}
          >
            {caption}
          </motion.p>
        )}
      </motion.div>
      <motion.form
        onSubmit={onSubmit}
        variants={itemVariants}
        className="space-y-4 sm:space-y-6"
      >
        {children}
      </motion.form>
    </motion.div>
  )
}

export default AuthForm
