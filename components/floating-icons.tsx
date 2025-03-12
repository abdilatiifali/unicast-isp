"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Wifi, Zap, Shield, Clock, Users, Award } from "lucide-react"

export function FloatingIcons() {
  const [icons, setIcons] = useState<IconProps[]>([])

  useEffect(() => {
    // Create icons with random positions
    const iconComponents = [
      { icon: Wifi, color: "text-blue-400" },
      { icon: Zap, color: "text-yellow-400" },
      { icon: Shield, color: "text-green-400" },
      { icon: Clock, color: "text-purple-400" },
      { icon: Users, color: "text-pink-400" },
      { icon: Award, color: "text-orange-400" },
    ]

    const newIcons = iconComponents.map((iconComp, index) => {
      return {
        id: index,
        icon: iconComp.icon,
        color: iconComp.color,
        x: Math.random() * 80 - 40, // -40 to 40
        y: Math.random() * 80 - 40, // -40 to 40
        scale: 0.8 + Math.random() * 0.4, // 0.8 to 1.2
        rotation: Math.random() * 30 - 15, // -15 to 15
        delay: index * 0.2,
      }
    })

    setIcons(newIcons)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none">
      {icons.map((iconData) => (
        <motion.div
          key={iconData.id}
          className={`absolute ${iconData.color}`}
          style={{
            top: `calc(50% + ${iconData.y}%)`,
            left: `calc(50% + ${iconData.x}%)`,
            zIndex: 5,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0, iconData.scale, iconData.scale, 0],
            rotate: [0, iconData.rotation, iconData.rotation, 0],
          }}
          transition={{
            duration: 8,
            delay: iconData.delay,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 4,
          }}
        >
          <iconData.icon size={24} />
        </motion.div>
      ))}
    </div>
  )
}

interface IconProps {
  id: number
  icon: React.ElementType
  color: string
  x: number
  y: number
  scale: number
  rotation: number
  delay: number
}

