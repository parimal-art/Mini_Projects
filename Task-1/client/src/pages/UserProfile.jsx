import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Share2, Grid } from "lucide-react";
import MasonryGrid from "../components/MasonryGrid";
import LoadingScreen from "../components/LoadingScreen";
import EmptyState from "../components/EmptyState";
import { API_URL } from "../config";

export default function UserProfile() {
  const { userId, username } = useParams();
  const navigate = useNavigate();
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserArt = async () => {
      try {
        const res = await fetch(`${API_URL}/artworks/user/${userId}`);
        const data = await res.json();
        setArtworks(data);
      } catch (err) {
        console.error("Failed to fetch user art:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserArt();
  }, [userId]);

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-white animate-in fade-in duration-500">
      {/* Header / Cover Area */}
      <div className="bg-neutral-50 border-b border-neutral-200">
        <div className="container mx-auto px-4 py-12 flex flex-col items-center text-center">
          
          <button 
            onClick={() => navigate(-1)}
            className="absolute top-24 left-4 md:left-8 p-2 text-neutral-400 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>

          {/* Avatar */}
          <div className="w-24 h-24 bg-gradient-to-tr from-rose-400 to-orange-400 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg mb-4">
            {username ? username[0].toUpperCase() : "U"}
          </div>

          <h1 className="text-3xl font-black text-neutral-900 mb-2">{username}</h1>
          <p className="text-neutral-500 mb-6 flex items-center gap-2">
            <Grid size={16} />
            {artworks.length} Artworks Collection
          </p>

          <button
            onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("Profile link copied!");
            }}
            className="flex items-center gap-2 px-6 py-2 bg-white border border-neutral-200 rounded-full text-sm font-medium hover:bg-neutral-50 transition-all"
          >
            <Share2 size={16} />
            Share Profile
          </button>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="container mx-auto px-4 py-12">
        {artworks.length === 0 ? (
          <EmptyState message={`${username} hasn't uploaded any work yet.`} />
        ) : (
          <MasonryGrid items={artworks} />
        )}
      </div>
    </div>
  );
}