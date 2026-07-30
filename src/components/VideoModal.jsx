import React from 'react';
import { X } from 'lucide-react';

export default function VideoModal({ video, onClose }) {
  if (!video) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative bg-black rounded-2xl overflow-hidden w-full max-w-4xl shadow-2xl border border-gray-800">
        <div className="flex items-center justify-between p-4 bg-gray-900 border-b border-gray-800 text-white">
          <h3 className="font-semibold text-sm sm:text-base line-clamp-1">{video.title}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="aspect-video w-full bg-black">
          <video
            src={video.videoUrl}
            controls
            autoPlay
            className="w-full h-full object-contain"
          >
            Your browser does not support video playback.
          </video>
        </div>

        <div className="p-4 bg-gray-900 text-xs text-gray-400">
          <p>{video.description}</p>
        </div>
      </div>
    </div>
  );
}
