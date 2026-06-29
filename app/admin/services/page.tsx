"use client";

import { useEffect, useState } from "react";
import { Layers, Plus, Edit2, Trash2, Check, X, Eye, EyeOff, Save } from "lucide-react";
import { getServices, saveService, deleteService } from "@/app/actions/cms-actions";

interface ServiceItem {
  id?: string;
  title: string;
  description: string;
  icon: string;
  seoUrl: string;
  sortOrder: number;
  isVisible: boolean;
}

export default function ServicesAdmin() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchServices = async () => {
    try {
      const data = await getServices();
      setServices(data);
    } catch (err) {
      console.error("Failed to load services:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleEdit = (service: ServiceItem) => {
    setEditingService(service);
  };

  const handleAddNew = () => {
    setEditingService({
      title: "",
      description: "",
      icon: "Layers",
      seoUrl: "",
      sortOrder: services.length,
      isVisible: true,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      await deleteService(id);
      setServices(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      console.error("Failed to delete service:", err);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    if (!editingService.title || !editingService.seoUrl) {
      alert("Title and SEO URL slug are required.");
      return;
    }

    setSaving(true);
    try {
      await saveService(editingService);
      setEditingService(null);
      await fetchServices();
    } catch (err) {
      console.error("Failed to save service:", err);
      alert("Error saving service: Please check if SEO URL slug is unique.");
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
            <Layers className="w-8 h-8 text-primary" />
            Manage Services
          </h1>
          <p className="text-slate-400 text-sm">
            Add, update, reorder, or hide clinical services displayed on your website.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-primary to-secondary hover:brightness-105 shadow-md shadow-primary/10 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add New Service
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Services List Panel */}
        <div className="lg:col-span-7 bg-slate-900 border border-white/5 p-6 sm:p-8 rounded-[2rem] shadow-sm space-y-4">
          <h3 className="text-base font-bold text-white font-poppins border-b border-white/5 pb-4">
            Services List
          </h3>

          {services.length === 0 ? (
            <p className="text-slate-500 text-xs text-center py-8">No services configured yet.</p>
          ) : (
            <div className="space-y-3">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="flex items-center justify-between p-4 bg-slate-950/40 border border-white/5 rounded-2xl hover:border-slate-800 hover:bg-slate-950/60 transition-all"
                >
                  <div>
                    <h4 className="font-bold text-white text-sm sm:text-base font-poppins">{service.title}</h4>
                    <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mt-1 flex items-center gap-2">
                      <span>Slug: /{service.seoUrl}</span>
                      <span>•</span>
                      <span>Order: {service.sortOrder}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        {service.isVisible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        {service.isVisible ? "Visible" : "Hidden"}
                      </span>
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(service)}
                      className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                      title="Edit Service"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(service.id!)}
                      className="p-2.5 rounded-xl bg-slate-900 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                      title="Delete Service"
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
        {editingService && (
          <div className="lg:col-span-5 bg-slate-900 border border-white/5 p-6 sm:p-8 rounded-[2rem] shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <h3 className="text-base font-bold text-white font-poppins">
                {editingService.id ? "Edit Service" : "Add Service"}
              </h3>
              <button onClick={() => setEditingService(null)} className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Service Title</label>
                <input
                  type="text"
                  required
                  value={editingService.title}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary"
                  placeholder="e.g. Clear Aligners"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">SEO Slug (unique)</label>
                <input
                  type="text"
                  required
                  value={editingService.seoUrl}
                  onChange={(e) => setEditingService({ ...editingService, seoUrl: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary font-mono"
                  placeholder="e.g. clear-aligners"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Lucide Icon Name</label>
                <select
                  value={editingService.icon}
                  onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary"
                >
                  <option value="Layers" className="bg-slate-900">Layers (Standard)</option>
                  <option value="Activity" className="bg-slate-900">Activity (Smile/Digital)</option>
                  <option value="Users" className="bg-slate-900">Users (Planning)</option>
                  <option value="ShieldCheck" className="bg-slate-900">ShieldCheck (Certified)</option>
                  <option value="MessageSquare" className="bg-slate-900">MessageSquare (Consulting)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Description</label>
                <textarea
                  rows={4}
                  value={editingService.description}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary resize-none"
                  placeholder="Service summary copy..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Sort Order</label>
                  <input
                    type="number"
                    value={editingService.sortOrder}
                    onChange={(e) => setEditingService({ ...editingService, sortOrder: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Visibility</label>
                  <select
                    value={editingService.isVisible ? "true" : "false"}
                    onChange={(e) => setEditingService({ ...editingService, isVisible: e.target.value === "true" })}
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
                      <Save className="w-4 h-4" /> Save Service
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
