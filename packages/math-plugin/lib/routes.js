module.exports = (server, schema, handlers) =>{

  const routes = [];

  routes.push({
    method: 'GET',
    path: '/calculate',
    config: {
      description: 'Calculate actions',
      tags: ['api'],
      validate: {
        query: schema.calculateValidate
      },
      handler: handlers.calculate,
      response: {
        schema: schema.calculateResponse
      }
    }
  });

  return routes;
};
