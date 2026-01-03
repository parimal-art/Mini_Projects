// src/pages/PublicProfile.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import MasonryGrid from "../components/MasonryGrid";
import EmptyState from "../components/EmptyState";

export default function PublicProfile({ artworks }) {
  const { userId, username } = useParams();

  const userArtworks = artworks.filter(
    (art) => art.user === userId || art.user?._id === userId
  );

  return (
    <div className="animate-in fade-in duration-500">
      <Link
        to="/"
        className="mb-6 flex items-center gap-2 text-neutral-500 hover:text-neutral-900 transition-colors"
      >
        <ArrowLeft size={18} /> Back to Gallery
      </Link>

      <div className="bg-neutral-900 text-white rounded-3xl p-8 mb-12 shadow-2xl shadow-neutral-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500 rounded-full blur-[100px] opacity-20 -mr-16 -mt-16"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 bg-white text-neutral-900 rounded-full flex items-center justify-center text-3xl font-bold shadow-lg">
            {username ? username[0].toUpperCase() : "?"}
          </div>

          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {username || "Unknown Artist"}
            </h1>
            <p className="text-neutral-400 max-w-lg">
              Showcasing a collection of digital memories and artistic creations.
            </p>
          </div>

          <div className="md:ml-auto flex gap-4">
            <div className="text-center px-6 py-2 bg-white/10 rounded-xl backdrop-blur-sm">
              <div className="text-2xl font-bold">
                {userArtworks.length}
              </div>
              <div className="text-xs text-neutral-400 uppercase tracking-wider">
                Posts
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-6">Portfolio</h2>

      {userArtworks.length === 0 ? (
        <EmptyState message="This user hasn't posted anything yet." />
      ) : (
        <MasonryGrid items={userArtworks} />
      )}
    </div>
  );
}
