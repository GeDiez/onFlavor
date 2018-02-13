const validation = {
  fieldsRequireds: ({ event, msgs }) => {
    if (!event.place_id || !event.date_time)
      return {
        event,
        msgs: [...msgs, 'faltan los campos place_id o date_time'],
      };
    return { event, msgs };
  },
  dateTimeRange: ({ event, msgs }) => {
    if (!event.date_time) return { event, msgs };
    const dateTime = new Date(event.date_time);
    const time = dateTime.getHours();
    if (time < 7 || time > 20)
      return {
        event,
        msgs: [...msgs, 'el horario de los eventos es de 7 a 20 hrs'],
      };
    return { event, msgs };
  },
};

module.exports = validation;
