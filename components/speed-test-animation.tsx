"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Gauge } from "lucide-react"

export default function SpeedTestAnimation() {
  const [speed, setSpeed] = useState(0)
  const [isAnimating, setIsAnimating] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Particles array
    const particles: Particle[] = []
    const particleCount = 100

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        color: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3})`,
        speedX: Math.random() * 3 - 1.5,
        speedY: Math.random() * 3 - 1.5,
      })
    }

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle) => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1
        }

        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()
      })

      // Draw connections
      particles.forEach((particleA, i) => {
        particles.slice(i + 1).forEach((particleB) => {
          const dx = particleA.x - particleB.x
          const dy = particleA.y - particleB.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - distance / 100)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particleA.x, particleA.y)
            ctx.lineTo(particleB.x, particleB.y)
            ctx.stroke()
          }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Speed counter animation
    let speedCounter = 0
    const targetSpeed = 945
    const speedInterval = setInterval(() => {
      if (speedCounter < targetSpeed) {
        speedCounter += Math.floor(Math.random() * 50) + 10
        if (speedCounter > targetSpeed) speedCounter = targetSpeed
        setSpeed(speedCounter)
      } else {
        clearInterval(speedInterval)
        setTimeout(() => {
          setIsAnimating(false)
        }, 2000)

        // Reset after a delay
        setTimeout(() => {
          setSpeed(0)
          speedCounter = 0
          setIsAnimating(true)
          const newInterval = setInterval(() => {
            if (speedCounter < targetSpeed) {
              speedCounter += Math.floor(Math.random() * 50) + 10
              if (speedCounter > targetSpeed) speedCounter = targetSpeed
              setSpeed(speedCounter)
            } else {
              clearInterval(newInterval)
              setTimeout(() => {
                setIsAnimating(false)
              }, 2000)
            }
          }, 100)
        }, 5000)
      }
    }, 100)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationRef.current)
      clearInterval(speedInterval)
    }
  }, [])

  return (
    <div className="relative w-full h-[400px] rounded-xl overflow-hidden bg-gradient-to-br from-indigo-900 to-indigo-700 shadow-xl">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"></canvas>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="relative w-48 h-48 mb-4">
            <Gauge className="w-full h-full text-indigo-300" />
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-4xl font-bold">{speed}</span>
              <span className="text-sm text-indigo-200">Mbps</span>
            </div>
          </div>
          <motion.div animate={{ opacity: isAnimating ? 1 : 0 }} className="text-center">
            <h3 className="text-xl font-bold mb-2">Speed Test</h3>
            <p className="text-indigo-200 text-sm">{isAnimating ? "Testing download speed..." : "Test complete!"}</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

interface Particle {
  x: number
  y: number
  radius: number
  color: string
  speedX: number
  speedY: number
}

