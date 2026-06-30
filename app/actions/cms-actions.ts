"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Helper to verify roles
async function checkAuth(allowedRoles = ["ADMIN", "EDITOR"]) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !allowedRoles.includes((session.user as any).role)) {
    throw new Error("Unauthorized access. Insufficient permissions.");
  }
  return session;
}

// ----------------------------------------
// 1. Site Settings Actions
// ----------------------------------------
export async function getSiteSettings() {
  try {
    let settings = await prisma.siteSettings.findUnique({
      where: { id: "settings" },
    });
    if (!settings) {
      try {
        settings = await prisma.siteSettings.create({
          data: { id: "settings" },
        });
      } catch (writeErr) {
        return {
          id: "settings",
          websiteName: "Linealign Dental Lab",
          logo: "/logo.jpeg",
          favicon: "/favicon.ico",
          themePrimary: "#2A84FF",
          themeSecondary: "#2EC7D6",
          whatsappNumber: "918281778202",
          contactPhone: "8281778202",
          contactEmail: "linealign23@gmail.com",
          officeAddress: "83, Pookkayam, Malakallu, Kasaragod, Kerala, India",
          workingHours: "24/7 Working Laboratory",
          googleMapsLink: "https://maps.google.com/maps?q=Kasaragod,%20Kerala,%20India&z=13&output=embed",
          metaTitle: "Linealign Dental Lab - Clear Aligner Laboratory",
          metaDescription: "Advanced Clear Aligner Laboratory delivering world-class orthodontic solutions. Clear, Comfort and Confident.",
          metaKeywords: "clear aligners, dental laboratory, orthodontics, invisible braces",
        };
      }
    }
    return settings;
  } catch (err) {
    return {
      id: "settings",
      websiteName: "Linealign Dental Lab",
      logo: "/logo.jpeg",
      favicon: "/favicon.ico",
      themePrimary: "#2A84FF",
      themeSecondary: "#2EC7D6",
      whatsappNumber: "918281778202",
      contactPhone: "8281778202",
      contactEmail: "linealign23@gmail.com",
      officeAddress: "83, Pookkayam, Malakallu, Kasaragod, Kerala, India",
      workingHours: "24/7 Working Laboratory",
      googleMapsLink: "https://maps.google.com/maps?q=Kasaragod,%20Kerala,%20India&z=13&output=embed",
      metaTitle: "Linealign Dental Lab - Clear Aligner Laboratory",
      metaDescription: "Advanced Clear Aligner Laboratory delivering world-class orthodontic solutions. Clear, Comfort and Confident.",
      metaKeywords: "clear aligners, dental laboratory, orthodontics, invisible braces",
    };
  }
}

export async function updateSiteSettings(data: any) {
  await checkAuth(["ADMIN"]);
  const settings = await prisma.siteSettings.update({
    where: { id: "settings" },
    data,
  });
  revalidatePath("/");
  revalidatePath("/solutions");
  revalidatePath("/pricing");
  revalidatePath("/our-story");
  revalidatePath("/faq");
  return settings;
}

// ----------------------------------------
// 2. Navbar Config Actions
// ----------------------------------------
export async function getNavbarConfig() {
  try {
    let navbar = await prisma.navbarConfig.findUnique({
      where: { id: "navbar" },
    });
    if (!navbar) {
      try {
        navbar = await prisma.navbarConfig.create({
          data: { id: "navbar" },
        });
      } catch (writeErr) {
        return {
          id: "navbar",
          sticky: true,
          logoSize: 84,
          menuItemsJson: "[{\"name\":\"Home\",\"href\":\"/\"},{\"name\":\"Solutions\",\"href\":\"/solutions\"},{\"name\":\"Pricing\",\"href\":\"/pricing\"},{\"name\":\"Our Story\",\"href\":\"/our-story\"},{\"name\":\"Contact Us\",\"href\":\"/faq\"}]",
          ctaText: "Book Consultation",
          ctaUrl: "/faq",
        };
      }
    }
    return navbar;
  } catch (err) {
    return {
      id: "navbar",
      sticky: true,
      logoSize: 84,
      menuItemsJson: "[{\"name\":\"Home\",\"href\":\"/\"},{\"name\":\"Solutions\",\"href\":\"/solutions\"},{\"name\":\"Pricing\",\"href\":\"/pricing\"},{\"name\":\"Our Story\",\"href\":\"/our-story\"},{\"name\":\"Contact Us\",\"href\":\"/faq\"}]",
      ctaText: "Book Consultation",
      ctaUrl: "/faq",
    };
  }
}

