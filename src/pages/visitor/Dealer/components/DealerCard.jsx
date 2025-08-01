import { Card, Rate, message, Tooltip, Button } from "antd";
import Meta from "antd/es/card/Meta";
import { PhoneOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const DealerCard = ({
  id,
  name,
  city,
  rating,
  reviewsCount,
  imgUrl,
  phone,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(phone);
      messageApi.open({
        type: "success",
        content: "Phone number copied to clipboard",
      });
    } catch (err) {
      messageApi.open({
        type: "error",
        content: "Failed to copy",
      });
    }
  };

  return (
    <Card
      hoverable
      onClick={() => navigate("/dealers/" + id)}
      style={{ width: 280 }}
      cover={
        <div className="h-64 overflow-hidden">
          <img
            alt="Dealer"
            src={
              imgUrl == null
                ? "https://plus.unsplash.com/premium_photo-1689609950112-d66095626efb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                : imgUrl
            }
            className="w-full h-full object-cover object-top"
          />
        </div>
      }
    >
      {contextHolder}
      <Meta className="capitalize" title={name} description={city} />

      <div className="mt-2 flex items-center gap-2 text-primary-subHeading dark:text-dark-subHeading">
        <Rate disabled defaultValue={rating} allowHalf />
        <span className="text-sm">({reviewsCount} reviews)</span>
      </div>

      {/* Phone number */}
      <Tooltip title="Click to copy" className="flex gap-2 mt-4">
        <button
          onClick={handleCopyPhone}
          className="mt-2  text-primary-heading dark:text-dark-heading hover:underline text-sm"
        >
          {phone}
        </button>
        <Button
          shape="circle"
          onClick={(e) => {
            e.stopPropagation();
            handleCopyPhone();
          }}
        >
          <PhoneOutlined className="text-green-500" />
        </Button>
      </Tooltip>
    </Card>
  );
};

export default DealerCard;
