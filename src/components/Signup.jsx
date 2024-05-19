// Signup.jsx
import React from 'react';
import axios from 'axios';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Form.css';

const Signup = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    if (values.password !== values.confirmPassword) {
      message.error('Passwords do not match!');
      return;
    }

    try {
      const response = await axios.post('https://katigprototypeapi.netlify.app/.netlify/functions/app/signup', {
        fullName: values.fullName,
        username: values.username,
        email: values.email,
        password: values.password
      });
      message.success('Signup successful!');
      navigate('/dashboard');
    } catch (error) {
      message.error('Signup failed. Please try again.');
      console.error('Signup error:', error);
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item name="fullName" label="Full Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="username" label="Username" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="password" label="Password" rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item name="confirmPassword" label="Confirm Password" rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Sign Up</Button>
      </Form.Item>
    </Form>
  );
};

export default Signup;
