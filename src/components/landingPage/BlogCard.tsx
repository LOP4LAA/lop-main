import React from "react"
import { Avatar } from "../core/Avatar/Avatar"

interface BlogCardType {
  blogs: {
    blogImage: string
    date: string
    tag: string
    title: string
    profileImage: string
    subtitle: string
    name: string
    role: string
  }
}

const BlogCard: React.FC<BlogCardType> = ({ blogs }) => {
  const { blogImage, date, tag, title, profileImage, subtitle, name, role } = blogs
  return (
    <div className="grid gap-3 md:gap-4 w-full max-w-[344px]">
      <div className="w-full rounded-lg">
        <img src={blogImage} alt="Blog Image" className="w-full h-full rounded-lg" />
      </div>
      <div className="grid w-full gap-1 md:gap-2 text-left font-kanit text-primary_100">
        <div className="flex items-center gap-4 md:gap-8 w-full justify-start">
          <p className="text-xs">{date}</p>
          <div className="bg-[#EBE3E3] text-primary_100 rounded-md px-2 py-1 font-kanit text-[10px]  text-center">{tag}</div>
        </div>
        <h4 className="font-600 text-sm">{title}</h4>
      </div>
      <p className="text-sm  w-full text-primary_100 text-justify">{subtitle} </p>
      <div className="flex items-center gap-2  text-left md:pt-2 w-fit">
        <Avatar image={profileImage} size="40" />
        <div className="text-sm grid gap-0.5 md:gap-1">
          <h5 className="text-primary_100 ">{name}</h5>
          <p className="text-[#999999]">{role}</p>
        </div>
      </div>
    </div>
  )
}

export default BlogCard
