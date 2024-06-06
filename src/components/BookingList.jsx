// BookingList.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Table, Button, message } from 'antd';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('https://katigprototypeapi.netlify.app/.netlify/functions/app/booking');
        setBookings(response.data);
      } catch (error) {
        message.error('Failed to fetch bookings. Please try again.');
        console.error('Fetch bookings error:', error);
      }
    };
    fetchBookings();
  }, []);

  const columns = [
    { title: 'Booking ID', dataIndex: 'bookingId', key: 'bookingId' },
    { title: 'Date & Time', dataIndex: 'dateTime', key: 'dateTime' },
    { title: 'Destination', dataIndex: 'destination', key: 'destination' },
    { title: 'Passenger Type', dataIndex: 'passengerType', key: 'passengerType' },  
  ];

  return (
    <div>
      <Button type="primary" onClick={() => navigate('/booking/new')}>Create New Booking</Button>
      <Table dataSource={bookings} columns={columns} rowKey="_id" />
    </div>
  );
};

export default BookingList;
