"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface PlanCardProps {
  title: string
  price: number
  speed: string
  popular?: boolean
  features: string[]
}

export function PlanCard({ title, price, speed, popular = false, features }: PlanCardProps) {
  return (
    <motion.div whileHover={{ y: -10, transition: { duration: 0.3 } }} className="h-full">
      <Card
        className={`h-full flex flex-col relative overflow-hidden ${popular ? "border-orange-500 shadow-lg shadow-orange-100" : "border-gray-200"}`}
      >
        {popular && (
          <div className="absolute top-0 right-0">
            <div className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">MOST POPULAR</div>
          </div>
        )}

        <CardHeader className={`pb-4 ${popular ? "bg-orange-50" : ""}`}>
          <div className="flex flex-col items-center text-center">
            <h3 className="text-xl font-bold mb-1">{title}</h3>
            <div className="text-3xl font-bold mb-2">
              <span className="text-lg align-top"></span>
              {price}KES
              <span className="text-sm font-normal text-gray-500">/mo</span>
            </div>
            <div
              className={`text-sm font-medium px-3 py-1 rounded-full ${popular ? "bg-orange-100 text-orange-700" : "bg-indigo-100 text-indigo-700"}`}
            >
              {speed}
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-grow">
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle
                  className={`mt-0.5 h-4 w-4 flex-shrink-0 ${popular ? "text-orange-500" : "text-indigo-500"}`}
                />
                <span className="text-sm text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter className="pt-4">
          <Button
            className={`w-full ${popular ? "bg-orange-500 hover:bg-orange-600" : "bg-indigo-600 hover:bg-indigo-700"}`}
          >
            Get Started
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

