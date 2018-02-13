import React from 'react';
import {
  Col,
  Card,
  CardTitle,
  CardText,
  CardBody,
  CardSubtitle,
} from 'reactstrap';
import restaurantDefault from '@assets/images/restaurant_default.jpg';

const PlaceCard = ({ place: { name, description, address, srcImage } }) => {
  return (
    <Col sm="6" lg="3">
      <Card>
        <CardBody>
          <CardTitle>{name}</CardTitle>
          <CardSubtitle>{description}</CardSubtitle>
        </CardBody>
        <img width="100%" src={srcImage || restaurantDefault} alt="Card cap" />
        <CardBody>
          <CardText>{address || 'No se pudo cargar la dirección'}</CardText>
        </CardBody>
      </Card>
    </Col>
  );
};

export default PlaceCard;
