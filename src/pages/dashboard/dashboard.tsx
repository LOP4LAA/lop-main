import { motion } from "framer-motion";
import StatisticsCard from "../../components/core/StatCard/StatsCard";
import useDashboard from "./useDashboard";
import DashboardBooks from "../../components/pages/dashboard/human-books/humanBooks";
import DashboardEvents from "../../components/pages/dashboard/events/Events";

const Dashboard = () => {
  const { statisticsData, enrolledBooksData, isEnrolledBooksLoading } = useDashboard();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  return (
    <motion.main
      className="py-3 sm:py-4 md:py-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Welcome Header */}
      <motion.h1
        className="font-custom text-xl sm:text-2xl md:text-3xl text-primary"
        variants={itemVariants}
      >
        Welcome Reader,
      </motion.h1>

      {/* Main Grid Layout */}
      <div className="py-4 sm:py-6 grid w-full grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Left Column - Stats and Books */}
        <div className="flex flex-col h-full gap-6 sm:gap-8 md:gap-12 lg:col-span-2">
          {/* Statistics Section */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6"
            variants={itemVariants}
          >
            {statisticsData.map((stat, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                custom={index}
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <StatisticsCard
                  title={stat.title}
                  value={stat.value}
                  icon={stat.icon}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Dashboard Books Section */}
          <motion.div
            className="rounded-xl sm:rounded-tr-[10px] sm:rounded-bl-[10px] sm:rounded-br-[10px] bg-white px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            variants={itemVariants}
          >
            <DashboardBooks
              data={enrolledBooksData ?? []}
              isLoading={isEnrolledBooksLoading}
            />
          </motion.div>
        </div>

        {/* Right Column - Events */}
        <motion.div
          className="lg:col-span-1 max-h-[500px] sm:max-h-[600px] lg:max-h-[800px] overflow-y-auto rounded-xl"
          variants={itemVariants}
        >
          <DashboardEvents />
        </motion.div>
      </div>
    </motion.main>
  );
};

export default Dashboard;
