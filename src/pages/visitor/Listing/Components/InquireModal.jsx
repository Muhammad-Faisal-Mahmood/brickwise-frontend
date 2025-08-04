import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { createInquiry } from "../../../../redux/features/inquirySlice";

const { TextArea } = Input;

const InquireModal = ({ open, onClose, propertyId, propertyName }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.inquiries);

  const handleFinish = (values) => {
    dispatch(createInquiry({ propertyId, message: values.inquiry }));
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      open={open}
      footer={null}
      onCancel={onClose}
      centered
      style={{ padding: "1.5rem" }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col gap-4"
      >
        <div className="flex items-center justify-center">
          <h1 className="text-xl w-[80%] font-semibold text-primary-heading dark:text-dark-heading text-center">
            Inquire about {propertyName}
          </h1>
        </div>
        <p className="text-sm text-center text-primary-subHeading dark:text-dark-subHeading">
          Please share your inquiry and we'll get back to you.
        </p>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          className="space-y-3"
        >
          <Form.Item
            label="Property Name"
            name="propertyName"
            initialValue={propertyName}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="Your Inquiry"
            name="inquiry"
            rules={[{ required: true, message: "Inquiry cannot be empty" }]}
          >
            <TextArea placeholder="Type your message..." rows={4} />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Send Inquiry
          </Button>
        </Form>
      </motion.div>
    </Modal>
  );
};

export default InquireModal;
