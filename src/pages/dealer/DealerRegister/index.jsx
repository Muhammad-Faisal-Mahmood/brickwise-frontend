import { Button, message } from "antd";
import DealerRegisterForm from "./components/DealerRegisterForm";
import { ArrowLeftOutlined } from "@ant-design/icons";

const DealerRegister = () => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      {contextHolder}
      <div className="max-w-md md:max-w-3xl lg:max-w-5xl w-full space-y-4 p-8  rounded-lg shadow-xl border bg-white dark:bg-dark-accent border-gray-200 dark:border-gray-700">
        <Button
          icon={<ArrowLeftOutlined />}
          type="link"
          onClick={() => window.history.back()}
          className="dark:text-dark-heading"
        >
          Back
        </Button>
        <h2 className="text-center text-3xl font-extrabold text-primary-heading dark:text-dark-heading">
          Register as a Property Dealer
        </h2>
        <p className="text-center text-sm text-primary-subHeading dark:text-dark-subHeading">
          Provide your details to get started.
        </p>
        <DealerRegisterForm />
      </div>
    </div>
  );
};

export default DealerRegister;
