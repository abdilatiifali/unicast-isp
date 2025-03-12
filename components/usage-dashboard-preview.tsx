"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  BarChart3,
  LineChart,
  PieChart,
  Download,
  Upload,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Laptop,
  Smartphone,
  Tv,
  Gamepad,
  ArrowRight,
  AlertCircle,
} from "lucide-react"

export default function UsageDashboardPreview() {
  const [activeTab, setActiveTab] = useState("overview")
  const [timeframe, setTimeframe] = useState("month")
  const [isExpanded, setIsExpanded] = useState(false)

  // Mock data for the charts
  const dailyUsage = [
    { day: "Mon", download: 12.5, upload: 2.3 },
    { day: "Tue", download: 8.2, upload: 1.8 },
    { day: "Wed", download: 15.7, upload: 3.1 },
    { day: "Thu", download: 10.3, upload: 2.5 },
    { day: "Fri", download: 18.9, upload: 4.2 },
    { day: "Sat", download: 25.4, upload: 5.8 },
    { day: "Sun", download: 22.1, upload: 4.9 },
  ]

  const deviceUsage = [
    { name: "Smartphones", usage: 25, color: "bg-indigo-500" },
    { name: "Laptops", usage: 40, color: "bg-orange-500" },
    { name: "Smart TVs", usage: 30, color: "bg-green-500" },
    { name: "Gaming", usage: 5, color: "bg-purple-500" },
  ]

  const totalUsage = {
    download: 235.8,
    upload: 42.3,
    total: 278.1,
    limit: 1000,
    percentage: 27.8,
  }

  const formatGB = (value: number) => {
    return value.toFixed(1)
  }

  // Find the max value for scaling the chart
  const maxDownload = Math.max(...dailyUsage.map((day) => day.download))

  return (
    <div
      className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${isExpanded ? "h-[600px]" : "h-[400px]"}`}
    >
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 p-4 text-white flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold">Usage Dashboard</h3>
          <p className="text-indigo-100 text-sm">Monitor your internet usage and activity</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="border-white/30 text-white hover:bg-white/10 hover:text-white"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Collapse" : "Expand"} Dashboard
        </Button>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="overview" className="flex items-center gap-1">
                <PieChart className="h-4 w-4" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-1">
                <LineChart className="h-4 w-4" />
                <span>History</span>
              </TabsTrigger>
              <TabsTrigger value="devices" className="flex items-center gap-1">
                <BarChart3 className="h-4 w-4" />
                <span>Devices</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Download className="text-indigo-600" size={18} />
                    <span className="text-sm font-medium">Download</span>
                  </div>
                  <div className="text-2xl font-bold">{formatGB(totalUsage.download)} GB</div>
                  <div className="text-xs text-gray-500">of {totalUsage.limit} GB limit</div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Upload className="text-orange-600" size={18} />
                    <span className="text-sm font-medium">Upload</span>
                  </div>
                  <div className="text-2xl font-bold">{formatGB(totalUsage.upload)} GB</div>
                  <div className="text-xs text-gray-500">of {totalUsage.limit} GB limit</div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <PieChart className="text-green-600" size={18} />
                    <span className="text-sm font-medium">Total Usage</span>
                  </div>
                  <div className="text-2xl font-bold">{totalUsage.percentage}%</div>
                  <div className="text-xs text-gray-500">
                    {formatGB(totalUsage.total)} GB of {totalUsage.limit} GB used
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium mb-3">Usage Progress</h4>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: `${totalUsage.percentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0 GB</span>
                  <span>{totalUsage.limit} GB</span>
                </div>

                {totalUsage.percentage > 80 && (
                  <div className="mt-3 flex items-start gap-2 text-amber-600 bg-amber-50 p-2 rounded-lg text-sm">
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    <p>
                      You've used {totalUsage.percentage}% of your monthly data. Consider upgrading your plan to avoid
                      slowdowns.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="history" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium mb-4">Daily Usage</h4>
                <div className="h-48 relative">
                  {/* Chart bars */}
                  <div className="flex justify-between h-40 items-end">
                    {dailyUsage.map((day, index) => (
                      <div key={index} className="flex flex-col items-center gap-1 flex-1">
                        <div className="w-full flex flex-col items-center">
                          <div
                            className="w-5/6 bg-indigo-600 rounded-t"
                            style={{ height: `${(day.download / maxDownload) * 100}%` }}
                          ></div>
                          <div
                            className="w-5/6 bg-orange-500 rounded-t mt-0.5"
                            style={{ height: `${(day.upload / maxDownload) * 30}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500">{day.day}</span>
                      </div>
                    ))}
                  </div>

                  {/* Y-axis labels */}
                  <div className="absolute left-0 top-0 h-40 flex flex-col justify-between text-xs text-gray-500">
                    <span>{formatGB(maxDownload)} GB</span>
                    <span>{formatGB(maxDownload / 2)} GB</span>
                    <span>0 GB</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 bg-indigo-600 rounded"></div>
                    <span className="text-xs text-gray-600">Download</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 bg-orange-500 rounded"></div>
                    <span className="text-xs text-gray-600">Upload</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="devices" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium mb-4">Usage by Device Type</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-3">
                    {deviceUsage.map((device, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white border border-gray-200">
                          {device.name === "Smartphones" && <Smartphone className="h-4 w-4 text-indigo-500" />}
                          {device.name === "Laptops" && <Laptop className="h-4 w-4 text-orange-500" />}
                          {device.name === "Smart TVs" && <Tv className="h-4 w-4 text-green-500" />}
                          {device.name === "Gaming" && <Gamepad className="h-4 w-4 text-purple-500" />}
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">{device.name}</span>
                            <span className="text-sm">{device.usage}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${device.color} rounded-full`}
                              style={{ width: `${device.usage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="relative w-32 h-32">
                      {/* Simple pie chart visualization */}
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#e5e7eb" strokeWidth="20" />

                        {/* We'll fake a pie chart with stroke-dasharray */}
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          stroke="#6366f1"
                          strokeWidth="20"
                          strokeDasharray={`${deviceUsage[0].usage} ${100 - deviceUsage[0].usage}`}
                          strokeDashoffset="25"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          stroke="#f97316"
                          strokeWidth="20"
                          strokeDasharray={`${deviceUsage[1].usage} ${100 - deviceUsage[1].usage}`}
                          strokeDashoffset={`${100 - deviceUsage[0].usage + 25}`}
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          stroke="#22c55e"
                          strokeWidth="20"
                          strokeDasharray={`${deviceUsage[2].usage} ${100 - deviceUsage[2].usage}`}
                          strokeDashoffset={`${100 - deviceUsage[0].usage - deviceUsage[1].usage + 25}`}
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          stroke="#a855f7"
                          strokeWidth="20"
                          strokeDasharray={`${deviceUsage[3].usage} ${100 - deviceUsage[3].usage}`}
                          strokeDashoffset={`${100 - deviceUsage[0].usage - deviceUsage[1].usage - deviceUsage[2].usage + 25}`}
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex items-center gap-2 ml-4">
            <button className="p-1 rounded-full hover:bg-gray-100">
              <ChevronLeft className="h-5 w-5 text-gray-500" />
            </button>
            <div className="flex items-center gap-1 text-sm font-medium">
              <Calendar className="h-4 w-4 text-indigo-600" />
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="bg-transparent focus:outline-none text-gray-700"
              >
                <option value="day">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
            <button className="p-1 rounded-full hover:bg-gray-100">
              <ChevronRight className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 border-t border-gray-100">
          <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
            View Full Dashboard <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

