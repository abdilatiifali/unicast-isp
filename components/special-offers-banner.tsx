"use client"

import React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { X, Clock, ArrowRight, Tag, Gift } from "lucide-react"

export default function SpecialOffersBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [currentOffer, setCurrentOffer] = useState(0)
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 12,
    minutes: 45,
    seconds: 30,
  })

  const offers = [
    {
      title: "Limited Time Offer",
      description: "Get 50% off your first 3 months when you sign up today!",
      color: "from-indigo-600 to-indigo-800",
      icon: Tag,
    },
    {
      title: "Free Installation",
      description: "Sign up now and get professional installation at no extra cost!",
      color: "from-orange-500 to-orange-700",
      icon: Gift,
    },
    {
      title: "Refer a Friend",
      description: "Get one month free when you refer a friend who signs up!",
      color: "from-green-600 to-green-800",
      icon: Gift,
    },
  ]

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev

        if (seconds > 0) {
          seconds -= 1
        } else {
          seconds = 59
          if (minutes > 0) {
            minutes -= 1
          } else {
            minutes = 59
            if (hours > 0) {
              hours -= 1
            } else {
              hours = 23
              if (days > 0) {
                days -= 1
              }
            }
          }
        }

        return { days, hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Rotate offers
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % offers.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [offers.length])

  if (!isVisible) return null

  const formatTime = (value: number) => {
    return value.toString().padStart(2, "0")
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentOffer}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className={`bg-gradient-to-r ${offers[currentOffer].color} text-white rounded-lg shadow-lg max-w-4xl mx-auto overflow-hidden pointer-events-auto`}
        >
          <div className="relative p-4 md:p-6">
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-2 right-2 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
              <div className="bg-white/20 rounded-full p-3 md:p-4">
                {React.createElement(offers[currentOffer].icon, { className: "h-6 w-6 md:h-8 md:w-8" })}
              </div>

              <div className="flex-grow text-center md:text-left">
                <h3 className="font-bold text-lg md:text-xl">{offers[currentOffer].title}</h3>
                <p className="text-white/90 text-sm md:text-base">{offers[currentOffer].description}</p>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-1 text-white/90 text-xs">
                  <Clock size={14} />
                  <span>Offer ends in:</span>
                </div>
                <div className="flex gap-1 text-sm">
                  <div className="bg-white/20 rounded px-2 py-1 font-mono font-bold">{formatTime(timeLeft.days)}d</div>
                  <div className="bg-white/20 rounded px-2 py-1 font-mono font-bold">{formatTime(timeLeft.hours)}h</div>
                  <div className="bg-white/20 rounded px-2 py-1 font-mono font-bold">
                    {formatTime(timeLeft.minutes)}m
                  </div>
                  <div className="bg-white/20 rounded px-2 py-1 font-mono font-bold">
                    {formatTime(timeLeft.seconds)}s
                  </div>
                </div>
              </div>

              <Button className="bg-white text-indigo-700 hover:bg-white/90 whitespace-nowrap">
                Claim Offer <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-1 bg-white/20">
            <motion.div
              className="h-full bg-white"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 8, ease: "linear" }}
              key={`progress-${currentOffer}`}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

