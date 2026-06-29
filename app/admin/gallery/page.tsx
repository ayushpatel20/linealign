"use client";

import { useEffect, useState } from "react";
import { Image as ImageIcon, Plus, Edit2, Trash2, Check, X, Eye, EyeOff, Save, Link as LinkIcon } from "lucide-react";
import Image from "next/image";
import { getGalleryItems, saveGalleryItem, deleteGalleryItem } from "@/app/actions/cms-actions";

interface GalleryItem {
  id?: string;
  title: string;
  url: string;
  type: string; // IMAGE, VIDEO, PDF
  category: string; // Certificates, Lab, Doctors
  sortOrder: number;
  isVisible: boolean;
}

export default function GalleryAdmin() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchItems = async () => {
    try {
      const data = await getGalleryItems();
      setItems(data);
    } catch (err) {
      console.error("Failed to load gallery items:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
  };

  const handleAddNew = () => {
    setEditingItem({
      title: "",
      url: "",
      type: "IMAGE",
      category: "Certificates",
      sortOrder: items.length,
      isVisible: true,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this gallery item?")) return;
    try {
      await deleteGalleryItem(id);
      setItems(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error("Failed to delete item:", err);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    if (!editingItem.title || !editingItem.url) {
      alert("Title and URL are required.");
      return;
    }

    setSaving(true);
    try {
      await saveGalleryItem(editingItem);
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-40 bg-slate-800/50 animate-pulse rounded-3xl" />
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
            <ImageIcon className="w-8 h-8 text-primary" />
            Manage Gallery & Certificates
          </h1>
          <p className="text-slate-400 text-sm">
            Control sitemap certificates, lab facility photos, and doctor testimonials files.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-primary to-secondary hover:brightness-105 shadow-md shadow-primary/10 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Gallery Asset
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Items List Panel */}
        <div className="lg:col-span-7 bg-slate-900 border border-white/5 p-6 sm:p-8 rounded-[2rem] shadow-sm space-y-4">
          <h3 className="text-base font-bold text-white font-poppins border-b border-white/5 pb-4">
            Gallery Asset Registry
          </h3>

          {items.length === 0 ? (
            <p className="text-slate-500 text-xs text-center py-8">No gallery items configured yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col justify-between p-4 bg-slate-950/40 border border-white/5 rounded-2xl hover:border-slate-800 transition-all"
                >
                  <div className="relative aspect-video w-full bg-slate-950 rounded-xl overflow-hidden mb-3 border border-white/5 flex items-center justify-center">
                    {item.type === "IMAGE" && item.url ? (
                      <Image src={item.url} alt={item.title} fill className="object-contain p-1" />
                    ) : (
                      <div className="text-center">
                        <span className="text-xl">📄</span>
                        <span className="text-[10px] block text-slate-500 font-bold uppercase mt-1">{item.type}</span>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-white text-xs truncate font-poppins" title={item.title}>
                      {item.title}
                    </h4>
                    <p className="text-slate-500 text-[9px] uppercase font-bold tracking-wider mt-1.5 flex justify-between">
                      <span>Category: {item.category}</span>
                      <span>Order: {item.sortOrder}</span>
                    </p>
                  </div>

                  <div className="flex gap-2 mt-4 border-t border-white/5 pt-3 justify-end">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2 rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white cursor-pointer"
                      title="Edit Item"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id!)}
                      className="p-2 rounded-lg bg-slate-900 hover:bg-red-500/20 text-slate-400 hover:text-red-400 cursor-pointer"
                      title="Delete Item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
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
                {editingItem.id ? "Edit Asset" : "Add Asset"}
              </h3>
              <button onClick={() => setEditingItem(null)} className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Asset Title</label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary"
                  placeholder="e.g. ISO 13485 Quality Certificate"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Asset Type</label>
                <select
                  value={editingItem.type}
                  onChange={(e) => setEditingItem({ ...editingItem, type: e.target.value })}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary"
                >
                  <option value="IMAGE" className="bg-slate-900">Image Asset</option>
                  <option value="VIDEO" className="bg-slate-900">Video Asset</option>
                  <option value="PDF" className="bg-slate-900">PDF Document</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Category Group</label>
                <select
                  value={editingItem.category}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary"
                >
                  <option value="Certificates" className="bg-slate-900">Certificates & Licenses</option>
                  <option value="Lab" className="bg-slate-900">Lab Facility Images</option>
                  <option value="Doctors" className="bg-slate-900">Doctor/Case Images</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Asset URL (jpeg/png/pdf/mp4)</label>
                <input
                  type="text"
                  required
                  value={editingItem.url}
                  onChange={(e) => setEditingItem({ ...editingItem, url: e.target.value })}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary font-mono"
                  placeholder="e.g. /uploads/iso_certificate.png"
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
                      <Save className="w-4 h-4" /> Save Asset
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
