import senecaLibrary from 'seneca';
import senecaActions from './lib/seneca';
import productActions from './lib/productActions';
import mathActions from './lib/mathActions';
import pkg from './package.json';

exports.register = (server, options, next) => {
  const log = server.plugins['log-plugin'].logger('[PLUGIN SENECA]');
  server.expose('log', log);
  const seneca = senecaLibrary();

  log('Registered');

  senecaActions(seneca);
  productActions(seneca);
  mathActions(seneca);

  server.expose('seneca', seneca);

  return next();
};

exports.register.attributes = {
  pkg,
  dependencies: [
    'log-plugin'
  ]
};
