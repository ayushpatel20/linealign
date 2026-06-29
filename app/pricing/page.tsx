import { getPricingPlans } from "@/app/actions/cms-actions";
import PricingClient from "@/components/PricingClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Fair & Transparent Pricing Plans | LINEALIGN DENTAL LAB",
  description: "Flexible, simple clear aligner pricing tiers in USD and INR for cosmetic dentists, clinics, and orthodontists.",
};

export default async function PricingPage() {
  const plans = await getPricingPlans();

  // Filter visible ones
  const visiblePlans = plans.filter((p) => p.isVisible);

  return <PricingClient plans={visiblePlans as any} />;
}
