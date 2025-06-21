import React, { useState } from "react";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { appLoginAction, appSignupAction } from "../store/actions/AuthAction";
import { FormButtonControl } from "../shared/components/controls/FormControls";

const AuthModal = ({ isOpen, onClose, dtype = "signin", onForgotPassword }) => {
  const dispatch = useDispatch();
  const [type, setType] = useState(dtype);

  // Handle the form submission (mock)
  const handleSubmit = (values, { setSubmitting }) => {
    // Mock authentication - In production, integrate with your auth provider
    if (type === "signin") {
      dispatch(
        appLoginAction(
          values,
          () => {
            onClose(); // Close the modal on submit
          },
          () => {
            setSubmitting(false);
          }
        )
      );
    } else {
      dispatch(
        appSignupAction(
          values,
          () => {
            onClose(); // Close the modal on submit
          },
          () => {
            setSubmitting(false);
          }
        )
      );
    }
  };

  // Validation schema for Formik using Yup
  const validationSchema = Yup.object({
    name:
      type === "signup"
        ? Yup.string().required("Name is required")
        : Yup.string(),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters") // Min 6 characters
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter") // Must have one uppercase letter
      .matches(/[0-9]/, "Password must contain at least one digit") // Must have one digit
      .matches(
        /[^a-zA-Z0-9]/,
        "Password must contain at least one special character"
      ) // Must have one special character
      .required("Password is required"),
    confirmPassword:
      type === "signup"
        ? Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm password is required")
        : Yup.string(),
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6 m-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {type === "signin" ? "Sign In" : "Create Account"}
        </h2>

        {/* Formik Form */}
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Name input for Sign Up */}
              {type === "signup" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <Field
                    type="text"
                    name="name"
                    className="w-full px-4 py-2 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent "
                    placeholder="Enter your name"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              )}

              {/* Email input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Password input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  className="w-full px-4 py-2 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Confirm Password input for Sign Up */}
              {type === "signup" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    className="w-full px-4 py-2 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Confirm your password"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              )}
              <FormButtonControl
                text={type === "signin" ? "Sign In" : "Create Account"}
                isLoading={isSubmitting}
                disabled={isSubmitting}
              />
            </Form>
          )}
        </Formik>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {type === "signin"
              ? "Don't have an account? "
              : "Already have an account? "}
            <button
              onClick={() => setType(type === "signin" ? "signup" : "signin")}
              className="text-teal-600 hover:text-teal-800 font-medium"
            >
              {type === "signin" ? "Sign Up" : "Sign In"}
            </button>
          </p>

          {/* Forgot Password link */}

          {type === "signin" && (
            <p
              className="text-sm text-teal-600 cursor-pointer mt-2"
              onClick={() => onForgotPassword(true)} // Switch to Forgot Password
            >
              Forgot Password?
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
