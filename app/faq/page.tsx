"use client";

import { useState } from "react";
import { Mail, Phone, Clock, MapPin, CheckCircle, Send, Globe, ChevronRight, Sparkles, MessageSquare } from "lucide-react";
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
    <div className="relative min-h-screen bg-slate-50 pt-36 pb-20 overflow-hidden">
      {/* Background glow blobs */}
      <div className="absolute top-[10%] left-[-15%] glow-spot-blue" />
      <div className="absolute bottom-[20%] right-[-15%] glow-spot-teal" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-primary bg-primary/10 border border-primary/20 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-secondary animate-pulse" />
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-dark font-poppins">
            Contact Us & Practice Support
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Reach our doctor support desk, submit impression scans, or subscribe to updates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Info & Map (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            
            {/* Info Card */}
            <div className="bg-white rounded-[2rem] p-8 border border-slate-150/50 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-dark font-poppins border-b border-slate-100 pb-4">
                Laboratory Headquarters
              </h3>

              <div className="space-y-5">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Address</h4>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-1 font-semibold">
                      83, Pookkayam, Malakallu,<br />
                      Near Indian Oil Petrol Pump, Malakallu PO,<br />
                      PIN 671532, Kasaragod District, Kerala, India
                    </p>
                  </div>
                </div>

                {/* Timings */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hours</h4>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-1 font-semibold">
                      24 Hours Working Laboratory
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email</h4>
                    <a href="mailto:linealign23@gmail.com" className="text-primary hover:underline text-sm sm:text-base block mt-1 font-semibold">
                      linealign23@gmail.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Support Phone</h4>
                    <a href="tel:8281778202" className="text-primary hover:underline text-sm sm:text-base block mt-1 font-semibold">
                      82817 78202
                    </a>
                  </div>
                </div>
              </div>

              {/* Instant Call / WhatsApp Row */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <a
                  href="tel:8281778202"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-full text-xs font-bold text-white bg-primary hover:bg-primary-hover shadow-xs transition-all"
                >
                  <Phone className="w-3.5 h-3.5" /> Call Now
                </a>
                <a
                  href="https://wa.me/918281778202"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-full text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" /> WhatsApp
                </a>
              </div>
            </div>

            {/* Premium Google Map */}
            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-sm border border-slate-150/50 bg-slate-200 self-stretch min-h-[350px]">
              <iframe
                title="Linealign Dental Lab Location Map"
                src="https://maps.google.com/maps?q=Kasaragod,%20Kerala,%20India&z=13&output=embed"
                className="absolute inset-0 w-full h-full border-0 grayscale brightness-95 opacity-90"
                allowFullScreen
                loading="lazy"
              />
            </div>

          </div>

          {/* Right Column: Mailing List Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-[2rem] border border-slate-150/50 p-8 sm:p-12 shadow-sm flex flex-col justify-between self-stretch">
            <div>
              <h3 className="text-2xl font-bold text-dark font-poppins mb-2">
                Join our mailing list
              </h3>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                By completing and submitting this form, you agree to receive laboratory notifications, case simulations, and clinical updates via WhatsApp, Email, SMS, and RCS.
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
                      className={`w-full bg-slate-50 border rounded-2xl py-3.5 px-4 text-sm text-dark focus:outline-none focus:bg-white focus:ring-1 focus:ring-primary transition-all ${
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
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 text-sm text-dark focus:outline-none focus:bg-white focus:ring-1 focus:ring-primary transition-all"
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
                      className={`w-full bg-slate-50 border rounded-2xl py-3.5 px-4 text-sm text-dark focus:outline-none focus:bg-white focus:ring-1 focus:ring-primary transition-all ${
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
                      className={`w-full bg-slate-50 border rounded-2xl py-3.5 px-4 text-sm text-dark focus:outline-none focus:bg-white focus:ring-1 focus:ring-primary transition-all ${
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
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 text-sm text-dark focus:outline-none focus:bg-white focus:ring-1 focus:ring-primary resize-none transition-all"
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
