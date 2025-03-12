"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Small Business Owner",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "Switching to Unicast was the best decision for my business. The reliable connection means my team can work efficiently without interruptions, and the customer service is exceptional.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Remote Software Developer",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "As someone who works from home, having fast and reliable internet is crucial. Unicast delivers consistently high speeds even during peak hours, and I've never experienced any downtime.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Family of 5",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "With three kids who all stream, game, and do homework online, our previous provider couldn't keep up. Since switching to Unicast, everyone can do their thing without fighting over bandwidth!",
    rating: 4,
  },
  {
    id: 4,
    name: "David Wilson",
    role: "Competitive Gamer",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "The low latency and consistent speeds from Unicast have seriously improved my gaming performance. No more lag spikes or disconnects during crucial moments in tournaments.",
    rating: 5,
  },
  {
    id: 5,
    name: "Jennifer Park",
    role: "Healthcare Professional",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "I rely on stable internet for telemedicine appointments. Unicast's reliability means I can provide uninterrupted care to my patients without worrying about connection issues.",
    rating: 5,
  },
]

export function TestimonialCarousel() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay])

  const next = () => {
    setAutoplay(false)
    setCurrent((current + 1) % testimonials.length)
  }

  const prev = () => {
    setAutoplay(false)
    setCurrent((current - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
        <button
          onClick={prev}
          className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      <div className="overflow-hidden px-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-8 md:p-10"
          >
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <div className="flex-shrink-0">
                <div className="relative w-20 h-20 rounded-full overflow-hidden">
                  <Image
                    src={testimonials[current].image || "/placeholder.svg"}
                    alt={testimonials[current].name}
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="flex-grow text-center md:text-left">
                <div className="flex justify-center md:justify-start mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < testimonials[current].rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>

                <blockquote className="text-lg text-gray-700 mb-4 italic">"{testimonials[current].content}"</blockquote>

                <div>
                  <div className="font-bold text-gray-900">{testimonials[current].name}</div>
                  <div className="text-sm text-gray-500">{testimonials[current].role}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
        <button
          onClick={next}
          className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      <div className="flex justify-center mt-6 gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setAutoplay(false)
              setCurrent(index)
            }}
            className={`w-3 h-3 rounded-full ${index === current ? "bg-indigo-600" : "bg-gray-300"}`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

