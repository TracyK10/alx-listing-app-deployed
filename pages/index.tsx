import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "@/components/layout/Layout";
import Pill from "@/components/common/Pill";
import PropertyCard from "@/components/property/PropertyCard";
import { Property } from "@/interfaces";

const filters = ["All", "Hotels", "Apartments", "Villas", "Cabins"];

interface DummyJSONProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  brand?: string;
  category: string;
  thumbnail: string;
  images?: string[];
}

interface DummyJSONResponse {
  products: DummyJSONProduct[];
  total: number;
  skip: number;
  limit: number;
}

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await axios.get<DummyJSONResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`);
        
        // Transform DummyJSON products to our Property interface
        const transformedProperties: Property[] = response.data.products.map((product: DummyJSONProduct) => ({
          id: product.id.toString(),
          title: product.title,
          description: product.description,
          location: `${product.brand || 'Unknown'}, ${product.category || 'Unknown'}`,
          type: product.category || 'Product',
          price: product.price,
          bedrooms: Math.floor(Math.random() * 4) + 1, // Random for demo
          bathrooms: Math.floor(Math.random() * 3) + 1, // Random for demo
          area: Math.floor(Math.random() * 200) + 50, // Random for demo
          imageUrl: product.thumbnail || product.images?.[0] || '/images/placeholder.jpg',
          rating: product.rating || 4.5,
          amenities: ['wifi', 'parking', 'kitchen'],
          isAvailable: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          guests: Math.floor(Math.random() * 6) + 2, // Random for demo
          reviewCount: Math.floor(Math.random() * 100) + 10
        }));
        
        setProperties(transformedProperties);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("An error occurred while fetching properties. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const filteredProperties = activeFilter === "All" 
    ? properties 
    : properties.filter(property => property.type.toLowerCase() === activeFilter.toLowerCase());

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-br from-pink-50 via-white to-blue-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('/assets/hero-section/Image 1.png')] bg-cover bg-center opacity-40 rounded-b-3xl"></div>
        <div className="relative z-10 w-full max-w-2xl mx-auto text-center p-8 bg-white/80 rounded-3xl shadow-lg">
          <h1 className="text-5xl md:text-6xl font-extrabold text-primary mb-4 tracking-tight drop-shadow-lg">Find your next stay</h1>
          <p className="text-lg md:text-xl text-gray-700 mb-6">Book unique homes and experiences around the world.</p>
          <div className="flex items-center gap-2 bg-white rounded-full shadow px-4 py-2 w-full max-w-lg mx-auto">
            <input
              type="text"
              placeholder="Search destinations, properties, or experiences"
              className="flex-1 bg-transparent outline-none px-2 py-2 text-lg rounded-full"
            />
            <button className="bg-primary text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-primary-dark transition">Search</button>
          </div>
        </div>
      </section>

      {/* Filter Pills */}
      <section className="flex flex-wrap justify-center gap-3 py-8 px-4">
        {filters.map((filter) => (
          <Pill 
            key={filter} 
            label={filter} 
            onClick={() => setActiveFilter(filter)}
            variant={activeFilter === filter ? 'primary' : 'secondary'}
            className={`cursor-pointer px-6 py-2 rounded-full font-medium shadow transition-all duration-200 ${activeFilter === filter ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-primary/10'}`}
          />
        ))}
      </section>

      {/* Property Listings */}
      <section className="px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No properties found matching your criteria.</p>
              </div>
            )}
          </div>
        )}
      </section>
    </Layout>
  );
}
