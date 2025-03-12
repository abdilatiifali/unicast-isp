"use client"

import { useEffect, useRef } from "react"

export default function NetworkMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Create nodes (cities)
    const nodes = [
      { x: canvas.width * 0.2, y: canvas.height * 0.2, radius: 6, name: "New York" },
      { x: canvas.width * 0.8, y: canvas.height * 0.3, radius: 6, name: "Los Angeles" },
      { x: canvas.width * 0.5, y: canvas.height * 0.15, radius: 5, name: "Chicago" },
      { x: canvas.width * 0.7, y: canvas.height * 0.7, radius: 5, name: "Miami" },
      { x: canvas.width * 0.3, y: canvas.height * 0.6, radius: 5, name: "Dallas" },
      { x: canvas.width * 0.15, y: canvas.height * 0.8, radius: 4, name: "Seattle" },
      { x: canvas.width * 0.6, y: canvas.height * 0.5, radius: 4, name: "Denver" },
      { x: canvas.width * 0.4, y: canvas.height * 0.8, radius: 4, name: "Atlanta" },
    ]

    // Create connections between nodes
    const connections = [
      { from: 0, to: 2 },
      { from: 0, to: 4 },
      { from: 1, to: 5 },
      { from: 1, to: 6 },
      { from: 2, to: 6 },
      { from: 3, to: 4 },
      { from: 3, to: 7 },
      { from: 4, to: 6 },
      { from: 4, to: 7 },
      { from: 5, to: 6 },
      { from: 6, to: 7 },
    ]

    // Animation variables
    let pulseRadius = 0
    let pulseOpacity = 1
    const dataPackets: DataPacket[] = []

    // Create initial data packets
    createDataPackets()

    function createDataPackets() {
      connections.forEach((conn) => {
        if (Math.random() > 0.7) {
          const fromNode = nodes[conn.from]
          const toNode = nodes[conn.to]

          dataPackets.push({
            x: fromNode.x,
            y: fromNode.y,
            targetX: toNode.x,
            targetY: toNode.y,
            progress: 0,
            speed: 0.005 + Math.random() * 0.01,
            color: `hsl(${Math.random() * 60 + 200}, 100%, 70%)`,
            size: 2 + Math.random() * 2,
          })
        }
      })
    }

    // Animation function
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw map background (simplified world map)
      ctx.beginPath()
      ctx.fillStyle = "rgba(255, 255, 255, 0.05)"

      // North America
      ctx.moveTo(canvas.width * 0.1, canvas.height * 0.2)
      ctx.lineTo(canvas.width * 0.3, canvas.height * 0.2)
      ctx.lineTo(canvas.width * 0.4, canvas.height * 0.4)
      ctx.lineTo(canvas.width * 0.3, canvas.height * 0.6)
      ctx.lineTo(canvas.width * 0.1, canvas.height * 0.5)
      ctx.closePath()
      ctx.fill()

      // South America
      ctx.beginPath()
      ctx.moveTo(canvas.width * 0.3, canvas.height * 0.6)
      ctx.lineTo(canvas.width * 0.35, canvas.height * 0.8)
      ctx.lineTo(canvas.width * 0.25, canvas.height * 0.9)
      ctx.lineTo(canvas.width * 0.2, canvas.height * 0.7)
      ctx.closePath()
      ctx.fill()

      // Europe
      ctx.beginPath()
      ctx.moveTo(canvas.width * 0.45, canvas.height * 0.2)
      ctx.lineTo(canvas.width * 0.55, canvas.height * 0.15)
      ctx.lineTo(canvas.width * 0.6, canvas.height * 0.3)
      ctx.lineTo(canvas.width * 0.5, canvas.height * 0.35)
      ctx.closePath()
      ctx.fill()

      // Africa
      ctx.beginPath()
      ctx.moveTo(canvas.width * 0.5, canvas.height * 0.35)
      ctx.lineTo(canvas.width * 0.6, canvas.height * 0.3)
      ctx.lineTo(canvas.width * 0.65, canvas.height * 0.6)
      ctx.lineTo(canvas.width * 0.55, canvas.height * 0.7)
      ctx.lineTo(canvas.width * 0.45, canvas.height * 0.5)
      ctx.closePath()
      ctx.fill()

      // Asia
      ctx.beginPath()
      ctx.moveTo(canvas.width * 0.6, canvas.height * 0.3)
      ctx.lineTo(canvas.width * 0.9, canvas.height * 0.2)
      ctx.lineTo(canvas.width * 0.85, canvas.height * 0.5)
      ctx.lineTo(canvas.width * 0.65, canvas.height * 0.6)
      ctx.closePath()
      ctx.fill()

      // Australia
      ctx.beginPath()
      ctx.moveTo(canvas.width * 0.8, canvas.height * 0.65)
      ctx.lineTo(canvas.width * 0.9, canvas.height * 0.6)
      ctx.lineTo(canvas.width * 0.95, canvas.height * 0.75)
      ctx.lineTo(canvas.width * 0.85, canvas.height * 0.8)
      ctx.closePath()
      ctx.fill()

      // Draw connections
      connections.forEach((conn) => {
        const fromNode = nodes[conn.from]
        const toNode = nodes[conn.to]

        ctx.beginPath()
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
        ctx.lineWidth = 1
        ctx.moveTo(fromNode.x, fromNode.y)
        ctx.lineTo(toNode.x, toNode.y)
        ctx.stroke()
      })

      // Draw data packets
      dataPackets.forEach((packet, index) => {
        packet.progress += packet.speed

        if (packet.progress >= 1) {
          dataPackets.splice(index, 1)
        } else {
          packet.x = packet.x + (packet.targetX - packet.x) * packet.speed * 10
          packet.y = packet.y + (packet.targetY - packet.y) * packet.speed * 10

          ctx.beginPath()
          ctx.fillStyle = packet.color
          ctx.arc(packet.x, packet.y, packet.size, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      // Create new packets occasionally
      if (Math.random() > 0.95 || dataPackets.length < 5) {
        createDataPackets()
      }

      // Draw nodes (cities)
      nodes.forEach((node) => {
        // Draw pulse effect
        ctx.beginPath()
        ctx.fillStyle = `rgba(255, 165, 0, ${0.1 * (1 - pulseOpacity)})`
        ctx.arc(node.x, node.y, node.radius + pulseRadius, 0, Math.PI * 2)
        ctx.fill()

        // Draw node
        ctx.beginPath()
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fill()

        // Draw node center
        ctx.beginPath()
        ctx.fillStyle = "rgba(255, 165, 0, 0.8)"
        ctx.arc(node.x, node.y, node.radius * 0.6, 0, Math.PI * 2)
        ctx.fill()
      })

      // Update pulse animation
      pulseRadius += 0.3
      pulseOpacity -= 0.01

      if (pulseOpacity <= 0) {
        pulseRadius = 0
        pulseOpacity = 1
      }

      requestAnimationFrame(animate)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight

      // Update node positions
      nodes.forEach((node, i) => {
        switch (i) {
          case 0: // New York
            node.x = canvas.width * 0.2
            node.y = canvas.height * 0.2
            break
          case 1: // Los Angeles
            node.x = canvas.width * 0.8
            node.y = canvas.height * 0.3
            break
          case 2: // Chicago
            node.x = canvas.width * 0.5
            node.y = canvas.height * 0.15
            break
          case 3: // Miami
            node.x = canvas.width * 0.7
            node.y = canvas.height * 0.7
            break
          case 4: // Dallas
            node.x = canvas.width * 0.3
            node.y = canvas.height * 0.6
            break
          case 5: // Seattle
            node.x = canvas.width * 0.15
            node.y = canvas.height * 0.8
            break
          case 6: // Denver
            node.x = canvas.width * 0.6
            node.y = canvas.height * 0.5
            break
          case 7: // Atlanta
            node.x = canvas.width * 0.4
            node.y = canvas.height * 0.8
            break
        }
      })
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden bg-indigo-900/50 backdrop-blur-sm">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"></canvas>
      <div className="absolute bottom-4 left-4 bg-black/30 backdrop-blur-sm rounded-lg p-3">
        <h3 className="text-white text-sm font-medium mb-1">Network Coverage</h3>
        <p className="text-indigo-200 text-xs">50+ cities and growing</p>
      </div>
    </div>
  )
}

interface DataPacket {
  x: number
  y: number
  targetX: number
  targetY: number
  progress: number
  speed: number
  color: string
  size: number
}

