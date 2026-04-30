import { motion } from "framer-motion"
import { Icon } from "@iconify/react"
import { NavLink } from "react-router-dom"
import { LopLogo } from "@/assets/logos/LopLogo"

interface Props {
  toggleMenu: () => void
  isOpen: boolean
}

const MobileNavigation = ({ isOpen, toggleMenu }: Props) => {
  const links = [
    {
      url: "/dashboard",
      name: "Dashboard",
      icon: "material-symbols:dashboard-outline",
    },
    {
      url: "/dashboard/books?tab=current-read",
      name: "Human Books",
      icon: "material-symbols:menu-book-outline",
    },
    {
      url: "/dashboard/activity?activity=all",
      name: "Activity",
      icon: "material-symbols:history",
    },
    {
      url: "/dashboard/events?event=all",
      name: "Events",
      icon: "material-symbols:event-outline",
    },
  ]

  const sidebarVariants = {
    hidden: { x: "-100%" },
    visible: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
    exit: {
      x: "-100%",
      transition: { duration: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  }

  return (
    <motion.div
      className="fixed top-0 left-0 h-screen w-[280px] sm:w-[320px] max-w-[85vw] bg-gradient-to-b from-primary to-primary_100 shadow-2xl z-50"
      variants={sidebarVariants}
      initial="hidden"
      animate={isOpen ? "visible" : "hidden"}
      exit="exit"
    >
      <div className="py-6 sm:py-8 px-4 sm:px-6 h-full flex flex-col">
        {/* Header */}
        <motion.div
          className="flex justify-between items-center"
          variants={itemVariants}
        >
          <NavLink to="/" onClick={toggleMenu}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <LopLogo width="100" height="50" />
            </motion.div>
          </NavLink>
          <motion.button
            onClick={toggleMenu}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Close menu"
          >
            <Icon icon="ph:x" width="24" height="24" className="text-white" />
          </motion.button>
        </motion.div>

        {/* Navigation Links */}
        <nav className="mt-8 sm:mt-10 flex-1">
          <motion.ul className="flex flex-col gap-2 sm:gap-3">
            {links.map((link, index) => (
              <motion.li
                key={link.url}
                variants={itemVariants}
                custom={index}
              >
                <NavLink
                  to={link.url}
                  onClick={toggleMenu}
                  className={({ isActive }) =>
                    `flex items-center gap-3 sm:gap-4 px-4 py-3 sm:py-4 rounded-xl text-sm sm:text-base transition-all duration-200 ${
                      isActive
                        ? "bg-white text-primary font-semibold shadow-lg"
                        : "text-white/90 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        icon={link.icon}
                        width="22"
                        height="22"
                        className={isActive ? "text-primary" : "text-white/80"}
                      />
                      <span>{link.name}</span>
                      {isActive && (
                        <motion.div
                          className="ml-auto"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500 }}
                        >
                          <Icon
                            icon="material-symbols:check-circle"
                            width="20"
                            height="20"
                            className="text-secondary"
                          />
                        </motion.div>
                      )}
                    </>
                  )}
                </NavLink>
              </motion.li>
            ))}
          </motion.ul>
        </nav>

        {/* Footer */}
        <motion.div
          className="pt-4 border-t border-white/10"
          variants={itemVariants}
        >
          <p className="text-white/60 text-xs sm:text-sm text-center">
            Library of Perspectives
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default MobileNavigation
