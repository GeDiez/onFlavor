var moment = require('moment-timezone');
var locale = require('moment/locale/es');

moment.locale('es', locale);
module.exports = moment;
