import React, { useState } from 'react';
import { Star, MessageSquarePlus, CheckCircle2, X } from 'lucide-react';
import { Review } from '../types';

interface ReviewsSectionProps {
  reviews: Review[];
  language: 'en' | 'bn';
  onAddReview: (review: Review) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews, language, onAddReview }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [authorLocation, setAuthorLocation] = useState('');
  const [rating, setRating] = useState(5);
  const [dishMentioned, setDishMentioned] = useState('');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const approvedReviews = reviews.filter((r) => r.isApproved);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !comment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      authorName: authorName.trim(),
      authorLocation: authorLocation.trim() || 'Kushtia',
      rating,
      comment: comment.trim(),
      date: 'Just now',
      isApproved: true, // Approved immediately for preview
      dishMentioned: dishMentioned.trim() || undefined
    };

    onAddReview(newRev);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setModalOpen(false);
      setAuthorName('');
      setAuthorLocation('');
      setComment('');
      setDishMentioned('');
    }, 1800);
  };

  return (
    <section className="py-16 md:py-24 bg-[#FAF7F0] text-[#252A27] border-t border-[#173F32]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E98738]/15 text-[#d67325] text-xs font-bold uppercase tracking-wider mb-3">
              <Star className="w-3.5 h-3.5 fill-current" />
              {language === 'bn' ? 'কাস্টমারদের ভালোবাসা' : 'Customer Testimonials'}
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold font-display text-[#173F32]">
              {language === 'bn' ? 'স্কাই বাইট নিয়ে গ্রাহকদের মতামত' : 'What Our Guests Say About Us'}
            </h2>
            <p className="mt-2 text-base text-[#252A27]/70 max-w-xl">
              {language === 'bn'
                ? 'কুষ্টিয়ার স্থানীয় ভোজনরসিক ও দূর-দূরান্ত থেকে আসা অতিথিদের প্রকৃত রিভিউ।'
                : 'Real feedback from Kushtia food lovers and rooftop dining enthusiasts.'}
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <button
              onClick={() => setModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-[#173F32] hover:bg-[#1f5242] text-[#F7F3E9] text-sm font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4 text-[#E98738]" />
              <span>{language === 'bn' ? 'আপনার রিভিউ লিখুন' : 'Write a Review'}</span>
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {approvedReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-2xl border border-[#173F32]/10 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-[#E98738]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rev.rating ? 'fill-[#E98738] text-[#E98738]' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#252A27]/50">{rev.date}</span>
                </div>

                <p className="text-sm text-[#252A27]/80 leading-relaxed italic mb-4">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#173F32]/10 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-[#173F32]">{rev.authorName}</h4>
                  <p className="text-[11px] text-[#252A27]/60">{rev.authorLocation}</p>
                </div>
                {rev.dishMentioned && (
                  <span className="text-[10px] font-semibold bg-[#E98738]/10 text-[#173F32] px-2 py-0.5 rounded-full border border-[#E98738]/30">
                    {rev.dishMentioned}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Submission Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-[#173F32]/20">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto mb-3 animate-bounce" />
                <h3 className="text-xl font-bold text-[#173F32]">Thank You!</h3>
                <p className="text-sm text-[#252A27]/70 mt-1">
                  {language === 'bn'
                    ? 'আপনার মূল্যবান মতামতের জন্য ধন্যবাদ। এটি প্রকাশিত হয়েছে।'
                    : 'Your review has been successfully shared with Sky Bite Restaurant.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold font-display text-[#173F32]">
                    {language === 'bn' ? 'স্কাই বাইট সম্পর্কে আপনার অভিজ্ঞতা জানান' : 'Share Your Experience'}
                  </h3>
                  <p className="text-xs text-[#252A27]/60 mt-0.5">
                    {language === 'bn' ? 'খাবার ও পরিবেশ কেমন লাগলো?' : 'How was the food, rooftop ambience and service?'}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#173F32] mb-1">
                    {language === 'bn' ? 'রেটিং' : 'Rating'}
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        type="button"
                        key={num}
                        onClick={() => setRating(num)}
                        className="p-1 cursor-pointer transition-transform hover:scale-125"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            num <= rating ? 'fill-[#E98738] text-[#E98738]' : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-[#173F32] ml-2">
                      {rating} / 5 Star
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#173F32] mb-1">
                      {language === 'bn' ? 'আপনার নাম *' : 'Your Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder="e.g. Tanvir Ahmed"
                      className="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#173F32]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#173F32] mb-1">
                      {language === 'bn' ? 'এলাকা / শহর' : 'Area / Town'}
                    </label>
                    <input
                      type="text"
                      value={authorLocation}
                      onChange={(e) => setAuthorLocation(e.target.value)}
                      placeholder="e.g. Kushtia Sadar"
                      className="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#173F32]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#173F32] mb-1">
                    {language === 'bn' ? 'কোন খাবারটি সবচেয়ে ভালো লেগেছে?' : 'Favorite Dish Ordered (Optional)'}
                  </label>
                  <input
                    type="text"
                    value={dishMentioned}
                    onChange={(e) => setDishMentioned(e.target.value)}
                    placeholder="e.g. Szechuan Chicken, Red Snapper"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#173F32]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#173F32] mb-1">
                    {language === 'bn' ? 'আপনার রিভিউ *' : 'Your Review *'}
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your thoughts on food quality, ambience, and hospitality..."
                    className="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#173F32]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#E98738] hover:bg-[#d8782a] text-[#173F32] font-bold text-sm shadow cursor-pointer transition-colors"
                >
                  {language === 'bn' ? 'রিভিউ সাবমিট করুন' : 'Submit Review'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
