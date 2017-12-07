import React, { Component } from 'react';

import Images from '../../../public/images';

const EventCard = ({eventName, description, itemList}) => {
  const showMenuItems = itemList.map((item, index) => <li key={index} className="list-group-item">{item}</li>);

  return (
  <div className="col-sm-6 col-md-6 col-lg-4">
    <div className="card">
      <img className="card-img-top" src={Images.logoMicheladaIo} alt="Card image cap" />
      <div className="card-body">
        <h4 className="card-title">{eventName}</h4>
        <p className="card-text">{description}</p>
      </div>
      <ul className="list-group list-group-flush">
        { showMenuItems }
      </ul>
      <div className="card-body">
        <a href="#" className="card-link">join to event</a>
      </div>
    </div>
  </div>);
};

export default EventCard;
