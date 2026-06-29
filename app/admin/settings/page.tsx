"use client";

import { useEffect, useState } from "react";
import { Settings, Save, Check, ShieldCheck, Mail, Phone, MapPin, Globe, Compass } from "lucide-react";
import { motion } from "framer-motion";
import {
  getSiteSettings,
  updateSiteSettings,
  getNavbarConfig,
  updateNavbarConfig
} from "@/app/actions/cms-actions";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"site" | "contact" | "navbar">("site");
  const [siteForm, setSiteForm] = useState({
    websiteName: "",
    logo: "",
    favicon: "",
    themePrimary: "",
    themeSecondary: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
  });

  const [contactForm, setContactForm] = useState({
    whatsappNumber: "",
    contactPhone: "",
    contactEmail: "",
    officeAddress: "",
    workingHours: "",
    googleMapsLink: "",
  });

  const [navbarForm, setNavbarForm] = useState({
    sticky: true,
    logoSize: 84,
    menuItemsJson: "[]",
    ctaText: "",
    ctaUrl: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [settings, navbar] = await Promise.all([
          getSiteSettings(),
          getNavbarConfig(),
        ]);

        setSiteForm({
          websiteName: settings.websiteName,
          logo: settings.logo,
          favicon: settings.favicon,
          themePrimary: settings.themePrimary,
          themeSecondary: settings.themeSecondary,
          metaTitle: settings.metaTitle,
          metaDescription: settings.metaDescription,
          metaKeywords: settings.metaKeywords,
        });

        setContactForm({
          whatsappNumber: settings.whatsappNumber,
          contactPhone: settings.contactPhone,
          contactEmail: settings.contactEmail,
          officeAddress: settings.officeAddress,
          workingHours: settings.workingHours,
          googleMapsLink: settings.googleMapsLink,
        });

        setNavbarForm({
          sticky: navbar.sticky,
          logoSize: navbar.logoSize,
          menuItemsJson: navbar.menuItemsJson,
          ctaText: navbar.ctaText,
          ctaUrl: navbar.ctaUrl,
        });
      } catch (error) {
        console.error("Failed to load settings:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    try {
      if (activeTab === "site") {
        await updateSiteSettings(siteForm);
      } else if (activeTab === "contact") {
        await updateSiteSettings(contactForm);
      } else if (activeTab === "navbar") {
        await updateNavbarConfig(navbarForm);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error("Error saving settings:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-48 bg-slate-800 animate-pulse rounded-lg" />
        <div className="h-[400px] bg-slate-800/50 animate-pulse rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-white font-poppins tracking-tight flex items-center gap-2.5">
            <Settings className="w-8 h-8 text-primary" />
            General Site Settings
          </h1>
          <p className="text-slate-400 text-sm">
            Manage your logos, color schemes, contacts, navigation links, and SEO tags.
          </p>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex border-b border-white/5 select-none gap-4">
        {[
          { id: "site", label: "Site Details & Theme" },
          { id: "contact", label: "Contact Information" },
          { id: "navbar", label: "Navbar & Routing" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 font-bold text-sm transition-all border-b-2 px-2 cursor-pointer ${
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-slate-500 hover:text-slate-350"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSave} className="bg-slate-900 border border-white/5 p-8 rounded-[2.5rem] shadow-sm space-y-6">
        
        {/* Site Details Tab */}
        {activeTab === "site" && (
          <div className="space-y-5">
            <h3 className="text-base font-bold text-white font-poppins mb-4">Website Logo & Branding</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Website Name</label>
                <input
                  type="text"
                  value={siteForm.websiteName}
                  onChange={(e) => setSiteForm({ ...siteForm, websiteName: e.target.value })}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Logo URL (jpeg/png/svg)</label>
                <input
                  type="text"
                  value={siteForm.logo}
                  onChange={(e) => setSiteForm({ ...siteForm, logo: e.target.value })}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Primary Color Hex</label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={siteForm.themePrimary}
                    onChange={(e) => setSiteForm({ ...siteForm, themePrimary: e.target.value })}
                    className="w-12 h-12 bg-slate-950/50 border border-white/10 rounded-xl p-1 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={siteForm.themePrimary}
                    onChange={(e) => setSiteForm({ ...siteForm, themePrimary: e.target.value })}
                    className="flex-1 bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Secondary Color Hex</label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={siteForm.themeSecondary}
                    onChange={(e) => setSiteForm({ ...siteForm, themeSecondary: e.target.value })}
                    className="w-12 h-12 bg-slate-950/50 border border-white/10 rounded-xl p-1 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={siteForm.themeSecondary}
                    onChange={(e) => setSiteForm({ ...siteForm, themeSecondary: e.target.value })}
                    className="flex-1 bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            <h3 className="text-base font-bold text-white font-poppins pt-6 mb-4">Default SEO Meta Tags</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Meta Title</label>
                <input
                  type="text"
                  value={siteForm.metaTitle}
                  onChange={(e) => setSiteForm({ ...siteForm, metaTitle: e.target.value })}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Meta Description</label>
                <textarea
                  rows={3}
                  value={siteForm.metaDescription}
                  onChange={(e) => setSiteForm({ ...siteForm, metaDescription: e.target.value })}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary resize-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Meta Keywords (comma-separated)</label>
                <input
                  type="text"
                  value={siteForm.metaKeywords}
                  onChange={(e) => setSiteForm({ ...siteForm, metaKeywords: e.target.value })}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>
        )}

        {/* Contact Info Tab */}
        {activeTab === "contact" && (
          <div className="space-y-5">
            <h3 className="text-base font-bold text-white font-poppins mb-4">Practice Contact Details</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">WhatsApp Number (e.g. 918281778202)</label>
                <input
                  type="text"
                  value={contactForm.whatsappNumber}
                  onChange={(e) => setContactForm({ ...contactForm, whatsappNumber: e.target.value })}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Support Phone Number</label>
                <input
                  type="text"
                  value={contactForm.contactPhone}
                  onChange={(e) => setContactForm({ ...contactForm, contactPhone: e.target.value })}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Support Email Address</label>
                <input
                  type="email"
                  value={contactForm.contactEmail}
                  onChange={(e) => setContactForm({ ...contactForm, contactEmail: e.target.value })}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Working Hours Notice</label>
                <input
                  type="text"
                  value={contactForm.workingHours}
                  onChange={(e) => setContactForm({ ...contactForm, workingHours: e.target.value })}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Laboratory Address</label>
              <textarea
                rows={2}
                value={contactForm.officeAddress}
                onChange={(e) => setContactForm({ ...contactForm, officeAddress: e.target.value })}
                className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary resize-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Google Maps Embed URL</label>
              <input
                type="text"
                value={contactForm.googleMapsLink}
                onChange={(e) => setContactForm({ ...contactForm, googleMapsLink: e.target.value })}
                className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        )}

        {/* Navbar Config Tab */}
        {activeTab === "navbar" && (
          <div className="space-y-5">
            <h3 className="text-base font-bold text-white font-poppins mb-4">Header Navigation Config</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Logo Height (px)</label>
                <input
                  type="number"
                  value={navbarForm.logoSize}
                  onChange={(e) => setNavbarForm({ ...navbarForm, logoSize: parseInt(e.target.value) || 84 })}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Sticky Navbar Header</label>
                <select
                  value={navbarForm.sticky ? "true" : "false"}
                  onChange={(e) => setNavbarForm({ ...navbarForm, sticky: e.target.value === "true" })}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary"
                >
                  <option value="true" className="bg-slate-900">Enabled</option>
                  <option value="false" className="bg-slate-900">Disabled (scrolls off screen)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">CTA Button Text</label>
                <input
                  type="text"
                  value={navbarForm.ctaText}
                  onChange={(e) => setNavbarForm({ ...navbarForm, ctaText: e.target.value })}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">CTA Button Destination URL</label>
                <input
                  type="text"
                  value={navbarForm.ctaUrl}
                  onChange={(e) => setNavbarForm({ ...navbarForm, ctaUrl: e.target.value })}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Navbar Links JSON Configuration</label>
              <textarea
                rows={5}
                value={navbarForm.menuItemsJson}
                onChange={(e) => setNavbarForm({ ...navbarForm, menuItemsJson: e.target.value })}
                className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-xs text-white focus:outline-none focus:border-primary font-mono"
              />
              <p className="text-[10px] text-slate-500 mt-2 font-semibold">
                Must be a valid JSON array format, for example: <br />
                <code>[{"{"}&quot;name&quot;:&quot;Home&quot;,&quot;href&quot;:&quot;/&quot;{"}"}]</code>
              </p>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-4 border-t border-white/5 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-primary to-secondary hover:brightness-105 shadow-md shadow-primary/10 transition-all cursor-pointer"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : saved ? (
              <>
                <Check className="w-4 h-4" /> Settings Saved!
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> Save Configuration
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
