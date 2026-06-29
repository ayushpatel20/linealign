import {
  getSiteSettings,
  getHeroConfig,
  getAboutConfig,
  getFounders,
  getServices,
  getWhyChooseUs,
  getTestimonials,
  getFAQs,
  getPageSections
} from "@/app/actions/cms-actions";
import HomeClient from "@/components/HomeClient";
import type { Metadata } from "next";

// Force dynamic execution to guarantee DB updates reflect instantly without rebuild
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: settings.metaTitle || "LINEALIGN DENTAL LAB | Premium Clear Aligners",
    description: settings.metaDescription || "Premium clear aligner dental laboratory delivering world-class orthodontic solutions.",
    keywords: settings.metaKeywords || "orthodontic aligners, clear aligners, invisible braces, teeth alignment, Kasaragod, Kerala",
  };
}

export default async function HomePage() {
  const [
    settings,
    hero,
    about,
    founders,
    services,
    whyChooseUs,
    testimonials,
    faqs,
    sections
  ] = await Promise.all([
    getSiteSettings(),
    getHeroConfig(),
    getAboutConfig(),
    getFounders(),
    getServices(),
    getWhyChooseUs(),
    getTestimonials(),
    getFAQs(),
    getPageSections(),
  ]);

  return (
    <HomeClient
      settings={settings}
      hero={hero}
      about={about}
      founders={founders}
      services={services}
      whyChooseUs={whyChooseUs}
      testimonials={testimonials}
      faqs={faqs}
      sections={sections}
    />
  );
}