export async function updateNavbarConfig(data: any) {
  await checkAuth(["ADMIN"]);
  const navbar = await prisma.navbarConfig.update({
    where: { id: "navbar" },
    data,
  });
  revalidatePath("/");
  return navbar;
}

// ----------------------------------------
// 3. Hero Config Actions
// ----------------------------------------
export async function getHeroConfig() {
  try {
    let hero = await prisma.heroConfig.findUnique({
      where: { id: "hero" },
    });
    if (!hero) {
      try {
        hero = await prisma.heroConfig.create({
          data: { id: "hero" },
        });
      } catch (writeErr) {
        return {
          id: "hero",
          badgeText: "WELCOME TO LINEALIGN DENTAL LAB",
          title: "Your Smile, Our Precision.",
          description: "Advanced Clear Aligner Laboratory delivering world-class orthodontic solutions. Clear, Comfort and Confident.",
          bgImage: "/generated_aligner_hero.png",
          bgVideo: "/images/aligner.mp4",
          featuresJson: "[\"24/7 Working Lab\",\"Full-Time Orthodontists\",\"ISO Certified Dental Laboratory\",\"FDA Grade Aligners\",\"Premium Clear Aligners\"]",
          ctaText: "Book Consultation",
          ctaUrl: "/faq",
          whatsappUrl: "https://wa.me/918281778202",
        };
      }
    }
    return hero;
  } catch (err) {
    return {
      id: "hero",
      badgeText: "WELCOME TO LINEALIGN DENTAL LAB",
      title: "Your Smile, Our Precision.",
      description: "Advanced Clear Aligner Laboratory delivering world-class orthodontic solutions. Clear, Comfort and Confident.",
      bgImage: "/generated_aligner_hero.png",
      bgVideo: "/images/aligner.mp4",
      featuresJson: "[\"24/7 Working Lab\",\"Full-Time Orthodontists\",\"ISO Certified Dental Laboratory\",\"FDA Grade Aligners\",\"Premium Clear Aligners\"]",
      ctaText: "Book Consultation",
      ctaUrl: "/faq",
      whatsappUrl: "https://wa.me/918281778202",
    };
  }
}

export async function updateHeroConfig(data: any) {
  await checkAuth(["ADMIN", "EDITOR"]);
  const hero = await prisma.heroConfig.update({
    where: { id: "hero" },
    data,
  });
  revalidatePath("/");
  return hero;
}

// ----------------------------------------
// 4. About Config Actions
// ----------------------------------------
export async function getAboutConfig() {
  try {
    let about = await prisma.aboutConfig.findUnique({
      where: { id: "about" },
    });
    if (!about) {
      try {
        about = await prisma.aboutConfig.create({
          data: { id: "about" },
        });
      } catch (writeErr) {
        return {
          id: "about",
          badgeText: "Discover Our Story",
          title: "Welcome to Linealign Dental Lab",
          description: "Linealign Dental Lab provides advanced orthodontic and clear aligner solutions using modern digital technology and expert orthodontic support. Our mission is to deliver clear, comfort and confident smiles through innovation and quality craftsmanship.",
          linkText: "Learn More About Our Journey",
          linkUrl: "/our-story",
          statsJson: "[{\"label\":\"Premium Quality\",\"value\":\"100%\"},{\"label\":\"Digital Workflow\",\"value\":\"100%\"},{\"label\":\"Expert Team\",\"value\":\"250+\"},{\"label\":\"Working Lab\",\"value\":\"24/7\"}]",
        };
      }
    }
    return about;
  } catch (err) {
    return {
      id: "about",
      badgeText: "Discover Our Story",
      title: "Welcome to Linealign Dental Lab",
      description: "Linealign Dental Lab provides advanced orthodontic and clear aligner solutions using modern digital technology and expert orthodontic support. Our mission is to deliver clear, comfort and confident smiles through innovation and quality craftsmanship.",
      linkText: "Learn More About Our Journey",
      linkUrl: "/our-story",
      statsJson: "[{\"label\":\"Premium Quality\",\"value\":\"100%\"},{\"label\":\"Digital Workflow\",\"value\":\"100%\"},{\"label\":\"Expert Team\",\"value\":\"250+\"},{\"label\":\"Working Lab\",\"value\":\"24/7\"}]",
    };
  }
}

export async function updateAboutConfig(data: any) {
  await checkAuth(["ADMIN", "EDITOR"]);
  const about = await prisma.aboutConfig.update({
    where: { id: "about" },
    data,
  });
  revalidatePath("/");
  revalidatePath("/our-story");
  return about;
}

