"use client";

import { useEffect, useState } from "react";
import { FolderOpen, Upload, Trash2, Copy, FileText, Check, AlertCircle } from "lucide-react";
import Image from "next/image";
import { getMediaItems, deleteMediaItem } from "@/app/actions/cms-actions";

interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  createdAt: any;
}

export default function MediaManager() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchFiles = async () => {
    try {
      const data = await getMediaItems();
      setFiles(data);
    } catch (err) {
      console.error("Failed to fetch media registry:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    const file = fileList[0];
    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    setError(null);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to upload file to the server.");
      }

      await fetchFiles();
    } catch (err: any) {
      setError(err.message || "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this media asset?")) return;
    try {
      await deleteMediaItem(id);
      setFiles(prev => prev.filter(f => f.id !== id));
    } catch (err) {
      console.error("Failed to delete media:", err);
    }
  };

  const handleCopyUrl = (id: string, url: string) => {
    // Construct absolute URL or relative URL depending on preference
    // Let's copy absolute relative path so it resolves internally
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatBytes = (bytes: number, decimals = 2) => {
    if (!bytes) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-48 bg-slate-800 animate-pulse rounded-lg" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-44 bg-slate-800/50 animate-pulse rounded-3xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header & Upload Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-white font-poppins tracking-tight flex items-center gap-2.5">
            <FolderOpen className="w-8 h-8 text-primary" />
            Media & File Manager
          </h1>
          <p className="text-slate-400 text-sm">
            Upload images, clinical videos, and certificates, then copy their URLs for use in sections.
          </p>
        </div>

        {/* Upload Button */}
        <label className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-primary to-secondary hover:brightness-105 shadow-md shadow-primary/10 transition-all cursor-pointer disabled:opacity-50">
          <Upload className="w-4 h-4" />
          {uploading ? "Uploading file..." : "Upload New File"}
          <input
            type="file"
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
            accept="image/*,video/*,application/pdf"
          />
        </label>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 rounded-2xl bg-red-500/10 border border-red-500/25 text-red-200 text-xs font-semibold">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Grid items */}
      {files.length === 0 ? (
        <div className="p-16 border border-dashed border-white/10 rounded-[2rem] text-center space-y-2 text-slate-500">
          <FolderOpen className="w-12 h-12 opacity-30 mx-auto" />
          <p className="font-bold text-sm">No files uploaded yet.</p>
          <p className="text-xs">Click the button above to upload your first image, video, or PDF.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {files.map((file) => {
            const isImage = file.type.startsWith("image/");
            const isVideo = file.type.startsWith("video/");
            const isPdf = file.type === "application/pdf" || file.name.endsWith(".pdf");

            return (
              <div
                key={file.id}
                className="group relative bg-slate-900 border border-white/5 p-4 rounded-3xl flex flex-col justify-between hover:border-slate-800 hover:shadow-lg transition-all"
              >
                {/* File Preview */}
                <div className="relative aspect-square w-full bg-slate-950/40 rounded-2xl overflow-hidden flex items-center justify-center border border-white/5 select-none mb-3">
                  {isImage ? (
                    <Image
                      src={file.url}
                      alt={file.name}
                      fill
                      sizes="(max-w-md) 100vw, 200px"
                      className="object-contain p-2"
                    />
                  ) : isVideo ? (
                    <div className="text-center p-4">
                      <span className="text-2xl">🎥</span>
                      <span className="text-[10px] block text-slate-400 font-bold uppercase tracking-wider mt-1">Video</span>
                    </div>
                  ) : isPdf ? (
                    <div className="text-center p-4">
                      <FileText className="w-10 h-10 text-red-400 mx-auto" />
                      <span className="text-[10px] block text-slate-400 font-bold uppercase tracking-wider mt-1">PDF File</span>
                    </div>
                  ) : (
                    <div className="text-center p-4">
                      <span className="text-2xl">📄</span>
                      <span className="text-[10px] block text-slate-400 font-bold uppercase tracking-wider mt-1">Document</span>
                    </div>
                  )}

                  {/* Overlays for copy and delete */}
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2.5 transition-opacity">
                    <button
                      onClick={() => handleCopyUrl(file.id, file.url)}
                      className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow transition-colors cursor-pointer"
                      title="Copy File URL"
                    >
                      {copiedId === file.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleDelete(file.id)}
                      className="p-3 rounded-xl bg-slate-900 hover:bg-red-500/20 text-slate-400 hover:text-red-400 shadow transition-colors cursor-pointer"
                      title="Delete Asset"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Metadata */}
                <div className="space-y-1 overflow-hidden">
                  <h4 className="font-bold text-xs text-white truncate leading-tight" title={file.name}>
                    {file.name}
                  </h4>
                  <div className="flex justify-between items-center text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                    <span>{formatBytes(file.size)}</span>
                    <span className="text-[9px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">
                      {file.name.split(".").pop()}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
