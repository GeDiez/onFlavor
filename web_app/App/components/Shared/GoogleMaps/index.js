import React, { Component } from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

class MyMapComponent extends Component {
  state = {
    location: {
      latitude: -34.397,
      longitude: 150.644,
    },
  };

  componentDidMount() {
    const { latitude, longitude } = this.props;
    if (latitude && longitude)
      return this.setState({
        location: {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        },
      });
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        location: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
      });
    });
  }

  onMapMounted = ref => {
    this.map = ref;
  };

  onClickMap = data => {
    if (!data.placeId || !this.props.getPlace) return;
    const service = new google.maps.places.PlacesService(
      this.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    );
    service.getDetails({ placeId: data.placeId }, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK)
        this.props.getPlace({
          address: place.formatted_address,
          name: place.name,
          latitude: data.latLng.lat(),
          longitude: data.latLng.lng(),
        });
    });
  };

  render() {
    const { isMarkerShown } = this.props;
    const { latitude, longitude } = this.state.location;
    return (
      <GoogleMap
        ref={this.onMapMounted}
        defaultZoom={18}
        center={{ lat: latitude, lng: longitude }}
        onClick={this.onClickMap}
      >
        {isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
      </GoogleMap>
    );
  }
}

export default withScriptjs(withGoogleMap(MyMapComponent));
