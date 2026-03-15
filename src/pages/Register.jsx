import { Form, Input, Button, Alert } from "antd";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (values) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();

      formData.append("fullname", values.fullname);
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("password", values.password);

      const res = await axios.post(
        "https://medium-rszn.onrender.com/api/v1/auth/signup",
        formData
      );

      setSuccess(res.data.message);

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">

      <div className="bg-white/20 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-md border border-white/30">

        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Create Account
        </h2>

        {error && <Alert message={error} type="error" showIcon className="mb-4" />}
        {success && <Alert message={success} type="success" showIcon className="mb-4" />}

        <Form layout="vertical" onFinish={handleSubmit}>

          <Form.Item
            label={<span className="text-white">Full Name</span>}
            name="fullname"
            rules={[{ required: true, message: "Please enter your full name" }]}
          >
            <Input placeholder="Ayodele Omodara" />
          </Form.Item>

          <Form.Item
            label={<span className="text-white">Username</span>}
            name="username"
            rules={[{ required: true, message: "Enter username" }]}
          >
            <Input placeholder="dele5x" />
          </Form.Item>

          <Form.Item
            label={<span className="text-white">Email</span>}
            name="email"
            rules={[
              { required: true, message: "Enter email" },
              { type: "email", message: "Invalid email" },
            ]}
          >
            <Input placeholder="you@email.com" />
          </Form.Item>

          <Form.Item
            label={<span className="text-white">Password</span>}
            name="password"
            rules={[{ required: true, message: "Enter password" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label={<span className="text-white">Confirm Password</span>}
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Confirm password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
          >
            Register
          </Button>

        </Form>

        <p className="text-white text-center mt-4">
          Already have an account? <Link to="/login">Login here</Link>
        </p>

      </div>

    </div>
  );
}