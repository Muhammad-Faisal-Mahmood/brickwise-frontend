import React from "react";
import { useParams } from "react-router-dom";
import MediaCarousel from "../../../components/MediaCarousel";
import PropertyInfo from "./components/PropertyInfo";
import LocationMap from "../../../components/LocationMap";
import usePropertyDetails from "../../../hooks/usePropertyDetails";

const ListingDetails = () => {
  const { id } = useParams();
  const { property, loading, error } = usePropertyDetails(id);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-lg text-gray-600">Loading property...</span>
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
  }

  if (!property) {
    return <div className="text-center mt-10">Property not found.</div>;
  }

  return (
    <>
      <div className="hidden md:flex items-center justify-center mb-20">
        <h1 className="xl:text-6xl lg:text-5xl md:text-4xl text-2xl text-primary-heading dark:text-dark-heading font-bold">
          {property.title}
        </h1>
      </div>
      <div className="container mx-auto p-4 flex flex-col md:flex-row gap-6">
        {/* Left: media + info */}
        <div className="md:w-7/12">
          <MediaCarousel media={property?.media} />
          <PropertyInfo
            title={property.title}
            description={property.description}
            price={property.price}
            dealerName={property.dealerName}
            location={property.location}
            purpose={property.purpose}
            dealerId={property.dealerId}
          />
        </div>

        {/* Right: map */}
        <div className="md:w-5/12">
          <LocationMap address={property.address} />
        </div>
      </div>
    </>
  );
};

export default ListingDetails;
