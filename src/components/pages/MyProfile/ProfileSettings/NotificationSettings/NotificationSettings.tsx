import { Toggle } from "../../../../core/Switch/Switch"

const NotificationSettings = () => {
  return (
    <div className="w-full">
      <h1 className="text-lg font-medium text-primary/80">Notification Information</h1>
      <div className="py-8 space-y-4">
        <div className="flex w-full bg-primary/5 justify-between items-center p-4 rounded-lg">
          <div>
            <h1 className="text-sm font-bold text-primary/80">Stay up to date</h1>
            <p className="text-sm  w-10/12 lg:w-full text-primary/80">Frequently send me update activities</p>
          </div>
          <Toggle size="24" checked={true} />
        </div>
        <div className="flex w-full bg-primary/5 justify-between items-center p-4 rounded-lg">
          <div>
            <h1 className="text-sm font-bold text-primary/80">News Letter</h1>
            <p className="text-sm  w-10/12 lg:w-full text-primary/80">Receive updates and info about events</p>
          </div>
          <Toggle size="24" checked={false} />
        </div>
        <div className="flex w-full bg-primary/5 justify-between items-center p-4 rounded-lg">
          <div>
            <h1 className="text-sm font-bold text-primary/80">Receive your reports</h1>
            <p className="text-sm w-10/12 lg:w-full text-primary/80">Get periodic summary of your activities</p>
          </div>
          <Toggle size="24" checked={true} />
        </div>
      </div>
    </div>
  )
}

export default NotificationSettings
