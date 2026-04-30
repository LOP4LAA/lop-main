import { Avatar } from "../core/Avatar/Avatar"

const Teammate = ({ image, name, role }: { image: string; name: string; role: string }) => {
  return (
    <div className="grid place-content-center place-items-center text-center gap-2 md:gap-5">
      <Avatar image={image} size="160" />
      <div className="grid gap-1 font-kanit">
        <h3 className="text-sm md:text-xl text-primary_100 ">{name}</h3>
        <p className="text-[#999999] text-xs md:text-base">{role}</p>
      </div>
    </div>
  )
}

export default Teammate
