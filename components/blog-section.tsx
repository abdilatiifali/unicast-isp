"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "5 Ways to Optimize Your Home Wi-Fi Network",
    excerpt: "Simple tips to improve your Wi-Fi performance and eliminate dead zones in your home.",
    image: "/placeholder.svg?height=200&width=400",
    date: "May 15, 2023",
    category: "Tips & Tricks",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "The Future of Internet: What's Coming in 2025",
    excerpt: "Explore upcoming technologies that will revolutionize how we connect to and use the internet.",
    image: "/placeholder.svg?height=200&width=400",
    date: "April 28, 2023",
    category: "Technology",
    readTime: "8 min read",
  },
  {
    id: 3,
    title: "Business Internet: Choosing the Right Plan",
    excerpt: "A comprehensive guide to selecting the perfect internet plan for your business needs.",
    image: "/placeholder.svg?height=200&width=400",
    date: "April 10, 2023",
    category: "Business",
    readTime: "6 min read",
  },
]

export default function BlogSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-700 to-orange-500 bg-clip-text text-transparent">
                Latest from Our Blog
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl">
                Stay updated with the latest internet technology trends, tips, and news from our experts.
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <Button variant="outline" className="border-indigo-600 text-indigo-600 hover:bg-indigo-50">
                View All Posts <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <ScrollReveal key={post.id} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {post.category}
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-xl font-bold mb-3 hover:text-indigo-600 transition-colors">
                    <Link href="#">{post.title}</Link>
                  </h3>

                  <p className="text-gray-600 mb-4 flex-grow">{post.excerpt}</p>

                  <Link
                    href="#"
                    className="text-indigo-600 font-medium inline-flex items-center hover:text-indigo-800 transition-colors"
                  >
                    Read More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-16 bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-xl p-8 md:p-12 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Subscribe to Our Newsletter</h3>
                <p className="text-indigo-100 mb-6">
                  Get the latest news, tips, and special offers delivered directly to your inbox.
                </p>

                <form className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-grow px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <Button className="bg-white text-indigo-600 hover:bg-indigo-50">Subscribe</Button>
                </form>
              </div>

              <div className="hidden md:block">
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  width={300}
                  height={200}
                  alt="Newsletter"
                  className="mx-auto"
                />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

