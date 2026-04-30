import { type ReactNode, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { RequireAuth } from "../../hoc/RequireAuth/RequireAuth"
import "../AuthLayout/authlayout.css"
import { Icon } from "@iconify/react"
import TopHeader from "./TopHeader"
import "./dashboardlayout.css"
import { NavLink, useLocation } from "react-router-dom"
import loplogo from "@/assets/logos/lop-logo.svg"
import MobileNavigation from "./mobileNav"

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [openNav, setOpenNav] = useState(false)
  const location = useLocation()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3, staggerChildren: 0.1 },
    },
  }

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: 0.2 },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 },
    },
  }

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  }

  return (
    <RequireAuth>
      <main className="page-background z-10 min-h-screen">
        <motion.div
          className="content-container h-full flex flex-col overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Header Section */}
          <motion.header
            className="flex items-center justify-between pb-4 sm:pb-5 md:pb-7 border-b border-gray-200"
            variants={headerVariants}
          >
            <div className="flex w-full px-2 sm:px-3 lg:px-4 items-center gap-4 sm:gap-6 lg:gap-8">
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                {/* Mobile Menu Button */}
                <motion.button
                  className="block lg:hidden p-1 rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={() => setOpenNav(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Open menu"
                >
                  <Icon
                    icon="ic:outline-menu"
                    className="w-6 h-6 sm:w-7 sm:h-6 text-primary/80"
                  />
                </motion.button>

                {/* Logo */}
                <NavLink to="/dashboard" className="flex-shrink-0">
                  <motion.img
                    src={loplogo}
                    alt="Library of Perspectives"
                    className="w-20 sm:w-24 md:w-28 lg:w-32"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  />
                </NavLink>
              </div>

              {/* Desktop Search Placeholder */}
              <div className="hidden lg:block flex-1">
                {/* Search component can go here */}
              </div>
            </div>

            {/* Top Header (User menu, notifications, etc.) */}
            <div className="pr-2 sm:pr-3 md:pr-4 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-none">
              <TopHeader />
            </div>
          </motion.header>

          {/* Mobile Navigation Overlay */}
          <AnimatePresence>
            {openNav && (
              <>
                <motion.div
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                  onClick={() => setOpenNav(false)}
                  variants={backdropVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                />
                <MobileNavigation
                  isOpen={openNav}
                  toggleMenu={() => setOpenNav(false)}
                />
              </>
            )}
          </AnimatePresence>

          {/* Content Section */}
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              className="px-2 sm:px-3 lg:px-4 pt-2 sm:pt-3 lg:pt-4 overflow-y-auto flex-grow"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </main>
    </RequireAuth>
  )
}

export default DashboardLayout