// ----------------------------------------
// 5. Founders CRUD Actions
// ----------------------------------------
export async function getFounders() {
  try {
    const list = await prisma.founder.findMany({
      orderBy: { sortOrder: "asc" },
    });
    if (list.length === 0) {
      return [
        {
          id: "f1",
          name: "Dr. TILVIN V TOM",
          photo: "/tilvin.jpg",
          designation: "Founder",
          qualification: "BDS, MDS",
          description: "Orthodontist & Aligner Specialist overseeing simulation reviews and plan approvals.",
          experience: "10+ Years Experience",
          badge: "Founder",
          sortOrder: 0,
          isVisible: true,
          socialLinksJson: "[]",
        },
        {
          id: "f2",
          name: "Dr. Shoukathali P. H",
          photo: "/shoukath.jpg",
          designation: "Co-Founder",
          qualification: "BDS, MDS",
          description: "Orthodontist & Aligner Specialist providing full-time clinical support.",
          experience: "10+ Years Experience",
          badge: "Co-Founder",
          sortOrder: 1,
          isVisible: true,
          socialLinksJson: "[]",
        },
      ];
    }
    return list;
  } catch (err) {
    return [
      {
        id: "f1",
        name: "Dr. TILVIN V TOM",
        photo: "/tilvin.jpg",
        designation: "Founder",
        qualification: "BDS, MDS",
        description: "Orthodontist & Aligner Specialist overseeing simulation reviews and plan approvals.",
        experience: "10+ Years Experience",
        badge: "Founder",
        sortOrder: 0,
        isVisible: true,
        socialLinksJson: "[]",
      },
      {
        id: "f2",
        name: "Dr. Shoukathali P. H",
        photo: "/shoukath.jpg",
        designation: "Co-Founder",
        qualification: "BDS, MDS",
        description: "Orthodontist & Aligner Specialist providing full-time clinical support.",
        experience: "10+ Years Experience",
        badge: "Co-Founder",
        sortOrder: 1,
        isVisible: true,
        socialLinksJson: "[]",
      },
    ];
  }
}

export async function saveFounder(data: any) {
  await checkAuth(["ADMIN", "EDITOR"]);
  const { id, ...rest } = data;
  let founder;
  if (id) {
    founder = await prisma.founder.update({
      where: { id },
      data: rest,
    });
  } else {
    founder = await prisma.founder.create({
      data: rest,
    });
  }
  revalidatePath("/");
  return founder;
}

export async function deleteFounder(id: string) {
  await checkAuth(["ADMIN", "EDITOR"]);
  await prisma.founder.delete({
    where: { id },
  });
  revalidatePath("/");
}

