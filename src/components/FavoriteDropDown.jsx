// src/components/FavoriteDropdown.jsx
import { Dropdown, Menu, Tooltip, Button, Avatar } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HeartOutlined } from "@ant-design/icons";

const FavoriteDropdown = () => {
  const navigate = useNavigate();
  const favorites = useSelector((state) => state.favorites.propertyDetails);

  const menu = (
    <Menu className="max-w-xs">
      {favorites.length ? (
        favorites.map((property) => (
          <Menu.Item
            key={property.id}
            onClick={() => navigate(`/listings/${property.id}`)}
          >
            <div className="flex items-center gap-3">
              <Avatar
                shape="square"
                size={60}
                src={property.mainImage}
                alt={property.title}
              />
              <div className="flex flex-col overflow-hidden">
                <span className="font-medium truncate">{property.title}</span>
                <span className="text-xs text-gray-500 truncate">
                  {property.location} • Rs {property.price?.toLocaleString()}
                </span>
              </div>
            </div>
          </Menu.Item>
        ))
      ) : (
        <Menu.Item disabled>No favorites yet</Menu.Item>
      )}
    </Menu>
  );

  return (
    <Tooltip placement="top" title="View favorite properties">
      <Dropdown
        overlay={menu}
        placement="bottomRight"
        arrow
        trigger={["click"]}
      >
        <Button shape="circle" icon={<HeartOutlined />} />
      </Dropdown>
    </Tooltip>
  );
};

export default FavoriteDropdown;
