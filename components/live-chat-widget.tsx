"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageSquare, X, Send, CheckCheck, ChevronDown, ChevronUp } from "lucide-react"
import UnicastLogo from "@/components/unicast-logo"

// Predefined chat messages for the demo
const PREDEFINED_RESPONSES = [
  "Hi there! How can I help you today?",
  "I'd be happy to help you with that. Could you provide more details?",
  "Our plans start at 2,500kes per month for 10 Mbps. Would you like me to tell you more about our packages?",
  "We offer service in over 50 cities nationwide. You can check availability by entering your address on our website.",
  "Installation typically takes 1-2 hours, and most customers can get an appointment within 3-5 business days.",
  "We don't have any contracts - all our plans are month-to-month with no early termination fees.",
  "I'll connect you with our technical support team right away. They'll help resolve your connection issue.",
  "Is there anything else I can help you with today?",
]

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setIsTyping(true)
        setTimeout(() => {
          setMessages([
            {
              id: 1,
              text: "Hello! Welcome to Unicast support. How can I assist you today?",
              sender: "agent",
              timestamp: new Date(),
            },
          ])
          setIsTyping(false)
        }, 1500)
      }, 500)
    }
  }, [isOpen, messages.length])

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Update unread count
  useEffect(() => {
    if (!isOpen && messages.length > 0) {
      const agentMessages = messages.filter((m) => m.sender === "agent")
      if (agentMessages.length > 0) {
        setUnreadCount((prev) => prev + 1)
      }
    } else {
      setUnreadCount(0)
    }
  }, [messages, isOpen])

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    if (inputValue.trim() === "") return

    const newUserMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newUserMessage])
    setInputValue("")

    // Simulate agent typing
    setTimeout(() => {
      setIsTyping(true)

      // Simulate agent response after typing
      setTimeout(() => {
        const randomResponse = PREDEFINED_RESPONSES[Math.floor(Math.random() * PREDEFINED_RESPONSES.length)]

        const newAgentMessage = {
          id: messages.length + 2,
          text: randomResponse,
          sender: "agent",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, newAgentMessage])
        setIsTyping(false)
      }, 2000)
    }, 500)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setIsMinimized(false)
      setUnreadCount(0)
    }
  }

  const toggleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsMinimized(!isMinimized)
  }

  return (
    <>
      {/* Chat button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 bg-indigo-600 text-white rounded-full p-4 shadow-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        {!isOpen && unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-sm border border-gray-200"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            {/* Chat header */}
            <div className="bg-indigo-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <UnicastLogo width={32} height={32} />
                <div>
                  <h3 className="font-bold">Unicast Support</h3>
                  <div className="text-xs flex items-center gap-1 text-indigo-100">
                    <span className="inline-block h-2 w-2 rounded-full bg-green-400"></span>
                    Online
                  </div>
                </div>
              </div>
              <button onClick={toggleMinimize} className="text-white hover:bg-indigo-700 rounded-full p-1">
                {isMinimized ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            </div>

            {/* Chat body */}
            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="h-96 overflow-y-auto p-4 bg-gray-50">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`mb-4 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.sender === "user" ? "bg-indigo-600 text-white" : "bg-white border border-gray-200"
                          }`}
                        >
                          <div className="text-sm mb-1">{message.text}</div>
                          <div
                            className={`text-xs flex justify-end items-center gap-1 ${
                              message.sender === "user" ? "text-indigo-200" : "text-gray-500"
                            }`}
                          >
                            {formatTime(message.timestamp)}
                            {message.sender === "user" && <CheckCheck size={12} />}
                          </div>
                        </div>
                      </div>
                    ))}

                    {isTyping && (
                      <div className="mb-4 flex justify-start">
                        <div className="max-w-[80%] rounded-lg p-3 bg-white border border-gray-200">
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                              <span className="animate-bounce delay-0 h-2 w-2 bg-gray-400 rounded-full"></span>
                              <span className="animate-bounce delay-150 h-2 w-2 bg-gray-400 rounded-full"></span>
                              <span className="animate-bounce delay-300 h-2 w-2 bg-gray-400 rounded-full"></span>
                            </div>
                            <span className="text-xs text-gray-500">Agent is typing...</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>

                  {/* Chat input */}
                  <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 bg-white">
                    <div className="flex gap-2">
                      <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-grow"
                      />
                      <Button
                        type="submit"
                        size="icon"
                        disabled={inputValue.trim() === ""}
                        className="bg-indigo-600 hover:bg-indigo-700"
                      >
                        <Send size={18} />
                      </Button>
                    </div>
                    <div className="text-xs text-gray-500 mt-2 text-center">Powered by Unicast Customer Support</div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

interface ChatMessage {
  id: number
  text: string
  sender: "user" | "agent"
  timestamp: Date
}

