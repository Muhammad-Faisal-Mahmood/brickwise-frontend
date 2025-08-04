import { Card, Tooltip, Button, message, Tag } from "antd";
import Meta from "antd/es/card/Meta";
import React, { useState } from "react";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useFavorites } from "../../../../hooks/useFavorites";
import InquireModal from "./InquireModal";
import { useNavigate } from "react-router-dom";

const PropertyCard = ({
  id,
  title,
  description,
  location,
  price,
  dealerName,
  imgUrl,
  purpose,
  onFavorite, // optional callback
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Check if this property is in favorites
  const isFavorite = favorites.some((fav) => fav.id === id);

  const handleInquireSubmit = (data) => {
    messageApi.open({
      type: "success",
      content: "Query sent to admin!",
    });
  };

  const handleFavourite = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      messageApi.open({
        type: "info",
        content: "Login to add properties to favourites",
      });
      return;
    }
    if (isFavorite) {
      removeFromFavorites(id);
    } else {
      addToFavorites(id);
    }
  };
  return (
    <div className="relative">
      {contextHolder}
      {/* Top overlay: badge + favorite icon */}
      <div className="absolute top-2 left-2 right-2 z-10 flex justify-between items-center">
        <Tag
          color={purpose === "sale" ? "green" : "gold"}
          className="uppercase font-medium"
        >
          {purpose === "sale" ? "For Sale" : "Rental"}
        </Tag>

        <Tooltip
          placement="top"
          title={isFavorite ? "Remove from favourites" : "Add to favourites"}
        >
          <button
            onClick={handleFavourite}
            className="bg-white border border-gray-300 rounded-full 
            h-8 w-8 flex items-center justify-center
            hover:bg-gray-100 shadow"
          >
            {isFavorite ? (
              <HeartFilled className="text-red-600 text-lg" />
            ) : (
              <HeartOutlined className="text-red-600 text-lg" />
            )}
          </button>
        </Tooltip>
      </div>

      <Card
        hoverable
        onClick={() => navigate("/listings/" + id)}
        // style={{ width: 300 }}
        className="w-[300px] "
        cover={
          <div className="h-72  overflow-hidden z-0">
            <img
              alt="Property"
              src={imgUrl}
              className="w-full h-full object-cover"
            />
          </div>
        }
      >
        <Meta
          title={title}
          description={<p className="line-clamp-2">{description}</p>}
        />

        {/* Extra info */}
        <div className="mt-2 space-y-1 text-primary-subHeading dark:text-dark-subHeading text-sm">
          <div>
            <strong>Location:</strong> {location}
          </div>
          <div>
            <strong>{purpose === "rent" ? "Rent:" : "Price:"}</strong> {price}
          </div>
          <div>
            <strong>Dealer:</strong>{" "}
            <span className="capitalize">{dealerName}</span>
          </div>
        </div>

        {/* Inquire button */}
        <div className="mt-4">
          <Button
            type="primary"
            block
            onClick={(e) => {
              e.stopPropagation(); // stop the click from reaching the Card
              if (!isAuthenticated) {
                messageApi.open({
                  type: "info",
                  content: "Login to inquire about properties",
                });
                return;
              }
              setModalOpen(true);
            }}
          >
            Inquire
          </Button>
        </div>
      </Card>

      <InquireModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        propertyId={id} // ideally pass real id
        propertyName={title}
        onSubmit={handleInquireSubmit}
      />
    </div>
  );
};

export default PropertyCard;
