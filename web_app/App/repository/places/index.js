import axios from 'axios';

const host = 'http://localhost:8080';

const placesRepository = () => {
  const get = async () => {
    const response = await axios.get(host + '/places');
    return response.data.places.map(place => ({
      id: place.id,
      name: place.name,
      description: place.description,
      address: place.address,
      srcImage: place.image_url,
      likes: place.likes,
    }));
  };

  const getById = async idPlace => {
    const response = await axios.get(host + `/places/${idPlace}`);
    const place = response.data.place;
    return {
      id: place.id,
      name: place.name,
      description: place.description,
      address: place.address,
      srcImage: place.image_url,
      dishes: place.dishes,
    };
  };

  return {
    get,
    getById,
  };
};

export default placesRepository;
