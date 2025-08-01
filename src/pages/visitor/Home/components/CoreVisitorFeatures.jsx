import { Card } from "antd";
import {
  SearchOutlined,
  NotificationOutlined,
  CheckOutlined,
} from "@ant-design/icons";

export default function CoreVisitorFeatures() {
  return (
    <div className="mt-16 md:mt-32 mb-8 w-full md:mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      <Card className="hover:shadow-md transition-shadow h-full">
        <div className="flex items-start">
          <div className="bg-blue-100 px-4 py-3 rounded-full mr-4">
            <SearchOutlined className="text-blue-600 text-xl" />
          </div>
          <div>
            <h3 className="font-semibold">Advanced Search</h3>
            <p className="text-primary-subHeading text-sm">
              Filter by location, price, bedrooms, and more
            </p>
          </div>
        </div>
      </Card>

      <Card className="hover:shadow-md transition-shadow h-full">
        <div className="flex items-start">
          <div className="bg-purple-100 px-4 py-3 rounded-full mr-4">
            <NotificationOutlined className="text-purple-600 text-xl" />
          </div>
          <div>
            <h3 className="font-semibold">Instant Alerts</h3>
            <p className="text-primary-subHeading text-sm">
              Get notified when prices drop on your favorite properties
            </p>
          </div>
        </div>
      </Card>

      <Card className="hover:shadow-md transition-shadow h-full">
        <div className="flex items-start">
          <div className="bg-green-100 px-4 py-3 rounded-full mr-4">
            <CheckOutlined className="text-green-600 text-xl" />
          </div>
          <div>
            <h3 className="font-semibold">Verified Listings</h3>
            <p className="text-primary-subHeading text-sm">
              All properties are authenticated for accuracy
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
