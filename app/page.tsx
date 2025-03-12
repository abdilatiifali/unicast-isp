"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Zap, Shield, CheckCircle, ChevronRight, Menu, X, Globe, Headphones, BarChart, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SpeedTestAnimation from "@/components/speed-test-animation"
import NetworkMap from "@/components/network-map"
import { PlanCard } from "@/components/plan-card"
import { TestimonialCarousel } from "@/components/testimonial-carousel"
import { CountUp } from "@/components/count-up"
import { FloatingIcons } from "@/components/floating-icons"
import { ScrollReveal } from "@/components/scroll-reveal"
import UnicastLogo from "@/components/unicast-logo"
import ServiceAreaSection from "@/components/service-area-section"
import TechnologySection from "@/components/technology-section"
import InternetSpeedCalculator from "@/components/internet-speed-calculator"
import LiveChatWidget from "@/components/live-chat-widget"
import SpecialOffersBanner from "@/components/special-offers-banner"
import ContactInfoSection from "@/components/contact-info-section"

// Create a reusable scroll function to avoid repetition
// Add this function right after the imports at the top of the file

const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    const headerOffset = 100 // Adjust based on your header height
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    })
    window.location.hash = id
  }
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 1], [0, 100])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    // Function to handle hash links
    const handleHashLinkClick = () => {
      const hash = window.location.hash
      if (hash) {
        // Remove the # symbol
        const id = hash.substring(1)
        const element = document.getElementById(id)

        if (element) {
          // Add a small delay to ensure the element is in the DOM
          setTimeout(() => {
            const headerOffset = 100 // Adjust based on your header height
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            })
          }, 100)
        }
      }
    }

    // Handle hash links on initial load
    handleHashLinkClick()

    // Add event listener for hash changes
    window.addEventListener("hashchange", handleHashLinkClick)

    return () => {
      window.removeEventListener("hashchange", handleHashLinkClick)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <UnicastLogo width={40} height={40} />
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-700 to-orange-500 bg-clip-text text-transparent">
              Unicast
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-gray-700 hover:text-indigo-600 transition-colors"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("features")
              }}
            >
              Features
            </Link>
            <Link
              href="#plans"
              className="text-gray-700 hover:text-indigo-600 transition-colors"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("plans")
              }}
            >
              Plans
            </Link>
            <Link
              href="#coverage"
              className="text-gray-700 hover:text-indigo-600 transition-colors"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("coverage")
              }}
            >
              Coverage
            </Link>
            <Link
              href="#testimonials"
              className="text-gray-700 hover:text-indigo-600 transition-colors"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("testimonials")
              }}
            >
              Testimonials
            </Link>
            <Link
              href="#contact-us"
              className="text-gray-700 hover:text-indigo-600 transition-colors"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("contact-us")
              }}
            >
              Contact Us
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button
              className="bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900"
              onClick={() => scrollToSection("contact-us")}
            >
              Contact Us
            </Button>
          </div>

          <button className="md:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-100"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                <Link
                  href="#features"
                  className="text-gray-700 hover:text-indigo-600 transition-colors py-2"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("features")
                    setIsMenuOpen(false)
                  }}
                >
                  Features
                </Link>
                <Link
                  href="#plans"
                  className="text-gray-700 hover:text-indigo-600 transition-colors py-2"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("plans")
                    setIsMenuOpen(false)
                  }}
                >
                  Plans
                </Link>
                <Link
                  href="#coverage"
                  className="text-gray-700 hover:text-indigo-600 transition-colors py-2"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("coverage")
                    setIsMenuOpen(false)
                  }}
                >
                  Coverage
                </Link>
                <Link
                  href="#testimonials"
                  className="text-gray-700 hover:text-indigo-600 transition-colors py-2"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("testimonials")
                    setIsMenuOpen(false)
                  }}
                >
                  Testimonials
                </Link>
                <Link
                  href="#contact-us"
                  className="text-gray-700 hover:text-indigo-600 transition-colors py-2"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("contact-us")
                    setIsMenuOpen(false)
                  }}
                >
                  Contact Us
                </Link>
                <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
                  <Button variant="outline" className="border-indigo-600 text-indigo-600 w-full">
                    Login
                  </Button>
                  <Link href="#contact-us" className="bg-gradient-to-r from-indigo-600 to-indigo-800 w-full">Get Started</Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-gradient-to-br from-indigo-900 via-indigo-800 to-orange-600"
      >
        <motion.div style={{ opacity, y }} className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Supercharge Your <span className="text-orange-400">Internet Experience</span>
                </h1>
                <p className="text-lg md:text-xl text-indigo-100 mb-8 max-w-xl mx-auto lg:mx-0">
                  Blazing fast speeds, unmatched reliability, and exceptional service. Experience the internet the way
                  it should be.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button
                    size="lg"
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={() => scrollToSection("coverage")}
                  >
                    Check Availability
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-blue-900 hover:bg-white/10 hover:text-white"
                    onClick={() => scrollToSection("plans")}
                  >
                    View Plans
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="mt-12 flex flex-wrap justify-center lg:justify-start gap-8"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-orange-400" size={20} />
                  <span className="text-white">99.9% Uptime</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-orange-400" size={20} />
                  <span className="text-white">24/7 Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-orange-400" size={20} />
                  <span className="text-white">No Contracts</span>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="relative"
            >
              <SpeedTestAnimation />
              <FloatingIcons />
            </motion.div>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-orange-500 opacity-20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-indigo-600 opacity-20 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
        </div>
      </section>

      {/* Internet Speed Calculator Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-700 to-orange-500 bg-clip-text text-transparent">
                Find Your Perfect Plan
              </h2>
              <p className="text-lg text-gray-600">
                Use our calculator to determine the ideal internet speed for your household needs
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="max-w-4xl mx-auto">
              <InternetSpeedCalculator />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">
                  <CountUp end={2000} suffix="+" />
                </h3>
                <p className="text-gray-600">Happy Customers</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">
                  <CountUp end={99.9} suffix="%" />
                </h3>
                <p className="text-gray-600">Uptime Guarantee</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">
                  <CountUp end={24} suffix="/7" />
                </h3>
                <p className="text-gray-600">Customer Support</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">
                  <CountUp end={20} suffix="+" />
                </h3>
                <p className="text-gray-600">Cities Covered</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-700 to-orange-500 bg-clip-text text-transparent">
                Why Choose Unicast?
              </h2>
              <p className="text-lg text-gray-600">
                Experience internet service that's designed around your needs with features that make a real difference.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ScrollReveal delay={0.1}>
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100 rounded-full transform translate-x-16 -translate-y-16 group-hover:bg-indigo-200 transition-colors duration-300"></div>
                <CardHeader className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-4 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                    <Zap size={24} />
                  </div>
                  <CardTitle>Lightning Fast Speeds</CardTitle>
                  <CardDescription>Stream, game, and video chat without interruptions or buffering.</CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="text-green-500" size={16} />
                      <span className="text-sm">Up to 1 Gbps download speeds</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="text-green-500" size={16} />
                      <span className="text-sm">Low latency for gaming</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="text-green-500" size={16} />
                      <span className="text-sm">4K streaming on multiple devices</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-full transform translate-x-16 -translate-y-16 group-hover:bg-orange-200 transition-colors duration-300"></div>
                <CardHeader className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300">
                    <Shield size={24} />
                  </div>
                  <CardTitle>Unmatched Reliability</CardTitle>
                  <CardDescription>
                    Stay connected with our 99.9% uptime guarantee and redundant network.
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="text-green-500" size={16} />
                      <span className="text-sm">99.9% uptime guarantee</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="text-green-500" size={16} />
                      <span className="text-sm">Redundant network architecture</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="text-green-500" size={16} />
                      <span className="text-sm">Automatic failover systems</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100 rounded-full transform translate-x-16 -translate-y-16 group-hover:bg-indigo-200 transition-colors duration-300"></div>
                <CardHeader className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-4 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                    <Headphones size={24} />
                  </div>
                  <CardTitle>24/7 Expert Support</CardTitle>
                  <CardDescription>Our technical experts are available around the clock to help you.</CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="text-green-500" size={16} />
                      <span className="text-sm">24/7 technical support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="text-green-500" size={16} />
                      <span className="text-sm">Multiple support channels</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="text-green-500" size={16} />
                      <span className="text-sm">Rapid response times</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-full transform translate-x-16 -translate-y-16 group-hover:bg-orange-200 transition-colors duration-300"></div>
                <CardHeader className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300">
                    <Globe size={24} />
                  </div>
                  <CardTitle>Extensive Coverage</CardTitle>
                  <CardDescription>Serving more areas with better connectivity than other providers.</CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="text-green-500" size={16} />
                      <span className="text-sm">20+ cities and growing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="text-green-500" size={16} />
                      <span className="text-sm">Rural area coverage</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="text-green-500" size={16} />
                      <span className="text-sm">Expanding network</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100 rounded-full transform translate-x-16 -translate-y-16 group-hover:bg-indigo-200 transition-colors duration-300"></div>
                <CardHeader className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-4 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                    <BarChart size={24} />
                  </div>
                  <CardTitle>No Data Caps</CardTitle>
                  <CardDescription>
                    Use as much data as you need without worrying about overage charges.
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="text-green-500" size={16} />
                      <span className="text-sm">Unlimited data usage</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="text-green-500" size={16} />
                      <span className="text-sm">No throttling</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="text-green-500" size={16} />
                      <span className="text-sm">No overage charges</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.6}>
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-full transform translate-x-16 -translate-y-16 group-hover:bg-orange-200 transition-colors duration-300"></div>
                <CardHeader className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300">
                    <Smartphone size={24} />
                  </div>
                  <CardTitle>Smart Home Ready</CardTitle>
                  <CardDescription>Perfect for your connected devices and smart home ecosystem.</CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="text-green-500" size={16} />
                      <span className="text-sm">IoT device optimization</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="text-green-500" size={16} />
                      <span className="text-sm">Smart home compatibility</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="text-green-500" size={16} />
                      <span className="text-sm">Advanced security features</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="plans" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-700 to-orange-500 bg-clip-text text-transparent">
                Choose Your Perfect Plan
              </h2>
              <p className="text-lg text-gray-600">
                Flexible plans designed to meet your needs, with no hidden fees or long-term contracts.
              </p>
            </div>
          </ScrollReveal>

          <Tabs defaultValue="residential" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="residential">Residential</TabsTrigger>
              <TabsTrigger value="business">Business</TabsTrigger>
            </TabsList>

            <TabsContent value="residential" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <ScrollReveal delay={0.1}>
                  <PlanCard
                    title="Basic"
                    price={2500}
                    speed="10 Mbps"
                    popular={false}
                    features={[
                      "12 Mbps download speed",
                      "100 Mbps upload speed",
                      "Unlimited data",
                      "Basic technical support",
                      "Wi-Fi router included",
                    ]}
                  />
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                  <PlanCard
                    title="Premium"
                    price={3500}
                    speed="16 Mbps"
                    popular={true}
                    features={[
                      "16 Mbps download speed",
                      "100 Mbps upload speed",
                      "Unlimited data",
                      "24/7 priority support",
                      "Advanced Wi-Fi router",
                      "Free installation",
                    ]}
                  />
                </ScrollReveal>

                <ScrollReveal delay={0.3}>
                  <PlanCard
                    title="Ultimate"
                    price={5000}
                    speed="30 mbps"
                    popular={false}
                    features={[
                      "30 download speed",
                      "100 Mbps upload speed",
                      "Unlimited data",
                      "24/7 VIP support",
                      "Premium Wi-Fi Router system",
                      "Free installation",
                      "Network security package",
                    ]}
                  />
                </ScrollReveal>
              </div>
            </TabsContent>

            <TabsContent value="business" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <ScrollReveal delay={0.1}>
                  <PlanCard
                    title="Business Starter"
                    price={10000}
                    speed="40 Mbps"
                    popular={false}
                    features={[
                      "40 Mbps download speed",
                      "1000 Mbps upload speed",
                      "Unlimited data",
                      "Business-grade support",
                      "Static IP address",
                      "Wi-Fi router included",
                    ]}
                  />
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                  <PlanCard
                    title="Business Pro"
                    price={20000}
                    speed="60 Mbps"
                    popular={true}
                    features={[
                      "60 Mbps download speed",
                      "60 Mbps upload speed",
                      "Unlimited data",
                      "24/7 priority support",
                      "Multiple static IPs",
                      "Advanced Wi-Fi system",
                      "Free installation",
                      "Basic SLA",
                    ]}
                  />
                </ScrollReveal>

                <ScrollReveal delay={0.3}>
                  <PlanCard
                    title="Business Enterprise"
                    price={30000}
                    speed="100mbps"
                    popular={false}
                    features={[
                      "100mbps download speed",
                      "500 Mbps upload speed",
                      "Unlimited data",
                      "24/7 dedicated support",
                      "IP subnet",
                      "Enterprise Wi-Fi solution",
                      "Free installation",
                      "Premium SLA",
                      "Network security suite",
                    ]}
                  />
                </ScrollReveal>
              </div>
            </TabsContent>
          </Tabs>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              Not sure which plan is right for you? Contact our team for a personalized recommendation.
            </p>
            <Button
              className="bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900"
              onClick={() => scrollToSection("contact-us")}
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Coverage Map Section */}
      <section
        id="coverage"
        className="py-20 bg-gradient-to-br from-indigo-900 via-indigo-800 to-orange-600 text-white"
      >
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Coverage Area</h2>
              <p className="text-lg text-indigo-100">
                Check if Unicast is available in your area. We're constantly expanding our network to reach more
                communities.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal delay={0.1}>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 md:p-8">
                <h3 className="text-2xl font-bold mb-6">Check Availability</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="street" className="block text-sm font-medium mb-1">
                        Street Address
                      </label>
                      <input
                        type="text"
                        id="street"
                        className="w-full px-4 py-2 rounded-md bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="South C"
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        className="w-full px-4 py-2 rounded-md bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="Nairobi"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        id="state"
                        className="w-full px-4 py-2 rounded-md bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="KN"
                      />
                    </div>
                    <div>
                      <label htmlFor="zip" className="block text-sm font-medium mb-1">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        id="zip"
                        className="w-full px-4 py-2 rounded-md bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="12345"
                      />
                    </div>
                  </div>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Check Availability</Button>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="relative h-[400px] rounded-xl overflow-hidden">
                <NetworkMap />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-700 to-orange-500 bg-clip-text text-transparent">
                What Our Customers Say
              </h2>
              <p className="text-lg text-gray-600">
                Don't just take our word for it. Here's what our customers have to say about their Unicast experience.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <TestimonialCarousel />
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-700 to-orange-500 bg-clip-text text-transparent">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600">
                Find answers to common questions about our services, installation, and support.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-3xl mx-auto">
            <ScrollReveal delay={0.1}>
              <div className="space-y-4">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <details className="group">
                    <summary className="flex items-center justify-between p-6 cursor-pointer">
                      <h3 className="text-lg font-medium">How fast is your internet service?</h3>
                      <span className="transition-transform duration-300 group-open:rotate-180">
                        <ChevronRight className="h-5 w-5" />
                      </span>
                    </summary>
                    <div className="px-6 pb-6 text-gray-600">
                      <p>
                        We offer a range of speeds from 100 Mbps to 1 Gbps for residential customers, and up to 2 Gbps
                        for business customers. Our network is built on the latest fiber optic technology to deliver
                        consistent, reliable speeds even during peak usage times.
                      </p>
                    </div>
                  </details>
                </div>

                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <details className="group">
                    <summary className="flex items-center justify-between p-6 cursor-pointer">
                      <h3 className="text-lg font-medium">Do you have data caps or limits?</h3>
                      <span className="transition-transform duration-300 group-open:rotate-180">
                        <ChevronRight className="h-5 w-5" />
                      </span>
                    </summary>
                    <div className="px-6 pb-6 text-gray-600">
                      <p>
                        No, all of our plans come with unlimited data. We believe in providing our customers with the
                        freedom to use the internet without worrying about data caps, overage charges, or throttling.
                      </p>
                    </div>
                  </details>
                </div>

                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <details className="group">
                    <summary className="flex items-center justify-between p-6 cursor-pointer">
                      <h3 className="text-lg font-medium">How long does installation take?</h3>
                      <span className="transition-transform duration-300 group-open:rotate-180">
                        <ChevronRight className="h-5 w-5" />
                      </span>
                    </summary>
                    <div className="px-6 pb-6 text-gray-600">
                      <p>
                        Standard installation typically takes 1-2 hours, depending on your home's setup. Our
                        professional technicians will ensure everything is working perfectly before they leave. Most
                        customers can get an installation appointment within 3-5 business days after signing up.
                      </p>
                    </div>
                  </details>
                </div>

                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <details className="group">
                    <summary className="flex items-center justify-between p-6 cursor-pointer">
                      <h3 className="text-lg font-medium">Do I need to sign a long-term contract?</h3>
                      <span className="transition-transform duration-300 group-open:rotate-180">
                        <ChevronRight className="h-5 w-5" />
                      </span>
                    </summary>
                    <div className="px-6 pb-6 text-gray-600">
                      <p>
                        No, we don't believe in locking customers into long-term contracts. All of our plans are
                        month-to-month with no early termination fees. We're confident you'll stay because of our great
                        service, not because you're trapped in a contract.
                      </p>
                    </div>
                  </details>
                </div>

                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <details className="group">
                    <summary className="flex items-center justify-between p-6 cursor-pointer">
                      <h3 className="text-lg font-medium">What equipment do I need?</h3>
                      <span className="transition-transform duration-300 group-open:rotate-180">
                        <ChevronRight className="h-5 w-5" />
                      </span>
                    </summary>
                    <div className="px-6 pb-6 text-gray-600">
                      <p>
                        We provide all the necessary equipment as part of your service, including a modern Wi-Fi router
                        that supports the latest standards. For larger homes, we offer mesh Wi-Fi systems to ensure
                        complete coverage throughout your space.
                      </p>
                    </div>
                  </details>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <TechnologySection />

      {/* Service Area Section */}
      <ServiceAreaSection />

      {/* Blog Section */}

      {/* Contact Us Section */}
      <ContactInfoSection />

      {/* CTA Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-indigo-900 via-indigo-800 to-orange-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience Better Internet?</h2>
              <p className="text-xl text-indigo-100 mb-8">
                Join thousands of satisfied customers who have switched to Unicast for faster, more reliable internet
                service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={() => scrollToSection("coverage")}
                >
                  Check Availability
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-blue-800 hover:bg-white/10"
                  onClick={() => scrollToSection("contact-us")}
                >
                  Contact Sales
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-6">
                <UnicastLogo width={40} height={40} />
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-orange-400 bg-clip-text text-transparent">
                  Unicast
                </span>
              </Link>
              <p className="mb-4">
                Providing lightning-fast, reliable internet services to homes and businesses since 2010.
              </p>
              <div className="flex gap-4">
                <a href="/#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="https://www.instagram.com/unicasttechnologs/" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>

              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#features"
                    className="hover:text-white transition-colors"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection("features")
                    }}
                  >
                    Residential Internet
                  </Link>
                </li>
                <li>
                  <Link
                    href="#plans"
                    className="hover:text-white transition-colors"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection("plans")
                    }}
                  >
                    Business Internet
                  </Link>
                </li>
                <li>
                  <Link
                    href="#features"
                    className="hover:text-white transition-colors"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection("features")
                    }}
                  >
                    Enterprise Solutions
                  </Link>
                </li>
                <li>
                  <Link
                    href="#features"
                    className="hover:text-white transition-colors"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection("features")
                    }}
                  >
                    Managed Wi-Fi
                  </Link>
                </li>
                <li>
                  <Link
                    href="#features"
                    className="hover:text-white transition-colors"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection("features")
                    }}
                  >
                    Network Security
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-white transition-colors" onClick={(e) => e.preventDefault()}>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors" onClick={(e) => e.preventDefault()}>
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors" onClick={(e) => e.preventDefault()}>
                    News
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors" onClick={(e) => e.preventDefault()}>
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#contact-us"
                    className="hover:text-white transition-colors"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection("contact-us")
                    }}
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-white transition-colors" onClick={(e) => e.preventDefault()}>
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors" onClick={(e) => e.preventDefault()}>
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors" onClick={(e) => e.preventDefault()}>
                    Installation Guide
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors" onClick={(e) => e.preventDefault()}>
                    Network Status
                  </Link>
                </li>
                <li>
                  <Link
                    href="#contact-us"
                    className="hover:text-white transition-colors"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection("contact-us")
                    }}
                  >
                    Contact Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">&copy; {new Date().getFullYear()} Unicast Technologies Ltd. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="#" className="text-sm hover:text-white transition-colors" onClick={(e) => e.preventDefault()}>
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm hover:text-white transition-colors" onClick={(e) => e.preventDefault()}>
                Terms of Service
              </Link>
              <Link href="#" className="text-sm hover:text-white transition-colors" onClick={(e) => e.preventDefault()}>
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Live Chat Widget */}
      <LiveChatWidget />
      {/* Special Offers Banner */}
    </div>
  )
}

