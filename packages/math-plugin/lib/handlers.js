import boom from 'boom';

const handlers = {};

handlers.calculate = (request, reply) => {
  const {log} = request.server.plugins['math-plugin'];
  const {seneca} = request.server.plugins['math-plugin'];
  const {op} = request.query;
  const {x} = request.query;
  const {y} = request.query;

  let response;

  if(op === 'divide' && y === 0){
    const err = new Error('Divide by zero is not permitted');
    log(['error'], err);
    return reply(boom.badRequest(err));
  }

  seneca.act({role: 'math', cmd: 'op', x: x, y: y}, (err, data) => {
    if(err){
      return reply(boom.badRequest(err));
    }

    reply(data.result);
  });
}

export default handlers;
