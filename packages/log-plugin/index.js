import pkg from './package.json';

exports.register = (server, options, next) => {
  console.log('[PLUGIN LOG]', 'Registered');

  server.expose('logger', (pluginName) => {
    return (...args) => console.log(pluginName, args);
  });

  return next();
}


exports.register.attributes = {
  pkg,
  dependencies: []
};
