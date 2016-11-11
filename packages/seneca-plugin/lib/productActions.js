const productActions = (seneca) => {

  const plugin = 'product';

  seneca.add({role: plugin, cmd: 'getProducts'}, getProducts);
  seneca.add({role: plugin, cmd: 'getProduct'}, getProduct);
  seneca.add({role: plugin, cmd: 'createProduct'}, createProduct);
  seneca.add({role: plugin, cmd: 'updateProduct'}, updateProduct);
  seneca.add({role: plugin, cmd: 'deleteProducts'}, deleteProducts);
  seneca.add({role: plugin, cmd: 'deleteProduct'}, deleteProduct);
}

function getProducts(args, done){
  done(null, [{
    name: 'Product 1',
    size: 10
  },{
    name: 'Product 2',
    size: 11
  }]);
}


function getProduct(args, done){
  done(null, {
    name: 'Product 1',
    size: 15
  });
}

function createProduct(args, done){
  done(null, {
    name: 'Product 1',
    size: 19
  });
}

function updateProduct(args, done){
  done(null, {
    name: 'Product 1',
    size: 17
  });
}

function deleteProducts(args, done){
  done(null, {
    message: 'All products have been deleted'
  });
}

function deleteProduct(args, done){
  done(null,{
    message: 'Product with ID have been deleted'
  });
}

module.exports = productActions;
