const senecaActions = (seneca) => {
  seneca.add({role: 'math', cmd: 'sum'}, (args, done) => {
    done(null, { result: args.x + args.y});
  });
};


module.exports = senecaActions;
