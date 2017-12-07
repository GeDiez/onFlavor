import React from 'react';

import Menu from '../Shared/Menu';
import EventCard from './EventCard';

class Events extends React.Component {
  showAllEvents = () => {
    return [
      <EventCard key={1} eventName={'Evento 1'} description={'Taquitos y algo mas'} itemList={['tacos', 'jugos', 'refrescos']}/>  ,
      <EventCard key={2} eventName={'Evento 1'} description={'tortas'} itemList={['jamon', 'quesillo', 'carne']}/>  ,
      <EventCard key={3} eventName={'Evento 1'} description={'pizza'} itemList={['hawaiiana', 'carnes']}/>  ,
      <EventCard key={4} eventName={'Evento 1'} description={'mas tacos'} itemList={['tacos cesar', 'tortas', 'consome']}/>  ,
      <EventCard key={5} eventName={'Evento 1'} description={'carnes'} itemList={['invita aletsis']}/>  ,
    ]
  }

  render() {
    return (
      <div className='container'>
        <div className="row" style={{marginTop: '4em'}}>
          {this.showAllEvents()}
          <button className='btn-round'><span>+</span></button>
        </div>
      </div>
    );
  }
}

export default Events;