var MathExtendedInstructionSet = {};

BasicInstructionSet.opStart = function () {
  return true;
};

BasicInstructionSet.opEnd = function () {
  return false;
};

BasicInstructionSet.opJmp = function (ic) {
  return this.jumpToInstruction(parseInt(ic));
};

BasicInstructionSet.opPush = function (value) {
  return this.stackPush(value);
};

BasicInstructionSet.opPrint = function () {
  var value = this.stackPop();

  console.log(value);

  return value;
};

BasicInstructionSet.opAdd = function (op1, op2) {
  if (typeof op2 === 'undefined') {
    op2 = this.stackPop();
  }

  if (typeof op1 === 'undefined') {
    op1 = this.stackPop();
  }

  var result = parseInt(op1) + parseInt(op2);

  return this.stackPush(result);
};

BasicInstructionSet.opSub = function (op1, op2) {
  if (typeof op2 === 'undefined') {
    op2 = this.stackPop();
  }

  if (typeof op1 === 'undefined') {
    op1 = this.stackPop();
  }

  var result = parseInt(op1) - parseInt(op2);

  return this.stackPush(result);
};

BasicInstructionSet.opMul = function (op1, op2) {
  if (typeof op2 === 'undefined') {
    op2 = this.stackPop();
  }

  if (typeof op1 === 'undefined') {
    op1 = this.stackPop();
  }

  var result = parseInt(op1) * parseInt(op2);

  return this.stackPush(result);
};

BasicInstructionSet.opDiv = function (op1, op2) {
  if (typeof op2 === 'undefined') {
    op2 = this.stackPop();
  }

  if (typeof op1 === 'undefined') {
    op1 = this.stackPop();
  }

  var result = parseInt(op1) / parseInt(op2);

  return this.stackPush(result);
};

module.exports = BasicInstructionSet;