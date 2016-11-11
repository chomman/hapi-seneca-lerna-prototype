module.exports = (server, schema, handlers) => {
  const routes = [];

  routes.push({
    method: 'GET',
    path: '/hello',
    config: {
      description: 'Hello handler',
      tags: ['api'],
      validate: {
        query: schema.helloValidate,
      },
      handler: handlers.hello,
      response: {
        schema: schema.helloResponse
      }
    }
  });

  return routes;
};
