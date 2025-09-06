export interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  type: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  imageUrl: string;
  rating?: number;
  amenities?: string[];
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
  guests?: number;
  reviews?: import("../components/property/ReviewSection").Review[];
  reviewCount?: number;
}
