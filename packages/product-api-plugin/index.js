import pkg from './package.json';
import routesBuilder from './lib/routes';
import schemaBuilder from './lib/schema';

import handlers from './lib/handlers';

exports.register = (server, options, next) => {
  const log = server.plugins['log-plugin'].logger('[PLUGIN PRODUCT API]');
  const seneca = server.plugins['seneca-plugin'].seneca;

  server.expose('log', log);

  const schema = schemaBuilder(server);
  const routes = routesBuilder(server, schema, handlers(seneca));

  server.route(routes);

  return next();
}

exports.register.attributes = {
  pkg,
  dependencies: [
    'log-plugin',
    'seneca-plugin'
  ]
};
