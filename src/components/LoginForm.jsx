// LoginForm.jsx
import React from 'react';
import axios from 'axios';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Form.css';

const LoginForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axios.post('https://katigprototypeapi.netlify.app/.netlify/functions/app/login', {
        email: values.email,
        password: values.password
      });
      message.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      message.error('Login failed. Please try again.');
      console.error('Login error:', error);
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
        <Button type="primary" htmlType="submit">Login</Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
