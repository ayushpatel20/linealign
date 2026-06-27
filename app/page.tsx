"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  MapPin,
  Calendar,
  Users,
  Briefcase,
  Globe,
  Zap,
  ChevronRight,
  ChevronDown,
  MessageSquare,
  ShieldCheck,
  Clock,
  Layers,
  Sparkle,
  CheckCircle,
  Phone,
  Mail,
  Activity,
  Award,
  Check,
  Smile
} from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

// Testimonial Data
const testimonials = [
  {
    name: "Dr. Rajesh Sharma",
    role: "Orthodontist, Mumbai",
    quote: "Linealign has transformed how I run my aligner practice. The treatment simulation within 24 hours is incredibly accurate, and patients love seeing the 3D visual step-by-step progress.",
    avatar: "RS"
  },
  {
    name: "Dr. Ananya Goel",
    role: "Cosmetic Dentist, Bangalore",
    quote: "The marketing support demo kits and in-office videos have doubled my patient conversions. Linealign clear aligners are highly precise and pricing is very competitive.",
    avatar: "AG"
  },
  {
    name: "Dr. Vikram Seth",
    role: "Clinic Director, Vadodara",
    quote: "Emergency support and the tracking app make after-care extremely simple. Highly recommended aligner partner with unmatched support.",
    avatar: "VS"
  }
];

