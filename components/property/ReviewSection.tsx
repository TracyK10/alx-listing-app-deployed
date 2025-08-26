import React from 'react';
import { Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface Review {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  rating: number;
  date: string;
  comment: string;
}

interface ReviewSectionProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  onAddReview?: () => void;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({
  reviews = [],
  averageRating,
  totalReviews,
  onAddReview,
}) => {
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
          }`}
        />
      ));
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <section className="mt-12">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Reviews</h2>
          <div className="flex items-center mt-1">
            <div className="flex mr-2">
              {renderStars(averageRating)}
            </div>
            <span className="text-gray-600">
              {averageRating.toFixed(1)} · {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
            </span>
          </div>
        </div>
        <Button onClick={onAddReview} variant="outline">
          Write a Review
        </Button>
      </div>

      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-6 last:border-b-0 last:pb-0">
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10">
                  {review.user.avatar ? (
                    <AvatarImage src={review.user.avatar} alt={review.user.name} />
                  ) : (
                    <AvatarFallback>{getInitials(review.user.name)}</AvatarFallback>
                  )}
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{review.user.name}</h4>
                      <div className="flex mt-0.5">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-700">{review.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 border rounded-lg bg-gray-50">
          <p className="text-gray-500">No reviews yet. Be the first to review!</p>
          <Button onClick={onAddReview} variant="link" className="mt-2">
            Write a Review
          </Button>
        </div>
      )}
    </section>
  );
};

export default ReviewSection;
