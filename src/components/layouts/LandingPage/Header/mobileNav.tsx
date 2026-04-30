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
      url: "/",
      name: "Home",
    },
    {
      url: "/about",
      name: "About",
    },
    {
      url: "/human-books",
      name: "Human Books",
    },
  ]

  return (
    <div className="relative mt-0 ">
      <div
        className={`fixed top-0 right-0 h-screen w-3/4  bg-primary/90 shadow-lg transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="py-8 px-5">
          <div className="flex justify-between">
            <NavLink to="/">
              <LopLogo width="120" height="60" />
            </NavLink>
            <button onClick={toggleMenu}>
              <Icon icon="ph:x" width="26" height="26" className="text-white" />
            </button>
          </div>

          <div className="mt-8 flex flex-col gap-y-6 text-xs pb-3 border-b-[0.25px] border-[#C8C8C8]">
            {links?.map((link) => (
              <NavLink
                key={link.url}
                className={({ isActive }) =>
                  `text-sm text-text2/80 px-3  ${isActive ? "font-semibold bg-[#F1F1F1] rounded-full py-3 " : "text-white"}`
                }
                to={link.url}
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileNavigation
