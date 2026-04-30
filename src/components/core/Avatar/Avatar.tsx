import React, { useMemo } from "react"
import "./avatar.css"
import { RenderIf } from "../../hoc/RenderIf/RenderIf"
// import {Icon} from "@iconify/react"

// export interface AvatarProps {
//   /**
//    * Prop that accepts image url.
//    */
//   image?: string
//   /**
//    * Prop that accepts image size
//    */
//   size?: "16" | "24" | "32" | "40" | "48" | "89" | "97" | '160'
//   /**
//    * Should render icon instead
//    */
//   icon?: boolean
//   /**
//    * Should render stroke on avatar
//    */
//   stroke?: boolean
//   /**
//    * Other unknown attributes
//    */
//   [x: string]: unknown
// }

// const avatar = {
//   "16": "cc-avatar--16",
//   "24": "cc-avatar--24",
//   "32": "cc-avatar--32",
//   "40": "cc-avatar--40",
//   "48": "cc-avatar--48",
//   "89": "cc-avatar--89",
//   "97": "cc-avatar--97",
//   "160": "cc-avatar--160",
// }

// /**
//  * Avatar component for rendering user image or user initials
//  */
// export const Avatar: React.FC<AvatarProps> = ({ image, size = "32", ...props }: AvatarProps) => {
//   const initials = useMemo(() => {
//     return String(image)
//       .split(" ")
//       .map((text) => text.charAt(0))
//       .join("")
//       .slice(0, 2)
//   }, [image])

//   console.log(image)
//   console.log(initials)

//   return (
//     <div className={["cc-avatar", avatar[size], props.stroke && "cc-avatar--stroke"].join(" ").trim()} {...props}>
//       <RenderIf condition={!!String(image)}>
//         <img src={image} className={["cc-avatar-image", avatar[size]].join(" ").trim()} alt="user" {...props} />
//       </RenderIf>
//       <RenderIf condition={!String(image).startsWith("http") && !props?.icon}>
//         <span className="uppercase">{initials}</span>
//       </RenderIf>
//       {/* <RenderIf condition={!String(image).startsWith("http") && !!props?.icon}>
//         <Icon icon="ph:user-fill" />
//       </RenderIf> */}
//     </div>
//   )
// }



export interface AvatarProps {
  /**
   * Prop that accepts image url.
   */
  image?: string
  /**
   * Prop that accepts image size
   */
  size?: "16" | "24" | "32" | "40" | "48" | "89" | "97" | "160"
  /**
   * Should render icon instead
   */
  icon?: boolean
  /**
   * Should render stroke on avatar
   */
  stroke?: boolean
  /**
   * Other unknown attributes
   */
  [x: string]: unknown
}

const avatar = {
  "16": "cc-avatar--16",
  "24": "cc-avatar--24",
  "32": "cc-avatar--32",
  "40": "cc-avatar--40",
  "48": "cc-avatar--48",
  "89": "cc-avatar--89",
  "97": "cc-avatar--97",
  "160": "cc-avatar--160"
}

/**
 * Avatar component for rendering user image or user initials
 */
export const Avatar: React.FC<AvatarProps> = ({ image, size = "32", ...props }: AvatarProps) => {
  const initials = useMemo(() => {
    return String(image)
      .split(" ")
      .map((text) => text.charAt(0))
      .join("")
      .slice(0, 2)
  }, [image])

  return (
    <div className={["cc-avatar", avatar[size], props.stroke && "cc-avatar--stroke"].join(" ").trim()} {...props}>
      <RenderIf condition={String(image).startsWith("http")}>
        <img src={image} className={["cc-avatar-image", avatar[size]].join(" ").trim()} alt="user" {...props} />
      </RenderIf>
      <RenderIf condition={!String(image).startsWith("http") && !props?.icon}>
        <span className="uppercase">{initials}</span>
      </RenderIf>
      {/* <RenderIf condition={!String(image).startsWith("http") && !!props?.icon}>
        <Icon icon="ph:user-fill" />
      </RenderIf> */}
    </div>
  )
}
