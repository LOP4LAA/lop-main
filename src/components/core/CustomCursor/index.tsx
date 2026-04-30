import { useEffect, useRef, useState } from "react"

interface CursorSettings {
  mouseX: number
  mouseY: number
  xPos: number
  yPos: number
  speed: number
}

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null)
  const [, setSettings] = useState<CursorSettings>({
    mouseX: 0,
    mouseY: 0,
    xPos: 0,
    yPos: 0,
    speed: 8,
  })

  useEffect(() => {
    const cursor = cursorRef.current

    if (!cursor) return

    const cursorWidth = cursor.offsetWidth
    const cursorHeight = cursor.offsetHeight

    const handleMouseMove = (e: MouseEvent) => {
      setSettings((prevSettings) => ({
        ...prevSettings,
        mouseX: e.clientX,
        mouseY: e.clientY,
      }))
    }

    const animate = () => {
      setSettings((prevSettings) => {
        const xPos = prevSettings.xPos + (prevSettings.mouseX - prevSettings.xPos) / prevSettings.speed
        const yPos = prevSettings.yPos + (prevSettings.mouseY - prevSettings.yPos) / prevSettings.speed

        if (cursor) {
          cursor.style.transform = `translate(${xPos - cursorWidth / 2}px, ${yPos - cursorHeight / 2}px)`
        }

        return { ...prevSettings, xPos, yPos }
      })

      requestAnimationFrame(animate)
    }

    animate()
    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="fixed z-100 mix-blend-lighten top-0 left-0 w-10 h-10  bg-secondary rounded-full pointer-events-none transition-transform duration-200 ease-out"
    ></div>
  )
}

export default CustomCursor
