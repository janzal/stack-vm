var CoreInstructionSet = {};

CoreInstructionSet.opEval = function () {
  var code = '';

  do {
    var code_part = this.stackPop();

    if (code_part === 'NULL') {
      break;
    }

    code += code_part + '\n';
  } while (true);

  var result = eval(code);

  this.stackPush(result);

  return result;
};

module.exports = CoreInstructionSet;
