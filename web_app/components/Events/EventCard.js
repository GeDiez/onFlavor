import React from 'react';
import { Link } from 'react-router-dom';

import './EventCard.css';

const EventCard = ({
  event: { eventName, description, srcImage, menu, user },
  onClickCard,
}) => (
  <div className="card hover-card" onClick={onClickCard}>
    <img
      className="card-img-top"
      src={srcImage}
      height="300px"
      alt="some event"
    />
    <div className="card-body">
      <h4 className="card-title">{eventName}</h4>
      <small className="card-text">
        published by{' '}
        <strong>
          <span className="fa fa-user" />
          {user.name}
        </strong>
      </small>
    </div>
    <ul className="list-group list-group-flush">
      <li className="list-group-item">
        <strong>Description: </strong>
        {description}
      </li>
      <li className="list-group-item">
        <strong>Menu:</strong>
        {menu.reduce((vi, item) => `${vi} ${item},`, '')}
      </li>
    </ul>
  </div>
);

export default EventCard;
