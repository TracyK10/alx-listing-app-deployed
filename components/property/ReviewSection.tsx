import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Star, User, AlertCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

// Simple toast implementation since react-hot-toast is causing issues
const toast = (message: string, options?: { icon?: string }) => {
  console.log(options?.icon ? `${options.icon} ${message}` : message);
};

export interface Review {
  id: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  rating: number;
  date: string;
  comment: string;
  propertyId: string;
}

interface ReviewSectionProps {
  propertyId: string;
  onReviewAdded?: () => void;
  className?: string;
}

interface ApiResponse {
  success: boolean;
  data: {
    reviews: Review[];
    averageRating: number;
    totalReviews: number;
  };
  message?: string;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({
  propertyId,
  onReviewAdded,
  className = '',
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [totalReviews, setTotalReviews] = useState<number>(0);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!propertyId) return;
      
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await axios.get<ApiResponse>(`/api/properties/${propertyId}/reviews`);
        
        if (response.data.success && response.data.data) {
          setReviews(response.data.data.reviews || []);
          setAverageRating(response.data.data.averageRating || 0);
          setTotalReviews(response.data.data.totalReviews || 0);
        } else {
          throw new Error(response.data.message || 'Failed to load reviews');
        }
      } catch (err) {
        const axiosError = err as import('axios').AxiosError<{ message?: string }>;
        const errorMessage = axiosError.response?.data?.message || 'Failed to load reviews. Please try again.';
        console.error('Error fetching reviews:', errorMessage);
        setError(errorMessage);
        toast(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [propertyId]);

  const handleAddReview = () => {
    if (onReviewAdded) {
      onReviewAdded();
    } else {
      toast('Please sign in to leave a review');
    }
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };


  if (isLoading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-4 p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-red-50 p-4 rounded-lg ${className}`}>
        <div className="flex">
          <AlertCircle className="h-5 w-5 text-red-400 mr-2 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-red-800">Error loading reviews</h3>
            <p className="text-sm text-red-700 mt-1">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 text-sm font-medium text-red-700 hover:text-red-600"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className={`space-y-6 ${className}`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
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
        <Button 
          onClick={handleAddReview} 
          variant="outline"
          className="w-full sm:w-auto"
        >
          Write a Review
        </Button>
      </div>

      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review: Review) => (
            <article key={review.id} className="p-4 border rounded-lg bg-white shadow-sm">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12 flex-shrink-0">
                  {review.user.avatar ? (
                    <AvatarImage 
                      src={review.user.avatar} 
                      alt={review.user.name}
                      className="object-cover"
                    />
                  ) : (
                    <AvatarFallback className="bg-gray-100">
                      <User className="h-6 w-6 text-gray-400" />
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div>
                      <h4 className="font-medium text-gray-900">{review.user.name}</h4>
                      <div className="flex items-center mt-0.5">
                        <div className="flex mr-2">
                          {renderStars(review.rating)}
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 text-gray-700 whitespace-pre-line">
                    {review.comment}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 px-4 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
          <div className="max-w-md mx-auto">
            <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No reviews yet</h3>
            <p className="text-gray-500 mb-4">Be the first to share your experience!</p>
            <Button 
              onClick={handleAddReview}
              variant="outline"
              className="inline-flex items-center"
            >
              <Star className="w-4 h-4 mr-2" />
              Write a Review
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ReviewSection;
