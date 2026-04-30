import { Fragment } from "react"
import { NavLink } from "react-router-dom"
import { Avatar } from "../../core/Avatar/Avatar"
import { Menu, MenuButton, Transition, MenuItem, MenuItems } from "@headlessui/react"
import { Icon } from "@iconify/react"
import { logoutUser } from "../../../utils/fn"

const MenuDropdown = () => {
  const profile = JSON.parse(localStorage.getItem("profile") ?? "") || null

  return (
    <Menu as="div" className="relative">
      <MenuButton className="flex gap-x-1 items-center">
        <Avatar size="32" image={profile?.avatar ?? `${profile?.first_name} ${profile.last_name}`} />
        <Icon icon="ph:caret-down" />
      </MenuButton>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-50"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-50"
      >
        <MenuItems className="absolute z-[1] right-0 mt-2 py-4 w-[190px] origin-top-right rounded-lg bg-white shadow-lg focus:outline-none">
          <MenuItem as="div" className=" px-4 flex items-center gap-1 border-b-1 border-grey_2 pb-4">
            <Avatar size="32" image={profile?.avatar ?? `${profile?.first_name} ${profile.last_name}`} />
            <div>
              <p className="text-sm text-primary/80 capitalize">{`${profile?.first_name} ${profile.last_name}`}</p>
              <p className="work-sans text-[10px] font-medium text-primary capitalize">{profile?.user_type ?? ""}</p>
            </div>
          </MenuItem>

          <MenuItem as="div" className="px-4 py-4 text-primary_100/80 text-sm">
            <NavLink to="/dashboard/my-profile">My Profile</NavLink>
          </MenuItem>

          <MenuItem as="div" className="px-4 py-4 text-primary_100/80 text-sm">
            <NavLink to="/dashboard/books?tab=current-read">My Current Reads </NavLink>
          </MenuItem>
          <MenuItem as="div" className="px-4 py-4 text-primary_100/80 text-sm">
            <NavLink to="/dashboard/achievements">My Achievements</NavLink>
          </MenuItem>
          <MenuItem as="div" className="px-4 py-4 text-primary_100/80 text-sm">
            <NavLink to="/dashboard/profile-settings">My Account Settings</NavLink>
          </MenuItem>
          <MenuItem as="div" className="px-4 py-4 text-primary_100/80 text-sm">
            <button onClick={() => logoutUser()}>Log out</button>
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  )
}

export default MenuDropdown