// FAQ Data (collapsible)
const faqs = [
  {
    question: "How do I submit patient scans to Linealign?",
    answer: "You can send us your patient's intraoral scans (STL files) or physical silicone impressions via WhatsApp (82817 78202) or email (linealign23@gmail.com). We accept scans from all major scanner brands."
  },
  {
    question: "How fast will I receive the treatment planning estimation?",
    answer: "You will receive a basic estimate of treatment cost, duration, and alignment method within 10 minutes. A full, interactive 3D treatment simulation will be sent to you for review within 24 hours."
  },
  {
    question: "Are there aligner carrying cases and demo kits provided?",
    answer: "Yes, every treatment plan includes a premium Linealign Aligner carrying box, retainers, splints, and demo kits to show the patient. We also provide clinic marketing kits."
  },
  {
    question: "What is your policy on treatment refinements or re-submission?",
    answer: "We offer Free Re-submission. If a case requires refinements during the treatment duration, we will simulate and manufacture the refinement aligner trays at no extra cost."
  }
];

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [certSrc, setCertSrc] = useState<string | null>(null);
  const [alignerSrc, setAlignerSrc] = useState<string | null>(null);

  useEffect(() => {
    // Dynamic ISO Certificate Image Detection
    const extensions = ["png", "jpg", "jpeg", "svg"];
    let certFound = false;
    
    const checkImages = async () => {
      for (const ext of extensions) {
        try {
          const res = await fetch(`/images/certificate.${ext}`, { method: 'HEAD' });
          if (res.ok) {
            setCertSrc(`/images/certificate.${ext}`);
            certFound = true;
            break;
          }
        } catch (e) {
          // Ignore
        }
      }
      if (!certFound) {
        setCertSrc(null);
      }
    };

    // Dynamic Aligner Image Detection
    const checkAligner = async () => {
      try {
        const res = await fetch('/aligner.png', { method: 'HEAD' });
        if (res.ok) {
          setAlignerSrc('/aligner.png');
        } else {
          setAlignerSrc(null);
        }
      } catch (e) {
        setAlignerSrc(null);
      }
    };

    checkImages();
    checkAligner();
  }, []);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="relative w-full overflow-hidden bg-white">
      
      {/* Background Decorative Blur Blobs */}
      <div className="absolute top-[3%] left-[-10%] glow-spot-blue opacity-85" />
      <div className="absolute top-[25%] right-[-10%] glow-spot-teal opacity-75" />
      <div className="absolute top-[55%] left-[-15%] glow-spot-blue opacity-65" />
      <div className="absolute top-[80%] right-[-15%] glow-spot-teal opacity-70" />
      
      {/* Abstract floating shapes for luxury medical aesthetic */}
      <div className="absolute top-36 left-[8%] w-10 h-10 bg-primary/10 rounded-full filter blur-md animate-pulse pointer-events-none" />
      <div className="absolute top-[40%] right-[12%] w-16 h-16 bg-secondary/10 rounded-full filter blur-xl animate-pulse pointer-events-none" />
      <div className="absolute top-[65%] left-[25%] w-12 h-12 bg-primary/15 rounded-full filter blur-lg animate-bounce pointer-events-none" style={{ animationDuration: '8s' }} />

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-start overflow-hidden bg-white pt-[140px] sm:pt-[160px] lg:pt-[180px] pb-12 lg:pb-24">
        {/* Full-width Background Image */}
        <div className="absolute inset-0 z-0 select-none">
          <Image
            src="/generated_aligner_hero.png"
            alt="Premium Linealign Dental Clinic Background"
            fill
            className="object-cover object-right md:object-center"
            priority
          />
          {/* Subtle gradient overlay with opacity strictly between 8% and 15% as requested */}
          <div 
            className="absolute inset-0 z-10" 
            style={{
              background: "linear-gradient(90deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0) 100%)"
            }}
          />
        </div>

        {/* Content Wrapper - Shifted left with increased padding */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* LEFT SIDE (Hero Text overlaying background) - Narrowed to 5-6 columns to prevent overlaps */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="col-span-1 lg:col-span-6 xl:col-span-5 space-y-6 flex flex-col text-left"
              style={{
                background: "transparent",
                backdropFilter: "none",
                boxShadow: "none",
                border: "none"
              }}
            >
              {/* Welcome Line Message */}
              <div className="space-y-2.5 select-none" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.15)" }}>
                <div className="text-[11px] sm:text-xs font-black text-primary uppercase tracking-[0.25em] font-poppins flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-secondary animate-pulse" />
                  WELCOME TO LINEALIGN DENTAL LAB
                </div>
                <div className="w-20 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full" />
              </div>
              
              {/* Large Heading */}
              <h1 
                className="text-3.5xl sm:text-5xl lg:text-6.5xl font-extrabold tracking-tight text-dark leading-[1.1] font-poppins"
                style={{ textShadow: "0 2px 10px rgba(0,0,0,0.15)" }}
              >
                Your Smile,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  Our Precision.
                </span>
              </h1>
              
              {/* Description */}
              <p 
                className="text-base sm:text-lg text-slate-800 leading-relaxed max-w-xl font-semibold font-sans"
                style={{ textShadow: "0 2px 10px rgba(0,0,0,0.15)" }}
              >
                Advanced Clear Aligner Laboratory delivering world-class orthodontic solutions. Clear, Comfort and Confident.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/faq"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white bg-gradient-to-r from-primary to-secondary hover:brightness-105 shadow-md hover:shadow-[0_4px_20px_rgba(46,199,214,0.35)] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                >
                  Book Consultation
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://wa.me/918281778202"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-slate-850 bg-white border border-slate-200 hover:bg-slate-50 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-500 fill-emerald-500" />
                  WhatsApp
                </a>
              </div>

              {/* Feature Checkmarks Grid */}
              <div className="pt-6 border-t border-slate-300/50 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "24/7 Working Lab",
                  "Full-Time Orthodontists",
                  "ISO Certified Dental Laboratory",
                  "FDA Grade Aligners",
                  "Premium Clear Aligners"
                ].map((feature) => (
                  <motion.div 
                    key={feature}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/40 backdrop-blur-sm border border-white/20 shadow-xs text-slate-850 text-sm font-bold select-none cursor-default transition-all"
                    style={{ textShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
                  >
                    <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-xs font-black">
                      {feature === "FDA Grade Aligners" ? "🛡" : "✔"}
                    </div>
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Empty Right Column to let the background image show through on larger screens */}
            <div className="hidden lg:block lg:col-span-6 xl:col-span-7" />

          </div>
        </div>
      </section>

      {/* Section 1.5: Clear Aligner Decorative Section */}
      <section className="py-24 bg-white relative overflow-hidden flex items-center justify-center border-b border-blue-50/50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(46,199,214,0.04)_0%,transparent_70%)]" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-xl mx-auto flex flex-col items-center justify-center text-center px-4"
        >
          {/* Subtle blue glow behind aligner */}
          <div className="absolute w-[260px] h-[260px] bg-gradient-to-r from-primary/15 to-secondary/15 rounded-full blur-3xl -z-10 animate-pulse" />
          
          <div className="relative w-[280px] sm:w-[380px] md:w-[480px] aspect-[4/3] rounded-[2rem] overflow-hidden bg-slate-50/50 border border-slate-100 shadow-sm flex items-center justify-center animate-float-aligner hover:scale-[1.02] transition-transform duration-500 cursor-default select-none">
            <video
              src="/images/aligner.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
          
          <p className="text-slate-400 text-xs font-bold tracking-[0.2em] uppercase mt-8 select-none font-poppins">
            Linealign™ Premium Invisible Biomechanics
          </p>
        </motion.div>
      </section>

      {/* Section 2: Meet Our Founder & Co-Founder (Very Light Blue background, White Cards) */}
      <section className="py-24 bg-gradient-to-br from-white to-[#EEF8FF] border-y border-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-secondary bg-secondary/10 border border-secondary/20 uppercase tracking-wider">
              Leadership Team
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-dark font-poppins tracking-tight">
              Meet Our Founder & Co-Founder
            </h2>
            <p className="text-slate-500 text-sm sm:text-base">
              Our full-time orthodontic and aligner specialists providing simulation reviews and expert planning approvals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto justify-center">
            
            {/* Specialist Card 1 (Dr. Tilvin V Tom) */}
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-white border border-blue-100/60 rounded-[2.5rem] overflow-hidden p-4 shadow-sm hover:shadow-[0_8px_30px_rgba(42,132,255,0.12)] transition-all duration-300 flex flex-col"
            >
              <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden bg-slate-200 border border-white">
                <Image
                  src="/tilvin.jpg"
                  alt="Dr. TILVIN V TOM"
                  fill
                  sizes="(max-w-md) 100vw, 400px"
                  className="object-cover"
                />
              </div>
              <div className="p-6 text-center space-y-2 flex-grow flex flex-col justify-between items-center">
                <div className="flex flex-col items-center">
                  <span className="inline-flex items-center px-3.5 py-1 rounded-full text-[10px] font-black text-white bg-gradient-to-r from-primary to-secondary mb-3 shadow-xs uppercase tracking-wider">
                    Founder
                  </span>
                  <h3 className="text-xl font-bold text-dark font-poppins">Dr. TILVIN V TOM</h3>
                  <p className="text-primary font-bold text-xs uppercase tracking-wider">BDS, MDS</p>
                  <p className="text-slate-500 text-xs sm:text-sm mt-1.5 uppercase font-bold tracking-tight">Orthodontist & Aligner Specialist</p>
                </div>
                <div className="pt-6 w-full">
                  <Link
                    href="/faq"
                    className="w-full inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-full text-xs font-bold text-white bg-gradient-to-r from-primary to-secondary hover:brightness-105 shadow-md hover:shadow-[0_4px_20px_rgba(46,199,214,0.35)] transition-all"
                  >
                    Book Appointment
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Specialist Card 2 (Dr. Shoukathali P H) */}
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-white border border-blue-100/60 rounded-[2.5rem] overflow-hidden p-4 shadow-sm hover:shadow-[0_8px_30px_rgba(42,132,255,0.12)] transition-all duration-300 flex flex-col"
            >
              <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden bg-slate-200 border border-white">
                <Image
                  src="/shoukath.jpg"
                  alt="Dr. SHOUKATHALI P H"
                  fill
                  sizes="(max-w-md) 100vw, 400px"
                  className="object-cover"
                />
              </div>
              <div className="p-6 text-center space-y-2 flex-grow flex flex-col justify-between items-center">
                <div className="flex flex-col items-center">
                  <span className="inline-flex items-center px-3.5 py-1 rounded-full text-[10px] font-black text-white bg-gradient-to-r from-primary to-secondary mb-3 shadow-xs uppercase tracking-wider">
                    Co-Founder
                  </span>
                  <h3 className="text-xl font-bold text-dark font-poppins">Dr. SHOUKATHALI P H</h3>
                  <p className="text-primary font-bold text-xs uppercase tracking-wider">BDS, MDS</p>
                  <p className="text-slate-500 text-xs sm:text-sm mt-1.5 uppercase font-bold tracking-tight">Orthodontist & Aligner Specialist</p>
                </div>
                <div className="pt-6 w-full">
                  <Link
                    href="/faq"
                    className="w-full inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-full text-xs font-bold text-white bg-gradient-to-r from-primary to-secondary hover:brightness-105 shadow-md hover:shadow-[0_4px_20px_rgba(46,199,214,0.35)] transition-all"
                  >
                    Book Appointment
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Section 3: About / Stats (White background) */}
      <section className="relative py-24 bg-white border-b border-blue-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-secondary bg-secondary/10 border border-secondary/20 uppercase tracking-wider">
                Discover Our Story
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-dark font-poppins tracking-tight leading-tight">
                Welcome to Linealign Dental Lab – Clear, Comfort and Confident
              </h2>
              <p className="text-slate-600 leading-relaxed text-base">
                Linealign Dental Lab provides advanced orthodontic and clear aligner solutions using modern digital technology and expert orthodontic support. Our mission is to deliver clear, comfort and confident smiles through innovation and quality craftsmanship.
              </p>
              <div className="pt-2">
                <Link
                  href="/our-story"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-hover group"
                >
                  Learn More About Our Journey
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Statistics Grid */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-6">
              
              <div className="p-6 bg-gradient-to-br from-white to-primary/5 rounded-[2rem] border border-slate-150/50 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="text-2xl font-black text-dark font-poppins">
                  <AnimatedCounter value="100%" />
                </h4>
                <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">Premium Quality</p>
              </div>

              <div className="p-6 bg-gradient-to-br from-white to-secondary/5 rounded-[2rem] border border-slate-150/50 shadow-sm transition-all duration-300 hover:shadow-md hover:border-secondary/20">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-4">
                  <Activity className="w-5 h-5" />
                </div>
                <h4 className="text-2xl font-black text-dark font-poppins">
                  <AnimatedCounter value="100%" />
                </h4>
                <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">Digital Workflow</p>
              </div>

              <div className="p-6 bg-gradient-to-br from-white to-primary/5 rounded-[2rem] border border-slate-150/50 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="text-2xl font-black text-dark font-poppins">
                  <AnimatedCounter value="250+" />
                </h4>
                <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">Expert Team</p>
              </div>

              <div className="p-6 bg-gradient-to-br from-white to-secondary/5 rounded-[2rem] border border-slate-150/50 shadow-sm transition-all duration-300 hover:shadow-md hover:border-secondary/20">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-4">
                  <Clock className="w-5 h-5" />
                </div>
                <h4 className="text-2xl font-black text-dark font-poppins">
                  <AnimatedCounter value="24/7" />
                </h4>
                <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">Working Lab</p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Section 3: Why Choose Us (White Background) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-primary bg-primary/10 border border-primary/20 uppercase tracking-wider">
              Our Advantages
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-dark font-poppins tracking-tight">
              Why Choose Us
            </h2>
            <p className="text-slate-500 text-sm sm:text-base">
              A premium laboratory workflow engineered for speed, accuracy, and excellent clinical results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* Card 1 */}
              <motion.div
                whileHover={{ y: -6 }}
                className="p-8 bg-white rounded-3xl border border-slate-150/50 shadow-xs hover:shadow-md transition-all space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-dark font-poppins">24/7 Working Lab</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Full round-the-clock operations to guarantee minimal wait times and emergency support.
                </p>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                whileHover={{ y: -6 }}
                className="p-8 bg-white rounded-3xl border border-slate-150/50 shadow-xs hover:shadow-md transition-all space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-dark font-poppins">Full-Time Orthodontists</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Licensed in-house orthodontic specialists review and approve every treatment plan.
                </p>
              </motion.div>

              {/* Card 3 */}
              <motion.div
                whileHover={{ y: -6 }}
                className="p-8 bg-white rounded-3xl border border-slate-150/50 shadow-xs hover:shadow-md transition-all space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-dark font-poppins">Premium Clear Aligners</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Manufactured using high-elasticity medical polymer sheets for maximum tooth control.
                </p>
              </motion.div>

              {/* Card 4 */}
              <motion.div
                whileHover={{ y: -6 }}
                className="p-8 bg-white rounded-3xl border border-slate-150/50 shadow-xs hover:shadow-md transition-all space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-dark font-poppins">Digital Workflow</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Fully digital case uploads, online simulation approvals, and real-time tracking systems.
                </p>
              </motion.div>

              {/* Card 5 */}
              <motion.div
                whileHover={{ y: -6 }}
                className="p-8 bg-white rounded-3xl border border-slate-150/50 shadow-xs hover:shadow-md transition-all space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-dark font-poppins">Advanced CAD/CAM</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Sub-micron 3D scanning and state-of-the-art aligner laser printing machines.
                </p>
              </motion.div>

              {/* Card 6 */}
              <motion.div
                whileHover={{ y: -6 }}
                className="p-8 bg-white rounded-3xl border border-slate-150/50 shadow-xs hover:shadow-md transition-all space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-dark font-poppins">Certified Materials</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Constructed solely using FDA-cleared, biocompatible medical-grade thermoplastic materials.
                </p>
              </motion.div>

              {/* Card 7 */}
              <motion.div
                whileHover={{ y: -6 }}
                className="p-8 bg-white rounded-3xl border border-slate-150/50 shadow-xs hover:shadow-md transition-all space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-dark font-poppins">Fast Delivery</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Fast national shipping networks delivering manufactured kits directly to your clinic.
                </p>
              </motion.div>

              {/* Card 8 */}
              <motion.div
                whileHover={{ y: -6 }}
                className="p-8 bg-white rounded-3xl border border-slate-150/50 shadow-xs hover:shadow-md transition-all space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                  <Activity className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-dark font-poppins">High Precision</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Micron-level tolerances for orthodontic attachments, ensuring precise treatment forces.
                </p>
              </motion.div>

              {/* Card 9 (ISO Quality Certificate Card) */}
              <motion.div
                whileHover={{ y: -6 }}
                className="p-8 bg-white rounded-3xl border border-slate-150/50 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <Award className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-dark font-poppins">Quality Certificate</h3>
                  
                  {/* Certificate Preview Box */}
                  <div 
                    onClick={() => setIsModalOpen(true)}
                    className="relative w-full h-44 bg-slate-50 border border-slate-200/80 rounded-2xl overflow-hidden flex items-center justify-center shadow-xs cursor-pointer group hover:border-primary/40 transition-colors"
                  >
                    {certSrc ? (
                      <Image 
                        src={certSrc}
                        alt="ISO Certificate Preview"
                        fill
                        sizes="(max-w-md) 100vw, 300px"
                        className="object-contain p-2 hover:scale-[1.02] transition-transform duration-300"
                        priority
                      />
                    ) : (
                      <div className="p-4 flex flex-col items-center justify-center text-slate-400 select-none">
                        <Award className="w-8 h-8 mb-1 opacity-50" />
                        <span className="text-[9px] font-black tracking-wider uppercase opacity-70">ISO 13485</span>
                        <span className="text-[8px] mt-0.5 opacity-50">Placeholder</span>
                      </div>
                    )}
                    {/* Hover zoom overlay */}
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-[1px]">
                      <span className="px-3 py-1.5 rounded-full bg-white/95 text-[10px] font-bold text-primary shadow-xs border border-primary/25">
                        🔍 Zoom
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-slate-500 text-sm leading-relaxed">
                  ISO Certified Dental Laboratory
                </p>
              </motion.div>
        </div>
        </div>
      </section>

      {/* Section 4: Services (Soft Cyan background, White Cards) */}
      <section className="py-24 bg-gradient-to-br from-white to-[#E8FCFF] border-y border-cyan-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-secondary bg-secondary/10 border border-secondary/20 uppercase tracking-wider">
              Comprehensive Support
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-dark font-poppins tracking-tight animate-pulse">
              Our Professional Services
            </h2>
            <p className="text-slate-500 text-sm sm:text-base">
              Providing digital planning, orthodontic simulation support, and high-fidelity aligner production.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Service 1 */}
            <div className="p-8 bg-white rounded-3xl border border-cyan-100/50 shadow-sm hover:shadow-[0_4px_20px_rgba(46,199,214,0.15)] transition-all duration-300 group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-secondary text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-dark font-poppins">Clear Aligners</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Precision-molded invisible orthodontic trays engineered from high-retention polymer sheets for maximum tooth alignment.
                </p>
              </div>
              <Link href="/solutions" className="mt-6 text-primary text-xs font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Details <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Service 2 */}
            <div className="p-8 bg-white rounded-3xl border border-cyan-100/50 shadow-sm hover:shadow-[0_4px_20px_rgba(46,199,214,0.15)] transition-all duration-300 group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-secondary text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                  <Activity className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-dark font-poppins">Digital Smile Design</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Aesthetic simulation software showing post-treatment orthodontic models, assisting doctor approvals and patient consultations.
                </p>
              </div>
              <Link href="/solutions" className="mt-6 text-primary text-xs font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Details <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Service 3 */}
            <div className="p-8 bg-white rounded-3xl border border-cyan-100/50 shadow-sm hover:shadow-[0_4px_20px_rgba(46,199,214,0.15)] transition-all duration-300 group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-secondary text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-dark font-poppins">Orthodontic Planning</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Interactive 3D dental biomechanics setups (arch expansion, rotators, attachments) designed by certified specialists.
                </p>
              </div>
              <Link href="/solutions" className="mt-6 text-primary text-xs font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Details <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Service 4 */}
            <div className="p-8 bg-white rounded-3xl border border-cyan-100/50 shadow-sm hover:shadow-[0_4px_20px_rgba(46,199,214,0.15)] transition-all duration-300 group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-secondary text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-dark font-poppins">Treatment Support</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Continuous support team available 24/7 to solve mid-treatment adjustments, refinements, or physical silicon impression scans.
                </p>
              </div>
              <Link href="/solutions" className="mt-6 text-primary text-xs font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Details <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Service 5 */}
            <div className="p-8 bg-white rounded-3xl border border-cyan-100/50 shadow-sm hover:shadow-[0_4px_20px_rgba(46,199,214,0.15)] transition-all duration-300 group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-secondary text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-dark font-poppins">Aligner Manufacturing</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  State-of-the-art laboratory lines crafting high-fidelity biocompatible trays with laser trim cuts for maximum patient comfort.
                </p>
              </div>
              <Link href="/solutions" className="mt-6 text-primary text-xs font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Details <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Service 6 */}
            <div className="p-8 bg-white rounded-3xl border border-cyan-100/50 shadow-sm hover:shadow-[0_4px_20px_rgba(46,199,214,0.15)] transition-all duration-300 group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-secondary text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-dark font-poppins">Consultation</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Professional digital scan evaluation and treatment planning tips to help physicians provide the best orthodontic options.
                </p>
              </div>
              <Link href="/solutions" className="mt-6 text-primary text-xs font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Details <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Section 5: Before / After Slider (White background) */}
      <section className="py-24 bg-white border-y border-blue-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-6">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-primary bg-primary/10 border border-primary/20 uppercase tracking-wider">
              Visual Comparison
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark font-poppins leading-tight tracking-tight">
              See the Alignment Transformation
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Drag the slider to compare original crooked layouts with perfectly straight aligned outcomes. Linealign aligners employ precise biomechanical attachments to slide teeth comfortably into optimal position.
            </p>
            <div className="flex flex-col gap-4 text-slate-700 text-sm font-semibold pt-2">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">1</span>
                <span>Send orthodontic digital scans (STL)</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">2</span>
                <span>Approve interactive 3D simulation in 24 hours</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">3</span>
                <span>Receive custom fit aligner set at your practice</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center w-full">
            <BeforeAfterSlider />
          </div>

        </div>
      </section>


      {/* Section 7: Much More Than Just Invisible (White background) */}
      <section className="py-24 bg-white border-b border-blue-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-primary bg-primary/10 border border-primary/20 uppercase tracking-wider">
              Material Engineering
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-dark font-poppins tracking-tight">
              Much More Than Just Invisible
            </h2>
            <p className="text-slate-500 text-sm sm:text-base">
              Our aligner models incorporate advanced clinical mechanics to address complex teeth rotation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="p-6 rounded-[2rem] border border-slate-150/50 bg-white shadow-xs hover:border-primary/30 hover:shadow-md transition-all space-y-3">
              <h3 className="text-lg font-bold text-dark font-poppins">Arch Expansion</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Lateral expansion mechanics possible via integrated expansion components, generating space without extractions.
              </p>
            </div>

            <div className="p-6 rounded-[2rem] border border-slate-150/50 bg-white shadow-xs hover:border-primary/30 hover:shadow-md transition-all space-y-3">
              <h3 className="text-lg font-bold text-dark font-poppins">Intermaxillary Elastics</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Precision aligner slits to anchor orthodontic elastics, helping adjust jaw bites (Class II/III configurations).
              </p>
            </div>

            <div className="p-6 rounded-[2rem] border border-slate-150/50 bg-white shadow-xs hover:border-primary/30 hover:shadow-md transition-all space-y-3">
              <h3 className="text-lg font-bold text-dark font-poppins">Attachments</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Engineered composite attachment pads to control complex canine root rotations or molar tilting movements.
              </p>
            </div>

            <div className="p-6 rounded-[2rem] border border-slate-150/50 bg-white shadow-xs hover:border-primary/30 hover:shadow-md transition-all space-y-3">
              <h3 className="text-lg font-bold text-dark font-poppins">Missing Teeth</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Includes pontic slots inside aligners to cover missing teeth gap spacings, keeping patient aesthetics high.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Section 8: Testimonials (Soft Cyan background) */}
      <section className="py-24 bg-gradient-to-br from-white to-[#E8FCFF] border-y border-cyan-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-secondary bg-secondary/10 border border-secondary/20 uppercase tracking-wider">
              Physician & Patient Feedback
            </span>
            <h2 className="text-3xl font-extrabold text-dark font-poppins tracking-tight">What Our Partner Dentists Say</h2>
            <p className="text-slate-500 text-sm">Empowering doctors and practices globally to deliver perfect smiles.</p>
          </div>

          <div className="relative max-w-4xl mx-auto bg-white border border-cyan-100/60 rounded-[2.5rem] p-8 sm:p-12 shadow-md flex flex-col md:flex-row gap-8 items-center min-h-[250px]">
            
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-secondary text-white flex items-center justify-center font-extrabold text-xl shadow-md flex-shrink-0">
              {testimonials[currentTestimonial].avatar}
            </div>

            <div className="flex-grow space-y-4">
              <MessageSquare className="w-8 h-8 text-primary/20" />
              <p className="text-slate-600 text-base sm:text-lg italic leading-relaxed">
                &ldquo;{testimonials[currentTestimonial].quote}&rdquo;
              </p>
              <div>
                <h4 className="text-base font-bold text-dark font-poppins">{testimonials[currentTestimonial].name}</h4>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mt-0.5">{testimonials[currentTestimonial].role}</p>
              </div>
            </div>

            {/* Carousel dots/arrows */}
            <div className="flex md:flex-col gap-2.5 mt-4 md:mt-0 flex-shrink-0">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`w-3.5 h-3.5 rounded-full transition-all cursor-pointer ${
                    currentTestimonial === i ? "bg-primary scale-125 shadow-sm shadow-primary/30" : "bg-slate-200 hover:bg-slate-300"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Section 9: Collapsible FAQ (White background) */}
      <section className="py-24 bg-white border-y border-blue-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-primary bg-primary/10 border border-primary/20 uppercase tracking-wider">
            FAQ Help Desk
          </span>
          <h2 className="text-3xl font-extrabold text-dark font-poppins tracking-tight">Frequently Asked Questions</h2>
          <p className="text-slate-500 text-sm">Everything you need to know about the Linealign Laboratory Ecosystem.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={index}
                className="border border-slate-200/50 rounded-2xl bg-white shadow-xs overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left font-bold text-dark font-poppins text-sm sm:text-base hover:bg-slate-50 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-4 animate-in fade-in slide-in-from-top-2 duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        </div>
      </section>

      {/* Section 10: Contact & Map (Light Blue background, white contact card) */}
      <section className="py-24 bg-gradient-to-br from-white to-[#EEF8FF] border-t border-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-primary bg-primary/10 border border-primary/20 uppercase tracking-wider">
              Get in Touch
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-dark font-poppins tracking-tight">Contact Linealign</h2>
            <p className="text-slate-500 text-sm">Have impression scans to send or need doctor support? Reach out directly.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-5xl mx-auto">
            
            {/* Left Contact Card */}
            <div className="lg:col-span-6 bg-white border border-blue-100/50 rounded-[2.5rem] p-8 sm:p-10 shadow-sm flex flex-col justify-between space-y-8">
              
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-dark font-poppins pb-3 border-b border-slate-100 flex items-center gap-2">
                  <Smile className="w-6 h-6 text-primary animate-bounce" /> LINEALIGN DENTAL LAB
                </h3>
                
                <div className="space-y-5">
                  
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Address</h4>
                      <p className="text-slate-600 text-sm leading-relaxed mt-1 font-semibold">
                        83, Pookkayam, Malakallu,<br />
                        Near Indian Oil Petrol Pump, Malakallu PO,<br />
                        PIN 671532, Kasaragod District,<br />
                        Kerala, India
                      </p>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Working Hours</h4>
                      <p className="text-slate-600 text-sm font-semibold mt-1">
                        24/7 Working Laboratory
                      </p>
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email</h4>
                      <a href="mailto:linealign23@gmail.com" className="text-primary font-semibold text-sm hover:underline mt-1 block">
                        linealign23@gmail.com
                      </a>
                    </div>
                  </div>

                </div>
              </div>

              {/* Call and WhatsApp Quick CTAs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href="tel:8281778202"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-primary to-secondary hover:brightness-105 shadow-md hover:shadow-[0_4px_20px_rgba(46,199,214,0.35)] transition-all"
                >
                  <Phone className="w-4 h-4" /> Call 82817 78202
                </a>
                <a
                  href="https://wa.me/918281778202"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-500 fill-emerald-500" /> WhatsApp Support
                </a>
              </div>

            </div>

            {/* Right Map Card */}
            <div className="lg:col-span-6 rounded-[2.5rem] overflow-hidden border border-slate-150/50 shadow-sm min-h-[350px] relative bg-slate-200">
              <iframe
                title="Linealign Dental Lab Location Map"
                src="https://maps.google.com/maps?q=Kasaragod,%20Kerala,%20India&z=13&output=embed"
                className="absolute inset-0 w-full h-full border-0 grayscale brightness-95"
                allowFullScreen
                loading="lazy"
              />
            </div>

          </div>

        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.12)_0%,transparent_70%)] pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black font-poppins tracking-tight">Ready to Partner with LINEALIGN?</h2>
          <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-semibold">
            Join thousands of dental practices providing top-tier orthodontic clear aligner outcomes. Get estimates in 10 minutes.
          </p>
          <div className="pt-4">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold bg-white text-primary hover:bg-slate-50 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 duration-300 cursor-pointer"
            >
              Get In Touch Today
              <ArrowRight className="w-5 h-5 text-primary" />
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox Modal for Certificate */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 z-50 bg-dark/80 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[85vh] w-full bg-white rounded-[2.5rem] overflow-hidden p-6 shadow-2xl flex flex-col items-center justify-between"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-lg transition-colors cursor-pointer"
              >
                ✕
              </button>
              <div className="flex-grow flex items-center justify-center p-4 min-h-[300px]">
                {certSrc ? (
                  <img 
                    src={certSrc} 
                    alt="ISO Certified Dental Laboratory Certificate" 
                    className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-sm"
                  />
                ) : (
                  <div className="text-center p-12 space-y-4 max-w-md border-4 border-double border-primary/20 rounded-[2rem] bg-slate-50">
                    <Award className="w-16 h-16 mx-auto text-primary animate-pulse" />
                    <h3 className="text-2xl font-extrabold text-dark font-poppins">ISO Certified Dental Lab</h3>
                    <p className="text-slate-500 text-sm">
                      Standard Quality Certificate is registered and fully compliant.
                    </p>
                    <div className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-xs text-primary font-bold">
                      ISO 13485:2016 Compliant
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-4 text-center">
                <p className="text-slate-700 text-sm font-extrabold font-poppins">
                  ISO Certified Dental Laboratory
                </p>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mt-1">
                  Medical Devices Standard
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
