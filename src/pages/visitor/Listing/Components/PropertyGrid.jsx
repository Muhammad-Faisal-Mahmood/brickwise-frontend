import PropertyCard from "./PropertyCard";

const PropertyGrid = ({ filteredProperties }) => {
  if (filteredProperties.length == 0) {
    return null;
  }
  return (
    <div className="mx-auto">
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  justify-items-center">
        {filteredProperties.map((property) => (
          <PropertyCard
            key={property.id}
            id={property.id}
            title={property.title}
            description={property.description}
            location={property.location}
            price={
              "PKR " +
              property.price.toLocaleString() +
              (property.purpose === "rent" ? " /month" : "")
            }
            dealerName={property.dealerName}
            imgUrl={property.mainImage}
            purpose={property.purpose}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyGrid;
