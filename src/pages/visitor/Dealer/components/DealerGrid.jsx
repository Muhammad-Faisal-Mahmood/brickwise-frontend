import DealerCard from "./DealerCard";

const DealerGrid = ({ dealers }) => {
  if (dealers.length == 0) {
    return (
      <h1 className="text-base lg:text-2xl text-center font-medium text-primary-heading dark:text-dark-heading">
        {" "}
        No available dealers
      </h1>
    );
  }
  return (
    <div className="mx-auto ">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  justify-items-center">
        {dealers.map((dealer) => (
          <DealerCard
            key={dealer.id}
            id={dealer.id}
            name={dealer.name}
            city={dealer.city}
            rating={dealer.rating}
            reviewsCount={dealer.reviewsCount}
            imgUrl={dealer.profileImageUrl}
            phone={dealer.phone}
          />
        ))}
      </div>
    </div>
  );
};

export default DealerGrid;
