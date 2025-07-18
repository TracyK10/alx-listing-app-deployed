import React from "react";
import Layout from "@/components/layout/Layout";
import Pill from "@/components/common/Pill";
import Card from "@/components/common/Card";
import { PROPERTYLISTINGSAMPLE } from "@/constants";

const filters = ["All", "Hotels", "Apartments", "Villas", "Cabins"];

export default function HomePage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="relative h-[60vh] bg-cover bg-center flex items-center justify-center text-white"
      >
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
      <section className="flex flex-wrap justify-center gap-2 py-6">
        {filters.map((filter) => (
          <Pill key={filter} label={filter} />
        ))}
      </section>

      {/* Property Listings */}
      <section className="px-4 py-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {PROPERTYLISTINGSAMPLE.map((property) => (
          <Card key={property.id} {...property} />
        ))}
      </section>
    </Layout>
  );
}
