const Router = require('./router/expressRouter');

const routesPlaces = require('./routes/routePlaces');
const routesEvents = require('./routes/routeEvents');
const routesUsers = require('./routes/routeUsers');

const router = Router({
  path: __dirname,
});

routesPlaces(router);
routesEvents(router);
routesUsers(router);

router.init();
