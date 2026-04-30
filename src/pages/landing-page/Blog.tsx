import Footer from "../../components/landingPage/Footer"
import blog from "../../assets/pngs/blog.png"
import profile from "../../assets/pngs/avatar.png"
import NewsLetter from "../../components/landingPage/NewsLetterSection"
import Mission from "../../components/landingPage/Mission"
import BlogCard from "../../components/landingPage/BlogCard"
import { motion, useAnimation } from "framer-motion"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"

const Blog = () => {
  const blogData = [
    {
      blogImage: blog,
      date: "19th August 2024",
      tag: "Human Books",
      title: "Becoming a Successful Learner",
      profileImage: profile,
      subtitle:
        "Anti-colonial feminist organizing and world-building bring to the fore the interrogation of the continued",
      name: "Reuben Victoria",
      role: "Mechanical Engineer",
    },
    {
      blogImage: blog,
      date: "19th August 2024",
      tag: "Human Books",
      title: "Becoming a Successful Learner",
      profileImage: profile,
      subtitle:
        "Anti-colonial feminist organizing and world-building bring to the fore the interrogation of the continued",
      name: "Reuben Victoria",
      role: "Mechanical Engineer",
    },
    {
      blogImage: blog,
      date: "19th August 2024",
      tag: "Human Books",
      title: "Becoming a Successful Learner",
      profileImage: profile,
      subtitle:
        "Anti-colonial feminist organizing and world-building bring to the fore the interrogation of the continued",
      name: "Reuben Victoria",
      role: "Mechanical Engineer",
    },
      {
      blogImage: blog,
      date: "19th August 2024",
      tag: "Human Books",
      title: "Becoming a Successful Learner",
      profileImage: profile,
      subtitle:
        "Anti-colonial feminist organizing and world-building bring to the fore the interrogation of the continued",
      name: "Reuben Victoria",
      role: "Mechanical Engineer",
    },
    {
      blogImage: blog,
      date: "19th August 2024",
      tag: "Human Books",
      title: "Becoming a Successful Learner",
      profileImage: profile,
      subtitle:
        "Anti-colonial feminist organizing and world-building bring to the fore the interrogation of the continued",
      name: "Reuben Victoria",
      role: "Mechanical Engineer",
    },
    {
      blogImage: blog,
      date: "19th August 2024",
      tag: "Human Books",
      title: "Becoming a Successful Learner",
      profileImage: profile,
      subtitle:
        "Anti-colonial feminist organizing and world-building bring to the fore the interrogation of the continued",
      name: "Reuben Victoria",
      role: "Mechanical Engineer",
    },
  ]


  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.2 })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }else {
      controls.start("hidden")
    }
  }, [controls, inView])

 
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2, 
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  }

  return (
    <div className="w-full h-full grid place-items-center">
      <div className="w-full px-5 py-12 md:py-24 text-center place-items-center gap-5 md:gap-14 grid place-content-center ">
        <h1 className="text-2xl md:text-3xl text-primary_100 lg:text-5xl font-custom">From the Blog</h1>

        <div ref={ref} className="w-full md:px-16 flex items-center flex-wrap justify-between md:gap-x-3 gap-y-10 md:gap-y-20">
          {blogData.map((blogs, index) => (
            <motion.div
              key={index}
              custom={index} 
              initial="hidden"
              animate={controls}
              variants={cardVariants}
            >
              <BlogCard blogs={blogs} />
            </motion.div>
          ))}
        </div>
      </div>
      <Mission />
      <NewsLetter />
      <Footer />
    </div>
  )
}

export default Blog
