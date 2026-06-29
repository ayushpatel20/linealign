"use client";

import { useEffect, useState } from "react";
import { BookOpen, Plus, Edit2, Trash2, Check, X, Eye, EyeOff, Save, Calendar, User } from "lucide-react";
import { getBlogPosts, saveBlogPost, deleteBlogPost } from "@/app/actions/cms-actions";

interface BlogPostItem {
  id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  category: string;
  tagsJson: string; // JSON Array of strings
  author: string;
  isPublished: boolean;
  seoTitle: string;
  seoDescription: string;
}

export default function BlogsAdmin() {
  const [posts, setPosts] = useState<BlogPostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<BlogPostItem | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchPosts = async () => {
    try {
      const data = await getBlogPosts();
      setPosts(data as any);
    } catch (err) {
      console.error("Failed to load blog posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleEdit = (post: BlogPostItem) => {
    setEditingPost(post);
  };

  const handleAddNew = () => {
    setEditingPost({
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      featuredImage: "/images/blog/1.png", // Default path placeholder
      category: "Orthodontics",
      tagsJson: "[\"Aligners\", \"Dental Lab\"]",
      author: "Dr. Tilvin V Tom",
      isPublished: true,
      seoTitle: "",
      seoDescription: "",
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    try {
      await deleteBlogPost(id);
      setPosts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error("Failed to delete post:", err);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;

    if (!editingPost.title || !editingPost.slug || !editingPost.content) {
      alert("Title, Slug, and Content are required.");
      return;
    }

    setSaving(true);
    try {
      await saveBlogPost(editingPost);
      setEditingPost(null);
      await fetchPosts();
    } catch (err) {
      console.error("Failed to save post:", err);
      alert("Error saving blog article. Please ensure the SEO slug is unique.");
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
            <BookOpen className="w-8 h-8 text-primary" />
            Blogs & Article CMS
          </h1>
          <p className="text-slate-400 text-sm">
            Publish news, orthodontic guides, research posts, and clinician articles dynamically.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-primary to-secondary hover:brightness-105 shadow-md shadow-primary/10 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Write New Article
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Posts List Panel */}
        <div className="lg:col-span-7 bg-slate-900 border border-white/5 p-6 sm:p-8 rounded-[2rem] shadow-sm space-y-4">
          <h3 className="text-base font-bold text-white font-poppins border-b border-white/5 pb-4">
            Published Articles
          </h3>

          {posts.length === 0 ? (
            <p className="text-slate-500 text-xs text-center py-8">No articles published yet.</p>
          ) : (
            <div className="space-y-3">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between p-4 bg-slate-950/40 border border-white/5 rounded-2xl hover:border-slate-800 hover:bg-slate-950/60 transition-all"
                >
                  <div className="overflow-hidden">
                    <h4 className="font-bold text-white text-sm sm:text-base font-poppins truncate">{post.title}</h4>
                    <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mt-1.5 flex flex-wrap gap-2">
                      <span>Slug: /blog/{post.slug}</span>
                      <span>•</span>
                      <span>Category: {post.category}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        {post.isPublished ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        {post.isPublished ? "Published" : "Draft"}
                      </span>
                    </p>
                  </div>

                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleEdit(post)}
                      className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                      title="Edit Article"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(post.id!)}
                      className="p-2.5 rounded-xl bg-slate-900 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                      title="Delete Article"
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
        {editingPost && (
          <div className="lg:col-span-5 bg-slate-900 border border-white/5 p-6 sm:p-8 rounded-[2rem] shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <h3 className="text-base font-bold text-white font-poppins">
                {editingPost.id ? "Edit Article" : "Write Article"}
              </h3>
              <button onClick={() => setEditingPost(null)} className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Article Title</label>
                <input
                  type="text"
                  required
                  value={editingPost.title}
                  onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary"
                  placeholder="e.g. The benefits of digital orthodontic workflows"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Slug slug (unique path)</label>
                <input
                  type="text"
                  required
                  value={editingPost.slug}
                  onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary font-mono"
                  placeholder="e.g. benefits-of-digital-orthodontics"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Category</label>
                  <input
                    type="text"
                    required
                    value={editingPost.category}
                    onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary"
                    placeholder="e.g. Orthodontics"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Author Name</label>
                  <input
                    type="text"
                    value={editingPost.author}
                    onChange={(e) => setEditingPost({ ...editingPost, author: e.target.value })}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Cover Image URL</label>
                <input
                  type="text"
                  value={editingPost.featuredImage}
                  onChange={(e) => setEditingPost({ ...editingPost, featuredImage: e.target.value })}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary font-mono"
                  placeholder="e.g. /uploads/image.png"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Brief Excerpt Summary</label>
                <input
                  type="text"
                  value={editingPost.excerpt}
                  onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary"
                  placeholder="Short excerpt paragraph..."
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Article Body Content (Supports HTML/Text)</label>
                <textarea
                  rows={8}
                  required
                  value={editingPost.content}
                  onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-xs text-white focus:outline-none focus:border-primary font-mono resize-y"
                  placeholder="<p>Write your article here...</p>"
                />
              </div>

              <h4 className="text-xs font-bold text-slate-400 border-t border-white/5 pt-4">SEO Override Meta</h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">SEO Title</label>
                  <input
                    type="text"
                    value={editingPost.seoTitle}
                    onChange={(e) => setEditingPost({ ...editingPost, seoTitle: e.target.value })}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Publish Status</label>
                  <select
                    value={editingPost.isPublished ? "true" : "false"}
                    onChange={(e) => setEditingPost({ ...editingPost, isPublished: e.target.value === "true" })}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary"
                  >
                    <option value="true" className="bg-slate-900">Published</option>
                    <option value="false" className="bg-slate-900">Draft (hidden)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">SEO Description</label>
                <textarea
                  rows={2}
                  value={editingPost.seoDescription}
                  onChange={(e) => setEditingPost({ ...editingPost, seoDescription: e.target.value })}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-primary resize-none"
                />
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
                      <Save className="w-4 h-4" /> Save Article
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
