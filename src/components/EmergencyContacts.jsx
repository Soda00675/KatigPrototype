import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, Card, Spin, message } from 'antd';
import './EmergencyContacts.css';

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('https://katigprototypeapi.netlify.app/.netlify/functions/app/contact');
        setContacts(response.data);
        setLoading(false);
      } catch (error) {
        message.error('Failed to fetch emergency contacts. Please try again.');
        console.error('Fetch contacts error:', error);
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  return (
    <div className="contacts-container">
      <h1>Emergency Contacts</h1>
      <List
        dataSource={contacts}
        renderItem={contact => (
          <List.Item>
            <Card title={contact.name}>
              <p>Contact: {contact.contact}</p>
              <p>Available: {contact.available ? 'Yes' : 'No'}</p>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default EmergencyContacts;
