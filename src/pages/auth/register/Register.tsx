import { motion } from "framer-motion"
import AuthForm from "../../../components/pages/Auth/AuthForm/AuthForm"
import { InputComponent } from "../../../components/core/Input/Input"
import { Button } from "../../../components/core/Button/Button"
import Phone from "../../../components/core/PhoneInput/PhoneInput"
import useRegister from "./useRegister"

const RegisterPage = () => {
  const { handleRegister, phone, setPhone, handleChange, formErrors, status, isDisabled, formData } = useRegister()

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.08,
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
      transition: { delay: 0.5, duration: 0.4 },
    },
  }

  return (
    <div className="w-full px-2 sm:px-4">
      <AuthForm
        className="auth-form mb-6 sm:mb-10"
        title="Sign Up"
        caption="Please enter your details for your account to be created."
        onSubmit={handleRegister}
      >
        <div className="space-y-4 sm:space-y-6">
          <motion.div
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <InputComponent
              id="name"
              label="Your Full name"
              name="full_name"
              onChange={handleChange}
              error={formErrors?.full_name}
            />
          </motion.div>

          <motion.div
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            <Phone
              showError
              error={formErrors?.phone_number}
              value={phone}
              onChange={setPhone}
              label="Phone number"
            />
          </motion.div>

          <motion.div
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            <InputComponent
              name="email"
              onChange={handleChange}
              type="email"
              id="email"
              label="Your Email"
              error={formErrors?.email}
            />
          </motion.div>

          <motion.div
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            custom={3}
            className="flex flex-col space-y-1"
          >
            <label
              className="text-xs sm:text-sm font-medium text-primary_100/80 pb-1 sm:pb-2"
              htmlFor="age_range"
            >
              Age Range
            </label>
            <select
              name="age_range"
              id="age_range"
              value={formData?.age_range}
              onChange={handleChange}
              className={`px-3 h-[40px] sm:h-[44px] text-sm text-primary_100 w-full outline-0 border-grey_1 hide_tap border-1
              rounded-[4px] focus:border-secondary_1 placeholder:text-sm transition-all duration-200 bg-white
              ${formErrors?.age_range ? "border-red-500" : "hover:border-primary_100/50"}`}
            >
              <option value="">Select Age Range</option>
              <option value="16-20">16-20</option>
              <option value="21-30">21-30</option>
              <option value="31-45">31-45</option>
              <option value="46-70">46-70</option>
            </select>
            {formErrors?.age_range && (
              <motion.p
                className="text-red-500 text-xs sm:text-sm mt-1"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {formErrors?.age_range}
              </motion.p>
            )}
          </motion.div>

          <motion.div
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            custom={4}
          >
            <InputComponent
              id="password"
              type="password"
              name="password"
              label="Password"
              onChange={handleChange}
              error={formErrors?.password}
            />
          </motion.div>
        </div>

        <motion.div
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          className="mt-8 sm:mt-12"
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
              loading={status === "pending"}
              disabled={isDisabled()}
            >
              <span className="text-sm sm:text-base">Submit</span>
            </Button>
          </motion.div>
        </motion.div>
      </AuthForm>
    </div>
  )
}

export default RegisterPage