// ----------------------------------------
// 6. Services CRUD Actions
// ----------------------------------------
export async function getServices() {
  try {
    const list = await prisma.service.findMany({
      orderBy: { sortOrder: "asc" },
    });
    if (list.length === 0) {
      return [
        { id: "s1", title: "Clear Aligners", description: "Precision-molded invisible orthodontic trays engineered from high-retention polymer sheets for maximum tooth alignment.", icon: "Layers", seoUrl: "clear-aligners", sortOrder: 0, isVisible: true, buttonText: "Details", buttonUrl: "/solutions" },
        { id: "s2", title: "Digital Smile Design", description: "Aesthetic simulation software showing post-treatment orthodontic models, assisting doctor approvals and patient consultations.", icon: "Activity", seoUrl: "digital-smile-design", sortOrder: 1, isVisible: true, buttonText: "Details", buttonUrl: "/solutions" },
        { id: "s3", title: "Orthodontic Planning", description: "Interactive 3D dental biomechanics setups (arch expansion, rotators, attachments) designed by certified specialists.", icon: "Users", seoUrl: "orthodontic-planning", sortOrder: 2, isVisible: true, buttonText: "Details", buttonUrl: "/solutions" },
        { id: "s4", title: "Treatment Support", description: "Continuous support team available 24/7 to solve mid-treatment adjustments, refinements, or physical silicon impression scans.", icon: "ShieldCheck", seoUrl: "treatment-support", sortOrder: 3, isVisible: true, buttonText: "Details", buttonUrl: "/solutions" },
        { id: "s5", title: "Aligner Manufacturing", description: "State-of-the-art laboratory lines crafting high-fidelity biocompatible trays with laser trim cuts for maximum patient comfort.", icon: "Layers", seoUrl: "aligner-manufacturing", sortOrder: 4, isVisible: true, buttonText: "Details", buttonUrl: "/solutions" },
        { id: "s6", title: "Clinical Consultation", description: "Professional digital scan evaluation and treatment planning tips to help physicians provide the best orthodontic options.", icon: "MessageSquare", seoUrl: "clinical-consultation", sortOrder: 5, isVisible: true, buttonText: "Details", buttonUrl: "/solutions" }
      ];
    }
    return list;
  } catch (err) {
    return [
      { id: "s1", title: "Clear Aligners", description: "Precision-molded invisible orthodontic trays engineered from high-retention polymer sheets for maximum tooth alignment.", icon: "Layers", seoUrl: "clear-aligners", sortOrder: 0, isVisible: true, buttonText: "Details", buttonUrl: "/solutions" },
      { id: "s2", title: "Digital Smile Design", description: "Aesthetic simulation software showing post-treatment orthodontic models, assisting doctor approvals and patient consultations.", icon: "Activity", seoUrl: "digital-smile-design", sortOrder: 1, isVisible: true, buttonText: "Details", buttonUrl: "/solutions" },
      { id: "s3", title: "Orthodontic Planning", description: "Interactive 3D dental biomechanics setups (arch expansion, rotators, attachments) designed by certified specialists.", icon: "Users", seoUrl: "orthodontic-planning", sortOrder: 2, isVisible: true, buttonText: "Details", buttonUrl: "/solutions" },
      { id: "s4", title: "Treatment Support", description: "Continuous support team available 24/7 to solve mid-treatment adjustments, refinements, or physical silicon impression scans.", icon: "ShieldCheck", seoUrl: "treatment-support", sortOrder: 3, isVisible: true, buttonText: "Details", buttonUrl: "/solutions" },
      { id: "s5", title: "Aligner Manufacturing", description: "State-of-the-art laboratory lines crafting high-fidelity biocompatible trays with laser trim cuts for maximum patient comfort.", icon: "Layers", seoUrl: "aligner-manufacturing", sortOrder: 4, isVisible: true, buttonText: "Details", buttonUrl: "/solutions" },
      { id: "s6", title: "Clinical Consultation", description: "Professional digital scan evaluation and treatment planning tips to help physicians provide the best orthodontic options.", icon: "MessageSquare", seoUrl: "clinical-consultation", sortOrder: 5, isVisible: true, buttonText: "Details", buttonUrl: "/solutions" }
    ];
  }
}

export async function saveService(data: any) {
  await checkAuth(["ADMIN", "EDITOR"]);
  const { id, ...rest } = data;
  let service;
  if (id) {
    service = await prisma.service.update({
      where: { id },
      data: rest,
    });
  } else {
    service = await prisma.service.create({
      data: rest,
    });
  }
  revalidatePath("/");
  revalidatePath("/solutions");
  return service;
}

export async function deleteService(id: string) {
  await checkAuth(["ADMIN", "EDITOR"]);
  await prisma.service.delete({
    where: { id },
  });
  revalidatePath("/");
  revalidatePath("/solutions");
}

// ----------------------------------------
// 7. Why Choose Us CRUD Actions
// ----------------------------------------
export async function getWhyChooseUs() {
  try {
    const list = await prisma.whyChooseUs.findMany({
      orderBy: { sortOrder: "asc" },
    });
    if (list.length === 0) {
      return [
        { id: "w1", title: "24/7 Working Lab", description: "Full round-the-clock operations to guarantee minimal wait times and emergency support.", icon: "Clock", sortOrder: 0, isVisible: true },
        { id: "w2", title: "Full-Time Orthodontists", description: "Licensed in-house orthodontic specialists review and approve every treatment plan.", icon: "Users", sortOrder: 1, isVisible: true },
        { id: "w3", title: "Premium Clear Aligners", description: "Manufactured using high-elasticity medical polymer sheets for maximum tooth control.", icon: "ShieldCheck", sortOrder: 2, isVisible: true },
        { id: "w4", title: "Digital Workflow", description: "Fully digital case uploads, online simulation approvals, and real-time tracking systems.", icon: "Zap", sortOrder: 3, isVisible: true },
        { id: "w5", title: "Advanced CAD/CAM", description: "Sub-micron 3D scanning and state-of-the-art aligner laser printing machines.", icon: "Layers", sortOrder: 4, isVisible: true },
        { id: "w6", title: "Certified Materials", description: "Constructed solely using FDA-cleared, biocompatible medical-grade thermoplastic materials.", icon: "Award", sortOrder: 5, isVisible: true }
      ];
    }
    return list;
  } catch (err) {
    return [
      { id: "w1", title: "24/7 Working Lab", description: "Full round-the-clock operations to guarantee minimal wait times and emergency support.", icon: "Clock", sortOrder: 0, isVisible: true },
      { id: "w2", title: "Full-Time Orthodontists", description: "Licensed in-house orthodontic specialists review and approve every treatment plan.", icon: "Users", sortOrder: 1, isVisible: true },
      { id: "w3", title: "Premium Clear Aligners", description: "Manufactured using high-elasticity medical polymer sheets for maximum tooth control.", icon: "ShieldCheck", sortOrder: 2, isVisible: true },
      { id: "w4", title: "Digital Workflow", description: "Fully digital case uploads, online simulation approvals, and real-time tracking systems.", icon: "Zap", sortOrder: 3, isVisible: true },
      { id: "w5", title: "Advanced CAD/CAM", description: "Sub-micron 3D scanning and state-of-the-art aligner laser printing machines.", icon: "Layers", sortOrder: 4, isVisible: true },
      { id: "w6", title: "Certified Materials", description: "Constructed solely using FDA-cleared, biocompatible medical-grade thermoplastic materials.", icon: "Award", sortOrder: 5, isVisible: true }
    ];
  }
}

