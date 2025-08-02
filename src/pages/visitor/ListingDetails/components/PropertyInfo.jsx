import React, { useState } from "react";
import { Tag, Tooltip, Button } from "antd";
import { useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  DollarOutlined,
  ShopOutlined,
  UserOutlined,
  EnvironmentOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ApartmentOutlined,
  BuildOutlined,
  BarsOutlined,
  ExpandOutlined,
  FireOutlined,
  SmileOutlined,
  ThunderboltOutlined,
  MessageOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import InquireModal from "../../Listing/Components/InquireModal"; // Adjust path as needed

const PropertyInfo = ({
  title,
  description,
  price,
  dealerName,
  dealerId,
  location,
  purpose,
  type,
  status,
  bedrooms,
  bathrooms,
  floors,
  size,
  newConstruction,
  petFriendly,
  swimmingPool,
  propertyId, // Add this prop
}) => {
  const navigate = useNavigate();
  const [inquireModalOpen, setInquireModalOpen] = useState(false);

  const handleInquireClick = () => {
    setInquireModalOpen(true);
  };

  const handleInquireClose = () => {
    setInquireModalOpen(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "success";
      case "pending":
        return "warning";
      case "sold":
        return "default";
      default:
        return "error";
    }
  };

  const getPurposeColor = (purpose) => {
    return purpose === "sale" ? "red" : "gold";
  };

  return (
    <div className="space-y-4 mt-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl text-primary-heading dark:text-dark-heading font-semibold">
          {title}
        </h2>

        {/* Inquire Button */}
        <Tooltip placement="top" title="Have a chat with the dealer">
          <Button
            type="primary"
            size="large"
            icon={<MessageOutlined />}
            onClick={handleInquireClick}
            className="btn-primary self-start sm:self-auto"
          >
            Inquire Now
          </Button>
        </Tooltip>
      </div>

      <p className="text-primary-subHeading dark:text-dark-subHeading leading-relaxed">
        {description}
      </p>

      {/* Main info as tags */}
      <div className="flex items-center gap-2 flex-wrap mt-4">
        <Tag
          color="blue"
          icon={<DollarOutlined />}
          className="text-sm font-medium px-3 py-1"
        >
          {purpose === "sale" ? "Price:" : "Rent:"} PKR {price.toLocaleString()}
          {purpose === "sale" ? "" : "/ month"}
        </Tag>

        <Tag
          color="geekblue"
          icon={<HomeOutlined />}
          className="text-sm font-medium px-3 py-1"
        >
          Type: {type}
        </Tag>

        <Tooltip placement="top" title="View dealer profile">
          <Tag
            color="purple"
            icon={<UserOutlined />}
            className="cursor-pointer hover:shadow-md hover:scale-105 transition-all duration-200 text-sm font-medium px-3 py-1"
            onClick={() => navigate(`/dealers/${dealerId}`)}
          >
            Dealer: <span className="capitalize">{dealerName}</span>
          </Tag>
        </Tooltip>

        <Tag
          color="green"
          icon={<EnvironmentOutlined />}
          className="text-sm font-medium px-3 py-1"
        >
          {location}
        </Tag>

        <Tag
          color={getPurposeColor(purpose)}
          icon={purpose === "sale" ? <ShopOutlined /> : <BuildOutlined />}
          className="text-sm font-medium px-3 py-1"
        >
          {purpose === "sale" ? "For Sale" : "For Rent"}
        </Tag>

        <Tag
          color={getStatusColor(status)}
          icon={
            status === "available" ? (
              <CheckCircleOutlined />
            ) : (
              <ExclamationCircleOutlined />
            )
          }
          className="text-sm font-medium px-3 py-1"
        >
          Status: {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      </div>

      {/* Detailed specs */}
      <div className="bg-white dark:bg-dark-accent p-4 rounded-lg border border-gray-200 dark:border-dark-surface">
        <h3 className="text-lg font-semibold text-primary-heading dark:text-dark-heading mb-3">
          Property Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-primary-subHeading dark:text-dark-subHeading">
          {bedrooms !== null && (
            <div className="flex items-center gap-3 p-2 rounded-lg  dark:bg-dark-surface">
              <ApartmentOutlined className="text-blue-500 text-lg" />
              <span className="font-medium">
                {bedrooms} {bedrooms === 1 ? "Bedroom" : "Bedrooms"}
              </span>
            </div>
          )}

          {bathrooms !== null && (
            <div className="flex items-center gap-3 p-2 rounded-lg  dark:bg-dark-surface">
              <BuildOutlined className="text-indigo-500 text-lg" />
              <span className="font-medium">
                {bathrooms} {bathrooms === 1 ? "Bathroom" : "Bathrooms"}
              </span>
            </div>
          )}

          {floors !== null && (
            <div className="flex items-center gap-3 p-2 rounded-lg dark:bg-dark-surface">
              <BarsOutlined className="text-orange-500 text-lg" />
              <span className="font-medium">
                {floors} {floors === 1 ? "Floor" : "Floors"}
              </span>
            </div>
          )}

          {size !== null && (
            <div className="flex items-center gap-3 p-2 rounded-lg  dark:bg-dark-surface">
              <ExpandOutlined className="text-green-500 text-lg" />
              <span className="font-medium">{size} sq ft</span>
            </div>
          )}

          {newConstruction !== null && (
            <div className="flex items-center gap-3 p-2 rounded-lg  dark:bg-dark-surface">
              <FireOutlined className="text-red-500 text-lg" />
              <span className="font-medium">
                {newConstruction ? "New Construction" : "Existing Property"}
              </span>
            </div>
          )}

          {petFriendly !== null && (
            <div className="flex items-center gap-3 p-2 rounded-lg  dark:bg-dark-surface">
              <SmileOutlined className="text-yellow-500 text-lg" />
              <span className="font-medium">
                {petFriendly ? "Pet Friendly" : "No Pets"}
              </span>
            </div>
          )}

          {swimmingPool !== null && (
            <div className="flex items-center gap-3 p-2 rounded-lg  dark:bg-dark-surface">
              <ThunderboltOutlined className="text-teal-500 text-lg" />
              <span className="font-medium">
                {swimmingPool ? "Swimming Pool" : "No Pool"}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Additional CTA Section */}

      {/* Inquire Modal */}
      {inquireModalOpen && (
        <InquireModal
          open={inquireModalOpen}
          onClose={handleInquireClose}
          propertyId={propertyId}
          propertyName={title}
        />
      )}
    </div>
  );
};

export default PropertyInfo;
