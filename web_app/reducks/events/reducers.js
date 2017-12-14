import types from './types';

const eventsDefault = {
  events: [
    {
      idEvent: 1,
      eventName: 'Pizzas dominos',
      menu: ['tacos', 'jugos', 'refrescos'],
      description: 'pizza',
      srcImage: 'http://localhost:3000/images/pizza.jpeg',
      user: { name: 'Juan Amezcua' },
    },
    {
      idEvent: 2,
      eventName: 'hamburguesas al carbon',
      menu: ['haburguesa', 'hamburguesa vegetearian', 'coca'],
      description: 'some description',
      srcImage: 'http://localhost:3000/images/fast-food-meal.jpg',
      user: { name: 'Juan Amezcua' },
    },
    {
      idEvent: 3,
      eventName: 'tacos',
      menu: ['taco1', 'taco2', 'taco3'],
      description: 'some description',
      srcImage: 'http://localhost:3000/images/crockery.jpg',
      user: { name: 'Juan Amezcua' },
    },
    {
      idEvent: 4,
      eventName: 'Some event more',
      menu: ['some item', 'another item', 'some to drink'],
      description: 'some description about event',
      srcImage: 'http://localhost:3000/images/logoMichelada.png',
      user: { name: 'Juan Amezcua' },
    },
  ],
  mine: [
    {
      idEvent: 1,
      eventName: 'Pizzas dominos',
      menu: ['tacos', 'jugos', 'refrescos'],
      description: 'pizza',
      srcImage: 'http://localhost:3000/images/pizza.jpeg',
      user: { name: 'Juan Amezcua' },
    },
    {
      idEvent: 2,
      eventName: 'hamburguesas al carbon',
      menu: ['haburguesa', 'hamburguesa vegetearian', 'coca'],
      description: 'some description',
      srcImage: 'http://localhost:3000/images/fast-food-meal.jpg',
      user: { name: 'Juan Amezcua' },
    },
    {
      idEvent: 3,
      eventName: 'tacos',
      menu: ['taco1', 'taco2', 'taco3'],
      description: 'some description',
      srcImage: 'http://localhost:3000/images/crockery.jpg',
      user: { name: 'Juan Amezcua' },
    },
    {
      idEvent: 4,
      eventName: 'Some event more',
      menu: ['some item', 'another item', 'some to drink'],
      description: 'some description about event',
      srcImage: 'http://localhost:3000/images/logoMichelada.png',
      user: { name: 'Juan Amezcua' },
    },
  ],
};

const eventsStore = (state = eventsDefault, action) => {
  switch (action.type) {
    case types.fetchEvents:
      return {
        ...state,
        events: action.payload.events,
      };
    case types.fetchMyEvents:
      return {
        ...state,
        mine: action.payload.events,
      };
    default:
      return state;
  }
};

export default eventsStore;
