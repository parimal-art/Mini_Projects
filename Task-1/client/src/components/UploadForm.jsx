import React, { useState, useRef } from "react";
import { Loader2, UploadCloud, X, Image as ImageIcon } from "lucide-react";
import { API_URL } from "../config";

export default function UploadForm({ token, onClose, onSuccess }) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Ref to reset file input when clearing image
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const clearImage = (e) => {
    e.stopPropagation(); // Prevent triggering the file input click
    setImage(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !image) return;

    // Check both prop and localStorage for token
    const authToken = token || localStorage.getItem("token");

    if (!authToken) {
      alert("You are not logged in. Please log in again.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/artworks`, {
        method: "POST",
        headers: { "x-auth-token": authToken },
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.msg || "Upload failed");
      }

      // Reset Form
      setTitle("");
      clearImage({ stopPropagation: () => {} }); // Mock event object
      
      onSuccess();
      onClose();
    } catch (err) {
      alert(err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl shadow-rose-100/50 border border-neutral-100 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-neutral-800 flex items-center gap-2">
          <span className="p-2 bg-rose-100 text-rose-500 rounded-lg">
            <UploadCloud size={20} />
          </span>
          Upload Masterpiece
        </h3>
        
        <button 
          onClick={onClose}
          className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-50 rounded-full transition-all"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Input */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-neutral-700 ml-1">Artwork Title</label>
          <input
            type="text"
            placeholder="e.g. Sunset in Kyoto"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 transition-all outline-none"
            required
          />
        </div>

        {/* Image Upload Area */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-neutral-700 ml-1">Image File</label>
          
          <div className="relative group">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              id="file-upload"
              className="hidden" // Hide the ugly default input
              required={!image}
            />

            <label
              htmlFor="file-upload"
              className={`
                relative flex flex-col items-center justify-center w-full h-64 rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden
                ${preview 
                  ? "border-rose-500 bg-white" 
                  : "border-neutral-300 bg-neutral-50 hover:bg-rose-50/50 hover:border-rose-400"
                }
              `}
            >
              {preview ? (
                <>
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  {/* Remove Button Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                     <button
                        type="button"
                        onClick={clearImage}
                        className="bg-white text-rose-500 px-4 py-2 rounded-full font-bold shadow-lg transform scale-95 group-hover:scale-100 transition-transform flex items-center gap-2"
                     >
                       <X size={16} /> Change Image
                     </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center text-center p-6 space-y-3">
                  <div className="p-4 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <ImageIcon className="text-rose-400" size={32} />
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-neutral-700">Click to upload image</p>
                    <p className="text-sm text-neutral-400">SVG, PNG, JPG or GIF</p>
                  </div>
                </div>
              )}
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-medium text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-8 py-2.5 bg-gradient-to-r from-rose-500 to-orange-500 text-white rounded-xl font-bold shadow-lg shadow-rose-200 hover:shadow-rose-300 hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:hover:scale-100 transition-all flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Uploading...
              </>
            ) : (
              "Post Artwork"
            )}
          </button>
        </div>
      </form>
    </div>
  );
} 