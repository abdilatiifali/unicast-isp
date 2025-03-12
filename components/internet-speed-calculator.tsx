"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Download, Smartphone, Laptop, Tv, Gamepad, Users, Check, AlertTriangle } from "lucide-react"

export default function InternetSpeedCalculator() {
  const [devices, setDevices] = useState({
    smartphones: 2,
    laptops: 1,
    smartTvs: 1,
    gamingConsoles: 0,
  })

  const [users, setUsers] = useState(3)
  const [streamingQuality, setStreamingQuality] = useState(2) // 0: SD, 1: HD, 2: 4K
  const [showResults, setShowResults] = useState(false)

  const qualityOptions = ["Standard (SD)", "High (HD)", "Ultra (4K)"]
  const qualityRequirements = [5, 10, 25] // Mbps required per streaming device

  const calculateRecommendedSpeed = () => {
    // Base requirements
    let baseSpeed = 10

    // Add per device
    const deviceCount = devices.smartphones + devices.laptops + devices.smartTvs + devices.gamingConsoles
    baseSpeed += devices.smartphones * 2
    baseSpeed += devices.laptops * 5
    baseSpeed += devices.smartTvs * qualityRequirements[streamingQuality]
    baseSpeed += devices.gamingConsoles * 15

    // Adjust for concurrent users
    const concurrencyFactor = Math.min(1 + (users - 1) * 0.2, 2)

    return Math.ceil(baseSpeed * concurrencyFactor)
  }

  const recommendedSpeed = calculateRecommendedSpeed()

  const getRecommendedPlan = () => {
    if (recommendedSpeed <= 10) return "Basic"
    if (recommendedSpeed <= 30) return "Premium"
    return "Ultimate"
  }

  const handleCalculate = () => {
    setShowResults(true)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 p-6 text-white">
        <h3 className="text-xl font-bold mb-1">Internet Speed Calculator</h3>
        <p className="text-indigo-100 text-sm">Find the perfect plan for your household needs</p>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-3">How many devices do you have?</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <Smartphone className="text-indigo-500" size={18} />
                  <span className="text-sm font-medium">Smartphones</span>
                </div>
                <span className="text-indigo-600 font-bold">{devices.smartphones}</span>
              </div>
              <Slider
                value={[devices.smartphones]}
                min={0}
                max={10}
                step={1}
                onValueChange={(value) => setDevices({ ...devices, smartphones: value[0] })}
                className="my-2"
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <Laptop className="text-indigo-500" size={18} />
                  <span className="text-sm font-medium">Computers</span>
                </div>
                <span className="text-indigo-600 font-bold">{devices.laptops}</span>
              </div>
              <Slider
                value={[devices.laptops]}
                min={0}
                max={5}
                step={1}
                onValueChange={(value) => setDevices({ ...devices, laptops: value[0] })}
                className="my-2"
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <Tv className="text-indigo-500" size={18} />
                  <span className="text-sm font-medium">Smart TVs</span>
                </div>
                <span className="text-indigo-600 font-bold">{devices.smartTvs}</span>
              </div>
              <Slider
                value={[devices.smartTvs]}
                min={0}
                max={5}
                step={1}
                onValueChange={(value) => setDevices({ ...devices, smartTvs: value[0] })}
                className="my-2"
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <Gamepad className="text-indigo-500" size={18} />
                  <span className="text-sm font-medium">Gaming</span>
                </div>
                <span className="text-indigo-600 font-bold">{devices.gamingConsoles}</span>
              </div>
              <Slider
                value={[devices.gamingConsoles]}
                min={0}
                max={3}
                step={1}
                onValueChange={(value) => setDevices({ ...devices, gamingConsoles: value[0] })}
                className="my-2"
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-medium mb-3">How many people use the internet simultaneously?</h4>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <Users className="text-indigo-500" size={18} />
                <span className="text-sm font-medium">Concurrent Users</span>
              </div>
              <span className="text-indigo-600 font-bold">{users}</span>
            </div>
            <Slider
              value={[users]}
              min={1}
              max={10}
              step={1}
              onValueChange={(value) => setUsers(value[0])}
              className="my-2"
            />
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-medium mb-3">Preferred streaming quality?</h4>
          <div className="grid grid-cols-3 gap-3">
            {qualityOptions.map((quality, index) => (
              <button
                key={index}
                className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                  streamingQuality === index
                    ? "bg-indigo-50 border-indigo-300 text-indigo-700"
                    : "border-gray-200 hover:border-indigo-200"
                }`}
                onClick={() => setStreamingQuality(index)}
              >
                {quality}
              </button>
            ))}
          </div>
        </div>

        <Button className="w-full bg-indigo-600 hover:bg-indigo-700" onClick={handleCalculate}>
          Calculate Recommended Speed
        </Button>

        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 p-5 border border-indigo-100 rounded-lg bg-indigo-50"
          >
            <h4 className="text-lg font-bold text-indigo-800 mb-2">Your Results</h4>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-indigo-600 text-white p-2 rounded-full">
                <Download size={20} />
              </div>
              <div>
                <div className="text-sm text-indigo-600 font-medium">Recommended Speed</div>
                <div className="text-2xl font-bold">{recommendedSpeed} Mbps</div>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-sm font-medium mb-2">Recommended Plan:</div>
              <div className="bg-white p-3 rounded-lg border border-indigo-200">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-indigo-700">{getRecommendedPlan()}</div>
                  <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                    View Plan
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>
                  Supports {users} users with{" "}
                  {devices.smartphones + devices.laptops + devices.smartTvs + devices.gamingConsoles} devices
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Handles {qualityOptions[streamingQuality]} video streaming</span>
              </div>
              {devices.gamingConsoles > 0 && (
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Suitable for online gaming</span>
                </div>
              )}
              {recommendedSpeed > 100 && (
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span>Your usage is high - consider our Ultimate plan for best performance</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

