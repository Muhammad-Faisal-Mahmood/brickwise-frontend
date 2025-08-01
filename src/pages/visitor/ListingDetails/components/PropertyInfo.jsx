import React from "react";
import { Tag, Tooltip } from "antd";
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
} from "@ant-design/icons";

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
}) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4 mt-4">
      <h2 className="text-2xl text-primary-heading dark:text-dark-heading font-semibold">
        {title}
      </h2>
      <p className="text-primary-subHeading dark:text-dark-heading">
        {description}
      </p>

      {/* Main info as tags */}
      <div className="flex items-center gap-2 flex-wrap mt-2">
        <Tag color="blue" icon={<DollarOutlined />}>
          {purpose === "sale" ? "Price:" : "Rent:"} PKR {price.toLocaleString()}
          {purpose === "sale" ? "" : "/ month"}
        </Tag>
        <Tag color="geekblue" icon={<HomeOutlined />}>
          Type: {type}
        </Tag>
        <Tooltip title="View dealer profile">
          <Tag
            color="purple"
            icon={<UserOutlined />}
            className="cursor-pointer hover:shadow hover:scale-105 transition"
            onClick={() => navigate(`/dealers/${dealerId}`)}
          >
            Dealer: {dealerName}
          </Tag>
        </Tooltip>
        <Tag color="green" icon={<EnvironmentOutlined />}>
          {location}
        </Tag>
        <Tag
          color={purpose === "sale" ? "red" : "gold"}
          icon={purpose === "sale" ? <ShopOutlined /> : <BuildOutlined />}
        >
          {purpose === "sale" ? "For Sale" : "Rental"}
        </Tag>
        <Tag
          color={status === "available" ? "green" : "volcano"}
          icon={
            status === "available" ? (
              <CheckCircleOutlined />
            ) : (
              <ExclamationCircleOutlined />
            )
          }
        >
          Status: {status}
        </Tag>
      </div>

      {/* Detailed specs */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4 text-primary-subHeading dark:text-dark-heading">
        {bedrooms !== null && (
          <div className="flex items-center gap-2">
            <ApartmentOutlined className="text-blue-500" />
            <span className="font-medium">Bedrooms: {bedrooms}</span>
          </div>
        )}
        {bathrooms !== null && (
          <div className="flex items-center gap-2">
            <BuildOutlined className="text-indigo-500" />
            <span className="font-medium">Bathrooms: {bathrooms}</span>
          </div>
        )}
        {floors !== null && (
          <div className="flex items-center gap-2">
            <BarsOutlined className="text-orange-500" />
            <span className="font-medium">Floors: {floors}</span>
          </div>
        )}
        {size !== null && (
          <div className="flex items-center gap-2">
            <ExpandOutlined className="text-green-500" />
            <span className="font-medium">Size: {size} sq ft</span>
          </div>
        )}
        {newConstruction !== null && (
          <div className="flex items-center gap-2">
            <FireOutlined className="text-red-500" />
            <span className="font-medium">
              {newConstruction ? "New Construction" : "Old Construction"}
            </span>
          </div>
        )}
        {petFriendly !== null && (
          <div className="flex items-center gap-2">
            <SmileOutlined className="text-yellow-500" />
            <span className="font-medium">
              {petFriendly ? "Pet Friendly" : "No Pets Allowed"}
            </span>
          </div>
        )}
        {swimmingPool !== null && (
          <div className="flex items-center gap-2">
            <ThunderboltOutlined className="text-teal-500" />
            <span className="font-medium">
              {swimmingPool ? "Swimming Pool" : "No Pool"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyInfo;
