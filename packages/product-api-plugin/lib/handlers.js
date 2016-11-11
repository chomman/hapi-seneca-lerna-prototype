import boom from 'boom';

module.exports = (seneca) => {
  const handlers = {};
  const plugin = 'product';

  handlers.getProducts = (request, reply) => {
    const {log} = request.server.plugins['api-plugin'];
    seneca.act({role: plugin, cmd: 'getProducts'}, (err, data)=>{
      if(err){
        log(err);
        return;
      }
      return reply(data);
    });
  };

  handlers.getProductById = (request, reply) => {
    const {log} = request.server.plugins['api-plugin'];
    const id = encodeURIComponent(request.params.product);

    seneca.act({role: plugin, cmd: 'getProduct'}, (err, data) => {
      if(err){
        log(err);
        return;
      }
      return reply(data);
    });
  };

  handlers.createProduct = (request, reply) => {
      const {log} = request.server.plugins['api-plugin'];
      const name = request.payload.name;
      const size = request.payload.size;

      seneca.act({role: plugin, cmd: 'createProduct'}, (err, data) => {
        if(err){
          log(err);
          return;
        }
        return reply(data);
      });
  };

  handlers.updateProduct = (request, reply) => {
    const {log} = request.server.plugins['api-plugin'];
    const id = request.payload.id;
    const name = request.payload.name;
    const size = request.payload.size;

    seneca.act({role: plugin, cmd: updateProduct}, (err, data)=>{
      if(err){
        log(err);
        return;
      }
      return reply(data);
    });
  };

  handlers.deleteProducts = (request, reply) => {
    const {log} = request.server.plugins['api-plugin'];

    seneca.act({role: plugin, cmd: 'deleteProducts'}, (err, data) => {
      if(err){
        log(err);
        return;
      }
      return reply(data);
    });
  };

  handlers.deleteProduct = (request, reply) => {
    const {log} = request.server.plugins['api-plugin'];
    const id = request.payload.id;

    seneca.act({role: plugin, cmd: 'deleteProduct'}, (err, data) => {
      if(err){
        log(err);
        return;
      }

      return reply(data);
    });
  };

  return handlers;
};
