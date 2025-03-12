"use client"

import { motion } from "framer-motion"

interface UnicastLogoProps {
  width?: number
  height?: number
  className?: string
}

export default function UnicastLogo({ width = 40, height = 40, className = "" }: UnicastLogoProps) {
  return (
    <motion.svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Circle background */}
      <circle cx="50" cy="50" r="50" fill="#FFFFFF" />

      {/* Blue section */}
      <path d="M50 0C22.4 0 0 22.4 0 50C0 77.6 22.4 100 50 100V0Z" fill="#3F3D9E" />

      {/* Orange section */}
      <path d="M50 0C77.6 0 100 22.4 100 50C100 77.6 77.6 100 50 100V0Z" fill="#E78A45" />

      {/* White lines in orange section */}
      <path d="M65 10V90" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
      <path d="M80 10V90" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
      <path d="M95 10V90" stroke="white" strokeWidth="1" strokeOpacity="0.5" />

      {/* Curved line */}
      <path d="M10 50C10 27.9 27.9 10 50 10C72.1 10 90 27.9 90 50" stroke="white" strokeWidth="2" />
    </motion.svg>
  )
}

