"use client";

import { useState } from "react";
import { Briefcase, Calendar, Link as LinkIcon, Send, CheckCircle, Video, Play, Info } from "lucide-react";
import { motion } from "framer-motion";

const positions = [
  {
    id: "pm",
    title: "Product Manager",
    department: "Product & Strategy",
    location: "Vadodara / Hybrid",
    description: "Lead product development for orthodontic simulation platforms, coordinating aligner engineering specifications with web interfaces to ensure highly seamless practitioner and customer operations."
  },
  {
    id: "fsd",
    title: "Full Stack Developer",
    department: "Engineering",
    location: "Vadodara / Remote",
    description: "Architect secure clinical database storage, physician portals, payment gateways, and custom aligner tracking web/mobile applications in React, Next.js, Node.js, and TypeScript."
  },
  {
    id: "vp",
    title: "VP R&D",
    department: "Research & Development",
    location: "Vadodara / On-Site",
    description: "Direct advanced biomechanical material science, precision alignment vectors, arch expansion integration, and manufacturing automation teams to refine product lines."
  },
  {
    id: "hr",
    title: "HR Partner",
    department: "People Operations",
    location: "Vadodara / On-Site",
    description: "Coordinate clinical talent search, engineering recruiting, and build a collaborative culture grounded on trust, transparency, and personal/professional growth."
  }
];

export default function Careers() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "pm",
    startDate: "",
    resume: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.startDate) newErrors.startDate = "Available Start Date is required";
    if (!formData.resume) newErrors.resume = "Link to resume is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    // Simulate API submit
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        position: "pm",
        startDate: "",
        resume: ""
      });
      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen bg-white pt-32 pb-20 overflow-hidden">
      {/* Background glow spots */}
      <div className="absolute top-[10%] left-[-15%] glow-spot-blue" />
      <div className="absolute bottom-[20%] right-[-15%] glow-spot-teal" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-primary bg-primary/10 border border-primary/20">
            Careers at LINEALIGN
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-dark font-poppins">
            Join Our Excellent Team
          </h1>
          <p className="text-slate-500 text-sm sm:text-base">
            We are creating a better way to work together, built on trust & respect that will reflect a positive change in the world.
          </p>
        </div>

        {/* Culture Video / Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-dark font-poppins">
              Life at LINEALIGN
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              We empower team members to take full ownership, innovate on cutting-edge dental tech solutions, and grow alongside dental networks spanning 12 countries. Explore our fast-paced culture and flat organizational hierarchy.
            </p>
          </div>

          <div className="lg:col-span-7">
            {/* Custom interactive video player mockup */}
            <div className="relative w-full aspect-[16/9] bg-dark rounded-3xl overflow-hidden shadow-lg border border-slate-800 flex items-center justify-center group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/15 opacity-40 group-hover:scale-105 transition-transform duration-500" />
              
              {/* Play symbol button */}
              <div className="relative z-10 w-16 h-16 rounded-full bg-white text-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 fill-current text-primary translate-x-0.5" />
              </div>

              {/* Title Overlay */}
              <div className="absolute bottom-4 left-6 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2">
                <Video className="w-4 h-4 text-secondary" />
                Working at LINEALIGN: Culture Video
              </div>
            </div>
          </div>

        </div>

        {/* Open Positions Grid */}
        <div className="mb-24">
          <h2 className="text-2xl font-bold text-dark font-poppins mb-8 border-b border-slate-100 pb-4">
            Open Positions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {positions.map((pos) => (
              <div
                key={pos.id}
                className="p-8 bg-slate-50 border border-slate-100 rounded-3xl flex flex-col justify-between hover:shadow-xs transition-all"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-lg font-bold text-dark font-poppins">{pos.title}</h3>
                    <span className="text-[10px] font-bold text-slate-400 bg-white border border-slate-200/50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {pos.location}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{pos.department}</p>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{pos.description}</p>
                </div>
                <div className="pt-6">
                  <a
                    href="#apply"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-hover"
                  >
                    Quick Apply
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Apply Here Form */}
        <div id="apply" className="bg-slate-50 border border-slate-100 rounded-[2rem] p-8 sm:p-12 shadow-xs max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-dark font-poppins mb-2 text-center">
            Apply Here
          </h3>
          <p className="text-slate-500 text-xs sm:text-sm mb-10 text-center">
            Complete the form details and provide a resume link to submit your application.
          </p>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            
            {/* First Name & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="relative">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name*"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full bg-white border rounded-2xl py-3.5 px-4 text-sm text-dark focus:outline-none focus:ring-1 focus:ring-primary ${
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
                  className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 px-4 text-sm text-dark focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address*"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full bg-white border rounded-2xl py-3.5 px-4 text-sm text-dark focus:outline-none focus:ring-1 focus:ring-primary ${
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
                  className={`w-full bg-white border rounded-2xl py-3.5 px-4 text-sm text-dark focus:outline-none focus:ring-1 focus:ring-primary ${
                    errors.phone ? "border-red-400" : "border-slate-200"
                  }`}
                />
                {errors.phone && <span className="text-red-500 text-xs mt-1 block">{errors.phone}</span>}
              </div>
            </div>

            {/* Position Select & Available Start Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Target Position
                </label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 px-4 text-sm text-dark focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                >
                  <option value="pm">Product Manager</option>
                  <option value="fsd">Full Stack Developer</option>
                  <option value="vp">VP R&D</option>
                  <option value="hr">HR Partner</option>
                </select>
              </div>

              <div className="relative">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Available Start Date*
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className={`w-full bg-white border rounded-2xl py-3.5 px-4 text-sm text-dark focus:outline-none focus:ring-1 focus:ring-primary ${
                      errors.startDate ? "border-red-400" : "border-slate-200"
                    }`}
                  />
                </div>
                {errors.startDate && <span className="text-red-500 text-xs mt-1 block">{errors.startDate}</span>}
              </div>
            </div>

            {/* Resume Link */}
            <div className="relative">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Link to Your Resume* (PDF/Drive Link)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                  <LinkIcon className="w-4 h-4" />
                </span>
                <input
                  type="url"
                  name="resume"
                  placeholder="https://drive.google.com/..."
                  value={formData.resume}
                  onChange={handleInputChange}
                  className={`w-full bg-white border rounded-2xl py-3.5 pl-10 pr-4 text-sm text-dark focus:outline-none focus:ring-1 focus:ring-primary ${
                    errors.resume ? "border-red-400" : "border-slate-200"
                  }`}
                />
              </div>
              {errors.resume && <span className="text-red-500 text-xs mt-1 block">{errors.resume}</span>}
            </div>

            {/* Submit button Container */}
            <div className="pt-4">
              {success ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center justify-center gap-2 p-4 bg-secondary/10 border border-secondary/20 text-secondary rounded-2xl text-sm font-semibold"
                >
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span>Thanks for submitting! We will review your profile shortly.</span>
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
                      Submit Application
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
  );
}
