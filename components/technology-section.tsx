"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wifi, Zap, Shield, Server, Home, Building, CheckCircle } from "lucide-react"

export default function TechnologySection() {
  const [activeTab, setActiveTab] = useState("fiber")

  const technologies = [
    {
      id: "fiber",
      title: "Fiber Optic",
      icon: Zap,
      description:
        "Our fiber optic network delivers lightning-fast speeds with minimal latency, perfect for streaming, gaming, and working from home.",
      features: [
        "Up to 1 Gbps speeds",
        "Symmetrical upload and download",
        "99.9% reliability",
        "Future-proof technology",
      ],
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "wireless",
      title: "Fixed Wireless",
      icon: Wifi,
      description:
        "Our advanced wireless technology provides high-speed internet access in areas where fiber installation isn't feasible.",
      features: ["Up to 100 Mbps speeds", "Quick installation", "No cables required", "Weather-resistant equipment"],
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "security",
      title: "Network Security",
      icon: Shield,
      description: "Built-in security features protect your connection from threats and keep your data safe.",
      features: [
        "Advanced firewall protection",
        "Malware and phishing protection",
        "Regular security updates",
        "Parental controls",
      ],
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "infrastructure",
      title: "Infrastructure",
      icon: Server,
      description:
        "Our state-of-the-art infrastructure ensures consistent performance and reliability across our entire network.",
      features: [
        "Redundant network design",
        "24/7 network monitoring",
        "Automatic failover systems",
        "Regular capacity upgrades",
      ],
      image: "/placeholder.svg?height=300&width=500",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-700 to-orange-500 bg-clip-text text-transparent">
              Our Technology
            </h2>
            <p className="text-lg text-gray-600">
              Powered by cutting-edge technology to deliver the fastest, most reliable internet experience possible.
            </p>
          </div>
        </ScrollReveal>

        <Tabs defaultValue="fiber" value={activeTab} onValueChange={setActiveTab} className="w-full max-w-5xl mx-auto">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-12">
            {technologies.map((tech) => (
              <TabsTrigger
                key={tech.id}
                value={tech.id}
                className="flex flex-col items-center gap-2 py-4 data-[state=active]:bg-indigo-50"
              >
                <tech.icon className={`h-6 w-6 ${activeTab === tech.id ? "text-indigo-600" : "text-gray-500"}`} />
                <span>{tech.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {technologies.map((tech) => (
            <TabsContent key={tech.id} value={tech.id} className="focus-visible:outline-none focus-visible:ring-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tech.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                >
                  <div className="order-2 lg:order-1">
                    <h3 className="text-2xl font-bold mb-4">{tech.title} Technology</h3>
                    <p className="text-gray-600 mb-6">{tech.description}</p>

                    <div className="space-y-4">
                      {tech.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="bg-indigo-100 rounded-full p-1 mt-0.5">
                            <CheckCircle className="text-indigo-600 h-4 w-4" />
                          </div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <div className="flex items-center gap-2 mb-2">
                          <Home className="text-indigo-600 h-5 w-5" />
                          <span className="font-medium">Residential</span>
                        </div>
                        <p className="text-sm text-gray-600">Perfect for homes and families with multiple devices.</p>
                      </div>

                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <div className="flex items-center gap-2 mb-2">
                          <Building className="text-indigo-600 h-5 w-5" />
                          <span className="font-medium">Business</span>
                        </div>
                        <p className="text-sm text-gray-600">Scalable solutions for businesses of all sizes.</p>
                      </div>
                    </div>
                  </div>

                  <div className="order-1 lg:order-2">
                    <div className="relative rounded-xl overflow-hidden shadow-xl">
                      <Image
                        src={tech.image || "/placeholder.svg"}
                        alt={tech.title}
                        width={500}
                        height={300}
                        className="w-full h-auto object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/40 to-transparent"></div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}

