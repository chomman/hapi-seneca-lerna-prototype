module.exports = (server, schema, handlers) => {
  const routes = [];

  routes.push({
    method: 'GET',
    path: '/products',
    config: {
      description: 'Get all products',
      tags: ['api'],
      handler: handlers.getProducts,
      response: {
        schema: schema.productsResponse
      }
    }
  });

  routes.push({
    method: 'GET',
    path: '/products/{product}',
    config: {
      description: 'Get specific product',
      tags: ['api'],
      validate: {
        params: schema.productValidate
      },
      handler: handlers.getProductById,
      response: {
        schema: schema.productResponse
      }
    }
  });

  routes.push({
    method: 'POST',
    path: '/products',
    config: {
      description: 'Create a product',
      tags: ['api'],
      validate: {
        payload: schema.createProductValidation
      },
      handler: handlers.createProduct,
      response: {
        schema: schema.productResponse
      }
    }
  });

  routes.push({
    method: 'PUT',
    path: '/products',
    config: {
      description: 'Update a product',
      tags: ['api'],
      validate: {
        payload: schema.updateProductValidation
      },
      handler: handlers.updateProduct,
      response: {
        schema: schema.productResponse
      }
    }
  });

  routes.push({
    method: 'DELETE',
    path: '/products',
    config: {
      description: 'Delete all products',
      tags: ['api'],
      handler: handlers.deleteProducts,
      response: {
        schema: schema.deleteResponse
      }
    }
  });

  routes.push({
    method: 'DELETE',
    path: '/product',
    config: {
      description: 'Delete specific product',
      tags: ['api'],
      validate:{
        payload: schema.deleteProductValidation
      },
      handler: handlers.deleteProduct,
      response: {
        schema: schema.deleteResponse
      }
    }
  });



  return routes;
}
