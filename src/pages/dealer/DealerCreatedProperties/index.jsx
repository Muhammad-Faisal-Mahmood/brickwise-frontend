// src/pages/dealer/DealerCreatedProperties.jsx
import PropertyTable from "../../../components/PropertyTable";

export default () => (
  <PropertyTable
    apiEndpoint="/properties/my-properties"
    showDealerColumn={false}
  />
);
