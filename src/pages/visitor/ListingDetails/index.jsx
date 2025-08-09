import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import MediaCarousel from "../../../components/MediaCarousel";
import PropertyInfo from "./components/PropertyInfo";
import LocationMap from "../../../components/LocationMap";
import usePropertyDetails from "../../../hooks/usePropertyDetails";
import usePropertyView from "../../../hooks/usePropertyView";
import AIPropertyAnalysis from "./components/AiPropertyAnalysis";

const ListingDetails = () => {
  const { id } = useParams();
  const { property, loading, error } = usePropertyDetails(id);
  const { trackPropertyView } = usePropertyView();

  // Track property view when component mounts and property is loaded
  useEffect(() => {
    if (property?.id && !loading && !error) {
      trackPropertyView(property.id);
    }
  }, [property?.id, loading, error, trackPropertyView]);

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
        <h1 className="xl:text-6xl text-center lg:text-5xl md:text-4xl text-2xl text-primary-heading dark:text-dark-heading font-bold">
          {property.title}
        </h1>
      </div>
      <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-6">
        {/* Left: media + info */}
        <div className="lg:w-7/12">
          <MediaCarousel
            media={[property?.mainImage, ...(property?.media || [])]}
          />

          <PropertyInfo
            propertyId={property.id}
            title={property.title}
            description={property.description}
            price={property.price}
            dealerName={property.dealerName}
            dealerId={property.dealerId}
            location={property.location}
            purpose={property.purpose}
            type={property.type}
            status={property.status}
            bedrooms={property.bedrooms}
            bathrooms={property.bathrooms}
            floors={property.floors}
            size={property.size}
            newConstruction={property.newConstruction}
            petFriendly={property.petFriendly}
            swimmingPool={property.swimmingPool}
            views={property.views} // Pass views to display if needed
          />
        </div>

        {/* Right: map */}
        <div className="lg:w-5/12">
          <div className="h-72 md:h-[450px] lg:h-[550px]">
            <LocationMap address={property.address} />
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4">
        <AIPropertyAnalysis property={property} />
      </div>
    </>
  );
};

export default ListingDetails;
