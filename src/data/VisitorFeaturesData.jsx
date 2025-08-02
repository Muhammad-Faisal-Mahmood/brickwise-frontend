import {
  SearchOutlined,
  DollarOutlined,
  HeartOutlined,
  SafetyOutlined,
  MessageOutlined,
  UserOutlined,
  CalculatorOutlined,
  CustomerServiceOutlined,
  // ArrowRightOutlined,
  // ThunderboltOutlined,
  // CheckCircleOutlined, // ✅ use this instead of ShieldCheckOutlined
  BellOutlined,
} from "@ant-design/icons";

export const visitorFeatures = [
  {
    id: 1,
    title: "Smart Search",
    description:
      "Find properties using advanced filters for location, price range, property type, bedrooms, and more.",
    icon: <SearchOutlined />,
    status: "live",
    progress: 100,
    related: [2, 3],
    color: "#1890ff",
  },
  {
    id: 2,
    title: "Real-Time Chat",
    description:
      "Connect instantly with verified dealers through our secure messaging system.",
    icon: <MessageOutlined />,
    status: "live",
    progress: 100,
    related: [4, 6],
    color: "#52c41a",
  },
  {
    id: 3,
    title: "Favorite Properties",
    description:
      "Save your favorite listings and create personalized property collections.",
    icon: <HeartOutlined />,
    status: "live",
    progress: 100,
    related: [1],
    color: "#eb2f96",
  },
  {
    id: 4,
    title: "Verified Dealers",
    description:
      "All dealers are thoroughly vetted and verified for your safety and trust.",
    icon: <UserOutlined />,
    status: "live",
    progress: 100,
    related: [2, 6],
    color: "#722ed1",
  },
  // {
  //   id: 5,
  //   title: "Price Alerts",
  //   description:
  //     "Get instant notifications when prices drop on your saved properties.",
  //   icon: <BellOutlined />,
  //   status: "live",
  //   progress: 100,
  //   related: [3, 1],
  //   color: "#fa8c16",
  // },
  {
    id: 6,
    title: "Verified Listings",
    description:
      "All properties are authenticated and verified for accuracy and availability.",
    icon: <SafetyOutlined />,
    status: "live",
    progress: 100,
    related: [4, 2],
    color: "#13c2c2",
  },
  {
    id: 7,
    title: "Cost Estimator",
    description:
      "Calculate construction costs with our intelligent property cost estimation tool.",
    icon: <CalculatorOutlined />,
    status: "live",
    progress: 100,
    related: [1, 8],
    color: "#fa541c",
  },
  {
    id: 8,
    title: "24/7 Support",
    description: "Get help anytime with our dedicated customer support team.",
    icon: <CustomerServiceOutlined />,
    status: "live",
    progress: 100,
    related: [7, 2],
    color: "#2f54eb",
  },
];
