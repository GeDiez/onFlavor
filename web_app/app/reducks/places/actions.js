import types from './types';

const fetchPlaces = places => ({
  type: types.fetchPlaces,
  places,
});

export default {
  fetchPlaces,
};
