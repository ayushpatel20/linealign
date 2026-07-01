"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import * as LucideIcons from "lucide-react";
import {
  Sparkles,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  MessageSquare,
  Award,
  CheckCircle,
  Zap,
  Target,
  X
} from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

// Icon Renderer Helper
function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const IconComponent = (LucideIcons as any)[name];
  if (IconComponent) {
    return <IconComponent className={className} />;
  }
  return <LucideIcons.HelpCircle className={className} />;
}

// Lightbox Component
function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-5xl max-h-[90vh] w-full"
        >
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center font-bold text-lg transition-colors cursor-pointer z-10"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl mx-auto block"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

interface HomeClientProps {
  settings: any;
  hero: any;
  about: any;
  founders: any[];
  services: any[];
  whyChooseUs: any[];
  testimonials: any[];
  faqs: any[];
  sections: any[];
}

export default function HomeClient({
  settings,
  hero,
  about,
  founders,
  services,
  whyChooseUs,
  testimonials,
  faqs,
  sections
}: HomeClientProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [certSrc, setCertSrc] = useState<string | null>(null);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState<string>("");

  useEffect(() => {
    const extensions = ["png", "jpg", "jpeg", "svg"];
    let certFound = false;
    
    const checkImages = async () => {
      for (const ext of extensions) {
        try {
          const res = await fetch(`/images/certificate.${ext}`, { method: "HEAD" });
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

    checkImages();
  }, []);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const openLightbox = (src: string, alt: string) => {
    setLightboxSrc(src);
    setLightboxAlt(alt);
  };

  const closeLightbox = () => {
    setLightboxSrc(null);
    setLightboxAlt("");
  };

  const heroFeatures = hero.featuresJson ? JSON.parse(hero.featuresJson) : [];
  const aboutStats = about.statsJson ? JSON.parse(about.statsJson) : [];
  const contactPhone = settings.contactPhone || "8281778202";
  const contactEmail = settings.contactEmail || "linealign23@gmail.com";
  const officeAddress = settings.officeAddress || "Kasaragod, Kerala, India";
  const workingHours = settings.workingHours || "24/7 Working Laboratory";
  const googleMapsUrl = settings.googleMapsLink || "https://maps.google.com/maps?q=Kasaragod,%20Kerala,%20India&z=13&output=embed";

  const renderSection = (sectionName: string) => {
    switch (sectionName) {
      case "Hero":
        return (
          <section key="Hero" className="relative w-full min-h-screen flex items-center overflow-hidden bg-slate-900" aria-label="Hero section">
            <div className="absolute inset-0 z-0 select-none">
              <Image
                src="/linealign_hero.png"
                alt="Linealign Dental Lab and Aligner Centre Building in Kasaragod Kerala – Digital Orthodontic Laboratory"
                fill
                className="object-cover object-center"
                priority
                sizes="100vw"
              />
              <div
                className="absolute inset-0 z-10"
                style={{
                  background: "linear-gradient(135deg, rgba(10,20,40,0.72) 0%, rgba(10,20,40,0.58) 50%, rgba(10,20,40,0.40) 100%)"
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 h-32 z-10" style={{ background: "linear-gradient(to top, rgba(10,20,40,0.5), transparent)" }} />
            </div>

            <div
              className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24 pb-16 lg:pb-28"
              style={{ paddingTop: "calc(var(--header-height, 160px) + 2rem)" }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  className="col-span-1 lg:col-span-7 xl:col-span-6 space-y-7 flex flex-col text-left"
                >
                  <div className="space-y-3 select-none">
                    <div className="text-[11px] sm:text-xs font-black text-secondary uppercase tracking-[0.28em] font-poppins flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-secondary animate-pulse" />
                      {hero.badgeText || "WELCOME TO LINEALIGN DENTAL LAB"}
                    </div>
                    <div className="w-20 h-0.5 bg-gradient-to-r from-secondary to-primary rounded-full" />
                  </div>

                  <h1
                    className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.06] font-poppins"
                    dangerouslySetInnerHTML={{ __html: hero.title || "Digital Orthodontic<br />Laboratory" }}
                  />

                  <p className="text-base sm:text-lg text-white/85 leading-relaxed max-w-xl font-medium">
                    {hero.description || "CAD/CAM Technology · Clear Aligners · In-house Manufacturing · 3D Printing · Orthodontic Excellence"}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {["CAD/CAM Technology", "3D Printing", "Clear Aligners", "In-house Manufacturing"].map((tag) => (
                      <span key={tag} className="text-[11px] font-bold text-white/90 bg-white/10 border border-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <Link
                      href={hero.ctaUrl || "/faq"}
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white bg-gradient-to-r from-primary to-secondary hover:brightness-110 shadow-lg hover:shadow-[0_6px_30px_rgba(46,199,214,0.45)] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                    >
                      {hero.ctaText || "Book Consultation"}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="pt-4 border-t border-white/15 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {heroFeatures.map((feature: string) => (
                      <motion.div
                        key={feature}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 shadow-xs text-white text-sm font-semibold select-none cursor-default transition-all"
                      >
                        <div className="w-5 h-5 rounded-full bg-secondary/30 text-secondary flex items-center justify-center flex-shrink-0 text-xs font-black">
                          ✔
                        </div>
                        <span>{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                <div className="hidden lg:block lg:col-span-5 xl:col-span-6" />
              </div>
            </div>
          </section>
        );

      case "AlignerShowcase":
        return (
          <section key="AlignerShowcase" className="py-24 bg-white relative overflow-hidden flex items-center justify-center border-b border-blue-50/50">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(46,199,214,0.04)_0%,transparent_70%)]" />
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative max-w-xl mx-auto flex flex-col items-center justify-center text-center px-4"
            >
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
        );

      case "Founder":
        const activeFounders = founders.filter(f => f.isVisible).map(f => {
          let name = f.name;
          let qualification = "";
          let designation = "";

          if (f.name.toLowerCase().includes("tilvin")) {
            name = "Dr. Tilvin V. Tom";
            qualification = "Orthodontist & Aligner Specialist";
            designation = "";
          } else if (f.name.toLowerCase().includes("shoukath")) {
            name = "Dr. Shoukathali P. H";
            qualification = "Orthodontist & Aligner Specialist";
            designation = "";
          }

          return { ...f, name, qualification, designation };
        });
        if (activeFounders.length === 0) return null;
        return (
          <section key="Founder" className="py-24 bg-gradient-to-br from-white to-[#EEF8FF] border-y border-blue-50" aria-labelledby="leadership-heading">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-secondary bg-secondary/10 border border-secondary/20 uppercase tracking-wider">
                  Leadership Team
                </span>
                <h2 id="leadership-heading" className="text-3xl sm:text-4xl font-extrabold text-dark font-poppins tracking-tight">
                  Meet Our Leadership
                </h2>
                <p className="text-slate-500 text-sm sm:text-base">
                  Our full-time orthodontic and aligner specialists providing simulation reviews and expert planning approvals.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto justify-center items-stretch">
                {activeFounders.map((founder) => (
                  <motion.div
                    key={founder.id}
                    whileHover={{ y: -8 }}
                    className="border border-blue-100/60 rounded-[2.5rem] overflow-hidden p-6 shadow-sm hover:shadow-[0_8px_30px_rgba(42,132,255,0.12)] transition-all duration-300 flex flex-col justify-between items-center h-full"
                    style={{
                      background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(238,248,255,0.85) 100%)",
                      backdropFilter: "blur(16px)"
                    }}
                  >
                    <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden bg-slate-200 border border-white shadow-sm flex-shrink-0">
                      {founder.photo && (
                        <Image
                          src={founder.photo}
                          alt={`${founder.name} – Founder at Linealign Dental Lab`}
                          fill
                          sizes="(max-width: 768px) 100vw, 400px"
                          className="object-cover hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      )}
                    </div>
                    <div className="pt-6 text-center space-y-2 flex-grow flex flex-col justify-between items-center w-full">
                      <div className="flex flex-col items-center">
                        <span className="inline-flex items-center px-3.5 py-1 rounded-full text-[10px] font-black text-white bg-gradient-to-r from-primary to-secondary mb-3 shadow-xs uppercase tracking-wider">
                          Founder
                        </span>
                        <h3 className="text-xl font-bold text-dark font-poppins">{founder.name}</h3>
                        <p className="text-primary font-bold text-xs uppercase tracking-wider min-h-[16px]">{founder.qualification}</p>
                        {founder.designation && (
                          <p className="text-slate-500 text-xs sm:text-sm mt-1.5 uppercase font-bold tracking-tight min-h-[20px]">{founder.designation}</p>
                        )}
                      </div>
                      <div className="pt-6 w-full mt-auto">
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
                ))}
              </div>
            </div>
          </section>
        );

      case "About":
        return (
          <section key="About" className="relative py-16 sm:py-20 bg-white border-b border-blue-50/50 overflow-hidden">
            {/* Background Gradient Accents */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_top_left,rgba(46,199,214,0.06),transparent_70%)] -z-10" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_bottom_right,rgba(42,132,255,0.04),transparent_70%)] -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 lg:gap-x-12 gap-y-10 items-center">
                
                {/* 1. Header block: Badge, Heading, Description, Highlight Card */}
                <div className="lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:self-end space-y-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-black text-secondary bg-secondary/10 border border-secondary/20 uppercase tracking-[0.2em] font-poppins">
                    DISCOVER OUR STORY
                  </span>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark font-poppins tracking-tight leading-[1.1] sm:leading-[1.15]">
                    Welcome to Linealign Dental Lab
                  </h2>
                  <p className="text-slate-600 leading-relaxed text-base font-normal max-w-2xl">
                    Linealign Dental Lab provides advanced orthodontic and clear aligner solutions using modern digital technology and expert orthodontic support. Our mission is to deliver clear, comfort and confident smiles through innovation and quality craftsmanship.
                  </p>
                  
                  {/* Laboratory Supporting Content - Styled in a Premium Highlight Card */}
                  <div className="p-5 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 border border-primary/15 backdrop-blur-md rounded-2xl space-y-3 shadow-xs">
                    <h4 className="text-sm font-bold text-primary uppercase tracking-wider font-poppins flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                      Advanced Digital Laboratory
                    </h4>
                    <p className="text-slate-655 text-sm leading-relaxed font-medium">
                      Our advanced digital laboratory is equipped with CAD/CAM technology, precision treatment planning, industrial-grade 3D printing, and rigorous quality assurance to deliver world-class clear aligner solutions.
                    </p>
                  </div>
                </div>

                {/* 2. Image block: Left Column on Desktop, Row 2 on Mobile */}
                <div className="lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:row-span-2 relative group w-full">
                  {/* Subtle blur glow behind the image */}
                  <div className="absolute -inset-1 rounded-[1.5rem] bg-gradient-to-r from-primary/20 to-secondary/20 blur-xl opacity-60 group-hover:opacity-80 transition duration-1000 -z-10" />
                  
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative overflow-hidden cursor-pointer rounded-[1.5rem] border border-slate-100/80 shadow-2xl shadow-blue-900/10 min-h-[300px] sm:min-h-[380px] lg:min-h-[460px] aspect-[4/3] sm:aspect-square lg:aspect-auto transform hover:scale-[1.01] transition-all duration-500"
                    onClick={() => openLightbox("/images/digital_lab.jpeg", "State-of-the-Art Digital Dental Laboratory with CAD/CAM Technology and 3D Printers")}
                  >
                    <Image
                      src="/images/digital_lab.jpeg"
                      alt="State-of-the-Art Digital Dental Laboratory – CAD/CAM Workflow 3D Printing and In-house Aligner Manufacturing"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      sizes="(max-width: 1024px) 100vw, 45vw"
                    />
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 flex items-end justify-start p-6 transition-all">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity px-3.5 py-2 rounded-full bg-white/95 text-[11px] font-bold text-primary shadow-lg border border-primary/20">
                        🔍 View Full Image
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* 3. Features & Stats block: Right Column Row 2 on Desktop, Row 3 on Mobile */}
                <div className="lg:col-span-7 lg:col-start-6 lg:row-start-2 lg:self-start space-y-6 w-full">
                  {/* Feature Chips */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[
                      "CAD/CAM Workflow",
                      "3D Printing",
                      "Digital Workflow",
                      "Quality Assurance",
                      "Precision Engineering",
                      "Orthodontic Excellence",
                    ].map((chip) => (
                      <span
                        key={chip}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-700 bg-slate-50 border border-slate-100 hover:border-primary/20 hover:text-primary transition-all duration-300"
                      >
                        <span className="text-primary font-black">✓</span>
                        {chip}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2">
                    <Link
                      href="/our-story"
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-hover group transition-colors duration-300 relative py-1"
                    >
                      <span className="relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 group-hover:after:origin-bottom-left group-hover:after:scale-x-100">
                        Learn More About Our Journey
                      </span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>

                  {/* Redesigned Statistics cards adapting automatically based on space (2x2 on desktop/tablet, 1 col on mobile) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                    {aboutStats.map((s: any) => {
                      let value = s.value;
                      if (s.label.toLowerCase().includes("expert team")) {
                        value = "100+";
                      }
                      return { ...s, value };
                    }).map((stat: any, index: number) => (
                      <div
                        key={index}
                        className="p-5 bg-gradient-to-br from-white/70 to-[#EEF8FF]/70 backdrop-blur-md border border-blue-100/50 hover:bg-white hover:border-primary/30 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 rounded-2xl flex items-center gap-4 min-h-[110px]"
                      >
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 text-primary flex items-center justify-center flex-shrink-0 shadow-xs">
                          <DynamicIcon name={stat.icon || "Award"} className="w-6 h-6" />
                        </div>
                        <div className="space-y-0.5">
                          <h4 className="text-xl sm:text-2xl font-black text-dark font-poppins leading-none">
                            <AnimatedCounter value={stat.value} />
                          </h4>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider leading-tight">{stat.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </section>
        );

      case "WhyChooseUs":
        const activeAdvantages = whyChooseUs.filter(item => item.isVisible);
        return (
          <section key="WhyChooseUs" className="py-24 bg-white" aria-labelledby="why-choose-heading">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-primary bg-primary/10 border border-primary/20 uppercase tracking-wider">
                  Our Advantages
                </span>
                <h2 id="why-choose-heading" className="text-3xl sm:text-4xl font-extrabold text-dark font-poppins tracking-tight">
                  Why Choose Us
                </h2>
                <p className="text-slate-500 text-sm sm:text-base">
                  A premium laboratory workflow engineered for speed, accuracy, and excellent clinical results.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {activeAdvantages.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ y: -6 }}
                    className="p-8 bg-white rounded-3xl border border-slate-150/50 shadow-xs hover:shadow-md transition-all space-y-4"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                      <DynamicIcon name={item.icon || "ShieldCheck"} className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-dark font-poppins">{item.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
                  </motion.div>
                ))}

                <motion.div
                  whileHover={{ y: -6 }}
                  className="p-8 bg-white rounded-3xl border border-slate-150/50 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                      <Award className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-dark font-poppins">Quality Certificate</h3>
                    <div
                      onClick={() => setIsModalOpen(true)}
                      className="relative w-full h-44 bg-slate-50 border border-slate-200/80 rounded-2xl overflow-hidden flex items-center justify-center shadow-xs cursor-pointer group hover:border-primary/40 transition-colors"
                    >
                      {certSrc ? (
                        <Image
                          src={certSrc}
                          alt="ISO 13485 Certified Dental Laboratory Certificate"
                          fill
                          sizes="(max-width: 768px) 100vw, 300px"
                          className="object-contain p-2 hover:scale-[1.02] transition-transform duration-300"
                          loading="lazy"
                        />
                      ) : (
                        <div className="p-4 flex flex-col items-center justify-center text-slate-400 select-none">
                          <Award className="w-8 h-8 mb-1 opacity-50" />
                          <span className="text-[9px] font-black tracking-wider uppercase opacity-70">ISO 13485</span>
                          <span className="text-[8px] mt-0.5 opacity-50">Standard Verified</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-[1px]">
                        <span className="px-3 py-1.5 rounded-full bg-white/95 text-[10px] font-bold text-primary shadow-xs border border-primary/25">
                          🔍 Zoom
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed">ISO Certified Dental Laboratory</p>
                </motion.div>
              </div>
            </div>
          </section>
        );

      case "Services":
        const activeServices = services.filter(s => s.isVisible);
        return (
          <section key="Services" className="py-24 bg-gradient-to-br from-white to-[#E8FCFF] border-y border-cyan-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-secondary bg-secondary/10 border border-secondary/20 uppercase tracking-wider">
                  Comprehensive Support
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-dark font-poppins tracking-tight">
                  Our Professional Services
                </h2>
                <p className="text-slate-500 text-sm sm:text-base">
                  Providing digital planning, orthodontic simulation support, and high-fidelity aligner production.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {activeServices.map((service) => (
                  <div key={service.id} className="p-8 bg-white rounded-3xl border border-cyan-100/50 shadow-sm hover:shadow-[0_4px_20px_rgba(46,199,214,0.15)] transition-all duration-300 group flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-secondary text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                        <DynamicIcon name={service.icon || "Layers"} className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-dark font-poppins">{service.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{service.description}</p>
                    </div>
                    <Link href="/solutions" className="mt-6 text-primary text-xs font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Details <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case "Testimonials":
        return null;

      default:
        return null;
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-white">
      <div className="absolute top-[3%] left-[-10%] glow-spot-blue opacity-85" />
      <div className="absolute top-[25%] right-[-10%] glow-spot-teal opacity-75" />
      <div className="absolute top-[55%] left-[-15%] glow-spot-blue opacity-65" />
      <div className="absolute top-[80%] right-[-15%] glow-spot-teal opacity-70" />

      {sections.filter(s => s.isVisible).map(s => renderSection(s.sectionName))}

      {/* ─── Before / After Slider ─── */}
      <section className="py-24 bg-white border-y border-blue-50/50" aria-labelledby="comparison-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-primary bg-primary/10 border border-primary/20 uppercase tracking-wider">
              Visual Comparison
            </span>
            <h2 id="comparison-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark font-poppins leading-tight tracking-tight">
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

      <section className="py-24 bg-gradient-to-br from-[#EEF8FF] to-white border-b border-blue-50" aria-labelledby="expansion-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6 lg:col-start-1 lg:row-start-1 lg:self-end"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-secondary bg-secondary/10 border border-secondary/20 uppercase tracking-wider">
                Arch Expansion
              </span>
              <h2 id="expansion-heading" className="text-3xl sm:text-4xl font-extrabold text-dark font-poppins tracking-tight leading-tight">
                Dental Arch Expansion with Aligners
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Linealign aligners incorporate integrated expansion mechanics that generate lateral arch width without requiring extractions. Our clinically engineered expansion components deliver controlled, predictable arch development for both upper and lower dentitions.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center gap-4 lg:col-start-2 lg:row-start-1 lg:row-span-2"
            >
              <div
                className="relative w-full rounded-2xl overflow-hidden shadow-xl border border-slate-200/60 cursor-pointer group hover:shadow-2xl transition-all duration-500"
                style={{ maxWidth: "520px" }}
                onClick={() => openLightbox("/images/expansion_before_after.jpeg", "Clinical Before and After Dental Arch Expansion Results showing Upper and Lower Arch Alignment")}
              >
                <Image
                  src="/images/expansion_before_after.jpeg"
                  alt="Clinical Before and After Dental Arch Expansion Results – Upper and Lower Arch Alignment with Clear Aligners"
                  width={520}
                  height={420}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 520px"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 flex items-end justify-start p-5 transition-all">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1.5 rounded-full bg-white/95 text-[11px] font-bold text-primary shadow border border-primary/20">
                    🔍 View Full Image
                  </span>
                </div>
              </div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider text-center">
                Clinical Before &amp; After Expansion Results
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-start-1 lg:row-start-2 lg:self-start lg:mt-6"
            >
              <ul className="space-y-3">
                {[
                  "Transverse Arch Development",
                  "Non-extraction Space Creation",
                  "Crowding Resolution",
                  "Upper & Lower Arch Coordination",
                  "Controlled Lateral Expansion Forces",
                  "Predictable Clinical Outcomes"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-700 text-sm font-medium">
                    <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Aligner Features ─── */}
      <section className="py-24 bg-white border-b border-blue-50/50" aria-labelledby="features-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-primary bg-primary/10 border border-primary/20 uppercase tracking-wider">
              Material Engineering
            </span>
            <h2 id="features-heading" className="text-3xl sm:text-4xl font-extrabold text-dark font-poppins tracking-tight">
              Much More Than Just Invisible
            </h2>
            <p className="text-slate-500 text-sm sm:text-base">
              Our aligner models incorporate advanced clinical mechanics to address complex teeth rotation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Arch Expansion", desc: "Lateral expansion mechanics possible via integrated expansion components, generating space without extractions." },
              { title: "Intermaxillary Elastics", desc: "Precision aligner slits to anchor orthodontic elastics, helping adjust jaw bites (Class II/III configurations)." },
              { title: "Attachments", desc: "Engineered composite attachment pads to control complex canine root rotations or molar tilting movements." },
              { title: "Missing Teeth", desc: "Includes pontic slots inside aligners to cover missing teeth gap spacings, keeping patient aesthetics high." },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-[2rem] border border-slate-150/50 bg-white shadow-xs hover:border-primary/30 hover:shadow-md transition-all space-y-3">
                <h3 className="text-lg font-bold text-dark font-poppins">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-white to-[#EEF8FF] border-b border-blue-50" aria-labelledby="elastics-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-8 items-center">
            {/* Header: Badge, Heading, Description */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6 lg:col-start-2 lg:row-start-1 lg:self-end"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-primary bg-primary/10 border border-primary/20 uppercase tracking-wider">
                Bite Correction
              </span>
              <h2 id="elastics-heading" className="text-3xl sm:text-4xl font-extrabold text-dark font-poppins tracking-tight leading-tight">
                Inter Maxillary Elastics
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Linealign aligners are engineered with precision elastic slits to support inter-maxillary elastics — delivering powerful bite correction forces while maintaining aligner comfort and aesthetics.
              </p>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center gap-4 lg:col-start-1 lg:row-start-1 lg:row-span-2"
            >
              <div
                className="relative w-full rounded-2xl overflow-hidden shadow-xl border border-slate-200/60 cursor-pointer group hover:shadow-2xl transition-all duration-500"
                style={{ maxWidth: "560px" }}
                onClick={() => openLightbox("/images/elastics_clinical.jpeg", "Inter Maxillary Elastics with TAD Anchorage in Clear Aligner for Bite Correction")}
              >
                <Image
                  src="/images/elastics_clinical.jpeg"
                  alt="Inter Maxillary Elastics with Temporary Anchorage Device inside Clear Aligner for Bite Correction and Class II Treatment"
                  width={560}
                  height={420}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 560px"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 flex items-end justify-start p-5 transition-all">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1.5 rounded-full bg-white/95 text-[11px] font-bold text-primary shadow border border-primary/20">
                    🔍 View Full Image
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Features & CTA */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6 lg:col-start-2 lg:row-start-2 lg:self-start lg:mt-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: "Activity", text: "Bite Correction" },
                  { icon: "TrendingUp", text: "Class II Correction" },
                  { icon: "TrendingDown", text: "Class III Correction" },
                  { icon: "AlignCenter", text: "Midline Correction" },
                  { icon: "CheckCircle", text: "Occlusal Settling" },
                  { icon: "Gauge", text: "Controlled Force Systems" },
                ].map((feat) => (
                  <div key={feat.text} className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                    <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <DynamicIcon name={feat.icon} className="w-3.5 h-3.5" />
                    </div>
                    {feat.text}
                  </div>
                ))}
              </div>
              <Link
                href="/faq"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white bg-gradient-to-r from-primary to-secondary hover:brightness-105 shadow-md hover:shadow-[0_4px_20px_rgba(46,199,214,0.35)] transition-all"
              >
                Book Consultation <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white border-b border-blue-50/50" aria-labelledby="attachments-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-8 items-center">
            {/* Header: Badge, Heading, Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6 lg:col-start-1 lg:row-start-1 lg:self-end"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-secondary bg-secondary/10 border border-secondary/20 uppercase tracking-wider">
                Precision Biomechanics
              </span>
              <h2 id="attachments-heading" className="text-3xl sm:text-4xl font-extrabold text-dark font-poppins tracking-tight leading-tight">
                Composite Attachments
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Our precision-engineered composite attachments are strategically designed to control complex tooth movements that would otherwise be impossible with aligner forces alone. Each attachment is custom-positioned based on the digital treatment plan.
              </p>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center gap-4 lg:col-start-2 lg:row-start-1 lg:row-span-2"
            >
              <div
                className="relative w-full rounded-2xl overflow-hidden shadow-xl border border-slate-200/60 cursor-pointer group hover:shadow-2xl transition-all duration-500"
                onClick={() => openLightbox("/images/attachments_diagram.jpeg", "Composite Attachment Diagram – Rotation Torque and Extrusion Controls for Clear Aligner")}
              >
                <Image
                  src="/images/attachments_diagram.jpeg"
                  alt="Composite Attachment Diagram showing Rotation Torque Extrusion and Intrusion force directions for Clear Aligner Treatment"
                  width={600}
                  height={450}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 600px"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 flex items-end justify-start p-5 transition-all">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1.5 rounded-full bg-white/95 text-[11px] font-bold text-primary shadow border border-primary/20">
                    🔍 View Full Image
                  </span>
                </div>
              </div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider text-center">
                Engineered Attachment Biomechanics
              </p>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6 lg:col-start-1 lg:row-start-2 lg:self-start lg:mt-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {["Rotation Control", "Torque Management", "Tooth Extrusion", "Intrusion Mechanics", "Aligner Retention", "Precision Root Movement", "Complex Case Solutions", "Predictable Outcomes"].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                    <div className="w-5 h-5 rounded-full bg-secondary/15 flex items-center justify-center text-secondary flex-shrink-0 text-[10px] font-black">✔</div>
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-[#EEF8FF] to-white border-b border-blue-50" aria-labelledby="missing-tooth-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-8 items-center">
            {/* Header: Badge, Heading, Description */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6 lg:col-start-2 lg:row-start-1 lg:self-end"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-primary bg-primary/10 border border-primary/20 uppercase tracking-wider">
                Prosthetic Integration
              </span>
              <h2 id="missing-tooth-heading" className="text-3xl sm:text-4xl font-extrabold text-dark font-poppins tracking-tight leading-tight">
                Missing Tooth Management with Aligners
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Linealign aligners can incorporate an integrated pontic — a natural-looking tooth replica — directly inside the aligner tray to maintain aesthetics and function during orthodontic treatment when a tooth is missing.
              </p>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center gap-4 lg:col-start-1 lg:row-start-1 lg:row-span-2"
            >
              <div
                className="relative w-full rounded-2xl overflow-hidden shadow-xl border border-slate-200/60 cursor-pointer group hover:shadow-2xl transition-all duration-500"
                onClick={() => openLightbox("/images/integrated_pontic.jpeg", "Integrated Pontic inside Clear Aligner for Missing Tooth Management and Aesthetic Preservation")}
              >
                <Image
                  src="/images/integrated_pontic.jpeg"
                  alt="Integrated Pontic inside Clear Aligner for Aesthetic Missing Tooth Management and Implant Space Preparation"
                  width={700}
                  height={520}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 700px"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 flex items-end justify-start p-5 transition-all">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1.5 rounded-full bg-white/95 text-[11px] font-bold text-primary shadow border border-primary/20">
                    🔍 View Full Image
                  </span>
                </div>
              </div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider text-center">
                Integrated Pontic – Missing Tooth Solution
              </p>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6 lg:col-start-2 lg:row-start-2 lg:self-start lg:mt-6"
            >
              <div className="space-y-3">
                {[
                  { icon: "Smile", title: "Integrated Pontic", desc: "Natural tooth replica built into the aligner tray" },
                  { icon: "Target", title: "Implant Space Planning", desc: "Ideal spacing maintained for future implant placement" },
                  { icon: "Star", title: "Esthetic Smile Maintenance", desc: "No visible gap during the course of treatment" },
                  { icon: "Maximize", title: "Space Maintenance", desc: "Prevents adjacent tooth migration during treatment" },
                  { icon: "Layers", title: "Prosthetic Preparation", desc: "Coordinated with complete restorative workflow" },
                ].map((feat) => (
                  <div key={feat.title} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                      <DynamicIcon name={feat.icon} className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-dark">{feat.title}</p>
                      <p className="text-xs text-slate-500">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── TADs Incorporated Aligners ─── */}
      <section className="py-24 bg-gradient-to-br from-[#0F1F3D] to-[#1a3460] text-white relative overflow-hidden border-b border-white/5" aria-labelledby="tads-incorporated-heading">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(46,199,214,0.12)_0%,transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(42,132,255,0.10)_0%,transparent_60%)] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-7 space-y-4 text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-secondary bg-secondary/20 border border-secondary/30 uppercase tracking-wider">
                Advanced Orthodontics
              </span>
              <h2 id="tads-incorporated-heading" className="text-3xl sm:text-4xl font-extrabold text-white font-poppins tracking-tight">
                TADs Incorporated Aligners
              </h2>
              <p className="text-xl text-secondary font-bold font-poppins">Aligners for Functional Skeletal Cases</p>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                By integrating Temporary Anchorage Devices with clear aligner therapy, Linealign enables treatment of complex skeletal cases that were traditionally limited to conventional orthodontics or orthognathic surgery.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 flex flex-col gap-3"
            >
              <div
                className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 cursor-pointer group hover:shadow-[0_8px_40px_rgba(46,199,214,0.2)] transition-all duration-500"
                onClick={() => openLightbox("/images/tad_clinical_1.jpeg", "TAD in Clear Aligner – Frontal view of Temporary Anchorage Device with Elastics for Orthodontic Correction")}
              >
                <Image
                  src="/images/tad_clinical_1.jpeg"
                  alt="TAD Temporary Anchorage Device with Elastics Inside Clear Aligner for Skeletal Anchorage and Orthodontic Correction – Frontal View"
                  width={700}
                  height={460}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/5 flex items-end justify-start p-5 transition-all">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1.5 rounded-full bg-white/95 text-[11px] font-bold text-primary shadow">
                    🔍 View Full Image
                  </span>
                </div>
              </div>
              <p className="text-white/50 text-[10px] font-bold uppercase tracking-wider text-center">
                TAD + Elastics with Aligner – Frontal View
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { icon: "Target", title: "Temporary Anchorage Devices", desc: "Titanium mini-screws providing absolute skeletal anchorage for controlled force delivery." },
              { icon: "Maximize2", title: "Class II Correction", desc: "Mandibular advancement and molar distalization for skeletal Class II malocclusion." },
              { icon: "Minimize2", title: "Class III Correction", desc: "Maxillary advancement support and growth modification for Class III cases." },
              { icon: "ArrowUp", title: "Open Bite Correction", desc: "Anterior intrusion mechanics to close skeletal open bites predictably." },
              { icon: "ArrowDown", title: "Deep Bite Correction", desc: "Posterior intrusion and anterior extrusion for deep bite reduction." },
              { icon: "Crosshair", title: "Distalization", desc: "Molar distalization with TAD anchorage eliminating unwanted anchorage loss." },
              { icon: "Move", title: "Complex Tooth Movements", desc: "En-masse retraction, intrusion and bodily movements beyond normal aligner capability." },
              { icon: "Scissors", title: "Surgical Alternatives", desc: "TAD-assisted aligners can replace orthognathic surgery in selected skeletal cases." },
              { icon: "BarChart", title: "Predictable Biomechanics", desc: "Evidence-based force systems with measurable, trackable clinical outcomes." },
            ].map((item) => (
              <motion.div
                key={item.title}
                whileHover={{ y: -4 }}
                className="p-6 bg-white/5 rounded-2xl border border-white/10 shadow-xs hover:shadow-md hover:border-secondary/30 hover:bg-white/10 transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-secondary">
                  <DynamicIcon name={item.icon} className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white font-poppins">{item.title}</h3>
                <p className="text-white/60 text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-[2rem] p-8 border border-white/10">
              <h3 className="text-xl font-bold text-white font-poppins mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-secondary" />
                Clinical Indications
              </h3>
              <ul className="space-y-3">
                {["Skeletal Class II & Class III malocclusion", "Anterior open bite (skeletal origin)", "Deep bite with skeletal component", "Molar distalization requirements", "En-masse retraction cases", "Surgical orthodontic alternatives", "Growth modification in adolescents", "Complex adult orthopedic cases"].map((ind) => (
                  <li key={ind} className="flex items-center gap-2.5 text-sm text-white/80 font-medium">
                    <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0" />
                    {ind}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-[2rem] p-8 border border-white/10">
              <h3 className="text-xl font-bold text-white font-poppins mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-secondary" />
                Workflow
              </h3>
              <div className="space-y-4">
                {[
                  { step: "01", title: "Digital Scan Submission", desc: "Submit STL scans with TAD placement preferences" },
                  { step: "02", title: "3D Treatment Simulation", desc: "Review interactive simulation with TAD force vectors" },
                  { step: "03", title: "Custom Aligner Fabrication", desc: "Aligners with built-in TAD elastic hooks" },
                  { step: "04", title: "Clinical Delivery", desc: "TAD placement guide and aligner delivery in 5-7 days" },
                ].map((wf) => (
                  <div key={wf.step} className="flex items-start gap-4">
                    <span className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-xs font-black flex items-center justify-center flex-shrink-0">
                      {wf.step}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-white">{wf.title}</p>
                      <p className="text-xs text-white/60">{wf.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-white/10">
                <Link
                  href="/faq"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white bg-gradient-to-r from-primary to-secondary hover:brightness-105 shadow-md hover:shadow-[0_4px_20px_rgba(46,199,214,0.35)] transition-all"
                >
                  Book Consultation <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQs ─── */}
      <section className="py-24 bg-white border-y border-blue-50/50" aria-labelledby="faq-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-primary bg-primary/10 border border-primary/20 uppercase tracking-wider">
              FAQ Help Desk
            </span>
            <h2 id="faq-heading" className="text-3xl font-extrabold text-dark font-poppins tracking-tight">Frequently Asked Questions</h2>
            <p className="text-slate-500 text-sm">Everything you need to know about the Linealign Laboratory Ecosystem.</p>
          </div>
          <div className="space-y-4">
            {faqs.filter(f => f.isVisible).map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={faq.id || index}
                  className="border border-slate-200/50 rounded-2xl bg-white shadow-xs overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex justify-between items-center px-6 py-5 text-left font-bold text-dark font-poppins text-sm sm:text-base hover:bg-slate-50 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 flex-shrink-0 ml-4 ${isOpen ? "rotate-180" : ""}`} />
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

      {/* ─── Testimonials (What Our Partner Dentists Say) ─── */}
      {(() => {
        const activeReviews = testimonials.filter(t => t.isVisible);
        if (activeReviews.length === 0) return null;
        const review = activeReviews[currentTestimonial] || activeReviews[0];
        return (
          <section className="py-24 bg-gradient-to-br from-white to-[#E8FCFF] border-y border-cyan-50/50" aria-labelledby="testimonials-heading">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-secondary bg-secondary/10 border border-secondary/20 uppercase tracking-wider">
                  Dentists &amp; Patients Feedback
                </span>
                <h2 id="testimonials-heading" className="text-3xl font-extrabold text-dark font-poppins tracking-tight">What Our Partner Dentists Say</h2>
                <p className="text-slate-500 text-sm">Hear directly from dentists and patients who trust Linealign for accurate treatment planning, world-class aligners, and predictable orthodontic outcomes.</p>
              </div>
              <div className="relative max-w-4xl mx-auto bg-white border border-cyan-100/60 rounded-[2.5rem] p-8 sm:p-12 shadow-md flex flex-col md:flex-row gap-8 items-center min-h-[250px]">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-secondary text-white flex items-center justify-center font-extrabold text-xl shadow-md flex-shrink-0">
                  {review.avatar}
                </div>
                <div className="flex-grow space-y-4">
                  <MessageSquare className="w-8 h-8 text-primary/20" />
                  <p className="text-slate-655 text-base sm:text-lg italic leading-relaxed">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                  <div>
                    <h4 className="text-base font-bold text-dark font-poppins">{review.name}</h4>
                    <p className="text-slate-450 text-xs font-semibold uppercase tracking-wider mt-0.5">{review.role}</p>
                  </div>
                </div>
                <div className="flex md:flex-col gap-2.5 mt-4 md:mt-0 flex-shrink-0">
                  {activeReviews.map((_, i) => (
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
        );
      })()}

      {/* ─── CTA Bottom Banner ─── */}
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

      {/* ─── ISO Certificate Modal ─── */}
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
                aria-label="Close certificate modal"
              >
                ✕
              </button>
              <div className="flex-grow flex items-center justify-center p-4 min-h-[300px]">
                {certSrc ? (
                  <img
                    src={certSrc}
                    alt="ISO 13485 Certified Dental Laboratory Certificate – Quality Management System for Medical Devices"
                    className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-sm"
                  />
                ) : (
                  <div className="text-center p-12 space-y-4 max-w-md border-4 border-double border-primary/20 rounded-[2rem] bg-slate-50">
                    <Award className="w-16 h-16 mx-auto text-primary animate-pulse" />
                    <h3 className="text-2xl font-extrabold text-dark font-poppins">ISO Certified Dental Lab</h3>
                    <p className="text-slate-500 text-sm">Standard Quality Certificate is registered and fully compliant.</p>
                    <div className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-xs text-primary font-bold">ISO 13485:2016 Compliant</div>
                  </div>
                )}
              </div>
              <div className="mt-4 text-center">
                <p className="text-slate-700 text-sm font-extrabold font-poppins">ISO Certified Dental Laboratory</p>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mt-1">Medical Devices Standard</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Image Lightbox ─── */}
      {lightboxSrc && (
        <Lightbox src={lightboxSrc} alt={lightboxAlt} onClose={closeLightbox} />
      )}
    </div>
  );
}
