const Router = require('./router/expressRouter');

const routesEvents = require('./routes/routeEvents');
const routesPlaces = require('./routes/routePlaces');
const routesUsers = require('./routes/routeUsers');

routesEvents(Router);
routesPlaces(Router);
routesUsers(Router);

Router.init();
