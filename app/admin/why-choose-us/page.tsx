"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, Plus, Edit2, Trash2, Check, X, Eye, EyeOff, Save } from "lucide-react";
import { getWhyChooseUs, saveWhyChooseUs, deleteWhyChooseUs } from "@/app/actions/cms-actions";

interface WhyChooseUsItem {
  id?: string;
  title: string;
  description: string;
  icon: string;
  sortOrder: number;
  isVisible: boolean;
}

export default function WhyChooseUsAdmin() {
  const [items, setItems] = useState<WhyChooseUsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<WhyChooseUsItem | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchItems = async () => {
    try {
      const data = await getWhyChooseUs();
      setItems(data);
    } catch (err) {
      console.error("Failed to load why-choose-us items:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleEdit = (item: WhyChooseUsItem) => {
    setEditingItem(item);
  };

  const handleAddNew = () => {
    setEditingItem({
      title: "",
      description: "",
      icon: "ShieldCheck",
      sortOrder: items.length,
      isVisible: true,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      await deleteWhyChooseUs(id);
      setItems(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error("Failed to delete item:", err);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    if (!editingItem.title || !editingItem.description) {
      alert("Title and description are required.");
      return;
    }

    setSaving(true);
    try {
      await saveWhyChooseUs(editingItem);
      setEditingItem(null);
      await fetchItems();
    } catch (err) {
      console.error("Failed to save item:", err);
      alert("Error saving item.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-48 bg-slate-800 animate-pulse rounded-lg" />
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
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
            <ShieldCheck className="w-8 h-8 text-primary" />
            Manage Why Choose Us
          </h1>
          <p className="text-slate-400 text-sm">
            Configure advantage cards, clinical certifications, and specific quality metrics.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-primary to-secondary hover:brightness-105 shadow-md shadow-primary/10 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Advantage Card
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Items List Panel */}
        <div className="lg:col-span-7 bg-slate-900 border border-white/5 p-6 sm:p-8 rounded-[2rem] shadow-sm space-y-4">
          <h3 className="text-base font-bold text-white font-poppins border-b border-white/5 pb-4">
            Advantages List
          </h3>

          {items.length === 0 ? (
            <p className="text-slate-500 text-xs text-center py-8">No advantages configured yet.</p>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-slate-950/40 border border-white/5 rounded-2xl hover:border-slate-800 hover:bg-slate-950/60 transition-all"
                >
                  <div>
                    <h4 className="font-bold text-white text-sm sm:text-base font-poppins">{item.title}</h4>
                    <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mt-1.5 flex items-center gap-2">
                      <span>Icon: {item.icon}</span>
                      <span>•</span>
                      <span>Order: {item.sortOrder}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        {item.isVisible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        {item.isVisible ? "Visible" : "Hidden"}
                      </span>
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                      title="Edit Item"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id!)}
                      className="p-2.5 rounded-xl bg-slate-900 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                      title="Delete Item"
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
        {editingItem && (
          <div className="lg:col-span-5 bg-slate-900 border border-white/5 p-6 sm:p-8 rounded-[2rem] shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <h3 className="text-base font-bold text-white font-poppins">
                {editingItem.id ? "Edit Card" : "Add Card"}
              </h3>
              <button onClick={() => setEditingItem(null)} className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Card Title</label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary"
                  placeholder="e.g. 24/7 Working Lab"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Lucide Icon Name</label>
                <select
                  value={editingItem.icon}
                  onChange={(e) => setEditingItem({ ...editingItem, icon: e.target.value })}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary"
                >
                  <option value="Clock" className="bg-slate-900">Clock (Hours)</option>
                  <option value="Users" className="bg-slate-900">Users (Staff)</option>
                  <option value="ShieldCheck" className="bg-slate-900">ShieldCheck (Premium)</option>
                  <option value="Zap" className="bg-slate-900">Zap (Speed)</option>
                  <option value="Layers" className="bg-slate-900">Layers (Advanced)</option>
                  <option value="Award" className="bg-slate-900">Award (Certified)</option>
                  <option value="TrendingUp" className="bg-slate-900">TrendingUp (Delivery)</option>
                  <option value="Activity" className="bg-slate-900">Activity (Precision)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Card Description</label>
                <textarea
                  rows={4}
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary resize-none"
                  placeholder="Card body text..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Sort Order</label>
                  <input
                    type="number"
                    value={editingItem.sortOrder}
                    onChange={(e) => setEditingItem({ ...editingItem, sortOrder: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Visibility</label>
                  <select
                    value={editingItem.isVisible ? "true" : "false"}
                    onChange={(e) => setEditingItem({ ...editingItem, isVisible: e.target.value === "true" })}
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
                      <Save className="w-4 h-4" /> Save Advantage
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
