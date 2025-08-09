import React from "react";
import { DollarSign, MapPin, Home, Target } from "lucide-react";

const PropertyOverview = ({ property }) => (
  <div className="bg-primary-backDrop dark:bg-dark-backDrop p-6 rounded-xl border border-gray-200 dark:border-dark-accent shadow-sm">
    <h3 className="text-lg font-semibold text-primary-heading dark:text-dark-heading mb-4">
      Property Overview
    </h3>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* Price */}
      <div className="text-center p-4 bg-blue-50 dark:bg-dark-accent rounded-lg">
        <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
        <div className="font-bold text-primary-heading dark:text-dark-heading">
          PKR {(property.price / 1000000).toFixed(1)}M
        </div>
        <div className="text-sm text-primary-subHeading dark:text-dark-subHeading">
          Price
        </div>
      </div>

      {/* Area */}
      <div className="text-center p-4 bg-green-50 dark:bg-dark-accent rounded-lg">
        <Home className="w-6 h-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
        <div className="font-bold text-primary-heading dark:text-dark-heading">
          {property.size} sq ft
        </div>
        <div className="text-sm text-primary-subHeading dark:text-dark-subHeading">
          Area
        </div>
      </div>

      {/* Location */}
      <div className="text-center p-4 bg-purple-50 dark:bg-dark-accent rounded-lg">
        <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
        <div className="font-bold text-primary-heading dark:text-dark-heading">
          {property.location}
        </div>
        <div className="text-sm text-primary-subHeading dark:text-dark-subHeading">
          Location
        </div>
      </div>

      {/* Layout */}
      <div className="text-center p-4 bg-orange-50 dark:bg-dark-accent rounded-lg">
        <Target className="w-6 h-6 text-orange-600 dark:text-orange-400 mx-auto mb-2" />
        <div className="font-bold text-primary-heading dark:text-dark-heading">
          {property.bedrooms}BR/{property.bathrooms}BA
        </div>
        <div className="text-sm text-primary-subHeading dark:text-dark-subHeading">
          Layout
        </div>
      </div>
    </div>
  </div>
);

export default PropertyOverview;
