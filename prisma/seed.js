const { PrismaClient } = require("../node_modules/@prisma/client");
const crypto = require("crypto");

const prisma = new PrismaClient();

// Custom PBKDF2 Password Hashing
function hashPassword(password) {
  return crypto.pbkdf2Sync(password, "salt_linealign", 1000, 64, "sha512").toString("hex");
}

async function main() {
  console.log("Starting database seeding...");

  // 1. Clear database
  await prisma.user.deleteMany();
  await prisma.siteSettings.deleteMany();
  await prisma.navbarConfig.deleteMany();
  await prisma.heroConfig.deleteMany();
  await prisma.aboutConfig.deleteMany();
  await prisma.founder.deleteMany();
  await prisma.service.deleteMany();
  await prisma.whyChooseUs.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.fAQ.deleteMany();
  await prisma.pricingPlan.deleteMany();
  await prisma.galleryItem.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.pageSection.deleteMany();

  console.log("Database cleared.");

  // 2. Create Users
  const adminUser = await prisma.user.create({
    data: {
      name: "Super Admin",
      email: "admin@linealign.com",
      passwordHash: hashPassword("admin123"),
      role: "ADMIN",
    },
  });

  const editorUser = await prisma.user.create({
    data: {
      name: "Content Editor",
      email: "editor@linealign.com",
      passwordHash: hashPassword("editor123"),
      role: "EDITOR",
    },
  });

  const viewerUser = await prisma.user.create({
    data: {
      name: "Guest Viewer",
      email: "viewer@linealign.com",
      passwordHash: hashPassword("viewer123"),
      role: "VIEWER",
    },
  });

  console.log("Users created:", { adminUser: adminUser.email, editorUser: editorUser.email, viewerUser: viewerUser.email });

  // 3. Create Site Settings
  await prisma.siteSettings.create({
    data: {
      id: "settings",
      websiteName: "Linealign Dental Lab",
      logo: "/logo.jpeg",
      favicon: "/favicon.ico",
      themePrimary: "#2A84FF",
      themeSecondary: "#2EC7D6",
      whatsappNumber: "918281778202",
      contactPhone: "8281778202",
      contactEmail: "linealign23@gmail.com",
      officeAddress: "83, Pookkayam, Malakallu, Near Indian Oil Petrol Pump, Malakallu PO, PIN 671532, Kasaragod District, Kerala, India",
      workingHours: "24/7 Working Laboratory",
      googleMapsLink: "https://maps.google.com/maps?q=Kasaragod,%20Kerala,%20India&z=13&output=embed",
      metaTitle: "Linealign Dental Lab - Clear Aligner Laboratory",
      metaDescription: "Advanced Clear Aligner Laboratory delivering world-class orthodontic solutions. Clear, Comfort and Confident.",
      metaKeywords: "clear aligners, dental laboratory, orthodontics, invisible braces, Kasaragod, Kerala",
    },
  });

  // 4. Create Navbar Config
  await prisma.navbarConfig.create({
    data: {
      id: "navbar",
      sticky: true,
      logoSize: 84,
      menuItemsJson: JSON.stringify([
        { name: "Home", href: "/" },
        { name: "Solutions", href: "/solutions" },
        { name: "Pricing", href: "/pricing" },
        { name: "Our Story", href: "/our-story" },
        { name: "Contact Us", href: "/faq" },
      ]),
      ctaText: "Book Consultation",
      ctaUrl: "/faq",
    },
  });

  // 5. Create Hero Config
  await prisma.heroConfig.create({
    data: {
      id: "hero",
      badgeText: "WELCOME TO LINEALIGN DENTAL LAB",
      title: "Your Smile, Our Precision.",
      description: "Advanced Clear Aligner Laboratory delivering world-class orthodontic solutions. Clear, Comfort and Confident.",
      bgImage: "/generated_aligner_hero.png",
      bgVideo: "/images/aligner.mp4",
      featuresJson: JSON.stringify([
        "24/7 Working Lab",
        "Full-Time Orthodontists",
        "ISO Certified Dental Laboratory",
        "FDA Grade Aligners",
        "Premium Clear Aligners",
      ]),
      ctaText: "Book Consultation",
      ctaUrl: "/faq",
      whatsappUrl: "https://wa.me/918281778202",
    },
  });

  // 6. Create About Config
  await prisma.aboutConfig.create({
    data: {
      id: "about",
      badgeText: "Discover Our Story",
      title: "Welcome to Linealign Dental Lab",
      description: "Linealign Dental Lab provides advanced orthodontic and clear aligner solutions using modern digital technology and expert orthodontic support. Our mission is to deliver clear, comfort and confident smiles through innovation and quality craftsmanship.",
      linkText: "Learn More About Our Journey",
      linkUrl: "/our-story",
      statsJson: JSON.stringify([
        { label: "Premium Quality", value: "100%" },
        { label: "Digital Workflow", value: "100%" },
        { label: "Expert Team", value: "250+" },
        { label: "Working Lab", value: "24/7" },
      ]),
    },
  });

  // 7. Create Founders
  await prisma.founder.createMany({
    data: [
      {
        name: "Dr. TILVIN V TOM",
        photo: "/tilvin.jpg",
        designation: "Founder",
        qualification: "BDS, MDS",
        description: "Orthodontist & Aligner Specialist overseeing simulation reviews and plan approvals.",
        experience: "10+ Years Experience",
        badge: "Founder",
        sortOrder: 0,
        isVisible: true,
        socialLinksJson: JSON.stringify([]),
      },
      {
        name: "Dr. SHOUKATHALI P H",
        photo: "/shoukath.jpg",
        designation: "Co-Founder",
        qualification: "BDS, MDS",
        description: "Orthodontist & Aligner Specialist providing full-time clinical support.",
        experience: "10+ Years Experience",
        badge: "Co-Founder",
        sortOrder: 1,
        isVisible: true,
        socialLinksJson: JSON.stringify([]),
      },
    ],
  });

  // 8. Create Services
  await prisma.service.createMany({
    data: [
      {
        title: "Clear Aligners",
        description: "Precision-molded invisible orthodontic trays engineered from high-retention polymer sheets for maximum tooth alignment.",
        icon: "Layers",
        seoUrl: "clear-aligners",
        sortOrder: 0,
        isVisible: true,
      },
      {
        title: "Digital Smile Design",
        description: "Aesthetic simulation software showing post-treatment orthodontic models, assisting doctor approvals and patient consultations.",
        icon: "Activity",
        seoUrl: "digital-smile-design",
        sortOrder: 1,
        isVisible: true,
      },
      {
        title: "Orthodontic Planning",
        description: "Interactive 3D dental biomechanics setups (arch expansion, rotators, attachments) designed by certified specialists.",
        icon: "Users",
        seoUrl: "orthodontic-planning",
        sortOrder: 2,
        isVisible: true,
      },
      {
        title: "Treatment Support",
        description: "Continuous support team available 24/7 to solve mid-treatment adjustments, refinements, or physical silicon impression scans.",
        icon: "ShieldCheck",
        seoUrl: "treatment-support",
        sortOrder: 3,
        isVisible: true,
      },
      {
        title: "Aligner Manufacturing",
        description: "State-of-the-art laboratory lines crafting high-fidelity biocompatible trays with laser trim cuts for maximum patient comfort.",
        icon: "Layers",
        seoUrl: "aligner-manufacturing",
        sortOrder: 4,
        isVisible: true,
      },
      {
        title: "Clinical Consultation",
        description: "Professional digital scan evaluation and treatment planning tips to help physicians provide the best orthodontic options.",
        icon: "MessageSquare",
        seoUrl: "clinical-consultation",
        sortOrder: 5,
        isVisible: true,
      },
    ],
  });

  // 9. Create Why Choose Us
  await prisma.whyChooseUs.createMany({
    data: [
      { title: "24/7 Working Lab", description: "Full round-the-clock operations to guarantee minimal wait times and emergency support.", icon: "Clock", sortOrder: 0, isVisible: true },
      { title: "Full-Time Orthodontists", description: "Licensed in-house orthodontic specialists review and approve every treatment plan.", icon: "Users", sortOrder: 1, isVisible: true },
      { title: "Premium Clear Aligners", description: "Manufactured using high-elasticity medical polymer sheets for maximum tooth control.", icon: "ShieldCheck", sortOrder: 2, isVisible: true },
      { title: "Digital Workflow", description: "Fully digital case uploads, online simulation approvals, and real-time tracking systems.", icon: "Zap", sortOrder: 3, isVisible: true },
      { title: "Advanced CAD/CAM", description: "Sub-micron 3D scanning and state-of-the-art aligner laser printing machines.", icon: "Layers", sortOrder: 4, isVisible: true },
      { title: "Certified Materials", description: "Constructed solely using FDA-cleared, biocompatible medical-grade thermoplastic materials.", icon: "Award", sortOrder: 5, isVisible: true },
      { title: "Fast Delivery", description: "Fast national shipping networks delivering manufactured kits directly to your clinic.", icon: "TrendingUp", sortOrder: 6, isVisible: true },
      { title: "High Precision", description: "Micron-level tolerances for orthodontic attachments, ensuring precise treatment forces.", icon: "Activity", sortOrder: 7, isVisible: true },
    ],
  });

  // 10. Create Testimonials
  await prisma.testimonial.createMany({
    data: [
      { name: "Dr. Rajesh Sharma", role: "Orthodontist, Mumbai", quote: "Linealign has transformed how I run my aligner practice. The treatment simulation within 24 hours is incredibly accurate, and patients love seeing the 3D visual step-by-step progress.", avatar: "RS", rating: 5.0, sortOrder: 0, isVisible: true },
      { name: "Dr. Ananya Goel", role: "Cosmetic Dentist, Bangalore", quote: "The marketing support demo kits and in-office videos have doubled my patient conversions. Linealign clear aligners are highly precise and pricing is very competitive.", avatar: "AG", rating: 5.0, sortOrder: 1, isVisible: true },
      { name: "Dr. Vikram Seth", role: "Clinic Director, Vadodara", quote: "Emergency support and the tracking app make after-care extremely simple. Highly recommended aligner partner with unmatched support.", avatar: "VS", rating: 5.0, sortOrder: 2, isVisible: true },
    ],
  });

  // 11. Create FAQs
  await prisma.fAQ.createMany({
    data: [
      { question: "How do I submit patient scans to Linealign?", answer: "You can send us your patient's intraoral scans (STL files) or physical silicone impressions via WhatsApp (82817 78202) or email (linealign23@gmail.com). We accept scans from all major scanner brands.", category: "Support", sortOrder: 0, isVisible: true },
      { question: "How fast will I receive the treatment planning estimation?", answer: "You will receive a basic estimate of treatment cost, duration, and alignment method within 10 minutes. A full, interactive 3D treatment simulation will be sent to you for review within 24 hours.", category: "Timeline", sortOrder: 1, isVisible: true },
      { question: "Are there aligner carrying cases and demo kits provided?", answer: "Yes, every treatment plan includes a premium Linealign Aligner carrying box, retainers, splints, and demo kits to show the patient. We also provide clinic marketing kits.", category: "Materials", sortOrder: 2, isVisible: true },
      { question: "What is your policy on treatment refinements or re-submission?", answer: "We offer Free Re-submission. If a case requires refinements during the treatment duration, we will simulate and manufacture the refinement aligner trays at no extra cost.", category: "Policy", sortOrder: 3, isVisible: true },
    ],
  });

  // 12. Create Pricing Plans
  await prisma.pricingPlan.createMany({
    data: [
      {
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
        sortOrder: 0,
        isVisible: true,
      },
      {
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
        sortOrder: 1,
        isVisible: true,
      },
      {
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
        sortOrder: 2,
        isVisible: true,
      },
    ],
  });

  // 13. Create Page Builder Sections
  await prisma.pageSection.createMany({
    data: [
      { sectionName: "Hero", isVisible: true, sortOrder: 0 },
      { sectionName: "AlignerShowcase", isVisible: true, sortOrder: 1 },
      { sectionName: "Founder", isVisible: true, sortOrder: 2 },
      { sectionName: "About", isVisible: true, sortOrder: 3 },
      { sectionName: "WhyChooseUs", isVisible: true, sortOrder: 4 },
      { sectionName: "Services", isVisible: true, sortOrder: 5 },
      { sectionName: "Testimonials", isVisible: true, sortOrder: 6 },
    ],
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
