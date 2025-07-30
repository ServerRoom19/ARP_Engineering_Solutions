"use client"
import { sendContactEmail } from './actions/send-email'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, X, Menu, Mail, Phone, Send } from "lucide-react";

export default function ARPWebsite() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{type: 'success' | 'error', text: string} | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [formData, setFormData] = useState({
  fullName: "",
  email: "",
  phone: "",
  company: "",
  inquiryType: "",
  message: "",
})

  // Detailed products for modal
  const detailedProducts = [
    {
      title: "Electrical Vehicle Chargers",
      description:
        "Advanced EV charging solutions compliant with industry standards, supporting the future of sustainable transportation.",
      image: "/productEV.png",
      fullDescription:
        "State-of-the-art EV chargers supporting multiple standards (Type 2, CCS, CHAdeMO) with smart connectivity and robust safety features.",
      specifications: [
        "Output Power: 3.3kW to 350kW",
        "Connector Types: Type 2, CCS, CHAdeMO",
        "Smart Features: OCPP, RFID, App Control",
        "Protection: IP54/IP65, Surge, Overcurrent",
        "Compliance: IEC, IS, Bharat EV",
      ],
      applications: ["Commercial Parking", "Fleet Charging", "Residential", "Public Stations"],
      keyFeatures: ["Fast Charging", "Universal Compatibility", "Remote Monitoring", "Safety Features"],
    },
    {
      title: "UPS Systems",
      description:
        "Reliable uninterruptible power supply systems ensuring continuous operation for critical infrastructure.",
      image: "/productUPS.png",
      fullDescription:
        "High-efficiency UPS systems with online/double conversion technology, scalable capacity, and advanced battery management.",
      specifications: [
        "Capacity: 1kVA to 800kVA",
        "Topology: Online, Line Interactive",
        "Efficiency: Up to 98%",
        "Battery: VRLA, Li-ion, Modular",
        "Monitoring: SNMP, LCD Display",
      ],
      applications: ["Data Centers", "Hospitals", "Industrial Automation", "Telecom"],
      keyFeatures: ["Scalable Design", "High Efficiency", "Advanced Monitoring", "Battery Management"],
    },
    {
      title: "Power Quality Devices",
      description:
        "Comprehensive power quality solutions to protect equipment and optimize electrical system performance.",
      image: "/productPQD.png",
      fullDescription:
        "Devices for surge protection, harmonic filtering, and voltage regulation to ensure stable and clean power supply.",
      specifications: [
        "Surge Rating: Up to 40kA",
        "Harmonic Filter: THD <5%",
        "Voltage Regulation: ±1%",
        "Response Time: <1ms",
        "Compliance: IEC, IEEE",
      ],
      applications: ["Industrial Plants", "Commercial Buildings", "Sensitive Equipment"],
      keyFeatures: ["Surge Protection", "Harmonic Mitigation", "Voltage Regulation", "Fast Response"],
    },
    {
      title: "Isolation Transformers",
      description:
        "High-quality isolation transformers providing electrical safety and noise reduction for sensitive equipment.",
      image: "/productTransformers.jpg",
      fullDescription:
        "Custom-built isolation transformers for medical, industrial, and IT applications, ensuring galvanic isolation and noise suppression.",
      specifications: [
        "Capacity: 1kVA to 1000kVA",
        "Insulation: Class F/H",
        "Noise Attenuation: >100dB",
        "Voltage: Customizable",
        "Standards: IS, IEC",
      ],
      applications: ["Medical Labs", "IT Rooms", "Industrial Automation"],
      keyFeatures: ["Galvanic Isolation", "Noise Reduction", "Custom Design", "High Reliability"],
    },
    {
      title: "Power Conditioner Equipment",
      description: "Advanced power conditioning solutions ensuring clean, stable power for critical applications.",
      image: "/productPCE.png",
      fullDescription:
        "Power conditioners for voltage regulation, surge suppression, and noise filtering, ideal for sensitive loads.",
      specifications: [
        "Voltage Regulation: ±1%",
        "Surge Suppression: Up to 40kA",
        "Noise Filter: >100dB",
        "Efficiency: >98%",
        "Compliance: IEC, IS",
      ],
      applications: ["Laboratories", "Broadcast Studios", "Medical Equipment"],
      keyFeatures: ["Voltage Regulation", "Surge Protection", "Noise Filtering", "High Efficiency"],
    },
    {
      title: "Static Voltage Regulators",
      description: "Precision voltage regulation systems maintaining optimal voltage levels for equipment protection.",
      image: "/productSVR.png",
      fullDescription:
        "High-performance static voltage regulators providing fast, accurate voltage correction without mechanical components for enhanced reliability.",
      specifications: [
        "Regulation Accuracy: ±1%",
        "Input Range: ±25%",
        "Response Time: <1ms",
        "Efficiency: >98%",
        "Load Regulation: <0.5%",
      ],
      applications: ["CNC Machines", "Medical Equipment", "Elevators", "HVAC Systems"],
      keyFeatures: ["Static Operation", "Fast Response", "High Accuracy", "Maintenance Free"],
    },
    {
      title: "Servo Stabilizers",
      description:
        "Automatic voltage stabilization systems providing consistent power quality for industrial applications.",
      image: "/productStabilizers.png",
      fullDescription:
        "Robust servo-controlled voltage stabilizers designed for heavy-duty industrial applications, providing reliable voltage correction with high accuracy.",
      specifications: [
        "Capacity: 5kVA to 5000kVA",
        "Input Range: ±50%",
        "Output Accuracy: ±1%",
        "Correction Speed: 2-3V/sec",
        "Overload Capacity: 150% for 1 minute",
      ],
      applications: ["Manufacturing Plants", "Textile Industry", "Chemical Plants", "Steel Mills"],
      keyFeatures: ["Heavy Duty Design", "Wide Input Range", "Automatic Operation", "Overload Protection"],
    },
    {
      title: "CVCT, TVSS, CVCF, AHF",
      description:
        "Specialized power protection and conditioning equipment for advanced electrical system requirements.",
      image: "/productCVCT.png",
      fullDescription:
        "Comprehensive range of specialized power equipment including Constant Voltage Constant Frequency units, Transient Voltage Surge Suppressors, and Active Harmonic Filters.",
      specifications: [
        "CVCT: 50Hz/60Hz conversion",
        "TVSS: Up to 40kA surge rating",
        "CVCF: ±0.1% frequency stability",
        "AHF: THD reduction to <5%",
        "Response: Real-time correction",
      ],
      applications: ["Aerospace", "Defense", "Research Facilities", "Precision Industries"],
      keyFeatures: ["Frequency Conversion", "Surge Protection", "Harmonic Mitigation", "Precision Control"],
    },
    {
      title: "Internal & External Signages",
      description:
        "Professional signage solutions enhancing brand visibility and communication across all environments.",
      image: "/productSignages.png",
      fullDescription:
        "Complete signage solutions including LED displays, digital signage, wayfinding systems, and custom fabricated signs for indoor and outdoor applications.",
      specifications: [
        "LED Displays: P2.5 to P10 pixel pitch",
        "Brightness: Up to 10,000 nits",
        "Viewing Angle: 160°H/160°V",
        "Operating Temp: -20°C to +60°C",
        "IP Rating: IP65 for outdoor",
      ],
      applications: ["Corporate Offices", "Retail Stores", "Airports", "Stadiums"],
      keyFeatures: ["High Resolution", "Weather Resistant", "Remote Control", "Custom Designs"],
    },
  ];
  // ...existing code...
  const heroSlides = [
    {
      title: "MV & Control Panels",
      caption: "Precision-engineered medium voltage and control panels for industrial and commercial applications.",
      image: "/MV&ControlPanels.png",
    },
    {
      title: "Internal & External Signages",
      caption: "Professional signage solutions that enhance visibility and brand presence across all environments.",
      image: "/Signages.png",
    },
    {
      title: "Single Window Engineering Solutions",
      caption: "Your trusted partner for comprehensive engineering solutions with exceptional after-sales support.",
      image: "/serviceSingleWindow.png",
    },
    {
      title: "UPS & Power Quality Equipment",
      caption:
        "Ensuring uninterrupted power supply with advanced UPS systems and power quality solutions for critical applications.",
      image: "/UPS.png",
    },
    {
      title: "EV Charging Solutions",
      caption: "Leading the electric mobility revolution with innovative and compliant EV charging infrastructure.",
      image: "/EV.png",
    },
  ]

  const products = [
    {
      title: "Electrical Vehicle Chargers",
      description:
        "Advanced EV charging solutions compliant with industry standards, supporting the future of sustainable transportation.",
      image: "/productEV.png",
    },
    {
      title: "UPS Systems",
      description:
        "Reliable uninterruptible power supply systems ensuring continuous operation for critical infrastructure.",
      image: "/productUPS.png",
    },
    {
      title: "Power Quality Devices",
      description:
        "Comprehensive power quality solutions to protect equipment and optimize electrical system performance.",
      image: "/productPQD.png",
    },
    {
      title: "Isolation Transformers",
      description:
        "High-quality isolation transformers providing electrical safety and noise reduction for sensitive equipment.",
      image: "/productTransformers.jpg",
    },
    {
      title: "Power Conditioner Equipment",
      description: "Advanced power conditioning solutions ensuring clean, stable power for critical applications.",
      image: "/productPCE.png",
    },
    {
      title: "Static Voltage Regulators",
      description: "Precision voltage regulation systems maintaining optimal voltage levels for equipment protection.",
      image: "/productSVR.png",
    },
    {
      title: "Servo Stabilizers",
      description:
        "Automatic voltage stabilization systems providing consistent power quality for industrial applications.",
      image: "/productStabilizers.png",
    },
    {
      title: "CVCT, TVSS, CVCF, AHF",
      description:
        "Specialized power protection and conditioning equipment for advanced electrical system requirements.",
      image: "/productCVCT.png",
    },
    {
      title: "Internal & External Signages",
      description:
        "Professional signage solutions enhancing brand visibility and communication across all environments.",
      image: "/productSignages.png",
    },
  ];
  const partners = [
    { name: "Schneider Electric", logo: "/Logo1.jpg" },
    { name: "Numeric (Legrand)", logo: "/Logo2.jpg" },
    { name: "KRYKART (Atandra Energy)", logo: "/Logo3.jpg" },
    { name: "Power One", logo: "/Logo4.jpg" },
    { name: "Unitop Power Electronics", logo: "/Logo5.jpg" },
    { name: "Belectriq Mobility", logo: "/Logo6.jpg" },
    { name: "Lubi EV Solutions", logo: "/Logo7.jpg" },
    { name: "E-Fuel (Hindustan Systems)", logo: "/Logo8.jpg" },
    { name: "ARP", logo: "/Logo9.jpg" },
    { name: "Electrical Panel", logo: "/Logo10.jpg" },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [heroSlides.length])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsSubmitting(true)
  setSubmitMessage(null)

  const formDataToSend = new FormData()
  formDataToSend.append('fullName', formData.fullName)
  formDataToSend.append('email', formData.email)
  formDataToSend.append('phone', formData.phone)
  formDataToSend.append('company', formData.company)
  formDataToSend.append('inquiryType', formData.inquiryType)
  formDataToSend.append('message', formData.message)

  try {
    const result = await sendContactEmail(formDataToSend)
    
    if (result.success) {
      setSubmitMessage({ type: 'success', text: 'Thank you! Your message has been sent successfully. We will get back to you soon.' })
      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        company: "",
        inquiryType: "",
        message: "",
      })
    } else {
      setSubmitMessage({ type: 'error', text: result.error || 'Failed to send message. Please try again.' })
    }
  } catch (error) {
    setSubmitMessage({ type: 'error', text: 'An error occurred. Please try again later.' })
  } finally {
    setIsSubmitting(false)
  }
}

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const openProductModal = (product: any) => {
    const detailedProduct = detailedProducts.find((p) => p.title === product.title)
    setSelectedProduct(detailedProduct || product)
    setIsModalOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeProductModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
    document.body.style.overflow = "unset"
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image
              src="/Logo.jpg"
              alt="ARP Engineering Solutions Logo"
              width={60}
              height={60}
              className="rounded-lg"
              priority
            />
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">ARP Engineering Solutions</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {["HOME", "PRODUCTS", "SERVICES", "CONTACT"].map((item) => (
              <Button
                key={item}
                variant="ghost"
                className="text-xl font-bold hover:text-blue-600"
                onClick={() => scrollToSection(item.toLowerCase())}
              >
                {item}
              </Button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t">
            <nav className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-2">
                {["HOME", "PRODUCTS", "SERVICES", "CONTACT"].map((item) => (
                  <Button
                    key={item}
                    variant="ghost"
                    className="justify-start"
                    onClick={() => scrollToSection(item.toLowerCase())}
                  >
                    {item}
                  </Button>
                ))}
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="relative h-screen overflow-hidden mt-16">
        <div className="relative w-full h-full">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
              style={{ pointerEvents: index === currentSlide ? 'auto' : 'none' }}
            >
              <Image src={slide.image || "/placeholder.svg"} alt={slide.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white max-w-4xl px-4">
                  <h2 className="text-4xl md:text-6xl font-bold mb-6">{slide.title}</h2>
                  <p className="text-lg md:text-xl mb-8">{slide.caption}</p>
                </div>
              </div>
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 w-auto flex justify-center">
                <Button
                  size="lg"
                  className="bg-white text-black font-bold hover:bg-gray-200 border border-white shadow-lg"
                  onClick={() => scrollToSection('products')}
                >
                  Learn More
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 border-white/30 text-white hover:bg-white/30"
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 border-white/30 text-white hover:bg-white/30"
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
        >
          <ChevronRight />
        </Button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Products</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive range of power quality and engineering solutions designed to meet your specific
              requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => openProductModal(product)}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{product.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">{product.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Single Window Engineering Solutions - Your one-stop destination for comprehensive engineering support.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Single Window Engineering Solutions</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Complimentary EV Charger Engineering Services</h4>
                    <p className="text-gray-600">
                      Services included with all EV charging solutions, ensuring optimal
                      performance and compliance.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Exceptional After-Sales Support</h4>
                    <p className="text-gray-600">
                      Fast response times and expert troubleshooting to minimize downtime and ensure continuous
                      operation.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Industry Standards Compliance</h4>
                    <p className="text-gray-600">
                      All solutions are designed and implemented in strict adherence to industry regulations and safety
                      standards.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/singleWindow.jpg"
                alt="Single Window Engineering Solutions"
                width={600}
                height={500}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">About ARP Engineering Solutions</h2>
            <div className="space-y-6 text-lg text-gray-600">
              <p>
                ARP Engineering Solutions is committed to delivering sustainable, integrated engineering solutions
                focused on power continuity and smart infrastructure. Our mission is to be your trusted long-term
                partner, providing quality and value in every project we undertake.
              </p>
              <p>
                Through strategic partnerships with industry leaders like Schneider Electric and Numeric (Legrand), we
                bring cutting-edge technology and innovation to our clients. Our focus on environmental sustainability
                and advanced engineering solutions positions us at the forefront of the industry.
              </p>
              <p>
                We believe in building lasting relationships with our clients by delivering exceptional service,
                maintaining the highest quality standards, and continuously innovating to meet evolving market needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Partners</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Collaborating with industry leaders to deliver world-class engineering solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-6 bg-gray-50 rounded-lg hover:bg-white hover:shadow-lg transition-all duration-300 group"
              >
                <Image
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  width={160}
                  height={80}
                  className="max-w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Ready to discuss your engineering needs? Get in touch with our team of experts.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-bold mb-8">Get In Touch</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Mail className="w-6 h-6 text-blue-400" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-gray-300">arpengineeringsolutions@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="w-6 h-6 text-blue-400" />
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-gray-300">+91 9310929371</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName" className="text-white">
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-white">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="text-white">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company" className="text-white">
                      Company Name
                    </Label>
                    <Input
                      id="company"
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="Enter your company name"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="inquiryType" className="text-white">
                    Type of Inquiry *
                  </Label>
                  <Select
                    value={formData.inquiryType}
                    onValueChange={(value) => handleInputChange("inquiryType", value)}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select inquiry type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="products">Product Information</SelectItem>
                      <SelectItem value="services">Service Inquiry</SelectItem>
                      <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                      <SelectItem value="support">Technical Support</SelectItem>
                      <SelectItem value="quotation">Request Quotation</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="message" className="text-white">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="Please describe your requirements or inquiry in detail..."
                  />
                </div>
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed" 
                  disabled={isSubmitting}
                >
                  <Send className="w-4 h-4 mr-2" />
                  {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
                </Button>
              </form>
              {/* Success/Error Message */}
              {submitMessage && (
                <div className={`mt-6 p-4 rounded-lg border ${
                  submitMessage.type === 'success' 
                    ? 'bg-green-100 text-green-800 border-green-200' 
                    : 'bg-red-100 text-red-800 border-red-200'
                }`}>
                  <div className="flex items-center">
                    {submitMessage.type === 'success' ? (
                      <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    ) : (
                      <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-xs">!</span>
                      </div>
                    )}
                    <span className="font-medium">{submitMessage.text}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">ARP</span>
            </div>
            <span className="text-lg font-semibold">ARP Engineering Solutions</span>
          </div>
          <p className="text-gray-400">© {new Date().getFullYear()} ARP Engineering Solutions. All rights reserved.</p>
        </div>
      </footer>

      {/* Product Modal */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={closeProductModal} />

          {/* Modal Content */}
          <div className="relative bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-white shadow-md hover:bg-gray-100"
              onClick={closeProductModal}
            >
              <X className="w-5 h-5" />
            </Button>

            {/* Modal Header */}
            <div className="relative">
              <Image
                src={selectedProduct.image || "/placeholder.svg"}
                alt={selectedProduct.title}
                width={800}
                height={400}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-lg" />
              <div className="absolute bottom-4 left-6 text-white">
                <h2 className="text-3xl font-bold mb-2">{selectedProduct.title}</h2>
                <p className="text-lg opacity-90">{selectedProduct.description}</p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-8">
              {/* Full Description */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Overview</h3>
                <p className="text-gray-600 leading-relaxed">{selectedProduct.fullDescription}</p>
              </div>

              {/* Specifications */}
              {selectedProduct.specifications && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Technical Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedProduct.specifications.map((spec: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />
                        <span className="text-gray-600">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Features */}
              {selectedProduct.keyFeatures && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedProduct.keyFeatures.map((feature: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <div className="w-2 h-2 bg-green-600 rounded-full" />
                        </div>
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Applications */}
              {selectedProduct.applications && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Applications</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.applications.map((app: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
