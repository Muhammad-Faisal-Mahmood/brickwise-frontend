import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, List, Spin, Avatar, Typography, Divider } from "antd";
import { motion } from "framer-motion";
import {
  fetchUserInquiries,
  getInquiryById,
  addResponse,
  fetchDealerInquiries,
} from "../../../redux/features/inquirySlice";
import InquiryChatPanel from "./components/InquiryChatPanel";
import useDealerProfile from "../../../hooks/useDealerProfile";
import usePropertyDetails from "../../../hooks/usePropertyDetails";

const { Title, Text } = Typography;

const Inquiries = () => {
  const dispatch = useDispatch();

  const [selectedInquiryId, setSelectedInquiryId] = useState(null);

  const { inquiries, selectedInquiry, loading } = useSelector(
    (state) => state.inquiries
  );

  const { user } = useSelector((state) => state.auth);

  const dealerId = selectedInquiry?.dealerId;
  const propertyId = selectedInquiry?.propertyId;

  const { dealer, loading: dealerLoading } = useDealerProfile(dealerId);
  const { property, loading: propertyLoading } = usePropertyDetails(propertyId);

  useEffect(() => {
    if (user?.role === "DEALER") {
      dispatch(fetchDealerInquiries());
    } else {
      dispatch(fetchUserInquiries());
    }
  }, [dispatch, user?.role]);

  useEffect(() => {
    if (selectedInquiryId) {
      dispatch(getInquiryById(selectedInquiryId));
    }
  }, [selectedInquiryId, dispatch]);

  return (
    <motion.div className="flex flex-col md:flex-row gap-4 p-4">
      {/* Inbox */}
      <Card className="md:w-1/3 bg-white dark:bg-dark-accent shadow rounded-2xl">
        <Title
          level={4}
          className="!text-primary-heading dark:!text-dark-heading"
        >
          My Inquiries
        </Title>
        {loading ? (
          <Spin />
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={inquiries}
            className="py-3"
            split={false} // disable default bottom border
            renderItem={(inquiry) => (
              <List.Item
                style={{ padding: "20px" }}
                onClick={() => setSelectedInquiryId(inquiry.id)}
                className={`
        cursor-pointer rounded-2xl mb-3 p-4 transition-colors
        ${
          selectedInquiryId === inquiry.id
            ? "bg-purple-200 dark:bg-primary-dark  "
            : " hover:bg-purple-100 dark:hover:bg-primary-dark/20"
        }
      `}
              >
                <List.Item.Meta
                  title={
                    <span className="text-primary-heading dark:text-dark-heading">
                      Property: {property?.title}
                    </span>
                  }
                  description={
                    <span className="text-primary-subHeading dark:text-dark-subHeading">
                      Initial inquiry: {inquiry.initialMessage}
                    </span>
                  }
                />
              </List.Item>
            )}
          />
        )}
      </Card>

      {/* Right panel */}
      <div className="flex-1 flex flex-col gap-4">
        {selectedInquiry ? (
          <>
            {/* Chat panel */}
            <InquiryChatPanel currentUser={user} inquiry={selectedInquiry} />

            {/* Dealer & Property cards side by side */}
            <div className="flex flex-col md:flex-row gap-4">
              {/* Dealer card */}
              <Card
                loading={dealerLoading}
                title={
                  <span className="text-primary-heading dark:text-dark-heading">
                    Dealer Info
                  </span>
                }
                className="flex-1 bg-white dark:bg-dark-accent shadow rounded-2xl"
              >
                {dealer ? (
                  <div className="flex items-center gap-3">
                    <Avatar src={dealer.profilePhoto} size={50}>
                      {dealer.name?.charAt(0)}
                    </Avatar>
                    <div>
                      <Text className="text-primary-heading dark:text-dark-heading font-medium">
                        {dealer.name}
                      </Text>
                      <br />
                      <Text type="secondary">{dealer.email}</Text>
                      <br />
                      <Text type="secondary">{dealer.phone}</Text>
                    </div>
                  </div>
                ) : (
                  <Text type="secondary">Dealer not found</Text>
                )}
              </Card>

              {/* Property card */}
              <Card
                loading={propertyLoading}
                title={
                  <span className="text-primary-heading dark:text-dark-heading">
                    Property Info
                  </span>
                }
                className="flex-1 bg-white dark:bg-dark-accent shadow rounded-2xl"
              >
                {property ? (
                  <div className="flex items-center gap-3">
                    <Avatar shape="square" size={50} src={property.mainImage} />
                    <div>
                      <Text className="text-primary-heading dark:text-dark-heading font-medium">
                        {property.title}
                      </Text>
                      <br />
                      <Text type="secondary">{property.location}</Text>
                      <br />
                      <Text type="secondary">Price: ${property.price}</Text>
                    </div>
                  </div>
                ) : (
                  <Text type="secondary">Property not found</Text>
                )}
              </Card>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-primary-subHeading dark:text-dark-subHeading">
            Select an inquiry to view conversation & details
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Inquiries;
