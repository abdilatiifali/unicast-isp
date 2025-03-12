"use client"

import { useState, useEffect } from "react"
import { MessageCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface WhatsAppChatButtonProps {
  phoneNumber: string
  message?: string
  position?: "bottom-right" | "bottom-left"
  showTooltip?: boolean
  tooltipText?: string
}

export default function WhatsAppChatButton({
  phoneNumber,
  message = "Hello! I'm interested in your internet services.",
  position = "bottom-right",
  showTooltip = true,
  tooltipText = "Chat with us on WhatsApp",
}: WhatsAppChatButtonProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)

  // Format the phone number to remove any non-numeric characters
  const formattedPhoneNumber = phoneNumber.replace(/\D/g, "")

  // Create the WhatsApp URL
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${formattedPhoneNumber}&text=${encodeURIComponent(message)}`

  // Show the button after a short delay for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Position classes
  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed ${positionClasses[position]} z-50`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <div className="relative group">
            {showTooltip && (
              <AnimatePresence>
                {isTooltipVisible && (
                  <motion.div
                    className="absolute bottom-full mb-2 right-0 bg-white text-gray-800 px-3 py-1 rounded-lg shadow-lg whitespace-nowrap"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {tooltipText}
                    <div className="absolute top-full right-4 -mt-1 w-2 h-2 bg-white transform rotate-45"></div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
              onMouseEnter={() => setIsTooltipVisible(true)}
              onMouseLeave={() => setIsTooltipVisible(false)}
              aria-label="Chat with us on WhatsApp"
            >
              <div className="relative flex items-center justify-center">
                <MessageCircle className="text-white w-8 h-8" />
                <motion.div
                  className="absolute inset-0 bg-white rounded-full"
                  initial={{ scale: 0, opacity: 0.3 }}
                  animate={{
                    scale: [0, 1.5, 0],
                    opacity: [0.3, 0.1, 0],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 3,
                    duration: 1.5,
                  }}
                />
              </div>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

