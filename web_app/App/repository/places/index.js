import onFlavorAPI from '../../../utils/apiOnFlavor';
import formData from 'form-data';

const placesRepository = () => {
  const getAll = async () => {
    const response = await onFlavorAPI.GET('/places');
    return response.data.places.map(place => ({
      id: place.id,
      name: place.name,
      description: place.description,
      address: place.address,
      phoneNumber: place.phone_number,
      srcImage: place.image_url,
      dishes: place.dishes,
      latitude: place.latitude,
      longitude: place.longitude,
      likes: place.likes,
    }));
  };

  const getById = async idPlace => {
    const response = await onFlavorAPI.GET(`/places/${idPlace}`);
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

  const create = async place => {
    try {
      const response = await onFlavorAPI.POST(`/places`, {
        place: {
          name: place.name,
          address: place.address,
          phone_number: place.phoneNumber,
          longitude: place.longitude,
          latitude: place.latitude,
        },
      });
      return response.data.errors || response.data.place;
    } catch (error) {
      return {
        errors: ['ha ocurrido un error en la petición ' + error],
      };
    }
  };

  const uploadImage = async (eventId, file) => {
    try {
      let data = new formData();
      data.append('imagen', file, file.name);
      const response = await onFlavorAPI.POST(
        `/places/${eventId}/uploadImage`,
        data,
        {
          'X-Requested-With': 'XMLHttpRequest',
        },
      );
      return response.data;
    } catch (error) {
      return {
        errors: ['ha ocurrido un error en la petición ' + error],
      };
    }
  };

  const addDish = async (placeId, _dish) => {
    try {
      const response = await onFlavorAPI.POST(`/places/${placeId}/dishes`, {
        dishes: [_dish],
      });
      return response.data.errors || response.data.dishes;
    } catch (error) {
      return {
        errors: ['ha ocurrido un error en la petición: ' + error],
      };
    }
  };

  const remove = async placeId => {
    try {
      onFlavorAPI.DELETE(`/places/${placeId}`);
    } catch (error) {
      return {
        errors: ['ha ocurrido un error en la petición: ' + error],
      };
    }
  };

  const update = async (placeId, place) => {
    try {
      const response = await onFlavorAPI.PUT(`/places/${placeId}`, {
        place: {
          name: place.name,
          address: place.address,
          phone_number: place.phoneNumber,
          longitude: place.longitude,
          latitude: place.latitude,
        },
      });
      return response.data.errors || response.data.place;
    } catch (error) {
      return {
        errors: ['ha ocurrido un error en la petición ' + error],
      };
    }
  };

  const removeDish = async (placeId, dishId) => {
    try {
      onFlavorAPI.DELETE(`/places/${placeId}/dishes/${dishId}`);
    } catch (error) {
      return {
        errors: ['ha ocurrido un error en la petición: ' + error],
      };
    }
  };

  return {
    getAll,
    getById,
    create,
    update,
    remove,
    uploadImage,
    addDish,
    removeDish,
  };
};

export default placesRepository;