export async function saveWhyChooseUs(data: any) {
  await checkAuth(["ADMIN", "EDITOR"]);
  const { id, ...rest } = data;
  let item;
  if (id) {
    item = await prisma.whyChooseUs.update({
      where: { id },
      data: rest,
    });
  } else {
    item = await prisma.whyChooseUs.create({
      data: rest,
    });
  }
  revalidatePath("/");
  return item;
}

export async function deleteWhyChooseUs(id: string) {
  await checkAuth(["ADMIN", "EDITOR"]);
  await prisma.whyChooseUs.delete({
    where: { id },
  });
  revalidatePath("/");
}

// ----------------------------------------
// 8. Testimonials CRUD Actions
// ----------------------------------------
export async function getTestimonials() {
  try {
    const list = await prisma.testimonial.findMany({
      orderBy: { sortOrder: "asc" },
    });
    if (list.length === 0) {
      return [
        { id: "t1", name: "Dr. Rajesh Sharma", role: "Orthodontist, Mumbai", quote: "Linealign has transformed how I run my aligner practice. The treatment simulation within 24 hours is incredibly accurate, and patients love seeing the 3D visual step-by-step progress.", avatar: "RS", rating: 5.0, sortOrder: 0, isVisible: true },
        { id: "t2", name: "Dr. Ananya Goel", role: "Cosmetic Dentist, Bangalore", quote: "The marketing support demo kits and in-office videos have doubled my patient conversions. Linealign clear aligners are highly precise and pricing is very competitive.", avatar: "AG", rating: 5.0, sortOrder: 1, isVisible: true },
        { id: "t3", name: "Dr. Vikram Seth", role: "Clinic Director, Vadodara", quote: "Emergency support and the tracking app make after-care extremely simple. Highly recommended aligner partner with unmatched support.", avatar: "VS", rating: 5.0, sortOrder: 2, isVisible: true }
      ];
    }
    return list;
  } catch (err) {
    return [
      { id: "t1", name: "Dr. Rajesh Sharma", role: "Orthodontist, Mumbai", quote: "Linealign has transformed how I run my aligner practice. The treatment simulation within 24 hours is incredibly accurate, and patients love seeing the 3D visual step-by-step progress.", avatar: "RS", rating: 5.0, sortOrder: 0, isVisible: true },
      { id: "t2", name: "Dr. Ananya Goel", role: "Cosmetic Dentist, Bangalore", quote: "The marketing support demo kits and in-office videos have doubled my patient conversions. Linealign clear aligners are highly precise and pricing is very competitive.", avatar: "AG", rating: 5.0, sortOrder: 1, isVisible: true },
      { id: "t3", name: "Dr. Vikram Seth", role: "Clinic Director, Vadodara", quote: "Emergency support and the tracking app make after-care extremely simple. Highly recommended aligner partner with unmatched support.", avatar: "VS", rating: 5.0, sortOrder: 2, isVisible: true }
    ];
  }
}

export async function saveTestimonial(data: any) {
  await checkAuth(["ADMIN", "EDITOR"]);
  const { id, ...rest } = data;
  let testimonial;
  if (id) {
    testimonial = await prisma.testimonial.update({
      where: { id },
      data: rest,
    });
  } else {
    testimonial = await prisma.testimonial.create({
      data: rest,
    });
  }
  revalidatePath("/");
  return testimonial;
}

