import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, message } from 'antd';
import Rating from 'react-rating-stars-component';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './Form.css';

const FeedbackForm = ({ onSubmit }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await axios.post('https://katigprototypeapi.netlify.app/.netlify/functions/app/feedback', values);
      message.success('Feedback submitted successfully!');
      onSubmit();
      navigate('/feedback');
    } catch (error) {
      message.error('Failed to submit feedback. Please try again.');
      console.error('Feedback submission error:', error);
    }
  };

  return (
    <div className="form-container">
      <Button className="back-button" onClick={() => navigate('/home')} icon={<ArrowBackIcon />}>Back</Button>
      <h1>Leave Feedback</h1>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item name="userId" label="User ID" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="rating" label="Rating" rules={[{ required: true }]}>
          <Rating count={5} size={24} activeColor="#ffd700" onChange={(value) => form.setFieldValue('rating', value)} />
        </Form.Item>
        <Form.Item name="message" label="Your feedback" rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('https://katigprototypeapi.netlify.app/.netlify/functions/app/feedback');
        setFeedbacks(response.data);
      } catch (error) {
        message.error('Failed to fetch feedback. Please try again.');
        console.error('Fetch feedback error:', error);
      }
    };
    fetchFeedbacks();
  }, []);

  return (
    <div className="list-container">
      <Button className="back-button" onClick={() => navigate('/home')} icon={<ArrowBackIcon />}>Back</Button>
      <h1>Feedback List</h1>
      <ul>
        {feedbacks.map(feedback => (
          <li key={feedback._id}>
            <Link to={`/feedback/${feedback._id}`}>{feedback.message}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const FeedbackDetail = () => {
  const { id } = useParams();
  const [feedback, setFeedback] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(`https://katigprototypeapi.netlify.app/.netlify/functions/app/feedback/${id}`);
        setFeedback(response.data);
      } catch (error) {
        message.error('Failed to fetch feedback details. Please try again.');
        console.error('Fetch feedback detail error:', error);
      }
    };
    fetchFeedback();
  }, [id]);

  if (!feedback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="detail-container">
      <Button className="back-button" onClick={() => navigate('/feedback')} icon={<ArrowBackIcon />}>Back</Button>
      <h1>Feedback Detail</h1>
      <p>User ID: {feedback.userId}</p>
      <Rating count={5} value={feedback.rating} size={24} edit={false} activeColor="#ffd700" />
      <p>Message: {feedback.message}</p>
    </div>
  );
};

const feedback = () => {
  return (
    <Routes>
      <Route path="new" element={<FeedbackForm onSubmit={() => {}} />} />
      <Route path="/" element={<FeedbackList />} />
      <Route path=":id" element={<FeedbackDetail />} />
    </Routes>
  );
};

export default feedback;