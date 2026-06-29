import { getServices } from "@/app/actions/cms-actions";
import SolutionsClient from "@/components/SolutionsClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Clinical Solutions & Biomechanics | LINEALIGN DENTAL LAB",
  description: "Advanced clear aligner clinical engineering, intermaxillary elastics, arch expansions, and precision composite attachments.",
};

export default async function SolutionsPage() {
  const services = await getServices();
  
  // Filter visible ones
  const visibleServices = services.filter((s) => s.isVisible);

  return <SolutionsClient services={visibleServices as any} />;
}
