import React from 'react';
import Image from 'next/image';
import { Property } from '@/interfaces';
import Pill from '@/components/common/Pill';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image
          src={property.imageUrl || '/images/placeholder.jpg'}
          alt={property.title}
          layout="fill"
          objectFit="cover"
          className="hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          <Pill label={property.type} variant="primary" />
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{property.title}</h3>
          <div className="flex items-center">
            <span className="text-yellow-500">★</span>
            <span className="ml-1 text-gray-700">{property.rating || 'N/A'}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-3">{property.location}</p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-sm text-gray-600">
            {property.bedrooms} beds • {property.bathrooms} baths • {property.area} m²
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-primary">${property.price}<span className="text-sm font-normal text-gray-500"> / night</span></span>
          <button className="px-3 py-1 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors">
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
