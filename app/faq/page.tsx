"use client";

import { useState } from "react";
import { Mail, Phone, Clock, MapPin, CheckCircle, Send, Globe, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function FAQContact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    requirement: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ""
      });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.email) newErrors.email = "Required Email address is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        requirement: ""
      });
      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen bg-slate-50 pt-32 pb-20 overflow-hidden">
      {/* Background glow blobs */}
      <div className="absolute top-[10%] left-[-15%] glow-spot-blue" />
      <div className="absolute bottom-[20%] right-[-15%] glow-spot-teal" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-primary bg-primary/10 border border-primary/20">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-dark font-poppins">
            Contact Us & Practice Support
          </h1>
          <p className="text-slate-500 text-sm sm:text-base">
            Reach our doctor support desk, submit impression scans, or subscribe to updates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Info & Map (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            
            {/* Info Card */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xs space-y-6">
              <h3 className="text-lg font-bold text-dark font-poppins border-b border-slate-100 pb-4">
                Practice Headquarters
              </h3>

              <div className="space-y-4">
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Address</h4>
                    <p className="text-dark text-sm sm:text-base leading-relaxed mt-1">
                      103 Janki Avenue, Near Maharani School, Sursagar Lake, Raopura, Vadodara, Gujarat, India 390001
                    </p>
                  </div>
                </div>

                {/* Timings */}
                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hours</h4>
                    <p className="text-dark text-sm sm:text-base leading-relaxed mt-1">
                      11:00 AM to 6:00 PM<br />Monday to Saturday
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email</h4>
                    <a href="mailto:linealign23@gmail.com" className="text-primary hover:underline text-sm sm:text-base block mt-1">
                      linealign23@gmail.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Support Phone</h4>
                    <a href="tel:8281778202" className="text-primary hover:underline text-sm sm:text-base block mt-1">
                      82817 78202
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium map placeholder */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xs border border-slate-100 bg-slate-200">
              <iframe
                title="Office Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.0772210403337!2d73.200555!3d22.301111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDE4JzA0LjAiTiA3M8KwMTInMDIuMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                className="absolute inset-0 w-full h-full border-0 grayscale brightness-95 opacity-80"
                allowFullScreen
                loading="lazy"
              />
            </div>

          </div>

          {/* Right Column: Mailing List Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-100 p-8 sm:p-12 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-dark font-poppins mb-2">
                Join our mailing list
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm mb-8 leading-relaxed">
                By completing and submitting this form, you agree to receive marketing notifications via WhatsApp, Email, SMS, and RCS.
              </p>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                
                {/* First Name & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name*"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full bg-slate-50 border rounded-2xl py-3.5 px-4 text-sm text-dark focus:outline-none focus:bg-white focus:ring-1 focus:ring-primary ${
                        errors.firstName ? "border-red-400" : "border-slate-200"
                      }`}
                    />
                    {errors.firstName && <span className="text-red-500 text-xs mt-1 block">{errors.firstName}</span>}
                  </div>

                  <div>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 text-sm text-dark focus:outline-none focus:bg-white focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Required Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email* (Required)"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full bg-slate-50 border rounded-2xl py-3.5 px-4 text-sm text-dark focus:outline-none focus:bg-white focus:ring-1 focus:ring-primary ${
                        errors.email ? "border-red-400" : "border-slate-200"
                      }`}
                    />
                    {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email}</span>}
                  </div>

                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number*"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full bg-slate-50 border rounded-2xl py-3.5 px-4 text-sm text-dark focus:outline-none focus:bg-white focus:ring-1 focus:ring-primary ${
                        errors.phone ? "border-red-400" : "border-slate-200"
                      }`}
                    />
                    {errors.phone && <span className="text-red-500 text-xs mt-1 block">{errors.phone}</span>}
                  </div>
                </div>

                {/* Requirement Area */}
                <div>
                  <textarea
                    name="requirement"
                    rows={4}
                    placeholder="Your requirements or specific clinical query..."
                    value={formData.requirement}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 text-sm text-dark focus:outline-none focus:bg-white focus:ring-1 focus:ring-primary resize-none"
                  />
                </div>

                {/* Submit button / success container */}
                <div className="pt-2">
                  {success ? (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex items-center justify-center gap-2 p-4 bg-secondary/10 border border-secondary/20 text-secondary rounded-2xl text-sm font-semibold"
                    >
                      <CheckCircle className="w-5 h-5 flex-shrink-0" />
                      <span>Thanks for submitting! We will contact you shortly.</span>
                    </motion.div>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-sm font-semibold text-white bg-gradient-to-r from-primary to-secondary hover:brightness-105 shadow-md shadow-primary/10 transition-all cursor-pointer"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          Subscribe & Submit
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  )}
                </div>

              </form>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
