import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Heart } from "lucide-react";
import { API_URL } from "../config";

// --- 1. Helper Component for individual cards ---
function ArtworkCard({ item, isOwner, token, onDelete }) {
  const navigate = useNavigate();
  // State to track if THIS specific card is liked
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked); // Toggle between true (Red) and false (White)
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this masterpiece?")) return;

    try {
      await fetch(`${API_URL}/api/artworks/${item._id}`, {
        method: "DELETE",
        headers: { "x-auth-token": token },
      });
      onDelete(); 
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-xl hover:shadow-neutral-200/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col">
      {/* Image Container - Fixed Height */}
      <div className="relative overflow-hidden h-72">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/600x800?text=Image+Error";
          }}
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
          <p className="text-white font-bold text-lg leading-tight translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            {item.title}
          </p>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-4 flex items-center justify-between gap-2 bg-white z-10">
        
        {/* Author Info (Clickable) */}
        <div
          className="flex items-center gap-2.5 overflow-hidden rounded-full py-1 pr-2 hover:bg-neutral-50 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/profile/${item.user}/${item.username}`);
          }}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-rose-100 to-orange-100 rounded-full flex items-center justify-center text-xs font-bold text-rose-600 border border-white shadow-sm shrink-0">
            {item.username?.[0]?.toUpperCase() || "A"}
          </div>
          <span className="text-sm font-semibold text-neutral-700 truncate group-hover:text-rose-500 transition-colors">
            {item.username}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {isOwner ? (
            <button
              onClick={handleDelete}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 border border-red-100 rounded-full text-xs font-bold hover:bg-red-500 hover:text-white hover:border-red-500 transition-all active:scale-95"
            >
              <Trash2 size={14} />
              <span>Delete</span>
            </button>
          ) : (
            <button
              onClick={toggleLike}
              className={`p-2 rounded-full transition-all active:scale-95 border ${
                isLiked
                  ? "bg-rose-50 text-rose-500 border-rose-200" // RED STATE
                  : "text-neutral-400 border-transparent hover:text-rose-500 hover:bg-rose-50" // WHITE STATE
              }`}
            >
              {/* Fill property makes it solid red */}
              <Heart size={18} className={isLiked ? "fill-current" : ""} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// --- 2. Main Grid Component ---
export default function MasonryGrid({ items, isOwner, token, onDelete }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
      {items.map((item) => (
        <ArtworkCard
          key={item._id}
          item={item}
          isOwner={isOwner}
          token={token}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}