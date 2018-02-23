const Router = require('./router/expressRouter');

const routesPlaces = require('./routes/routePlaces');
const routesEvents = require('./routes/routeEvents');
const routesUsers = require('./routes/routeUsers');
const routesOrders = require('./routes/routeOrders');

const router = Router({
  path: __dirname,
});

routesPlaces(router);
routesEvents(router);
routesUsers(router);
routesOrders(router);

router.init();
