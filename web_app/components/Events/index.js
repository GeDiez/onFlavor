import React from 'react';
import { connect } from 'react-redux';

import Menu from '../Shared/Menu';
import EventCard from './EventCard';

class Events extends React.Component {
  showAllEvents = () => this.props.events.map(event =>
      <EventCard
        key={event.idEvent}
        eventName={event.name}
        srcImage={event.srcImage}
        description={event.description}
        itemList={event.menu}
        linksFooter={[{text: 'Join me', onClick: () => console.log('send action')}]}
      />
    );

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

const mapStateToProps = state => ({
  events: state.events.events
})

export default connect(mapStateToProps)(Events);