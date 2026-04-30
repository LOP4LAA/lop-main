import { NavLink } from "react-router-dom"
// import { Icon } from "@iconify/react"
import MenuDropdown from "./MenuDropDown"
// import { RenderIf } from "../../hoc/RenderIf/RenderIf"
import "./dashboardlayout.css"

const TopHeader = () => {
  const links = [
    {
      url: "/dashboard",
      name: "Dashboard",
    },
    {
      url: "/dashboard/books?tab=current-read",
      name: "Human Books",
    },
    {
      url: "/dashboard/activity?activity=all",
      name: "Activity",
    },
    {
      url: "/dashboard/events?event=all",
      name: "Events",
    },
    // {
    //   url: "/dashboard/blog",
    //   name: "Blog",
    // },
  ]

  // const notifications = 3

  return (
    <nav className="w-full pt-2  flex items-center lg:justify-between">
      <div className="hidden text-nowrap w-full lg:flex navigation items-center">
        {links.map((link, index) => (
          <NavLink
            key={index}
            to={link.url}
            className={({ isActive }) => `text-sm text-primary ${isActive ? "border-b-[3px] border-secondary_1" : ""}`}
            end={link.url === "/dashboard"}
          >
            {link?.name}
          </NavLink>
        ))}
      </div>
      <div className="w-full flex items-center navigation justify-end">
        <div className="relative">
          {/* <NavLink to="/messages" className="cursor-pointer">
            <Icon icon="ph:envelope-bold" className="text-primary_100 w-6 h-6" />
            <RenderIf condition={unreadMessages > 0}>
              <span className="absolute -top-2 -right-2 bg-secondary_1 text-white text-xs w-[18px] h-[18px] flex items-center justify-center rounded-full">
                {unreadMessages}
              </span>
            </RenderIf>
          </NavLink> */}
        </div>
        {/* <NavLink to="/forum" className="cursor-pointer">
          <Icon icon="ph:users-three-fill" className="text-primary_100 w-6 h-6" />
        </NavLink> */}
        {/* <div className="relative">
          <NavLink to="/dashboard/activity?activity=all" className="cursor-pointer">
            <div className="relative">
              <Icon icon="ph:bell-bold" className="text-primary_100 w-6 h-6" />
              <RenderIf condition={notifications > 0}>
                <span className="absolute -top-2 -right-2 bg-secondary_1 text-white text-xs w-[18px] h-[18px] flex items-center justify-center rounded-full"></span>
              </RenderIf>
            </div>
          </NavLink>
        </div> */}
        <MenuDropdown />
      </div>
    </nav>
  )
}

export default TopHeader
