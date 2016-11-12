import {expect} from 'chai';
import glue from 'glue';
import mathPlugin from '../../';

const logPlugin = {
  register: (server, options, next) => {
    server.expose('logger', () => {
      return ()=>{}
    });
    next();
  }
};

logPlugin.register.attributes = {
  name: 'log-plugin',
  version: '0.0.1'
};

const seneca = {
  act: function(obj, callback){
    callback(null, {
      result: 5,
      obj: obj
    });
  }
};

const senecaPlugin = {
  register: (server, options, next) => {
    server.expose('seneca', seneca);
    next();
  }
};

senecaPlugin.register.attributes = {
  name: 'seneca-plugin',
  version: '0.0.1'
};

const setup = (callback) => {
  glue.compose({}, (err, server) => {
    server.register([
      {
        register: logPlugin,
        options: {}
      },{
        register: senecaPlugin,
        options: {}
      },{
        register: mathPlugin,
        options: {}
      }
    ], (registerErr) => {
      callback(registerErr, server);
    });
  });
};


describe('math-plugin', () => {
  it('registers the plugin', (done) => {
    setup((err) => {
      expect(err).to.equal(undefined);
      done();
    });
  });

  it('registers a new route called /calculate', (done) => {
    setup((err, server) => {
      const routingTable = server.table();

      expect(routingTable).to.have.length(1);
      expect(routingTable[0].table).to.have.length(1);
      expect(routingTable[0].table[0].path).to.equal('/calculate');

      done();
    });
  });

  it('returns on correct args', (done) =>{
    setup((err, server) => {
      server.inject('/calculate?op=add&x=1&y=1', (response) => {
          expect(response.result).to.equal(5);
          expect(response.result).to.equal(5);
          done();
      });
    });
  });

  it('defaults op param to add', (done) => {
    setup((err, server) => {
      server.inject('/calculate?x=1&y=1', (response) => {
        expect(response.statusCode).to.equal(200);
        expect(response.result).to.equal(5);
        done();
      });
    });
  });

  it('returns 400 on missing x param', (done) => {
    setup((err, server) => {
      server.inject('/calculate?op=add&y=1', (response) => {
        expect(response.statusCode).to.equal(400);
        done();
      });
    });
  });

  it('retuns 400 on missing y param', (done) => {
    setup((err, server) => {
      server.inject('/calculate?op=add&x=1', (response) => {
        expect(response.statusCode).to.equal(400);
        done();
      });
    });
  });

  it('retuns 400 on divide with zero', (done) => {
    setup((err, server) => {
      server.inject('/calculate?op=divide&x=1&y=0', (response) => {
        expect(response.statusCode).to.equal(400);
        done();
      })
    });
  });

  it('returns 400 on seneca error', (done) => {
    seneca.act = function(obj, callback){
      callback({msg: 'msg'}, null);
    };
    setup((err, server) => {
      server.inject('/calculate?op=divide&x=1&y=0', (response) => {
        expect(response.statusCode).to.equal(400);
        done();
      })
    });
  });
});
