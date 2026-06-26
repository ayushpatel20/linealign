"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
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
  Sparkle
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

// FAQ Data
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

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="relative w-full overflow-hidden bg-white">
      {/* Background Glow Blobs / Radial glow */}
      <div className="absolute top-[5%] left-[-10%] glow-spot-blue opacity-70" />
      <div className="absolute top-[30%] right-[-10%] glow-spot-teal opacity-60" />
      <div className="absolute bottom-[20%] left-[20%] glow-spot-blue opacity-50" />
      
      {/* Abstract floating blur circles */}
      <div className="absolute top-24 left-[15%] w-8 h-8 bg-primary/20 rounded-full filter blur-md animate-pulse pointer-events-none" />
      <div className="absolute top-96 right-[20%] w-12 h-12 bg-secondary/20 rounded-full filter blur-lg animate-pulse pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[80vh]">
          
          {/* LEFT SIDE (45%) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-8 z-10 flex flex-col justify-center"
          >
            {/* Centered Vertically Large Logo */}
            <div className="flex justify-start">
              <Image
                src="/logo.png"
                alt="LINEALIGN Logo"
                width={384}
                height={128}
                className="h-[64px] w-auto object-contain flex-shrink-0 select-none"
                priority
              />
            </div>

            {/* Badge & Headline */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-primary bg-primary/10 border border-primary/20 w-fit select-none">
                <Sparkles className="w-3.5 h-3.5" />
                CLEAR COMFORT CONFIDENT
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-dark leading-tight font-poppins">
                Orthodontic Aligner{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  Practice
                </span>
              </h1>
            </div>

            {/* Supporting Description */}
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-lg">
              Reimagining orthodontic care with premium, invisible, and state-of-the-art clear aligners. We provide comprehensive treatment planning, marketing support, and tracking apps.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href="/faq"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white bg-gradient-to-r from-primary to-[#2b7fff] hover:brightness-105 shadow-md hover:shadow-lg hover:shadow-primary/20 transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                Book Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/solutions"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-slate-700 bg-white/10 backdrop-blur-md border border-slate-200 hover:bg-slate-50/50 shadow-xs hover:shadow-sm transition-all hover:-translate-y-0.5"
              >
                Learn More
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-8 border-t border-slate-100 flex flex-wrap gap-6 items-center">
              <div className="flex items-center gap-2 select-none">
                <ShieldCheck className="w-5 h-5 text-secondary" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">FDA Cleared Materials</span>
              </div>
              <div className="flex items-center gap-2 select-none">
                <Users className="w-5 h-5 text-secondary" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">4000+ Partners</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE (55%) */}
          <div className="lg:col-span-7 relative flex flex-col items-center justify-center min-h-[450px]">
            {/* Gradient glow spot backer */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.08)_0%,transparent_60%)] pointer-events-none" />
            
            {/* Aligner Floating Animation Wrapper */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative w-[80%] aspect-square flex items-center justify-center z-10 select-none pointer-events-none hover:scale-[1.02] transition-transform duration-500"
            >
              <Image
                src="/aligner_hero.png"
                alt="Premium Invisible Aligner Render"
                fill
                sizes="(max-w-lg) 100vw, 600px"
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Soft Shadow Beneath Aligner */}
            <motion.div
              animate={{ scale: [1, 0.85, 1], opacity: [0.25, 0.12, 0.25] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute bottom-[2%] w-[55%] h-5 bg-slate-400/25 rounded-full filter blur-md pointer-events-none"
            />
          </div>

        </div>
      </section>

      {/* Statistics Section */}
      <section className="relative py-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="text-center p-6 bg-white rounded-2xl shadow-xs border border-slate-100/50">
              <div className="text-3xl sm:text-5xl font-extrabold text-primary font-poppins mb-2">
                <AnimatedCounter value="4000+" />
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-500 uppercase tracking-wider">Dentists Partnered</p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl shadow-xs border border-slate-100/50">
              <div className="text-3xl sm:text-5xl font-extrabold text-secondary font-poppins mb-2">
                <AnimatedCounter value="10000+" />
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-500 uppercase tracking-wider">Cases Processed</p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl shadow-xs border border-slate-100/50">
              <div className="text-3xl sm:text-5xl font-extrabold text-dark font-poppins mb-2">
                <AnimatedCounter value="12" />
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-500 uppercase tracking-wider">Countries Present</p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl shadow-xs border border-slate-100/50">
              <div className="text-3xl sm:text-5xl font-extrabold text-primary font-poppins mb-2">
                <AnimatedCounter value="1" />
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-500 uppercase tracking-wider">Aligner Made Per Min</p>
            </div>

          </div>
        </div>
      </section>

      {/* Services / Solutions Ecosystem Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-dark font-poppins">
            Solutions for All Steps in Aligner Business
          </h2>
          <p className="text-base text-slate-500">
            A comprehensive, end-to-end partner experience designed specifically to empower orthodontists and clinical practices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Marketing Support */}
          <div className="p-8 bg-white rounded-3xl border border-slate-100 soft-shadow hover:shadow-xl transition-all duration-300 group flex flex-col justify-between">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-dark font-poppins">Marketing Support</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Full backing for marketing clear aligners to current and potential patients, optimizing local reach.
              </p>
              <ul className="space-y-3 text-slate-600 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Online marketing material
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Area-wise targeted marketing
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Social media asset kits
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  In-office patient videos & demo kits
                </li>
              </ul>
            </div>
            <Link href="/solutions" className="mt-8 text-primary text-xs font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Learn More <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 2: Treatment Planning */}
          <div className="p-8 bg-white rounded-3xl border border-slate-100 soft-shadow hover:shadow-xl transition-all duration-300 group flex flex-col justify-between">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-dark font-poppins">Treatment Planning</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Instant digital analysis tool providing accurate simulation estimates within record times.
              </p>
              <ul className="space-y-3 text-slate-600 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  Estimation summary in 10 minutes
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  Free 3D treatment simulation in 24 hours
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  STL Scans accepted via WhatsApp or Email
                </li>
              </ul>
            </div>
            <Link href="/solutions" className="mt-8 text-secondary text-xs font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Learn More <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 3: After Aligner Delivery */}
          <div className="p-8 bg-white rounded-3xl border border-slate-100 soft-shadow hover:shadow-xl transition-all duration-300 group flex flex-col justify-between">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-dark/10 flex items-center justify-center text-dark group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-dark font-poppins">After Aligner Delivery</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Continuous compliance support and patient care modules ensuring high success rates.
              </p>
              <ul className="space-y-3 text-slate-600 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-dark" />
                  Tracking app for aligner wear duration
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-dark" />
                  Reminders to swap aligner trays
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-dark" />
                  Refinement emergency support
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-dark" />
                  Free case re-submission Refinements
                </li>
              </ul>
            </div>
            <Link href="/solutions" className="mt-8 text-dark text-xs font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Learn More <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* Before / After Slider Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-secondary bg-secondary/10">
              Orthodontic Precision
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-dark font-poppins leading-tight">
              See the Alignment Transformation
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              Drag the slider to compare original crooked layouts with perfectly straight aligned outcomes. Linealign aligners employ precise biomechanical attachments to slide teeth comfortably into optimal position.
            </p>
            <div className="flex flex-col gap-4 text-slate-600 text-sm">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">1</span>
                <span>Send orthodontic digital scans</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">2</span>
                <span>Approve interactive 3D simulation</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">3</span>
                <span>Receive custom fit aligner set</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <BeforeAfterSlider />
          </div>

        </div>
      </section>

      {/* Much More Than Just Invisible Features Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-dark font-poppins">
            Much More Than Just Invisible
          </h2>
          <p className="text-slate-500">
            Engineered with high material science standards to perform complex teeth alignment movements safely.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="p-6 rounded-3xl border border-slate-100 bg-white shadow-xs hover:border-primary/30 hover:shadow-md transition-all space-y-4">
            <h3 className="text-lg font-bold text-dark font-poppins">Arch Expansion</h3>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              Arch expansion is achievable via specialized aligners fitted with integrated expanding screws for customized jaw widening.
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-slate-100 bg-white shadow-xs hover:border-primary/30 hover:shadow-md transition-all space-y-4">
            <h3 className="text-lg font-bold text-dark font-poppins">Intermaxillary Elastics</h3>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              Pre-cut aligner slits accommodate rubber bands for correction of mild class II and III bite configurations.
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-slate-100 bg-white shadow-xs hover:border-primary/30 hover:shadow-md transition-all space-y-4">
            <h3 className="text-lg font-bold text-dark font-poppins">Attachments</h3>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              Subtle orthodontic composite attachments enable precision rotation and tilting of challenging canine or molar roots.
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-slate-100 bg-white shadow-xs hover:border-primary/30 hover:shadow-md transition-all space-y-4">
            <h3 className="text-lg font-bold text-dark font-poppins">Missing Teeth</h3>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              Integrate artificial pontics into aligner trays when spacing exceeds 3mm, maintaining patient aesthetics during alignment.
            </p>
          </div>

        </div>
      </section>

      {/* Testimonials Carousel Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-bold text-dark font-poppins">What Our Partner Dentists Say</h2>
            <p className="text-slate-500 text-sm">Empowering doctors and practices globally to deliver perfect smiles.</p>
          </div>

          <div className="relative max-w-4xl mx-auto bg-white border border-slate-100 rounded-3xl p-8 sm:p-12 soft-shadow flex flex-col md:flex-row gap-8 items-center">
            
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-secondary text-white flex items-center justify-center font-extrabold text-xl shadow-md">
              {testimonials[currentTestimonial].avatar}
            </div>

            <div className="flex-1 space-y-4">
              <MessageSquare className="w-8 h-8 text-primary/20" />
              <p className="text-slate-600 text-base sm:text-lg italic leading-relaxed">
                &ldquo;{testimonials[currentTestimonial].quote}&rdquo;
              </p>
              <div>
                <h4 className="text-base font-bold text-dark font-poppins">{testimonials[currentTestimonial].name}</h4>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mt-0.5">{testimonials[currentTestimonial].role}</p>
              </div>
            </div>

            <div className="flex md:flex-col gap-2 mt-4 md:mt-0">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`w-3.5 h-3.5 rounded-full transition-all ${
                    currentTestimonial === i ? "bg-primary scale-125" : "bg-slate-200 hover:bg-slate-300"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Collapsible FAQ Section */}
      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl font-bold text-dark font-poppins">Frequently Asked Questions</h2>
          <p className="text-slate-500 text-sm">Everything you need to know about the Linealign Ecosystem.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={index}
                className="border border-slate-100 rounded-2xl bg-white soft-shadow overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left font-bold text-dark font-poppins text-sm sm:text-base hover:bg-slate-50 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-slate-500 leading-relaxed border-t border-slate-50 pt-4 animate-in fade-in slide-in-from-top-2 duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-poppins">Ready to Partner with LINEALIGN?</h2>
          <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Join thousands of dental practices providing top-tier orthodontic clear aligner outcomes. Get estimates in 10 minutes.
          </p>
          <div className="pt-2">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-base font-bold bg-white text-primary hover:bg-slate-50 shadow-lg hover:shadow-xl transition-all"
            >
              Get In Touch Today
              <ArrowRight className="w-5 h-5 text-primary" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
