// frontend/src/components/ServiceList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ServiceList = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('/api/services');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services', error);
      }
    };
    fetchServices();
  }, []);

  return (
    <div>
      <h1>All Services</h1>
      <ul>
        {services.map(service => (
          <li key={service._id}>
            <h2>{service.name}</h2>
            <p>{service.description}</p>
            <img src={service.image} alt={service.name} style={{ width: '100px' }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceList;
