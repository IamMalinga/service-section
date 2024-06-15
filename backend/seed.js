const mongoose = require('mongoose');
const Service = require('./models/Service');
const SubService = require('./models/SubService');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedData = async () => {
  try {
    const services = [
      { name: 'Accommodation', subServices: [] },
      { name: 'Food and Beverage', subServices: [] },
      { name: 'Transportation', subServices: [] },
      { name: 'Tour and Travel Services', subServices: [] },
      { name: 'Healthcare Services', subServices: [] },
      { name: 'Banking and Financial Services', subServices: [] },
      { name: 'Recreational and Leisure Activities', subServices: [] },
      { name: 'Shopping', subServices: [] }
    ];

    const subServices = {
      'Accommodation': [
        'Hotels', 'Guesthouses and Homestays', 'Boutique Hotels', 'Hostels', 'Villas and Apartments', 'Laundry Services'
      ],
      'Food and Beverage': [
        'Restaurants', 'Cafés and Coffee Shops', 'Street Food Stalls', 'Bars and Pubs'
      ],
      'Transportation': [
        'Car and Bike Rentals', 'Chauffeur Services', 'Public Transport', 'Taxis and Ride-Hailing Services', 'Tuk-Tuks'
      ],
      'Tour and Travel Services': [
        'Tour Operators', 'Travel Agencies', 'Information Centers', 'Special Events'
      ],
      'Healthcare Services': [
        'Hospitals and Clinics', 'Pharmacies'
      ],
      'Banking and Financial Services': [
        'ATMs', 'Currency Exchange', 'Mobile Payment Services'
      ],
      'Recreational and Leisure Activities': [
        'Spas and Wellness Centers', 'Adventure Sports', 'Cultural Experiences'
      ],
      'Shopping': [
        'Local Markets and Bazaars', 'Shopping Malls', 'Specialty Stores'
      ]
    };

    for (const service of services) {
      const createdService = await new Service({ name: service.name }).save();
      for (const subServiceName of subServices[service.name]) {
        const createdSubService = await new SubService({ name: subServiceName, serviceId: createdService._id }).save();
        createdService.subServices.push(createdSubService._id);
      }
      await createdService.save();
    }
    
    console.log('Database seeded successfully');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding database:', err);
    mongoose.connection.close();
  }
};

seedData();
