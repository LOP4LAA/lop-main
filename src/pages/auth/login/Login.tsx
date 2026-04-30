import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "../../../components/core/Button/Button"
import { InputComponent } from "../../../components/core/Input/Input"
import AuthForm from "../../../components/pages/Auth/AuthForm/AuthForm"
import useLogin from "./useLogin"

const LoginPage = () => {
  const navigate = useNavigate()
  const { handleLoginUser, isDisabled, formValues, handleInputChange, status } = useLogin()

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.3, duration: 0.4 },
    },
  }

  return (
    <div className="w-full px-2 sm:px-4">
      <AuthForm
        title="Log in to the Library of Perspectives"
        caption="Please enter your details below to sign in"
        onSubmit={(e: unknown) => {
          handleLoginUser(e)
        }}
      >
        <div className="space-y-4 sm:space-y-6">
          <motion.div
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <InputComponent
              id="email"
              name="email"
              label="Your Email Address"
              value={formValues.email}
              onChange={handleInputChange}
            />
          </motion.div>

          <motion.div
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            <InputComponent
              id="password"
              type="password"
              name="password"
              label="Your Password"
              value={formValues.password}
              onChange={handleInputChange}
              optional={
                <motion.button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-grey hover:text-secondary_1 font-light cursor-pointer text-xs sm:text-sm transition-colors duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Forgot Password?
                </motion.button>
              }
            />
          </motion.div>
        </div>

        <motion.div
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          className="mt-6 sm:mt-8"
        >
          <motion.div
            whileHover={{ scale: isDisabled() ? 1 : 1.01 }}
            whileTap={{ scale: isDisabled() ? 1 : 0.99 }}
          >
            <Button
              type="submit"
              theme="secondary"
              size="44"
              className="w-full"
              disabled={isDisabled()}
              loading={status === "pending"}
            >
              <span className="text-sm sm:text-base">Submit</span>
            </Button>
          </motion.div>
        </motion.div>
      </AuthForm>
    </div>
  )
}

export default LoginPage
