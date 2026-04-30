import { NavLink, Link } from "react-router-dom"
import { LopLogo } from "../../../../assets/logos/LopLogo"
import { Icon } from "@iconify/react"
import { useState } from "react"
// import { Button } from "../../../core/Button/Button"
import MobileNavigation from "./mobileNav"

const Header = () => {
  // const navigate = useNavigate()
  const [openNav, setOpenNav] = useState(false)
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
    <div className="bg-primary_100 h-fit w-full flex py-2 md:py-3 px-2 md:px-20 font-light ">
      <nav className="flex items-center w-full justify-between xl:max-w-screen-xl">
        <Link to="/" className="">
          <LopLogo width="120" height="60" />
        </Link>
        <div className="hidden md:flex items-center space-x-5 md:space-x-20">
          {links.map((link, index) => (
            <NavLink
              key={index}
              to={link.url}
              className={({ isActive }) => `text-sm  ${isActive ? "text-secondary" : "text-white"}`}
            >
              {link.name}
            </NavLink>
          ))}
          <a href="https://liberationallianceafrica.com/" target="/" className="text-white">
            Libration Alliance Africa{" "}
          </a>
        </div>
        <div>
          <button className="block lg:hidden" onClick={() => setOpenNav(true)}>
            <Icon icon="ic:outline-menu" className="block lg:hidden w-[29px] h-[24px] text-white" />
          </button>
        </div>

        {openNav && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-90 z-40" onClick={() => setOpenNav(false)} />

            <MobileNavigation isOpen={openNav} toggleMenu={() => setOpenNav(!openNav)} />
          </>
        )}

        {/* <div className="flex items-center gap-x-2 text-white">
          <Button onClick={() => navigate("/login")} theme="secondary" size="40" className="text-primary">
            Login
          </Button>
        </div> */}
      </nav>
    </div>
  )
}

export default Header
