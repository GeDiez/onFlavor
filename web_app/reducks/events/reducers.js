import types from './types';

const eventsDefault = {
  events: [
    {
      idEvent: 1,
      eventName: 'Pizzas dominos',
      menu: ['tacos', 'jugos', 'refrescos'],
      descripcion: 'pizza',
      srcImage: 'http://localhost:3000/images/pizza.jpeg'
    },
    {
      idEvent: 2,
      eventName: 'hamburguesas al carbon',
      menu: ['haburguesa', 'hamburguesa vegetearian', 'coca'],
      descripcion: 'some description',
      srcImage: 'http://localhost:3000/images/fast-food-meal.jpg'
    },
    {
      idEvent: 3,
      eventName: 'tacos',
      menu: ['taco1', 'taco2', 'taco3'],
      descripcion: 'some description',
      srcImage: 'http://localhost:3000/images/crockery.jpg'
    },
    {
      idEvent: 4,
      eventName: 'Some event more',
      menu: ['some item', 'another item', 'some to drink'],
      descripcion: 'some description about event',
      srcImage: 'http://localhost:3000/images/logoMichelada.png'
    }
  ],
  mine: [
    {
      idEvent: 1,
      eventName: 'Pizzas dominos',
      menu: ['tacos', 'jugos', 'refrescos'],
      descripcion: 'pizza',
      srcImage: 'http://localhost:3000/images/pizza.jpeg'
    },
    {
      idEvent: 2,
      eventName: 'hamburguesas al carbon',
      menu: ['haburguesa', 'hamburguesa vegetearian', 'coca'],
      descripcion: 'some description',
      srcImage: 'http://localhost:3000/images/fast-food-meal.jpg'
    },
    {
      idEvent: 3,
      eventName: 'tacos',
      menu: ['taco1', 'taco2', 'taco3'],
      descripcion: 'some description',
      srcImage: 'http://localhost:3000/images/crockery.jpg'
    },
    {
      idEvent: 4,
      eventName: 'Some event more',
      menu: ['some item', 'another item', 'some to drink'],
      descripcion: 'some description about event',
      srcImage: 'http://localhost:3000/images/logoMichelada.png'
    }
  ]
};

const eventsStore = (state = eventsDefault, action) => {
  switch (action.type) {
    case types.fetchEvents:
      return {
        ...state,
        events: action.payload.events
      }
    case types.fetchMyEvents:
      return {
        ...state,
        mine: action.payload.events
      }
    default:
      return state
  }
}

export default eventsStore;
