import React from 'react';
import { Star } from 'lucide-react';

export default function RatingStars({ rating = 5, count, size = 'sm' }) {
  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {stars.map((star) => (
          <Star
            key={star}
            className={`${iconSizes[size]} ${
              star <= Math.floor(rating)
                ? 'text-amber-400 fill-amber-400'
                : star - 0.5 <= rating
                ? 'text-amber-400 fill-amber-200'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      {rating && <span className="text-xs font-semibold text-gray-900 ml-1">{rating.toFixed(1)}</span>}
      {count !== undefined && <span className="text-xs text-gray-500">({count})</span>}
    </div>
  );
}
