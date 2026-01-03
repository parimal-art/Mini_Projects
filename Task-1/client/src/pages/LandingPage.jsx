// src/pages/LandingPage.jsx
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import MasonryGrid from "../components/MasonryGrid";
import EmptyState from "../components/EmptyState";
import LoadingScreen from "../components/LoadingScreen";

export default function LandingPage({ artworks, loading }) {
  const navigate = useNavigate();

  const randomArtworks = useMemo(() => {
    return [...artworks].sort(() => Math.random() - 0.5);
  }, [artworks]);

  if (loading) return <LoadingScreen />;

  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <header className="text-center py-16 md:py-24 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-neutral-900">
          Share your digital{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">
            memories
          </span>
          .
        </h1>

        <p className="text-lg text-neutral-500 mb-8 leading-relaxed">
          A minimalist platform for artists and creators to curate their visual
          legacy. Join our community to showcase your best work.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/signup")}
            className="bg-neutral-900 text-white px-8 py-3 rounded-full font-medium hover:bg-neutral-800 transition-all shadow-xl shadow-neutral-200"
          >
            Start Creating
          </button>

          <button
            onClick={() =>
              document
                .getElementById("gallery-start")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-white text-neutral-900 border border-neutral-200 px-8 py-3 rounded-full font-medium hover:bg-neutral-50 transition-all"
          >
            Explore Gallery
          </button>
        </div>
      </header>

      {/* Gallery */}
      <div id="gallery-start">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Search size={20} className="text-rose-500" />
          Featured Works
        </h2>

        {artworks.length === 0 ? (
          <EmptyState message="No artworks uploaded yet. Be the first!" />
        ) : (
          <MasonryGrid items={randomArtworks} />
        )}
      </div>
    </div>
  );
}
