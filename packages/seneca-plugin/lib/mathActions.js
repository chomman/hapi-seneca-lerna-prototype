'use strict';

const mathActions = (seneca) => {

  const plugin = 'math';

  seneca.add({role: plugin,cmd: 'add'}, add);
  seneca.add({role: plugin,cmd: 'subtract'}, subtract);
  seneca.add({role: plugin,cmd: 'divide'}, divide);
  seneca.add({role: plugin,cmd: 'multiply'}, multiply);

};


function add(args, done){
  const err = (!isNumber(args.x) || !isNumber(args.y))? new Error('Arguments must be numbers') : null;
  const result = !err ? args.x + args.y: 0;
  done(err, { result: result});
}

function subtract(args, done){
  const err = (!isNumber(args.x) || !isNumber(args.y))? new Error('Arguments must be numbers') : null;
  const result = !err ? args.x - args.y : 0;
  done(err, {result: result});
}

function divide(args, done){
  const err = (!isNumber(args.x) || !isNumber(args.y))? new Error('Arguments must be numbers') : null;
  let result = 0;
  if(!err && args.y !== 0){
    result = args.x / args.y;
  }
  done(err, {result: result});
}

function multiply(args, done){
  const err = (!isNumber(args.x) || !isNumber(args.y))? new Error('Arguments must be numbers') : null;
  const result = !err ? args.x * args.y : 0;
  done(err, {result: result});
}

function isNumber(value){
  return typeof value === 'number' && isFinite(value);
}


module.exports = mathActions;
