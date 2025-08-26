import React from 'react';
import Image from 'next/image';
import { Property } from '@/interfaces';
import { Star, MapPin, Bed, Bath, Ruler, Users, Wifi, Parking, Kitchen, Tv, AirVent } from 'lucide-react';
import ReviewSection from './ReviewSection';

interface PropertyDetailProps {
  property: Property;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ property }) => {
  const renderAmenityIcon = (amenity: string) => {
    const iconProps = { className: 'w-5 h-5 text-primary' };
    
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi {...iconProps} />;
      case 'parking':
        return <Parking {...iconProps} />;
      case 'kitchen':
        return <Kitchen {...iconProps} />;
      case 'tv':
        return <Tv {...iconProps} />;
      case 'ac':
        return <AirVent {...iconProps} />;
      default:
        return <div className="w-5 h-5 rounded-full bg-primary/10" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Property Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{property.location}</span>
          <span className="mx-2">•</span>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
            <span>{property.rating || 'New'}</span>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="md:col-span-3 h-96 rounded-xl overflow-hidden">
          <Image
            src={property.imageUrl || '/images/placeholder.jpg'}
            alt={property.title}
            width={1200}
            height={800}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-1">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 rounded-xl overflow-hidden">
              <Image
                src={property[`imageUrl${i}` as keyof Property] as string || '/images/placeholder.jpg'}
                alt={`${property.title} ${i}`}
                width={400}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Property Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">About this property</h2>
            <p className="text-gray-700 mb-6">{property.description}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center">
                <Bed className="w-5 h-5 text-primary mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Bedrooms</p>
                  <p className="font-medium">{property.bedrooms}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Bath className="w-5 h-5 text-primary mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Bathrooms</p>
                  <p className="font-medium">{property.bathrooms}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Ruler className="w-5 h-5 text-primary mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Area</p>
                  <p className="font-medium">{property.area} m²</p>
                </div>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 text-primary mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Guests</p>
                  <p className="font-medium">{property.guests || 4}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {property.amenities?.map((amenity, index) => (
                <div key={index} className="flex items-center space-x-2">
                  {renderAmenityIcon(amenity)}
                  <span className="text-gray-700 capitalize">{amenity}</span>
                </div>
              )) || (
                <p className="text-gray-500">No amenities listed</p>
              )}
            </div>
          </div>

          {/* Reviews */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <ReviewSection
              reviews={property.reviews || []}
              averageRating={property.rating || 0}
              totalReviews={property.reviewCount || 0}
              onAddReview={() => {
                // Handle add review
                console.log('Add review clicked');
              }}
            />
          </div>
        </div>

        {/* Booking Card */}
        <div className="lg:sticky lg:top-6 h-fit">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-2xl font-bold">${property.price}</p>
                <p className="text-gray-500">per night</p>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                <span>{property.rating || 'New'}</span>
                <span className="text-gray-500 ml-1">({property.reviewCount || 0})</span>
              </div>
            </div>
            <button className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors mb-4">
              Book Now
            </button>
            <div className="text-center text-sm text-gray-500">
              You won't be charged yet
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
