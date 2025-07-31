import PropertyCard from "./PropertyCard";

const PropertyGrid = ({ filteredProperties }) => {
  if (filteredProperties.length == 0) {
    return (
      <h1 className="text-primary-subHeading px-10 dark:text-dark-subHeading text-xl font-medium text-center pt-10">
        We can't seem to find anything for you.
      </h1>
    );
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
