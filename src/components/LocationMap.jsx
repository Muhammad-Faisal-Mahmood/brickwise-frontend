import React from "react";

const LocationMap = ({ address }) => {
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <iframe
      className="w-full h-80 md:h-full rounded-xl border-0"
      src={`https://www.google.com/maps/embed/v1/place?key=${googleMapsApiKey}&q=${encodeURIComponent(
        address
      )}&zoom=15`}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Property Location"
    ></iframe>
  );
};

export default LocationMap;
