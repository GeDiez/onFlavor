const dataSource = require('../data_source/usersBS');

const modelUsers = {
  verifyUser: async password_digest => {
    const user = await dataSource.verifyUser(password_digest);
    return user;
  },
  getEvents: async userId => {
    return await dataSource.getEvents(userId);
  },
  getProfileByEmail: async ({ email }) => {
    return await dataSource.getProfileByEmail({ email });
  },
  create: async ({ user, provider }) => {
    return await dataSource.create({ user, provider });
  },
  // getEventByEmail: async email => {
  //   const event = await dataSource.getEventByEmail(email);
  //   return event;
  // },
  // getEvents: async () => {
  //   return await dataSource.getEvents();
  // },
  // updateEvent: async ({ id, event }) => {
  //   return await dataSource.updateEvent({ id, event });
  // },
  // createEvent: async event => {
  //   return await dataSource.createEvent(event);
  // },
  // deleteEvent: async () => {
  //   return await dataSource.deleteEvent;
  // },
};

module.exports = modelUsers;
