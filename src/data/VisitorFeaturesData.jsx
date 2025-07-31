import {
  SearchOutlined,
  DollarOutlined,
  HeartOutlined,
  SafetyOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

export const visitorFeatures = [
  {
    id: 1,
    title: "Smart Search",
    description:
      "Find properties using filters for location, price range, and property type.",
    icon: <SearchOutlined />,
    status: "live",
    progress: 100,
    related: [3],
  },
  {
    id: 3,
    title: "Price Alerts",
    description:
      "Get instant notifications when prices drop on your saved properties.",
    icon: <DollarOutlined />,
    status: "live",
    progress: 100,
    related: [1, 5],
  },
  {
    id: 5,
    title: "Saved Properties",
    description: "Bookmark your favorite listings and access them anytime.",
    icon: <HeartOutlined />,
    status: "live",
    progress: 100,
    related: [3, 6],
  },
  {
    id: 6,
    title: "Verified Listings",
    description:
      "All properties are authenticated for accuracy and availability.",
    icon: <SafetyOutlined />,
    status: "live",
    progress: 100,
    related: [5],
  },
];
