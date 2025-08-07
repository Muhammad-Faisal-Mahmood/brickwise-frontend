import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Input, Button, message, Radio } from "antd";
import * as Yup from "yup";
import {
  UserOutlined,
  MailOutlined,
  MessageOutlined,
  SendOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import useContactUs from "../../../hooks/useContactUs";

const ContactUs = () => {
  const { submitContactUs } = useContactUs();
  const [messageApi, contextHolder] = message.useMessage();

  const initialValues = {
    name: "",
    email: "",
    subject: "",
    message: "",
    queryType: "dealer",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    subject: Yup.string().required("Subject is required"),
    message: Yup.string().required("Message is required"),
    queryType: Yup.string().required("Please select a query type"),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const msg = await submitContactUs(values);
      resetForm();
      messageApi.open({ type: "success", content: msg });
    } catch (error) {
      messageApi.open({ type: "error", content: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative rounded-xl min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-dark-accent dark:via-neutral-950 dark:to-dark-backDrop flex items-center justify-center px-4 md:px-6 lg:px-8 py-10">
      {contextHolder}

      {/* Background animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-pink-200 dark:bg-pink-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-8 lg:py-16">
        {/* Left */}
        <div className="lg:col-span-5 space-y-8 text-center lg:text-left px-4 md:px-6 lg:px-0">
          <div className="space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg mb-6 mx-auto lg:mx-0">
              <MessageOutlined className="text-3xl text-white" />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent leading-tight">
              Let's Start a
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Conversation
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-md mx-auto lg:mx-0">
              We're here to help you with all your real estate needs. Get in
              touch and let's make your property dreams come true.
            </p>
          </div>

          {/* Info Cards */}
          <div className="space-y-4">
            {[
              {
                icon: (
                  <PhoneOutlined className="text-blue-600 dark:text-blue-400 text-lg" />
                ),
                title: "Call Us",
                text: "+92 300 1234567",
                bg: "bg-blue-100 dark:bg-blue-900",
              },
              {
                icon: (
                  <EnvironmentOutlined className="text-green-600 dark:text-green-400 text-lg" />
                ),
                title: "Visit Us",
                text: "Ichra Bazaar, Lahore.",
                bg: "bg-green-100 dark:bg-green-900",
              },
              {
                icon: (
                  <ClockCircleOutlined className="text-purple-600 dark:text-purple-400 text-lg" />
                ),
                title: "Working Hours",
                text: "Mon - Fri: 9AM - 6PM",
                bg: "bg-purple-100 dark:bg-purple-900",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white/80 dark:bg-transparent backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center space-x-4 p-5 md:p-6">
                  <div
                    className={`flex items-center justify-center w-12 h-12 ${item.bg} rounded-xl`}
                  >
                    {item.icon}
                  </div>
                  <div className="flex items-start flex-col">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {item.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Form */}
        <div className="lg:col-span-7 px-4 md:px-6 lg:px-0">
          <div className="bg-white/90 dark:bg-transparent backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-gray-700 shadow-2xl p-6 sm:p-8 md:p-10 lg:p-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Send us a Message
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Fill out the form below and we'll get back to you within 24
                hours
              </p>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-5 md:space-y-6">
                  {[
                    {
                      name: "name",
                      placeholder: "Your Full Name",
                      icon: <UserOutlined className="text-gray-400" />,
                    },
                    {
                      name: "email",
                      placeholder: "your.email@example.com",
                      icon: <MailOutlined className="text-gray-400" />,
                    },
                    { name: "subject", placeholder: "Subject of your message" },
                  ].map((field, idx) => (
                    <div key={idx} className="space-y-2">
                      <Field name={field.name}>
                        {({ field: f }) => (
                          <Input
                            {...f}
                            placeholder={field.placeholder}
                            size="large"
                            prefix={field.icon}
                            className="h-14 rounded-xl border-gray-200 dark:border-gray-600 focus:border-blue-500 hover:border-blue-400 transition-colors"
                          />
                        )}
                      </Field>
                      <ErrorMessage
                        name={field.name}
                        component="div"
                        className="text-red-500 text-sm ml-2"
                      />
                    </div>
                  ))}

                  {/* Query Type */}
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold  text-gray-700 dark:text-gray-300 ml-2">
                      What is your query about?
                    </label>
                    <Field name="queryType">
                      {({ field, form }) => (
                        <Radio.Group
                          onChange={(e) =>
                            form.setFieldValue("queryType", e.target.value)
                          }
                          value={field.value}
                          className="grid grid-cols-2 md:grid-cols-3 gap-3 ant-radio-no-border"
                        >
                          {["dealer", "property", "other"].map((val) => (
                            <Radio.Button
                              key={val}
                              value={val}
                              className="h-12 rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-blue-400 checked:border-blue-500 text-center flex items-center justify-center font-medium transition-all duration-200"
                            >
                              {val.charAt(0).toUpperCase() + val.slice(1)}
                            </Radio.Button>
                          ))}
                        </Radio.Group>
                      )}
                    </Field>
                    <ErrorMessage
                      name="queryType"
                      component="div"
                      className="text-red-500 text-sm ml-2"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Field name="message">
                      {({ field }) => (
                        <Input.TextArea
                          {...field}
                          placeholder="Tell us more about your query..."
                          rows={5}
                          className="rounded-xl border-gray-200 dark:border-gray-600 focus:border-blue-500 hover:border-blue-400 transition-colors resize-none"
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="message"
                      component="div"
                      className="text-red-500 text-sm ml-2"
                    />
                  </div>

                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isSubmitting}
                    icon={<SendOutlined />}
                    className="w-full h-14 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 border-none shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-lg font-semibold"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
