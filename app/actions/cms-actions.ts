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
  let hero = await prisma.heroConfig.findUnique({
    where: { id: "hero" },
  });
  if (!hero) {
    hero = await prisma.heroConfig.create({
      data: { id: "hero" },
    });
  }
  return hero;
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
  let about = await prisma.aboutConfig.findUnique({
    where: { id: "about" },
  });
  if (!about) {
    about = await prisma.aboutConfig.create({
      data: { id: "about" },
    });
  }
  return about;
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
  return await prisma.founder.findMany({
    orderBy: { sortOrder: "asc" },
  });
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
  return await prisma.service.findMany({
    orderBy: { sortOrder: "asc" },
  });
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
  return await prisma.whyChooseUs.findMany({
    orderBy: { sortOrder: "asc" },
  });
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
  return await prisma.testimonial.findMany({
    orderBy: { sortOrder: "asc" },
  });
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
  return await prisma.fAQ.findMany({
    orderBy: { sortOrder: "asc" },
  });
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
  return await prisma.pricingPlan.findMany({
    orderBy: { sortOrder: "asc" },
  });
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
  const sections = await prisma.pageSection.findMany({
    orderBy: { sortOrder: "asc" },
  });
  if (sections.length === 0) {
    // Seed default order
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
  }
  return sections;
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
