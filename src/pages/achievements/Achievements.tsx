import { Breadcrumb } from "../../components/core/BreadCrumb/BreadCrumb"
import { useAchievements } from "./useAchievements"
import StatisticsCard from "../../components/core/StatCard/StatsCard"
import AchievementsLeaderBoard from "../../components/pages/achievements/LeaderBoard/LeaderBoard"
// import AchievementsPointHistory from "../../components/pages/achievements/PointsHistory/PointsHistory"
import AchievementsBadges from "../../components/pages/achievements/Badges/Badges"

const Achievements = () => {
  const { breadCrumbOptions, statisticsData, leaderBoardData, badgeData, isLoadingAchievements } = useAchievements()

  return (
    <main className="py-2">
      <Breadcrumb goBackRoute="/dashboard" options={breadCrumbOptions} />
      <h1 className="font-custom text-[32px] text-primary_100">Achievements</h1>
      <div className="w-full lg:w-10/12 grid gap-2  grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
        {statisticsData.map((stat, index) => (
          <StatisticsCard key={index} title={stat.title} value={stat.value} icon={stat.icon} />
        ))}
      </div>
      <div className="mt-6 w-full lg:w-11/12 lg:mt-12 grid grid-cols-1 md:grid-cols-2 space-y-10 gap-x-[100px]">
        <AchievementsLeaderBoard data={leaderBoardData} isLoading={isLoadingAchievements} />
        <div className="space-y-10">
          {/* <AchievementsPointHistory data={pointsHistoryData} /> */}
          <AchievementsBadges data={badgeData} />
        </div>
      </div>
    </main>
  )
}

export default Achievements
