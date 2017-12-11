import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({eventName, description, srcImage, itemList, linkJointEvent, linkEdit, linksFooter}) => {
  const showMenuItems = itemList.map((item, index) => <li key={index} className='list-group-item'>{item}</li>);

  const linksFooterRender = () => {
    if(!linksFooter) return;
    return linksFooter.map((linkFooter, index) => {
      if(linkFooter.link) return <Link key={index} className='card-link' to={linkFooter.link}>{linkFooter.text}</Link>
      if(linkFooter.onClick) return <button key={index} className='btn btn-link'>{linkFooter.text}</button>
    })
  };

  return (
    <div className='col-sm-6 col-md-6 col-lg-4'>
      <div className='card hover-card'>
        <img className='card-img-top' src={srcImage} />
        <div className='card-body'>
          <h4 className='card-title'>{eventName}</h4>
          <p className='card-text'>{description}</p>
        </div>
        <ul className='list-group list-group-flush'>
          { showMenuItems }
        </ul>
        <div className='card-body'>
          {linksFooterRender()}
        </div>
      </div>
    </div>);
};

export default EventCard;
