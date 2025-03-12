"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import { Search, MapPin, CheckCircle, X, Zap, Calendar } from "lucide-react"

export default function ServiceAreaSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResult, setSearchResult] = useState<null | "available" | "coming-soon" | "not-available">(null)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (!searchQuery.trim()) return

    // Simulate API check - in a real app, this would call an API
    const zipCode = searchQuery.trim()
    const firstDigit = Number.parseInt(zipCode.charAt(0))

    if (firstDigit >= 0 && firstDigit <= 3) {
      setSearchResult("available")
    } else if (firstDigit >= 4 && firstDigit <= 6) {
      setSearchResult("coming-soon")
    } else {
      setSearchResult("not-available")
    }
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-700 to-orange-500 bg-clip-text text-transparent">
              Check Service Availability
            </h2>
            <p className="text-lg text-gray-600">
              Enter your address or ZIP code to see if Unicast high-speed internet is available in your area.
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-xl p-8 shadow-lg">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-grow">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter ZIP code or address"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6">
                <Search className="mr-2" size={20} />
                Check Availability
              </Button>
            </form>

            {searchResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`p-6 rounded-lg ${
                  searchResult === "available"
                    ? "bg-green-50 border border-green-200"
                    : searchResult === "coming-soon"
                      ? "bg-yellow-50 border border-yellow-200"
                      : "bg-red-50 border border-red-200"
                }`}
              >
                {searchResult === "available" && (
                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 rounded-full p-2 mt-1">
                      <CheckCircle className="text-green-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-green-800 mb-2">
                        Great news! Service is available in your area.
                      </h3>
                      <p className="text-green-700 mb-4">
                        Unicast high-speed internet is available at your location. Choose from our range of plans to get
                        started.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <Button className="bg-green-600 hover:bg-green-700">View Plans</Button>
                        <Button variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
                          Schedule Installation
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {searchResult === "coming-soon" && (
                  <div className="flex items-start gap-4">
                    <div className="bg-yellow-100 rounded-full p-2 mt-1">
                      <MapPin className="text-yellow-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-yellow-800 mb-2">Coming Soon to Your Area!</h3>
                      <p className="text-yellow-700 mb-4">
                        We're expanding our network to your location. Join our waitlist to be notified when service
                        becomes available.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <Button className="bg-yellow-600 hover:bg-yellow-700">Join Waitlist</Button>
                        <Button variant="outline" className="border-yellow-600 text-yellow-700 hover:bg-yellow-50">
                          Get Updates
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {searchResult === "not-available" && (
                  <div className="flex items-start gap-4">
                    <div className="bg-red-100 rounded-full p-2 mt-1">
                      <X className="text-red-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-red-800 mb-2">Service Not Yet Available</h3>
                      <p className="text-red-700 mb-4">
                        Unfortunately, we don't currently offer service in your area. We're constantly expanding, so
                        please check back in the future.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <Button className="bg-red-600 hover:bg-red-700">Notify Me When Available</Button>
                        <Button variant="outline" className="border-red-600 text-red-700 hover:bg-red-50">
                          Explore Alternatives
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScrollReveal delay={0.1}>
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                  <MapPin className="text-indigo-600" size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2">20+ Cities</h3>
                <p className="text-gray-600">Serving over 50 cities nationwide with reliable high-speed internet.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                  <Zap className="text-orange-600" size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2">Rapid Expansion</h3>
                <p className="text-gray-600">
                  Expanding to new areas every month to bring fast internet to more communities.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                  <Calendar className="text-indigo-600" size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2">Quick Installation</h3>
                <p className="text-gray-600">Most installations completed within 3-5 business days after signup.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}

