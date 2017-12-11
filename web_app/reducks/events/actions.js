import types from './types';

const fetchEvents = events = ({
  type: types.fetchEvents,
  events
});

const fetchMyEvents = events = ({
  type: types.fetchMyEvents,
  events
});

export default {
  fetchEvents
}