var app = require('./app.json');
var StackVM = require('./vm.js');

var extensions;

if (Array.isArray(app.extensions)) {
  extensions = [];

  app.extensions.forEach(function (ext_name) {
    var extension = require(ext_name);
    extensions.push(extension);
  });
}

if (!Array.isArray(app.instructions)) {
  throw new Error('There are no instructions to process');
}

var stack_vm = new StackVM(app.instructions, extensions);
var result = stack_vm.run();

console.log('Result:', result);