import boom from 'boom';

module.exports = (seneca) => {
  const handlers = {};


  handlers.hello = (request, reply) => {
    const {log} = request.server.plugins['api-plugin'];
    const {n} = request.query;
    const response = [];

    log('Hello handler.');

    if(n < 1){
      const err = new Error('The number must be greater than zero.');

      log(['error'], err);
      return reply(boom.badGateway(err));
    }

    for(let i = 1; i <= n; i += 1){
      response.push(`Item ${i}`);
    }

    seneca.act({role: 'math', cmd: 'sum', x: 4, y:8}, (err, data) => {
        response.push('Item ' + data.result);
        return reply(response);
    });

  }

  return handlers;
}
