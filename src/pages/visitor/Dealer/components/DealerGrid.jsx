import DealerCard from "./DealerCard";

const DealerGrid = ({ dealers }) => {
  return (
    <div className="mx-auto ">
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  justify-items-center">
        {dealers.map((dealer) => (
          <DealerCard
            key={dealer.id}
            id={dealer.id}
            name={dealer.name}
            city={dealer.city}
            rating={dealer.rating}
            reviewsCount={dealer.reviewsCount}
            imgUrl={dealer.imgUrl}
            phone={dealer.phone}
          />
        ))}
      </div>
    </div>
  );
};

export default DealerGrid;
