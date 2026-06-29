"use client";

import { useEffect, useState } from "react";
import { CreditCard, Plus, Edit2, Trash2, Check, X, Eye, EyeOff, Save } from "lucide-react";
import { getPricingPlans, savePricingPlan, deletePricingPlan } from "@/app/actions/cms-actions";

interface PlanItem {
  id?: string;
  name: string;
  description: string;
  priceUsd: string;
  priceInr: string;
  details: string;
  featuresJson: string; // JSON Array of strings
  popular: boolean;
  discount: string;
  sortOrder: number;
  isVisible: boolean;
}

export default function PricingPlansAdmin() {
  const [plans, setPlans] = useState<PlanItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPlan, setEditingPlan] = useState<PlanItem | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchPlans = async () => {
    try {
      const data = await getPricingPlans();
      setPlans(data);
    } catch (err) {
      console.error("Failed to load plans:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleEdit = (plan: PlanItem) => {
    setEditingPlan(plan);
  };

  const handleAddNew = () => {
    setEditingPlan({
      name: "",
      description: "",
      priceUsd: "0",
      priceInr: "0",
      details: "",
      featuresJson: "[\"Retainers included\", \"Splints included\"]",
      popular: false,
      discount: "",
      sortOrder: plans.length,
      isVisible: true,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this pricing plan?")) return;
    try {
      await deletePricingPlan(id);
      setPlans(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error("Failed to delete pricing plan:", err);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlan) return;

    if (!editingPlan.name || !editingPlan.priceUsd) {
      alert("Plan name and USD price are required.");
      return;
    }

    setSaving(true);
    try {
      await savePricingPlan(editingPlan);
      setEditingPlan(null);
      await fetchPlans();
    } catch (err) {
      console.error("Failed to save plan:", err);
      alert("Error saving pricing plan.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-48 bg-slate-800 animate-pulse rounded-lg" />
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 bg-slate-800/50 animate-pulse rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-white font-poppins tracking-tight flex items-center gap-2.5">
            <CreditCard className="w-8 h-8 text-primary" />
            Manage Pricing Plans
          </h1>
          <p className="text-slate-400 text-sm">
            Configure clear aligner tiers, pricing (USD/INR), features lists, and popular choices.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-primary to-secondary hover:brightness-105 shadow-md shadow-primary/10 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add New Plan
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Plans List Panel */}
        <div className="lg:col-span-7 bg-slate-900 border border-white/5 p-6 sm:p-8 rounded-[2rem] shadow-sm space-y-4">
          <h3 className="text-base font-bold text-white font-poppins border-b border-white/5 pb-4">
            Plans List
          </h3>

          {plans.length === 0 ? (
            <p className="text-slate-500 text-xs text-center py-8">No plans configured yet.</p>
          ) : (
            <div className="space-y-3">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className="flex items-center justify-between p-4 bg-slate-950/40 border border-white/5 rounded-2xl hover:border-slate-800 hover:bg-slate-950/60 transition-all"
                >
                  <div>
                    <h4 className="font-bold text-white text-sm sm:text-base font-poppins flex items-center gap-2">
                      {plan.name}
                      {plan.popular && (
                        <span className="text-[9px] bg-primary/20 text-primary font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                          Popular
                        </span>
                      )}
                    </h4>
                    <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mt-1.5 flex flex-wrap gap-2">
                      <span>USD: ${plan.priceUsd}</span>
                      <span>•</span>
                      <span>INR: ₹{plan.priceInr}</span>
                      <span>•</span>
                      <span>Order: {plan.sortOrder}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        {plan.isVisible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        {plan.isVisible ? "Visible" : "Hidden"}
                      </span>
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(plan)}
                      className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                      title="Edit Plan"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(plan.id!)}
                      className="p-2.5 rounded-xl bg-slate-900 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                      title="Delete Plan"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Editor Side Panel */}
        {editingPlan && (
          <div className="lg:col-span-5 bg-slate-900 border border-white/5 p-6 sm:p-8 rounded-[2rem] shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <h3 className="text-base font-bold text-white font-poppins">
                {editingPlan.id ? "Edit Plan" : "Add Plan"}
              </h3>
              <button onClick={() => setEditingPlan(null)} className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Plan Name</label>
                <input
                  type="text"
                  required
                  value={editingPlan.name}
                  onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary"
                  placeholder="e.g. Simple Case"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Price USD ($)</label>
                  <input
                    type="text"
                    required
                    value={editingPlan.priceUsd}
                    onChange={(e) => setEditingPlan({ ...editingPlan, priceUsd: e.target.value })}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Price INR (₹)</label>
                  <input
                    type="text"
                    required
                    value={editingPlan.priceInr}
                    onChange={(e) => setEditingPlan({ ...editingPlan, priceInr: e.target.value })}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Plan Description Summary</label>
                <input
                  type="text"
                  value={editingPlan.description}
                  onChange={(e) => setEditingPlan({ ...editingPlan, description: e.target.value })}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary"
                  placeholder="Summary text..."
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Tray details text</label>
                <input
                  type="text"
                  value={editingPlan.details}
                  onChange={(e) => setEditingPlan({ ...editingPlan, details: e.target.value })}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary"
                  placeholder="e.g. Less than 15 Tray sets"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Popular Case (displays badge)</label>
                <select
                  value={editingPlan.popular ? "true" : "false"}
                  onChange={(e) => setEditingPlan({ ...editingPlan, popular: e.target.value === "true" })}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary"
                >
                  <option value="false" className="bg-slate-900">Standard Plan</option>
                  <option value="true" className="bg-slate-900">Highlight as Popular</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Plan Features JSON Array</label>
                <textarea
                  rows={4}
                  value={editingPlan.featuresJson}
                  onChange={(e) => setEditingPlan({ ...editingPlan, featuresJson: e.target.value })}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-xs text-white focus:outline-none focus:border-primary font-mono"
                />
                <p className="text-[10px] text-slate-500 mt-2 font-semibold">
                  Must be a valid JSON array of feature text strings.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Sort Order</label>
                  <input
                    type="number"
                    value={editingPlan.sortOrder}
                    onChange={(e) => setEditingPlan({ ...editingPlan, sortOrder: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Visibility</label>
                  <select
                    value={editingPlan.isVisible ? "true" : "false"}
                    onChange={(e) => setEditingPlan({ ...editingPlan, isVisible: e.target.value === "true" })}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary"
                  >
                    <option value="true" className="bg-slate-900">Visible</option>
                    <option value="false" className="bg-slate-900">Hidden</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-primary to-secondary hover:brightness-105 shadow-md shadow-primary/10 transition-all cursor-pointer"
                >
                  {saving ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Save className="w-4 h-4" /> Save Pricing Plan
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
