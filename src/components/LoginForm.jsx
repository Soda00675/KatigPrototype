import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Form.css';

const LoginForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Add loading state to prevent multiple submissions

  const onFinish = async (values) => {
    setLoading(true); // Set loading to true when the request starts
    try {
      const response = await axios.post('https://katigprototypeapi.netlify.app/.netlify/functions/app/login', {
        email: values.email,
        password: values.password
      });
      message.success('Login successful!');
      // Save the token in local storage
      localStorage.setItem('token', response.data.token);
      setLoading(false); // Reset loading state
      navigate('/dashboard');
    } catch (error) {
      message.error('Login failed. Please try again.');
      console.error('Login error:', error);
      setLoading(false); // Reset loading state in case of an error
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="password" label="Password" rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>Login</Button> {/* Disable button when loading */}
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
