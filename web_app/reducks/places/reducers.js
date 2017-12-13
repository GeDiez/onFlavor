import types from './types';

const placesDefault = {
  places: [
    {
      name: 'Little Cessar Pizza`s',
      description: 'some place in the world',
      address: 'Av Carranza',
      srcImage: 'http://localhost:3000/images/crockery.jpg',
    },
    {
      name: 'Pollos',
      description: 'pa botanearse algo',
      address: 'Av Carranza',
      srcImage: 'http://localhost:3000/images/fast-food-meal.jpg',
    },
    {
      name: 'Pechugon',
      description: 'another place in the world',
      address: 'Av Carranza',
      srcImage: 'http://localhost:3000/images/crockery.jpg',
    },
    {
      name: 'El pollo Feliz',
      description: 'pa botanearse algo',
      address: 'Av Carranza',
      srcImage: 'http://localhost:3000/images/fast-food-meal.jpg',
    },
    {
      name: 'Tacos del Cesar',
      description: 'some place in the world',
      address: 'Av Carranza',
      srcImage: 'http://localhost:3000/images/crockery.jpg',
    },
  ],
};

const placesStore = (state = placesDefault, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default placesStore;
