"use client"

import { CheckCircle, X } from "lucide-react"
import { motion } from "framer-motion"

export default function ComparisonTable() {
  const competitors = [
    { name: "Unicast", isUs: true },
    { name: "Competitor A", isUs: false },
    { name: "Competitor B", isUs: false },
    { name: "Competitor C", isUs: false },
  ]

  const features = [
    {
      name: "Fiber Optic Network",
      description: "High-speed fiber optic infrastructure",
      availability: [true, false, true, false],
    },
    {
      name: "99.9% Uptime Guarantee",
      description: "Service level agreement with guaranteed uptime",
      availability: [true, false, false, false],
    },
    {
      name: "No Data Caps",
      description: "Unlimited data usage with no throttling",
      availability: [true, true, false, false],
    },
    {
      name: "24/7 Customer Support",
      description: "Round-the-clock technical assistance",
      availability: [true, false, true, false],
    },
    {
      name: "Free Installation",
      description: "Professional installation at no extra cost",
      availability: [true, false, false, true],
    },
    {
      name: "No Long-Term Contracts",
      description: "Month-to-month service with no commitments",
      availability: [true, false, false, false],
    },
    {
      name: "Wi-Fi Equipment Included",
      description: "Modern Wi-Fi router provided with service",
      availability: [true, true, false, true],
    },
    {
      name: "Network Security Suite",
      description: "Built-in protection against online threats",
      availability: [true, false, false, false],
    },
  ]

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[800px] border-collapse">
        <thead>
          <tr>
            <th className="p-4 text-left bg-gray-50 border-b-2 border-gray-200 w-1/4"></th>
            {competitors.map((competitor, index) => (
              <th
                key={index}
                className={`p-4 text-center border-b-2 ${
                  competitor.isUs
                    ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white border-indigo-800"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                {competitor.isUs ? (
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                  >
                    {competitor.name}
                  </motion.div>
                ) : (
                  competitor.name
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map((feature, featureIndex) => (
            <tr key={featureIndex} className={featureIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="p-4 border-b border-gray-200">
                <div className="font-medium">{feature.name}</div>
                <div className="text-sm text-gray-500">{feature.description}</div>
              </td>
              {feature.availability.map((available, compIndex) => (
                <td
                  key={compIndex}
                  className={`p-4 text-center border-b border-gray-200 ${
                    compIndex === 0 && available ? "bg-indigo-50" : ""
                  }`}
                >
                  {available ? (
                    <CheckCircle
                      className={`mx-auto h-5 w-5 ${compIndex === 0 ? "text-indigo-600" : "text-green-500"}`}
                    />
                  ) : (
                    <X className="mx-auto h-5 w-5 text-red-500" />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

