import { motion } from "framer-motion"
import useEvents from "./useEvents"
import EventCard from "../../components/pages/events/EventCard/EventCard"
import { ModuleStepper } from "../../components/core/Tabs/Tabs"
import { useNavigate } from "react-router-dom"
import { RenderIf } from "../../components/hoc/RenderIf/RenderIf"
import { LoaderIcon } from "react-hot-toast"
import { formatDay, formatTime } from "../../utils/formatDate"

const Events = () => {
  const { eventsData, tabs, currentTab, isLoading } = useEvents()
  const featuredEvent = eventsData?.length > 0 && eventsData[0]
  const navigate = useNavigate()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3, staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  }

  return (
    <motion.main
      className="py-3 sm:py-4 md:py-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div>
        <motion.h1
          className="font-custom text-xl sm:text-2xl md:text-3xl lg:text-[32px] text-primary"
          variants={itemVariants}
        >
          Events
        </motion.h1>

        <div className="w-full mt-6 sm:mt-8 md:mt-10 flex flex-col px-0 sm:px-2 lg:px-8">
          {/* Featured Event */}
          <RenderIf condition={featuredEvent}>
            <motion.div
              className="bg-secondary/15 w-full py-4 sm:py-5 px-3 sm:px-4 md:px-6 rounded-xl sm:rounded-2xl"
              variants={itemVariants}
            >
              <h3 className="text-primary text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6 md:mb-8 font-medium">
                Featured Event
              </h3>
              <EventCard
                title={featuredEvent.title}
                from={featuredEvent.event_start_date ? formatTime(featuredEvent?.event_start_date) : ""}
                to={featuredEvent?.event_end_date ? formatTime(featuredEvent?.event_end_date) : ""}
                organizer={featuredEvent?.organizer_name}
                venue={featuredEvent?.venue ?? ""}
                date={featuredEvent?.event_start_date ? formatDay(featuredEvent?.event_start_date) : ""}
                onClick={() => navigate(`${featuredEvent?.id}`)}
              />
            </motion.div>
          </RenderIf>

          {/* Events List */}
          <motion.div
            className={featuredEvent ? "mt-6 sm:mt-8 md:mt-10" : ""}
            variants={itemVariants}
          >
            <ModuleStepper tabs={tabs} currentTab={currentTab} />

            <RenderIf condition={isLoading}>
              <div className="flex items-center justify-center py-12 sm:py-16 md:py-20">
                <LoaderIcon className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
            </RenderIf>

            <RenderIf condition={!isLoading}>
              <div>
                <RenderIf condition={eventsData?.length === 0}>
                  <motion.div
                    className="text-center py-12"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <h1 className="open-sans text-primary_100 text-base sm:text-lg">
                      There are no events at this time
                    </h1>
                  </motion.div>
                </RenderIf>

                <RenderIf condition={eventsData?.length > 0}>
                  <motion.div
                    className="grid gap-4 sm:gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {eventsData?.map((event: any, index: number) => (
                      <motion.div
                        key={event?.id}
                        variants={itemVariants}
                        custom={index}
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <EventCard
                          eventImg={event?.cover_photo ? event?.cover_photo : "/assets/events-placeholder.png"}
                          title={event.title}
                          from={event.event_start_date ? formatTime(event?.event_start_date) : ""}
                          to={event?.event_end_date ? formatTime(event?.event_end_date) : ""}
                          organizer={event?.organizer_name}
                          venue={event?.venue ?? ""}
                          date={event?.event_start_date ? formatDay(event?.event_start_date) : ""}
                          onClick={() => navigate(`${featuredEvent?.id}`)}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </RenderIf>
              </div>
            </RenderIf>
          </motion.div>
        </div>
      </div>
    </motion.main>
  )
}

export default Events
