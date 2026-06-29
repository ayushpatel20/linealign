import { getSiteSettings } from "@/app/actions/cms-actions";
import FAQContactClient from "@/components/FAQContactClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Contact & Practice Support | LINEALIGN DENTAL LAB",
  description: "Contact Kasaragod headquarters clear aligner laboratory, submit STL intraoral scans, or consult in-house orthodontic specialists.",
};

export default async function FAQPage() {
  const settings = await getSiteSettings();

  return <FAQContactClient settings={settings as any} />;
}
