import React from "react";
import { Tag, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";

const PropertyInfo = ({
  title,
  description,
  price,
  dealerName,
  dealerId, // <== add dealerId prop
  location,
  purpose,
}) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-2">
      <h2 className="text-2xl text-primary-heading dark:text-dark-heading font-semibold">
        {title}
      </h2>
      <p className="text-primary-subHeading dark:text-dark-heading">
        {description}
      </p>
      <div className="flex items-center gap-2 flex-wrap">
        <Tag color="blue">
          {purpose === "sale" ? "Price:" : "Rent:"} PKR {price.toLocaleString()}
          {purpose === "sale" ? "" : "/ month"}
        </Tag>
        <Tooltip title="View dealer profile">
          <Tag
            color="purple"
            className="cursor-pointer hover:shadow hover:scale-105 transition"
            onClick={() => navigate(`/dealers/${dealerId}`)}
          >
            Dealer: {dealerName}
          </Tag>
        </Tooltip>
        <Tag color="green">Location: {location}</Tag>
        <Tag color={purpose === "sale" ? "red" : "gold"}>
          {purpose === "sale" ? "For Sale" : "Rental"}
        </Tag>
      </div>
    </div>
  );
};

export default PropertyInfo;
