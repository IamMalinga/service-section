import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';

const ServiceMap = () => {
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
    <MapContainer center={[7.8731, 80.7718]} zoom={8} className="map-container">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {services.map((service) => (
        <Marker key={service._id} position={[service.latitude, service.longitude]}>
          <Popup>
            <strong>{service.name}</strong><br />
            {service.description}<br />
            <img src={service.image} alt={service.name} style={{ width: '100px' }} />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default ServiceMap;
