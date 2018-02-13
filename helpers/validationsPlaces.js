const validation = {
  fieldPlace: ({ place, msgs }) => {
    if (!place)
      return {
        place,
        msgs: [...msgs, 'el campo place no se especifico'],
      };
    return { place, msgs };
  },
  fieldsRequireds: ({ place, msgs }) => {
    if (!place) return { place, msgs };
    if (!place.name || !place.address || !place.phone_number)
      return {
        place,
        msgs: [
          ...msgs,
          'faltan campos requeridos; name, address, phone_number',
        ],
      };
    return { place, msgs };
  },
};

module.exports = validation;