export async function deleteTestimonial(id: string) {
  await checkAuth(["ADMIN", "EDITOR"]);
  await prisma.testimonial.delete({
    where: { id },
  });
  revalidatePath("/");
}

// ----------------------------------------
// 9. FAQs CRUD Actions
// ----------------------------------------
export async function getFAQs() {
  try {
    const list = await prisma.fAQ.findMany({
      orderBy: { sortOrder: "asc" },
    });
    if (list.length === 0) {
      return [
        { id: "q1", question: "How do I submit patient scans to Linealign?", answer: "You can send us your patient's intraoral scans (STL files) or physical silicone impressions via WhatsApp (82817 78202) or email (linealign23@gmail.com). We accept scans from all major scanner brands.", category: "Support", sortOrder: 0, isVisible: true },
        { id: "q2", question: "How fast will I receive the treatment planning estimation?", answer: "You will receive a basic estimate of treatment cost, duration, and alignment method within 10 minutes. A full, interactive 3D treatment simulation will be sent to you for review within 24 hours.", category: "Timeline", sortOrder: 1, isVisible: true }
      ];
    }
    return list;
  } catch (err) {
    return [
      { id: "q1", question: "How do I submit patient scans to Linealign?", answer: "You can send us your patient's intraoral scans (STL files) or physical silicone impressions via WhatsApp (82817 78202) or email (linealign23@gmail.com). We accept scans from all major scanner brands.", category: "Support", sortOrder: 0, isVisible: true },
      { id: "q2", question: "How fast will I receive the treatment planning estimation?", answer: "You will receive a basic estimate of treatment cost, duration, and alignment method within 10 minutes. A full, interactive 3D treatment simulation will be sent to you for review within 24 hours.", category: "Timeline", sortOrder: 1, isVisible: true }
    ];
  }
}

export async function saveFAQ(data: any) {
  await checkAuth(["ADMIN", "EDITOR"]);
  const { id, ...rest } = data;
  let faq;
  if (id) {
    faq = await prisma.fAQ.update({
      where: { id },
      data: rest,
    });
  } else {
    faq = await prisma.fAQ.create({
      data: rest,
    });
  }
  revalidatePath("/");
  revalidatePath("/faq");
  return faq;
}

export async function deleteFAQ(id: string) {
  await checkAuth(["ADMIN", "EDITOR"]);
  await prisma.fAQ.delete({
    where: { id },
  });
  revalidatePath("/");
  revalidatePath("/faq");
}

// ----------------------------------------
// 10. Pricing Plans CRUD Actions
// ----------------------------------------
export async function getPricingPlans() {
  try {
    const list = await prisma.pricingPlan.findMany({
      orderBy: { sortOrder: "asc" },
    });
    if (list.length === 0) {
      return [
        {
          id: "p1",
          name: "Simple Case",
          description: "Ideal for minor spacing, crowding, or orthodontic alignment corrections.",
          priceUsd: "300",
          priceInr: "300",
          details: "Less than 15 Tray sets",
          featuresJson: JSON.stringify([
            "Less than 15 Tray sets",
            "Retainers included",
            "Splints included",
            "Aligner Carrying Box",
            "Free Re-Submission (Refinements)",
            "Treatment Tracking integration",
          ]),
          popular: false,
          discount: "",
          sortOrder: 0,
          isVisible: true,
          createdAt: new Date(),
        },
        {
          id: "p2",
          name: "Complex Case",
          description: "Designed for advanced misalignment and full-arch restorative rotation.",
          priceUsd: "750",
          priceInr: "600",
          details: "More than 15 Tray Sets",
          featuresJson: JSON.stringify([
            "More than 15 Tray Sets",
            "Unlimited Trays for Single Case",
            "Retainers included",
            "Splints included",
            "Aligner Carrying Box",
            "Free Re-Submission (Refinements)",
            "Treatment Tracking integration",
          ]),
          popular: true,
          discount: "",
          sortOrder: 1,
          isVisible: true,
          createdAt: new Date(),
        },
        {
          id: "p3",
          name: "3 Complex Cases",
          description: "Best value bundle for clinical practices handling multiple cases simultaneously.",
          priceUsd: "1850",
          priceInr: "1,500",
          details: "3 Cases with all Benefits",
          featuresJson: JSON.stringify([
            "3 Cases with all Benefits",
            "1 Year valid duration",
            "Priority clinical support",
            "Retainers, Splints & Cases",
            "Free Re-Submissions included",
            "Treatment Tracking dashboard",
          ]),
          popular: false,
          discount: "",
          sortOrder: 2,
          isVisible: true,
          createdAt: new Date(),
        },
      ];
    }
    return list;
  } catch (err) {
    return [
      {
        id: "p1",
        name: "Simple Case",
        description: "Ideal for minor spacing, crowding, or orthodontic alignment corrections.",
        priceUsd: "300",
        priceInr: "300",
        details: "Less than 15 Tray sets",
        featuresJson: JSON.stringify([
          "Less than 15 Tray sets",
          "Retainers included",
          "Splints included",
          "Aligner Carrying Box",
          "Free Re-Submission (Refinements)",
          "Treatment Tracking integration",
        ]),
        popular: false,
        discount: "",
        sortOrder: 0,
        isVisible: true,
        createdAt: new Date(),
      },
      {
        id: "p2",
        name: "Complex Case",
        description: "Designed for advanced misalignment and full-arch restorative rotation.",
        priceUsd: "750",
        priceInr: "600",
        details: "More than 15 Tray Sets",
        featuresJson: JSON.stringify([
          "More than 15 Tray Sets",
          "Unlimited Trays for Single Case",
          "Retainers included",
          "Splints included",
          "Aligner Carrying Box",
          "Free Re-Submission (Refinements)",
          "Treatment Tracking integration",
        ]),
        popular: true,
        discount: "",
        sortOrder: 1,
        isVisible: true,
        createdAt: new Date(),
      },
      {
        id: "p3",
        name: "3 Complex Cases",
        description: "Best value bundle for clinical practices handling multiple cases simultaneously.",
        priceUsd: "1850",
        priceInr: "1,500",
        details: "3 Cases with all Benefits",
        featuresJson: JSON.stringify([
          "3 Cases with all Benefits",
          "1 Year valid duration",
          "Priority clinical support",
          "Retainers, Splints & Cases",
          "Free Re-Submissions included",
          "Treatment Tracking dashboard",
        ]),
        popular: false,
        discount: "",
        sortOrder: 2,
        isVisible: true,
        createdAt: new Date(),
      },
    ];
  }
}

