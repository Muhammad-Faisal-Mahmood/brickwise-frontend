import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Input, Button, Carousel, message, Radio } from "antd";
import * as Yup from "yup";
import MediaCarousel from "../../../components/MediaCarousel";

const ContactUs = () => {
  const initialValues = {
    name: "",
    email: "",
    subject: "",
    message: "",
    queryType: "dealer", // default selection
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

  const handleSubmit = (values, { resetForm }) => {
    console.log("Form data:", values);
    message.success("Thank you! We'll get back to you soon.");
    resetForm();
  };

  const media = [
    "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHJlYWwlMjBlc3RhdGV8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1560440021-33f9b867899d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEwfHxyZWFsJTIwZXN0YXRlfGVufDB8fDB8fHww",
    "https://plus.unsplash.com/premium_photo-1676823570630-be7b7e1ce1bb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDl8fHJlYWwlMjBlc3RhdGV8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fHJlYWwlMjBlc3RhdGV8ZW58MHx8MHx8fDA%3D",
    "https://plus.unsplash.com/premium_photo-1672423156257-9a2bc5e1f480?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODF8fHJlYWwlMjBlc3RhdGV8ZW58MHx8MHx8fDA%3D",
  ];

  return (
    <section className="  flex items-center justify-between gap-2">
      <div className="flex flex-col  md:flex-row bg-white dark:bg-dark-accent shadow-xl rounded-xl overflow-hidden w-full">
        {/* Left: Form */}
        <div className="flex-1 p-8 md:p-12 w-full lg:w-[45%] ">
          <h2 className="text-3xl font-extrabold text-primary-heading dark:text-dark-heading mb-6 text-center md:text-left">
            Contact Us
          </h2>
          <p className="text-primary-subHeading lg:hidden dark:text-dark-subHeading mb-8 text-center md:text-left">
            We'd love to hear from you! Please fill out the form and we'll get
            back to you within 24 hours.
          </p>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-5">
                <div>
                  <Field name="name">
                    {({ field }) => (
                      <Input {...field} placeholder="Name" size="large" />
                    )}
                  </Field>
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <Field name="email">
                    {({ field }) => (
                      <Input {...field} placeholder="Email" size="large" />
                    )}
                  </Field>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <Field name="subject">
                    {({ field }) => (
                      <Input {...field} placeholder="Subject" size="large" />
                    )}
                  </Field>
                  <ErrorMessage
                    name="subject"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <Field name="message">
                    {({ field }) => (
                      <Input.TextArea
                        {...field}
                        placeholder="Message"
                        rows={4}
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="message"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium text-primary-heading dark:text-dark-heading">
                    What is your query about?
                  </label>
                  <Field name="queryType">
                    {({ field, form }) => (
                      <Radio.Group
                        onChange={(e) =>
                          form.setFieldValue("queryType", e.target.value)
                        }
                        value={field.value}
                        className="flex flex-wrap gap-3"
                      >
                        <Radio
                          value="dealer"
                          className="!px-4 !py-2 !rounded-full border border-gray-300 dark:border-gray-600 hover:border-primary-brandColor1 checked:!border-primary-brandColor1 checked:!text-primary-brandColor1"
                        >
                          Dealer
                        </Radio>
                        <Radio
                          value="property"
                          className="!px-4 !py-2 !rounded-full border border-gray-300 dark:border-gray-600 hover:border-primary-brandColor1 checked:!border-primary-brandColor1 checked:!text-primary-brandColor1"
                        >
                          Property
                        </Radio>
                        <Radio
                          value="other"
                          className="!px-4 !py-2 !rounded-full border border-gray-300 dark:border-gray-600 hover:border-primary-brandColor1 checked:!border-primary-brandColor1 checked:!text-primary-brandColor1"
                        >
                          Others
                        </Radio>
                      </Radio.Group>
                    )}
                  </Field>
                  <ErrorMessage
                    name="queryType"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isSubmitting}
                  className="w-full text-white font-semibold py-2 text-lg rounded-md shadow hover:bg-primary-brandColor1Hover transition duration-300"
                >
                  Send Message
                </Button>
              </Form>
            )}
          </Formik>
        </div>
        <div className="hidden lg:block flex-1 max-h-[65vh] w-[45%]">
          <MediaCarousel
            media={media}
            arrows={false}
            dots={false}
            preview={false}
          />
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
