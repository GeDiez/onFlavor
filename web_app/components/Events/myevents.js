import React from 'react';

import EventCard from "./EventCard";

const MyEvents = () => {
  showAllEvents = () => {
    return [
      <EventCard key={1} eventName={'Evento 1'} description={'Taquitos y algo mas'} itemList={['tacos', 'jugos', 'refrescos']}/>  ,
      <EventCard key={2} eventName={'Evento 1'} description={'tortas'} itemList={['jamon', 'quesillo', 'carne']}/>  ,
      <EventCard key={3} eventName={'Evento 1'} description={'pizza'} itemList={['hawaiiana', 'carnes']}/>  ,
      <EventCard key={4} eventName={'Evento 1'} description={'mas tacos'} itemList={['tacos cesar', 'tortas', 'consome']}/>  ,
      <EventCard key={5} eventName={'Evento 1'} description={'carnes'} itemList={['invita aletsis']}/>  ,
    ]
  }

  return (
    <div>
      <h1>All my events</h1>
      {showAllEvents()}
    </div>
  );
};

export default MyEvents;