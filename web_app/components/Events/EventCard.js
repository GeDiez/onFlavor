import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

const EventCard = ({
  event: { eventName, description, srcImage, menu, user },
  clickJoinEvent,
}) => (
  <div className="col-sm-6 col-md-6 col-lg-4">
    <div className="card hover-card">
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
      <div className="card-body">
        <Button color="link" onClick={clickJoinEvent}>
          Join to Event
        </Button>
      </div>
    </div>
  </div>
);

export default EventCard;
