import React, { useState } from 'react';
import { Star, CheckCircle2, MessageSquare, Plus } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import { useToast } from '../context/ToastContext';
import Breadcrumbs from '../components/Breadcrumbs';
import RatingStars from '../components/RatingStars';
import reviewsData from '../data/reviews.json';

export default function ReviewsPage() {
  useSEO({
    title: 'Customer Pilot Reviews | VT Aircraft',
    description: 'Read real verified customer pilot reviews, instructor endorsements, and flight experiences with the VT-Simple Trainer.'
  });

  const { addToast } = useToast();
  const [reviewsList, setReviewsList] = useState(reviewsData);
  const [showFormModal, setShowFormModal] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) {
      addToast('Please fill out your name and review details.', 'error');
      return;
    }
    const newEntry = {
      id: 'rev-' + Date.now(),
      productId: 'vt-simple-trainer-rtf',
      author: newAuthor.trim(),
      rating: newRating,
      title: newTitle.trim() || 'Awesome Trainer Airplane!',
      comment: newComment.trim(),
      date: new Date().toISOString().split('T')[0],
      verified: true,
      likes: 0
    };
    setReviewsList([newEntry, ...reviewsList]);
    addToast('Thank you! Your review has been submitted.', 'success');
    setShowFormModal(false);
    setNewAuthor('');
    setNewTitle('');
    setNewComment('');
  };

  return (
    <div className="space-y-12 pb-16">
      <Breadcrumbs items={[{ name: 'Pilot Reviews', url: '/reviews' }]} />

      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">Verified Feedback</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">VT Pilot Community Reviews</h1>
        <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto">
          Read real experiences from absolute beginners, father-son flying duos, and certified AMA flight instructors.
        </p>
      </section>

      {/* Aggregate Rating Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 text-center md:text-left space-y-2 border-b md:border-b-0 md:border-r border-gray-100 pb-6 md:pb-0 md:pr-8">
            <span className="text-5xl font-extrabold text-[#1F3A5F]">4.9</span>
            <div className="flex justify-center md:justify-start pt-1">
              <RatingStars rating={4.9} size="md" />
            </div>
            <p className="text-xs text-gray-500 font-medium">Based on 128 Verified Purchases</p>
          </div>

          <div className="md:col-span-5 space-y-1.5 text-xs">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-700 w-12">5 Stars</span>
              <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-[#2563EB] h-full w-[92%]" />
              </div>
              <span className="text-gray-500 font-mono">92%</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-700 w-12">4 Stars</span>
              <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-[#2563EB] h-full w-[6%]" />
              </div>
              <span className="text-gray-500 font-mono">6%</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-700 w-12">3 Stars</span>
              <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-[#2563EB] h-full w-[2%]" />
              </div>
              <span className="text-gray-500 font-mono">2%</span>
            </div>
          </div>

          <div className="md:col-span-3 text-center md:text-right">
            <button
              onClick={() => setShowFormModal(true)}
              className="px-6 py-3 bg-[#1F3A5F] hover:bg-[#2563EB] text-white text-xs font-semibold rounded-2xl shadow-md transition inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Write A Review</span>
            </button>
          </div>
        </div>
      </section>

      {/* Reviews List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviewsList.map((rev) => (
            <div key={rev.id} className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900 text-sm">{rev.author}</span>
                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold border border-emerald-100">
                      <CheckCircle2 className="w-3 h-3" /> Verified Buyer
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-400">{rev.date}</span>
              </div>

              <RatingStars rating={rev.rating} />

              <h4 className="font-bold text-gray-900 text-sm">{rev.title}</h4>
              <p className="text-xs text-gray-600 leading-relaxed">{rev.comment}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Review Modal Form */}
      {showFormModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 shadow-2xl relative">
            <h3 className="text-lg font-bold text-gray-900">Share Your Flight Experience</h3>
            <form onSubmit={handleSubmitReview} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Captain Tom"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Rating</label>
                <select
                  value={newRating}
                  onChange={(e) => setNewRating(Number(e.target.value))}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#2563EB]"
                >
                  <option value={5}>5 Stars - Outstanding Aircraft</option>
                  <option value={4}>4 Stars - Great Aircraft</option>
                  <option value={3}>3 Stars - Average</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Review Headline</label>
                <input
                  type="text"
                  placeholder="e.g. Flew on my first attempt!"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Detailed Review</label>
                <textarea
                  rows={4}
                  placeholder="Tell other pilots about assembly, gyro stability, battery life, and flight performance..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs rounded-xl transition"
                >
                  Submit Review
                </button>
                <button
                  type="button"
                  onClick={() => setShowFormModal(false)}
                  className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs rounded-xl transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
