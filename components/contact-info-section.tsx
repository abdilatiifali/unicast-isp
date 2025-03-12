"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import ContactForm from "@/components/contact-form"

export default function ContactInfoSection() {
  return (
    <section id="contact-us" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-700 to-orange-500 bg-clip-text text-transparent">
              Contact Us
            </h2>
            <p className="text-lg text-gray-600">
              Have questions or need assistance? Our team is here to help you with any inquiries.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ScrollReveal delay={0.1}>
            <ContactForm />
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="space-y-8">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-orange-500 to-orange-700 p-6 text-white">
                  <h3 className="text-xl font-bold mb-1">Our Office</h3>
                  <p className="text-orange-100">Visit us at our headquarters</p>
                </div>

                <div className="p-6">
                  <div className="aspect-w-16 aspect-h-9 mb-6 rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.818223157742!2d36.8213589!3d-1.2833882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d8eeeaee53%3A0xb1e3999e64345e62!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1647886100000!5m2!1sen!2sus"
                      width="600"
                      height="450"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-full"
                      title="Unicast Office Location"
                    ></iframe>
                  </div>

                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="bg-orange-100 p-2 rounded-full mt-0.5">
                        <MapPin className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Address</h4>
                        <p className="text-gray-600">
                          Moonz Plaza, Jam Street<br />
                          Nairobi, Kenya
                        </p>
                      </div>
                    </li>

                    <li className="flex items-start gap-3">
                      <div className="bg-orange-100 p-2 rounded-full mt-0.5">
                        <Phone className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Phone</h4>
                        <p className="text-gray-600">
                          <a href="tel:+254712345678" className="hover:text-orange-600 transition-colors">
                            +254 722 993166
                          </a>
                        </p>
                      </div>
                    </li>

                    <li className="flex items-start gap-3">
                      <div className="bg-orange-100 p-2 rounded-full mt-0.5">
                        <Mail className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Email</h4>
                        <p className="text-gray-600">
                          <a href="mailto:info@unicast.com" className="hover:text-orange-600 transition-colors">
                            info@unicast.com
                          </a>
                        </p>
                      </div>
                    </li>

                    <li className="flex items-start gap-3">
                      <div className="bg-orange-100 p-2 rounded-full mt-0.5">
                        <Clock className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Business Hours</h4>
                        <p className="text-gray-600">
                          Monday - Sunday: 8:00 AM - 10:00 PM
                          <br />
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                  <h4 className="font-bold mb-2 flex items-center gap-2">
                    <span className="text-indigo-600">Technical Support</span>
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </h4>
                  <p className="text-gray-600 mb-3">
                    Need help with your connection? Our technical team is available 24/7.
                  </p>
                  <a
                    href="tel:+254722993166"
                    className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
                  >
                    Call Support
                  </a>
                </motion.div>

                <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                  <h4 className="font-bold mb-2 flex items-center gap-2">
                    <span className="text-orange-600">Sales Inquiries</span>
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </h4>
                  <p className="text-gray-600 mb-3">
                    Interested in our services? Talk to our sales team for the best offers.
                  </p>
                  <a
                    href="mailto:info@unicasttech.com"
                    className="text-orange-600 font-medium hover:text-orange-800 transition-colors"
                  >
                    Email Sales
                  </a>
                </motion.div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

