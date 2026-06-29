"use client";

import { useEffect, useState } from "react";
import { UserCheck, Plus, Edit2, Trash2, Check, X, Eye, EyeOff, Save } from "lucide-react";
import Image from "next/image";
import { getFounders, saveFounder, deleteFounder } from "@/app/actions/cms-actions";

interface FounderItem {
  id?: string;
  name: string;
  photo: string;
  designation: string;
  qualification: string;
  description: string;
  experience: string;
  badge: string;
  sortOrder: number;
  isVisible: boolean;
}

export default function FoundersAdmin() {
  const [founders, setFounders] = useState<FounderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingFounder, setEditingFounder] = useState<FounderItem | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchFounders = async () => {
    try {
      const data = await getFounders();
      setFounders(data);
    } catch (err) {
      console.error("Failed to load founders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFounders();
  }, []);

  const handleEdit = (founder: FounderItem) => {
    setEditingFounder(founder);
  };

  const handleAddNew = () => {
    setEditingFounder({
      name: "",
      photo: "/tilvin.jpg", // Default placeholder
      designation: "Founder",
      qualification: "BDS, MDS",
      description: "",
      experience: "10+ Years Experience",
      badge: "Founder",
      sortOrder: founders.length,
      isVisible: true,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this founder?")) return;
    try {
      await deleteFounder(id);
      setFounders(prev => prev.filter(f => f.id !== id));
    } catch (err) {
      console.error("Failed to delete founder:", err);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFounder) return;

    if (!editingFounder.name || !editingFounder.designation) {
      alert("Name and designation are required.");
      return;
    }

    setSaving(true);
    try {
      await saveFounder(editingFounder);
      setEditingFounder(null);
      await fetchFounders();
    } catch (err) {
      console.error("Failed to save founder:", err);
      alert("Error saving founder details.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-48 bg-slate-800 animate-pulse rounded-lg" />
        <div className="space-y-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-24 bg-slate-800/50 animate-pulse rounded-2xl" />
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
            <UserCheck className="w-8 h-8 text-primary" />
            Manage Founders & Leadership
          </h1>
          <p className="text-slate-400 text-sm">
            Configure clinical specialists, credentials, designations, and display visibility.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-primary to-secondary hover:brightness-105 shadow-md shadow-primary/10 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Leadership Member
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Founders List Panel */}
        <div className="lg:col-span-7 bg-slate-900 border border-white/5 p-6 sm:p-8 rounded-[2rem] shadow-sm space-y-4">
          <h3 className="text-base font-bold text-white font-poppins border-b border-white/5 pb-4">
            Specialists List
          </h3>

          {founders.length === 0 ? (
            <p className="text-slate-500 text-xs text-center py-8">No founders configured yet.</p>
          ) : (
            <div className="space-y-4">
              {founders.map((founder) => (
                <div
                  key={founder.id}
                  className="flex items-center justify-between p-4 bg-slate-950/40 border border-white/5 rounded-2xl hover:border-slate-800 hover:bg-slate-950/60 transition-all gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-800 border border-white/10 flex-shrink-0">
                      {founder.photo && (
                        <Image src={founder.photo} alt={founder.name} fill className="object-cover" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm sm:text-base font-poppins">{founder.name}</h4>
                      <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mt-1 flex flex-wrap gap-2">
                        <span>{founder.designation} ({founder.qualification})</span>
                        <span>•</span>
                        <span>Order: {founder.sortOrder}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          {founder.isVisible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                          {founder.isVisible ? "Visible" : "Hidden"}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(founder)}
                      className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                      title="Edit Member"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(founder.id!)}
                      className="p-2.5 rounded-xl bg-slate-900 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                      title="Delete Member"
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
        {editingFounder && (
          <div className="lg:col-span-5 bg-slate-900 border border-white/5 p-6 sm:p-8 rounded-[2rem] shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <h3 className="text-base font-bold text-white font-poppins">
                {editingFounder.id ? "Edit Specialist" : "Add Specialist"}
              </h3>
              <button onClick={() => setEditingFounder(null)} className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={editingFounder.name}
                  onChange={(e) => setEditingFounder({ ...editingFounder, name: e.target.value })}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary"
                  placeholder="e.g. Dr. TILVIN V TOM"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Qualifications</label>
                <input
                  type="text"
                  required
                  value={editingFounder.qualification}
                  onChange={(e) => setEditingFounder({ ...editingFounder, qualification: e.target.value })}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary"
                  placeholder="e.g. BDS, MDS"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Designation</label>
                <input
                  type="text"
                  required
                  value={editingFounder.designation}
                  onChange={(e) => setEditingFounder({ ...editingFounder, designation: e.target.value })}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary"
                  placeholder="e.g. Founder"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Badge Text</label>
                <input
                  type="text"
                  value={editingFounder.badge}
                  onChange={(e) => setEditingFounder({ ...editingFounder, badge: e.target.value })}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary"
                  placeholder="e.g. Founder"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Photo URL (Upload in Media first)</label>
                <input
                  type="text"
                  value={editingFounder.photo}
                  onChange={(e) => setEditingFounder({ ...editingFounder, photo: e.target.value })}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary font-mono"
                  placeholder="e.g. /tilvin.jpg"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Experience Tag</label>
                <input
                  type="text"
                  value={editingFounder.experience}
                  onChange={(e) => setEditingFounder({ ...editingFounder, experience: e.target.value })}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary"
                  placeholder="e.g. 10+ Years Experience"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Specialist Biography</label>
                <textarea
                  rows={3}
                  value={editingFounder.description}
                  onChange={(e) => setEditingFounder({ ...editingFounder, description: e.target.value })}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary resize-none"
                  placeholder="Short specialist details..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Sort Order</label>
                  <input
                    type="number"
                    value={editingFounder.sortOrder}
                    onChange={(e) => setEditingFounder({ ...editingFounder, sortOrder: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Visibility</label>
                  <select
                    value={editingFounder.isVisible ? "true" : "false"}
                    onChange={(e) => setEditingFounder({ ...editingFounder, isVisible: e.target.value === "true" })}
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
                      <Save className="w-4 h-4" /> Save Specialist
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
