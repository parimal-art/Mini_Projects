import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, ImageIcon } from "lucide-react";
import UploadForm from "../components/UploadForm";
import MasonryGrid from "../components/MasonryGrid";

export default function Dashboard({ user, token, artworks, refreshArt }) {
  const [isUploading, setIsUploading] = useState(false);

  // Filter artworks belonging to current user
  const myArtworks = artworks.filter(
    (art) => art.user === user.id || art.user === user._id
  );

  return (
    <div className="animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row gap-8 mb-12 items-start">

        {/* --- Left Column: Profile Card --- */}
        <div className="w-full md:w-1/3 lg:w-1/4 bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 sticky top-24">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-rose-100 rounded-full mb-4 flex items-center justify-center text-rose-500 text-2xl font-bold border-4 border-white shadow-md">
              {user.username ? user.username[0].toUpperCase() : "U"}
            </div>

            <h2 className="text-xl font-bold text-neutral-900">{user.username || "Artist"}</h2>
            <p className="text-sm text-neutral-500 mb-6">{user.email}</p>

            <div className="w-full grid grid-cols-2 gap-2 mb-6 text-sm">
              <div className="bg-neutral-50 p-2 rounded-lg">
                <div className="font-bold text-lg text-neutral-900">{myArtworks.length}</div>
                <div className="text-neutral-400">Works</div>
              </div>
              <div className="bg-neutral-50 p-2 rounded-lg">
                <div className="font-bold text-lg text-neutral-900">0</div>
                <div className="text-neutral-400">Likes</div>
              </div>
            </div>

            <button
              onClick={() => setIsUploading(!isUploading)}
              className="w-full flex items-center justify-center gap-2 bg-neutral-900 text-white py-2.5 rounded-xl hover:bg-neutral-800 transition-all shadow-lg shadow-neutral-200"
            >
              {isUploading ? "Cancel" : "Upload New"}
              {!isUploading && <Plus size={18} />}
            </button>
          </div>
        </div>

        {/* --- Right Column: Content Area --- */}
        <div className="w-full md:w-2/3 lg:w-3/4">
          
          {isUploading && (
            <UploadForm
              token={token}
              onClose={() => setIsUploading(false)}
              onSuccess={refreshArt}
            />
          )}

          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xl font-bold text-neutral-900">Your Gallery</h3>
            
            {/* 🔥 CHANGE: Link points to Home (Explore Gallery) */}
            <Link
              to="/" 
              className="text-sm text-rose-500 font-medium hover:underline hover:text-rose-600 transition-colors"
            >
              Explore Gallery &rarr;
            </Link>
          </div>

          {myArtworks.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-neutral-200 rounded-2xl p-12 text-center">
              <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <ImageIcon className="text-neutral-300" size={32} />
              </div>
              <h3 className="text-lg font-bold text-neutral-900">
                It's empty here
              </h3>
              <p className="text-neutral-500 mb-6">
                Upload your first masterpiece to get started.
              </p>
              <button
                onClick={() => setIsUploading(true)}
                className="text-rose-500 font-medium hover:text-rose-600 underline"
              >
                Upload Artwork
              </button>
            </div>
          ) : (
            <MasonryGrid
              items={myArtworks}
              isOwner={true}
              token={token}
              onDelete={refreshArt}
            />
          )}
        </div>
      </div>
    </div>
  );
}