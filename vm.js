String.prototype.replaceAt = function (index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}

var StackVM = function (instructions, extensions) {
  this.instructions_ = instructions;
  this.ic_ = 0;
  this.stack_ = [];

  this.max_stack_ = 1000;

  this.verbose_ = true;

  this.extensions_ = extensions || [];
};

StackVM.prototype.processInstruction_ = function (instruction) {
  if (!instruction) {
    return false;
  }

  var self = this;

  var instruction_parts = instruction.split(' ');

  var op_code = instruction_parts[0];
  var operators = instruction_parts.splice(1);

  if (this.verbose_) {
    console.log(op_code, operators);
  }

  var result = this.extensions_.some(function (extension) {
    var opname = op_code.toLowerCase();
    opname = opname.replaceAt(0, opname[0].toUpperCase());

    var opfn = 'op' + opname;

    if (typeof extension[opfn] === 'function') {
      return extension[opfn].apply(self, operators)?true:false;
    }

    return false;
  });

  if (result === false) {
    throw new Error('Unknow operator "' + op_code + '"');
  }

  return result;
};

StackVM.prototype.stackPush = function(value) {
  if (this.stack_.length > this.max_stack_) {
    throw new Error('Stack overflow');
  }

  return this.stack_.push(value);
};

StackVM.prototype.stackPop = function() {
  return this.stack_.splice(-1)[0];
}

StackVM.prototype.jumpToInstruction = function(ic) {
  return this.ic_ = ic;
}

StackVM.prototype.run = function () {
  while (true) {
    var result = this.processInstruction_(this.instructions_[this.ic_++]);

    if (result === false) {
      return this.stackPop();
    }
  }
};


module.exports = StackVM;
