import { Form, Input, Button, Alert } from "antd";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {

    setLoading(true);
    setError(null);

    try {

      const res = await axios.post(
        "https://medium-rszn.onrender.com/api/v1/auth/login",
        {
          email: values.email,
          password: values.password
        }
      );

      const token = res.data.token;

      // save token
      localStorage.setItem("token", token);
      

      // redirect
      navigate("/home");

    } catch (err) {

      setError(err.response?.data?.message || "Login failed");

    }

    setLoading(false);
  };

  return (

    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-white-600 via-black-500 to-red-500">

      <div className="bg-white/20 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-md border border-white/30">

        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Login
        </h2>

        {error && <Alert message={error} type="error" showIcon className="mb-4"/>}

        <Form layout="vertical" onFinish={handleSubmit}>

          <Form.Item
            label={<span className="text-white">Email</span>}
            name="email"
            rules={[
              { required: true, message: "Enter your email" },
              { type: "email", message: "Invalid email" }
            ]}
          >
            <Input placeholder="you@email.com"/>
          </Form.Item>

          <Form.Item
            label={<span className="text-white">Password</span>}
            name="password"
            rules={[{ required: true, message: "Enter your password" }]}
          >
            <Input.Password/>
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
          >
            Login
          </Button>

        </Form>

        <p className="text-white text-center mt-4">
          Don't have an account? <Link to="/register">Register</Link>
        </p>

      </div>

    </div>

  );
}