import React from "react"

interface ProgressBarProps {
  percentage: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  return (
    <div className="space-y-2">
      <div
        style={{
          width: "100%",
          height: "5px",
          backgroundColor: "#E0E0E0",
          borderRadius: "5px",
          overflow: "hidden",
          marginTop: "5px",
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: "100%",
            backgroundColor: "#3F3D56",
            borderRadius: "5px",
          }}
        />
      </div>
      <div className="flex justify-between text-[0.625rem] open-sans  text-primary">
        <span>{percentage}% Complete</span>
      </div>
    </div>
  )
}

export default ProgressBar
