require('babel/register');
const path = require('path');
const glue = require('glue');
const manifest = require('./manifest.json');

const start = () => {
  const options = {
    relativeTo: path.join(__dirname, 'node_modules')
  };

  glue.compose(manifest, options, (composeErr, server) => {
    if(composeErr){
      throw (composeErr);
    }

    server.start((startErr)=>{
      if(startErr){
        throw (startErr);
      }

      server.log(['server', 'info'],{
        msg: 'Server started',
        server: server.info
      });
    });
  });
};

start();
