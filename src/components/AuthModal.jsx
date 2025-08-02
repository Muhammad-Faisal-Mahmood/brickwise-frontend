import { useState } from "react";
import { Modal, Button, Form, Input, message } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/features/authSlice";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";

const AuthModal = ({ open, onClose }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isLogin, setIsLogin] = useState(true);
  const [showForgot, setShowForgot] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { login, register, forgotPassword } = useAuth();
  const { fetchAllFavorites } = useFavorites();
  const OAuthRedirect = import.meta.env.VITE_GOOGLE_OAUTH_LOGIN_REDIRECT;

  // Validation schemas
  const loginSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const signupSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .max(100, "Max 100 characters"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Min 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const forgotSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  // Forgot password form
  const forgotFormik = useFormik({
    initialValues: { email: "" },
    validationSchema: forgotSchema,
    onSubmit: async (values) => {
      const success = await forgotPassword(values.email);
      if (success) {
        onClose();
        navigate("/reset-password");
      }
    },
  });

  // Login / signup form
  const formik = useFormik({
    initialValues: { name: "", email: "", password: "", confirmPassword: "" },
    validationSchema: isLogin ? loginSchema : signupSchema,
    onSubmit: async (values) => {
      try {
        if (isLogin) {
          const res = await login(values.email, values.password);
          dispatch(loginSuccess(res?.data));
          fetchAllFavorites();
          messageApi.success(res?.data.message || "Login successful");
          if (res?.data?.role == "ADMIN") {
            setTimeout(() => {
              navigate("/admin/users");
            }, 1500);
          }

          if (res?.data?.role == "DEALER") {
            setTimeout(() => {
              navigate("/dealer-dashboard/created-properties");
            }, 1500);
          }
          onClose();
        } else {
          const res = await register(
            values.name,
            values.email,
            values.password
          );
          messageApi.success(res?.message || "Registered successfully");
          setIsLogin(true);
        }
      } catch (error) {
        console.log("error", error);
        messageApi.error(error?.message || "Authentication failed.");
      }
    },
  });

  const handleToggleAuthMode = () => {
    setIsLogin(!isLogin);
    formik.resetForm();
  };

  return (
    <>
      {contextHolder}
      <Modal open={open} footer={null} onCancel={onClose} centered>
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-4"
        >
          <h1 className="text-2xl font-bold text-center">
            {showForgot ? "Forgot Password" : isLogin ? "Login" : "Sign Up"}
          </h1>
          <p className="text-center text-sm">
            {showForgot
              ? "Enter your email to receive an OTP"
              : isLogin
              ? "Welcome back! Please login to continue."
              : "Welcome! Create an account to get started."}
          </p>

          {!showForgot && (
            <Link to={OAuthRedirect} className="flex gap-2">
              <Button icon={<GoogleOutlined />} block>
                Google
              </Button>
            </Link>
          )}

          {showForgot ? (
            <Form layout="vertical" onFinish={forgotFormik.handleSubmit}>
              <Form.Item
                label="Email"
                name="email"
                validateStatus={
                  forgotFormik.errors.email && forgotFormik.touched.email
                    ? "error"
                    : ""
                }
                help={forgotFormik.touched.email && forgotFormik.errors.email}
              >
                <Input
                  placeholder="you@example.com"
                  {...forgotFormik.getFieldProps("email")}
                />
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={forgotFormik.isSubmitting}
              >
                Send OTP
              </Button>
              <div className="text-center text-sm mt-2">
                <Button
                  type="link"
                  onClick={() => setShowForgot(false)}
                  className="p-0"
                >
                  Back to Login
                </Button>
              </div>
            </Form>
          ) : (
            <>
              <Form layout="vertical" onFinish={formik.handleSubmit}>
                {!isLogin && (
                  <Form.Item
                    label="Name"
                    name="name"
                    validateStatus={
                      formik.errors.name && formik.touched.name ? "error" : ""
                    }
                    help={formik.touched.name && formik.errors.name}
                  >
                    <Input
                      placeholder="John Doe"
                      {...formik.getFieldProps("name")}
                    />
                  </Form.Item>
                )}
                <Form.Item
                  label="Email"
                  name="email"
                  validateStatus={
                    formik.errors.email && formik.touched.email ? "error" : ""
                  }
                  help={formik.touched.email && formik.errors.email}
                >
                  <Input
                    placeholder="you@example.com"
                    {...formik.getFieldProps("email")}
                  />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  validateStatus={
                    formik.errors.password && formik.touched.password
                      ? "error"
                      : ""
                  }
                  help={formik.touched.password && formik.errors.password}
                >
                  <Input.Password {...formik.getFieldProps("password")} />
                </Form.Item>
                {!isLogin && (
                  <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    validateStatus={
                      formik.errors.confirmPassword &&
                      formik.touched.confirmPassword
                        ? "error"
                        : ""
                    }
                    help={
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                    }
                  >
                    <Input.Password
                      {...formik.getFieldProps("confirmPassword")}
                    />
                  </Form.Item>
                )}
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={formik.isSubmitting}
                >
                  {isLogin ? "Login" : "Continue"}
                </Button>
              </Form>

              {isLogin && (
                <div className="text-center text-sm mt-2">
                  <Button
                    type="link"
                    onClick={() => setShowForgot(true)}
                    className="p-0"
                  >
                    Forgot password?
                  </Button>
                </div>
              )}
              <div className="text-center text-sm">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <Button
                  type="link"
                  onClick={handleToggleAuthMode}
                  className="p-0"
                >
                  {isLogin ? "Sign Up" : "Sign In"}
                </Button>
              </div>
            </>
          )}
        </motion.div>
      </Modal>
    </>
  );
};

export default AuthModal;
