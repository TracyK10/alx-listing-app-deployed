import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "@/components/layout/Layout";
import Pill from "@/components/common/Pill";
import PropertyCard from "@/components/property/PropertyCard";
import { Property } from "@/interfaces";

const filters = ["All", "Hotels", "Apartments", "Villas", "Cabins"];

interface ApiResponse {
  data: Property[];
  success: boolean;
  message: string;
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
  const response = await axios.get<ApiResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/properties`);
        if (response.data.success) {
          setProperties(response.data.data);
        } else {
          setError(response.data.message || "Failed to fetch properties");
        }
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
      <section className="relative h-[60vh] bg-cover bg-center flex items-center justify-center text-white" style={{
        backgroundImage: "url('/assets/hero-section/hero-bg.jpg')"
      }}>
        <div className="bg-black bg-opacity-50 p-6 rounded-xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find your favorite place here!
          </h1>
          <p className="text-lg md:text-xl">
            The best prices for over 2 million properties worldwide.
          </p>
        </div>
      </section>

      {/* Filter Pills */}
      <section className="flex flex-wrap justify-center gap-2 py-6 px-4">
        {filters.map((filter) => (
          <Pill 
            key={filter} 
            label={filter} 
            onClick={() => setActiveFilter(filter)}
            variant={activeFilter === filter ? 'primary' : 'secondary'}
            className="cursor-pointer"
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
