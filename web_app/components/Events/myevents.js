import React from 'react';
import { connect } from 'react-redux';

import EventCard from './EventCard';

const MyEvents = ({ myEvents }) => {
  const showAllEvents = () =>
    myEvents.map(event => (
      <EventCard
        key={event.idEvent}
        eventName={event.name}
        srcImage={event.srcImage}
        description={event.description}
        itemList={event.menu}
        linksFooter={[
          { text: 'edit', onClick: () => console.log('send action edit') },
          { text: 'delete', onClick: () => console.log('send action delete') },
        ]}
      />
    ));

  return (
    <div className="container">
      <h1>
        <small>All my events</small>
      </h1>
      <hr />
      <div className="row">{showAllEvents()}</div>
    </div>
  );
};

const mapStateToProps = state => ({
  myEvents: state.events.mine,
});

export default connect(mapStateToProps)(MyEvents);
