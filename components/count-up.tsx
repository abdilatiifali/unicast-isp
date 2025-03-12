"use client"

import { useState, useEffect, useRef } from "react"
import { useInView } from "framer-motion"

interface CountUpProps {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
}

export function CountUp({ end, duration = 2000, prefix = "", suffix = "", decimals = 0 }: CountUpProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const countRef = useRef<number>(0)
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isInView) return

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp
      }

      const progress = timestamp - startTimeRef.current
      const percentage = Math.min(progress / duration, 1)

      // Easing function (ease-out)
      const easeOutQuad = (t: number) => t * (2 - t)
      const easedProgress = easeOutQuad(percentage)

      countRef.current = easedProgress * end
      setCount(countRef.current)

      if (progress < duration) {
        requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(animate)

    return () => {
      startTimeRef.current = null
    }
  }, [isInView, end, duration])

  const formattedCount = count.toFixed(decimals)

  return (
    <span ref={ref}>
      {prefix}
      {formattedCount}
      {suffix}
    </span>
  )
}

