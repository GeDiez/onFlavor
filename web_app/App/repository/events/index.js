import apiOnFlavor from '../../../utils/apiOnFlavor';
import formData from 'form-data';

const eventsRepository = () => {
  const get = async () => {
    const response = await apiOnFlavor.GET('/events');
    return response.data.events.map(event => ({
      id: event.id,
      name: event.name,
      description: event.description,
      users: event.users,
      srcImage: event.image_url,
      dateTime: new Date(event.date_time),
      place: event.place,
    }));
  };

  const getMyEvents = async uuid => {
    try {
      const response = await apiOnFlavor.GET(`/users/${uuid}/events`);
      const events = response.data.events;
      return events.map(event => ({
        id: event.event_id,
        description: event.description,
        dateTime: new Date(event.date_time),
        role: event.role,
        srcImage: event.image_url,
        place: event.place,
      }));
    } catch (error) {
      return {
        errors: ['ha ocurrido un error en la petición ' + error],
      };
    }
  };

  const createOrder = async (userId, eventId, dishes) => {
    try {
      const response = await apiOnFlavor.POST(
        `/events/${eventId}/users/${userId}/orders`,
        {
          dishes,
        },
      );
      return response;
    } catch (error) {
      return {
        errors: ['ha ocurrido un error en la petición ' + error],
      };
    }
  };

  const create = async (userId, event) => {
    try {
      const response = await apiOnFlavor.POST(`/users/${userId}/events`, {
        event,
      });
      return response.data.errors || response.data.event;
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
      const response = await apiOnFlavor.POST(
        `/events/${eventId}/uploadImage`,
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

  const remove = async (userId, eventId) => {
    try {
      const response = await apiOnFlavor.DELETE(
        `/users/${userId}/events/${eventId}`,
      );
      return response.data.errors || response.data.event;
    } catch (error) {
      return {
        errors: ['ha ocurrido un error en la petición ' + error],
      };
    }
  };

  const getOrdersByEvent = async eventId => {
    try {
      const response = await apiOnFlavor.GET(`/events/${eventId}/orders`);
      return response.data.errors || response.data.orders;
    } catch (error) {
      return {
        errors: ['ha ocurrido un error en la petición ' + error],
      };
    }
  };

  const getOrdersOfUser = async (eventId, userId) => {
    try {
      const response = await apiOnFlavor.GET(
        `/events/${eventId}/users/${userId}/orders`,
      );
      return response.data.errors ? response.data : response.data.order;
    } catch (error) {
      return {
        errors: ['ha ocurrido un error en la petición ' + error],
      };
    }
  };

  const removeOrder = async (userId, eventId, orderId) => {
    try {
      const response = await apiOnFlavor.DELETE(
        `/events/${eventId}/users/${userId}/orders/${orderId}`,
      );
      return response.data.errors ? response.data : response.data.msg;
    } catch (error) {
      return {
        errors: ['ha ocurrido un error en la petición ' + error],
      };
    }
  };

  const addAdmin = async (userId, eventId, userAdmin) => {
    try {
      const response = await apiOnFlavor.PUT(
        `/users/${userId}/events/${eventId}?admin=true`,
        { userId: userAdmin },
      );
      return response.data.errors ? response.data : response.data.msg;
    } catch (error) {
      return {
        errors: ['ha ocurrido un error en la petición ' + error],
      };
    }
  };

  return {
    get,
    create,
    getMyEvents,
    getOrdersByEvent,
    getOrdersOfUser,
    createOrder,
    removeOrder,
    remove,
    addAdmin,
    uploadImage,
  };
};

export default eventsRepository;
