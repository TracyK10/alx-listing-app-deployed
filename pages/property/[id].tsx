import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import PropertyDetail from "@/components/property/PropertyDetail";
import { Property } from "@/interfaces";
import Head from "next/head";
import Layout from "@/components/layout/Layout";

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

interface PropertyDetailPageProps {
  initialProperty?: Property;
  error?: string;
}

export default function PropertyDetailPage({ initialProperty, error: serverError }: PropertyDetailPageProps) {
  const router = useRouter();
  const id = router.query.id as string | undefined;
  const [property, setProperty] = useState<Property | null>(initialProperty || null);
  const [loading, setLoading] = useState(!initialProperty);
  const [error, setError] = useState<string | null>(serverError || null);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id || initialProperty) return;
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get<DummyJSONProduct>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`
        );
        
        // Transform DummyJSON product to our Property interface
        const transformedProperty: Property = {
          id: response.data.id.toString(),
          title: response.data.title,
          description: response.data.description,
          location: `${response.data.brand || 'Unknown'}, ${response.data.category || 'Unknown'}`,
          type: response.data.category || 'Product',
          price: response.data.price,
          bedrooms: Math.floor(Math.random() * 4) + 1,
          bathrooms: Math.floor(Math.random() * 3) + 1,
          area: Math.floor(Math.random() * 200) + 50,
          imageUrl: response.data.thumbnail || response.data.images?.[0] || '/images/placeholder.jpg',
          rating: response.data.rating || 4.5,
          amenities: ['wifi', 'parking', 'kitchen', 'tv', 'ac'],
          isAvailable: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          guests: Math.floor(Math.random() * 6) + 2,
          reviewCount: Math.floor(Math.random() * 100) + 10
        };

        setProperty(transformedProperty);
      } catch (err) {
        console.error("Error fetching property details:", err);
        setError("An error occurred while loading the property. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [initialProperty, id]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (error || !property) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Property Not Found</h1>
          <p className="text-gray-600 mb-6">
            {error || "The property you're looking for doesn't exist or has been removed."}
          </p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Back to Home
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>{property.title} | Property Listing</title>
        <meta name="description" content={property.description || property.title} />
        <meta property="og:title" content={property.title} />
        <meta property="og:description" content={property.description || property.title} />
        {property.imageUrl && <meta property="og:image" content={property.imageUrl} />}
      </Head>
      
      <PropertyDetail property={property} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // In a real app, you would fetch the property data from your API here
    // For now, we'll return null and let the client-side fetch handle it
    return {
      props: {
        initialProperty: null,
      },
    };
    // Uncomment this in production when your API is ready
    /*
    // const { id } = context.params as { id: string };
    // const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/properties/${id}`);
    // if (!response.data.success) {
    //   return {
    //     props: {
    //       error: response.data.message || 'Failed to load property',
    //     },
    //   };
    // }
    // return {
    //   props: {
    //     initialProperty: response.data.data,
    //   },
    // };
    */
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {
        error: 'An error occurred while loading the property',
      },
    };
  }
};
