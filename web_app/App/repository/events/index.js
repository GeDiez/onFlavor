import axios from 'axios';
import apiOnFlavor from '../../../utils/apiOnFlavor';

const eventsRepository = () => {
  const get = async () => {
    const response = await apiOnFlavor.GET('/events');
    return response.data.events.map(event => ({
      id: event.id,
      name: event.name,
      description: event.description,
      users: event.users,
      srcImage: event.image_url,
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
      console.log('getMyevents ' + error);
    }
  };

  const create = async (user, event) => {
    try {
      const response = await axios.post(`/users/${user.id}/events`, {
        event: {
          ...event,
          place_id: event.placeId,
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    get,
    getMyEvents,
    create,
  };
};

export default eventsRepository;
