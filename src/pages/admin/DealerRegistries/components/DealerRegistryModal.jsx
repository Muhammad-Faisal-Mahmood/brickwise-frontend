import { Modal, Descriptions } from "antd";

const DealerRegistryModal = ({ visible, onClose, registry }) => {
  if (!registry) return null;

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      title={`Dealer Application - ${registry.name}`}
    >
      <Descriptions column={1} bordered size="small">
        <Descriptions.Item label="Name">{registry.name}</Descriptions.Item>
        <Descriptions.Item label="Email">{registry.email}</Descriptions.Item>
        <Descriptions.Item label="Phone">
          {registry.phone || "-"}
        </Descriptions.Item>
        <Descriptions.Item label="City">
          {registry.city || "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Social Links">
          {registry.socialLinks || "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Portfolio">
          {registry.portfolio ? (
            <a
              href={registry.portfolio}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Portfolio
            </a>
          ) : (
            "-"
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Documents">
          {registry.documents ? (
            <a
              href={registry.documents}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Documents
            </a>
          ) : (
            "-"
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Status">{registry.status}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default DealerRegistryModal;
