import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Heart, Star, Bed, Bath, Users } from 'lucide-react';
import Pill from '@/components/common/Pill';
import { Property } from '@/interfaces';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const router = useRouter();
  
  const handleViewProperty = () => {
    router.push(`/property/${property.id}`);
  };
  return (
    <div className="rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300 border border-gray-100 group relative">
      <div className="relative h-56 w-full">
        <Image
          src={property.imageUrl || '/images/placeholder.jpg'}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button className="absolute top-3 right-3 bg-white rounded-full p-2 shadow hover:bg-primary/10 transition" aria-label="Add to favorites">
          <Heart className="w-5 h-5 text-primary" />
        </button>
        <div className="absolute bottom-3 left-3">
          <Pill label={property.type} variant="primary" />
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-900 truncate max-w-[70%]">{property.title}</h3>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-gray-700 font-medium">{property.rating || 'New'}</span>
          </div>
        </div>
          <p className="text-gray-500 text-sm mb-2 truncate">{property.location}</p>
          <div className="flex gap-4 text-sm text-gray-600 mb-3">
            <span className="flex items-center gap-1"><Bed className="w-4 h-4" />{property.bedrooms} beds</span>
            <span className="flex items-center gap-1"><Bath className="w-4 h-4" />{property.bathrooms} baths</span>
            <span className="flex items-center gap-1"><Users className="w-4 h-4" />{property.guests || 4} guests</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-lg font-bold text-primary">${property.price}<span className="text-sm font-normal text-gray-500"> / night</span></span>
            <button 
              onClick={handleViewProperty}
              className="px-4 py-2 bg-primary text-white rounded-full font-semibold shadow hover:bg-primary-dark transition"
            >
              View
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default PropertyCard;
