import React from 'react';

const PlaceCard = ({ data: { name, description, address, srcImage } }) => {
  return (
    <div className="card">
      <img
        className="card-img-top"
        src={srcImage}
        height="300px"
        alt="Card cap"
      />
      <div className="card-body">
        <h4 className="card-title">{name}</h4>
        <p className="card-text">{description}</p>
        <br />
        <p>{address}</p>
      </div>
    </div>
  );
};

export default PlaceCard;
