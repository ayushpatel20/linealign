"use client";

import { useEffect, useState } from "react";
import { Sliders, Eye, EyeOff, ArrowUp, ArrowDown, Check, Save } from "lucide-react";
import { motion } from "framer-motion";
import {
  getPageSections,
  updateSectionVisibility,
  updateSectionsOrder
} from "@/app/actions/cms-actions";

interface Section {
  id: string;
  sectionName: string;
  isVisible: boolean;
  sortOrder: number;
}

export default function PageBuilder() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function loadSections() {
      try {
        const data = await getPageSections();
        setSections(data);
      } catch (error) {
        console.error("Failed to load sections:", error);
      } finally {
        setLoading(false);
      }
    }
    loadSections();
  }, []);

  const handleToggleVisibility = async (id: string, currentVal: boolean) => {
    try {
      const newVal = !currentVal;
      // Optimistic update
      setSections(prev =>
        prev.map(s => (s.id === id ? { ...s, isVisible: newVal } : s))
      );
      await updateSectionVisibility(id, newVal);
    } catch (error) {
      console.error("Error updating visibility:", error);
      // Revert on error
      setSections(prev =>
        prev.map(s => (s.id === id ? { ...s, isVisible: currentVal } : s))
      );
    }
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newSections = [...sections];
    const temp = newSections[index];
    newSections[index] = newSections[index - 1];
    newSections[index - 1] = temp;
    setSections(newSections);
  };

  const moveDown = (index: number) => {
    if (index === sections.length - 1) return;
    const newSections = [...sections];
    const temp = newSections[index];
    newSections[index] = newSections[index + 1];
    newSections[index + 1] = temp;
    setSections(newSections);
  };

  const handleSaveOrder = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const updateData = sections.map((s, idx) => ({
        id: s.id,
        sortOrder: idx,
      }));
      await updateSectionsOrder(updateData);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error("Error saving layout order:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-48 bg-slate-800 animate-pulse rounded-lg" />
        <div className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-16 bg-slate-800/50 animate-pulse rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-white font-poppins tracking-tight flex items-center gap-2.5">
            <Sliders className="w-8 h-8 text-primary" />
            Page Sections Builder
          </h1>
          <p className="text-slate-400 text-sm">
            Control which sections are visible and drag/reorder their layouts on the homepage.
          </p>
        </div>

        <button
          onClick={handleSaveOrder}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-primary to-secondary hover:brightness-105 shadow-md shadow-primary/10 transition-all cursor-pointer disabled:opacity-50"
        >
          {saving ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : saved ? (
            <>
              <Check className="w-4 h-4" /> Layout Saved!
            </>
          ) : (
            <>
              <Save className="w-4 h-4" /> Save Layout Order
            </>
          )}
        </button>
      </div>

      {/* Sections List */}
      <div className="bg-slate-900 border border-white/5 rounded-[2.5rem] p-6 sm:p-8 shadow-sm space-y-4">
        {sections.map((section, idx) => (
          <div
            key={section.id}
            className="flex items-center justify-between p-4 sm:p-5 bg-slate-950/40 border border-white/5 rounded-2xl hover:border-slate-800 hover:bg-slate-950/60 transition-all"
          >
            <div className="flex items-center gap-4">
              <span className="text-slate-600 font-black text-sm">#{idx + 1}</span>
              <div>
                <h3 className="font-bold text-white font-poppins text-sm sm:text-base">
                  {section.sectionName.replace(/([A-Z])/g, " $1").trim()}
                </h3>
                <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mt-0.5">
                  Section ID: {section.sectionName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Up Button */}
              <button
                onClick={() => moveUp(idx)}
                disabled={idx === 0}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                title="Move Up"
              >
                <ArrowUp className="w-4 h-4" />
              </button>

              {/* Down Button */}
              <button
                onClick={() => moveDown(idx)}
                disabled={idx === sections.length - 1}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                title="Move Down"
              >
                <ArrowDown className="w-4 h-4" />
              </button>

              {/* Visibility Toggle Button */}
              <button
                onClick={() => handleToggleVisibility(section.id, section.isVisible)}
                className={`p-2.5 rounded-xl border transition-colors cursor-pointer ml-2 ${
                  section.isVisible
                    ? "bg-primary/10 border-primary/20 text-primary hover:bg-primary/25"
                    : "bg-slate-900 border-white/5 text-slate-500 hover:text-slate-300"
                }`}
                title={section.isVisible ? "Hide Section" : "Show Section"}
              >
                {section.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