export async function savePricingPlan(data: any) {
  await checkAuth(["ADMIN", "EDITOR"]);
  const { id, ...rest } = data;
  let plan;
  if (id) {
    plan = await prisma.pricingPlan.update({
      where: { id },
      data: rest,
    });
  } else {
    plan = await prisma.pricingPlan.create({
      data: rest,
    });
  }
  revalidatePath("/pricing");
  return plan;
}

export async function deletePricingPlan(id: string) {
  await checkAuth(["ADMIN", "EDITOR"]);
  await prisma.pricingPlan.delete({
    where: { id },
  });
  revalidatePath("/pricing");
}

// ----------------------------------------
// 11. Gallery Items CRUD Actions
// ----------------------------------------
export async function getGalleryItems() {
  return await prisma.galleryItem.findMany({
    orderBy: { sortOrder: "asc" },
  });
}

export async function saveGalleryItem(data: any) {
  await checkAuth(["ADMIN", "EDITOR"]);
  const { id, ...rest } = data;
  let item;
  if (id) {
    item = await prisma.galleryItem.update({
      where: { id },
      data: rest,
    });
  } else {
    item = await prisma.galleryItem.create({
      data: rest,
    });
  }
  revalidatePath("/");
  return item;
}

export async function deleteGalleryItem(id: string) {
  await checkAuth(["ADMIN", "EDITOR"]);
  await prisma.galleryItem.delete({
    where: { id },
  });
  revalidatePath("/");
}

// ----------------------------------------
// 12. Media Items Actions
// ----------------------------------------
export async function getMediaItems() {
  return await prisma.mediaItem.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function deleteMediaItem(id: string) {
  await checkAuth(["ADMIN", "EDITOR"]);
  await prisma.mediaItem.delete({
    where: { id },
  });
}

// ----------------------------------------
// 13. Blog CRUD Actions
// ----------------------------------------
export async function getBlogPosts() {
  return await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
    include: { comments: true },
  });
}

export async function getBlogPostBySlug(slug: string) {
  return await prisma.blogPost.findUnique({
    where: { slug },
    include: { comments: { where: { isApproved: true }, orderBy: { createdAt: "desc" } } },
  });
}

export async function saveBlogPost(data: any) {
  await checkAuth(["ADMIN", "EDITOR"]);
  const { id, ...rest } = data;
  let post;
  if (id) {
    post = await prisma.blogPost.update({
      where: { id },
      data: rest,
    });
  } else {
    post = await prisma.blogPost.create({
      data: rest,
    });
  }
  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  return post;
}

