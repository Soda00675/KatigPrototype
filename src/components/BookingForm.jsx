import React, { useEffect } from 'react';
import { Form, Input, Button, DatePicker, Select, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const { Option } = Select;

const BookingForm = ({ mode }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (mode === 'edit' && id) {
      const fetchBooking = async () => {
        try {
          const response = await axios.get(`https://katigprototypeapi.netlify.app/.netlify/functions/app/booking/${id}`);
          form.setFieldsValue(response.data);
        } catch (error) {
          message.error('Failed to fetch booking details. Please try again.');
          console.error('Fetch booking detail error:', error);
        }
      };
      fetchBooking();
    }
  }, [mode, id, form]);

  const onFinish = async (values) => {
    const token = localStorage.getItem('token');
    if (!token) {
      message.error('You must be logged in to create a booking.');
      return;
    }

    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    values.userId = decodedToken.userId;

    try {
      if (mode === 'edit') {
        await axios.patch(`https://katigprototypeapi.netlify.app/.netlify/functions/app/booking/${id}`, values, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        message.success('Booking updated successfully!');
      } else {
        await axios.post('https://katigprototypeapi.netlify.app/.netlify/functions/app/booking', values, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        message.success('Booking created successfully!');
      }
      navigate('/booking');
    } catch (error) {
      message.error('Failed to submit booking. Please try again.');
      console.error('Booking submission error:', error);
    }
  };

  return (
    <div>
      <h1>{mode === 'edit' ? 'Edit Booking' : 'Create New Booking'}</h1>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item name="dateTime" label="Date & Time" rules={[{ required: true }]}>
          <DatePicker showTime />
        </Form.Item>
        <Form.Item name="destination" label="Destination" rules={[{ required: true }]}>
          <Select>
            <Option value="buyabod-maniwaya">Buyabod - Maniwaya</Option>
            <Option value="buyabod-mongpong">Buyabod - Mongpong</Option>
            <Option value="buyabod-polo">Buyabod - Polo</Option>
            <Option value="maniwaya-buyabod">Maniwaya - Buyabod</Option>
            <Option value="mongpong-buyabod">Mongpong - Buyabod</Option>
            <Option value="polo-buyabod">Polo - Buyabod</Option>
          </Select>
        </Form.Item>
        <Form.Item name="passengerType" label="Passenger Type" rules={[{ required: true }]}>
          <Select>
            <Option value="student">Student</Option>
            <Option value="senior">Senior</Option>
            <Option value="adult">Adult</Option>
            <Option value="PWD">PWD</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {mode === 'edit' ? 'Update Booking' : 'Create Booking'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BookingForm;
