const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const {descriptors, places} = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', err => {
    logError(err);
  });
db.once('open', () => {
    console.log('Database Connected!');
})

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i<50; i++){
        const random_index = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '62f105ceed6de2e4c0dc0164',
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random_index].city}, ${cities[random_index].state}`,
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi sunt exercitationem cum et quod ipsum corporis? Magnam, accusantium recusandae ratione velit sed est quibusdam deserunt explicabo laborum eum provident atque?',
            price,
            geometry: {
              type: "Point",
              coordinates: [cities[random_index].longitude, cities[random_index].latitude]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dsrggwd7r/image/upload/v1660055260/YelpCamp/wnehybzbrtif5oeupffa.avif',
                  filename: 'YelpCamp/wnehybzbrtif5oeupffa'
                },
                {
                  url: 'https://res.cloudinary.com/dsrggwd7r/image/upload/v1660057838/YelpCamp/f0fpuvi75gwhwischefn.avif',
                  filename: 'YelpCamp/f0fpuvi75gwhwischefn'
                },
                {
                  url: 'https://res.cloudinary.com/dsrggwd7r/image/upload/v1660038561/YelpCamp/hea8gqwuk52ngrwi11iu.avif',
                  filename: 'YelpCamp/hea8gqwuk52ngrwi11iu'
                }
              ]
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})