export async function deleteBlogPost(id: string) {
  await checkAuth(["ADMIN", "EDITOR"]);
  const post = await prisma.blogPost.delete({
    where: { id },
  });
  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
}

export async function addComment(data: { postSlug: string; authorName: string; authorEmail: string; content: string }) {
  const comment = await prisma.comment.create({
    data: {
      postSlug: data.postSlug,
      authorName: data.authorName,
      authorEmail: data.authorEmail,
      content: data.content,
      isApproved: false, // Moderated by default
    },
  });
  return comment;
}

export async function getPendingComments() {
  await checkAuth(["ADMIN", "EDITOR"]);
  return await prisma.comment.findMany({
    where: { isApproved: false },
    orderBy: { createdAt: "desc" },
  });
}

export async function approveComment(id: string) {
  await checkAuth(["ADMIN", "EDITOR"]);
  const comment = await prisma.comment.update({
    where: { id },
    data: { isApproved: true },
  });
  revalidatePath(`/blog/${comment.postSlug}`);
  return comment;
}

export async function deleteComment(id: string) {
  await checkAuth(["ADMIN", "EDITOR"]);
  const comment = await prisma.comment.delete({
    where: { id },
  });
  revalidatePath(`/blog/${comment.postSlug}`);
}

// ----------------------------------------
// 14. Page Builder / Section Ordering
// ----------------------------------------
export async function getPageSections() {
  try {
    const sections = await prisma.pageSection.findMany({
      orderBy: { sortOrder: "asc" },
    });
    if (sections.length === 0) {
      try {
        const defaults = [
          { sectionName: "Hero", isVisible: true, sortOrder: 0 },
          { sectionName: "AlignerShowcase", isVisible: true, sortOrder: 1 },
          { sectionName: "Founder", isVisible: true, sortOrder: 2 },
          { sectionName: "About", isVisible: true, sortOrder: 3 },
          { sectionName: "WhyChooseUs", isVisible: true, sortOrder: 4 },
          { sectionName: "Services", isVisible: true, sortOrder: 5 },
          { sectionName: "Testimonials", isVisible: true, sortOrder: 6 },
        ];
        await prisma.pageSection.createMany({ data: defaults });
        return await prisma.pageSection.findMany({ orderBy: { sortOrder: "asc" } });
      } catch (writeErr) {
        return [
          { id: "sec1", sectionName: "Hero", isVisible: true, sortOrder: 0 },
          { id: "sec2", sectionName: "AlignerShowcase", isVisible: true, sortOrder: 1 },
          { id: "sec3", sectionName: "Founder", isVisible: true, sortOrder: 2 },
          { id: "sec4", sectionName: "About", isVisible: true, sortOrder: 3 },
          { id: "sec5", sectionName: "WhyChooseUs", isVisible: true, sortOrder: 4 },
          { id: "sec6", sectionName: "Services", isVisible: true, sortOrder: 5 },
          { id: "sec7", sectionName: "Testimonials", isVisible: true, sortOrder: 6 }
        ];
      }
    }
    return sections;
  } catch (err) {
    return [
      { id: "sec1", sectionName: "Hero", isVisible: true, sortOrder: 0 },
      { id: "sec2", sectionName: "AlignerShowcase", isVisible: true, sortOrder: 1 },
      { id: "sec3", sectionName: "Founder", isVisible: true, sortOrder: 2 },
      { id: "sec4", sectionName: "About", isVisible: true, sortOrder: 3 },
      { id: "sec5", sectionName: "WhyChooseUs", isVisible: true, sortOrder: 4 },
      { id: "sec6", sectionName: "Services", isVisible: true, sortOrder: 5 },
      { id: "sec7", sectionName: "Testimonials", isVisible: true, sortOrder: 6 }
    ];
  }
}

export async function updateSectionVisibility(id: string, isVisible: boolean) {
  await checkAuth(["ADMIN", "EDITOR"]);
  const section = await prisma.pageSection.update({
    where: { id },
    data: { isVisible },
  });
  revalidatePath("/");
  return section;
}

export async function updateSectionsOrder(sections: { id: string; sortOrder: number }[]) {
  await checkAuth(["ADMIN", "EDITOR"]);
  for (const item of sections) {
    await prisma.pageSection.update({
      where: { id: item.id },
      data: { sortOrder: item.sortOrder },
    });
  }
  revalidatePath("/");
}

// ----------------------------------------
// 15. User Management Actions
// ----------------------------------------
export async function getUsers() {
  await checkAuth(["ADMIN"]);
  return await prisma.user.findMany({
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  });
}
