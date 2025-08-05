import { Card, Skeleton } from "antd";

const SkeletonCard = () => {
  return (
    <div className="relative">
      {/* Top overlay skeleton */}
      <div className="absolute top-2 left-2 right-2 z-10 flex justify-between items-center">
        <div className="bg-gray-200 dark:bg-gray-700 rounded px-2 py-1 w-16 h-6 animate-pulse"></div>
        <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-8 w-8 animate-pulse"></div>
      </div>

      <Card
        className="w-[300px]"
        cover={
          <div className="h-72 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
        }
      >
        {/* Title and description skeleton */}
        <div className="space-y-2">
          <Skeleton.Input active size="default" className="!w-full !h-6" />
          <div className="space-y-1">
            <Skeleton.Input active size="small" className="!w-full !h-4" />
            <Skeleton.Input active size="small" className="!w-3/4 !h-4" />
          </div>
        </div>

        {/* Extra info skeleton */}
        <div className="mt-2 space-y-2">
          <div className="flex items-center space-x-2 ">
            <Skeleton.Input active size="small" className="!w-52 !h-4" />
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton.Input active size="small" className="!w-20 !h-4" />
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton.Input active size="small" className="!w-44 !h-4" />
          </div>
        </div>

        {/* Button skeleton */}
        <div className="mt-4">
          <Skeleton.Button active size="default" className="!w-full !h-8" />
        </div>
      </Card>
    </div>
  );
};

export default SkeletonCard;
