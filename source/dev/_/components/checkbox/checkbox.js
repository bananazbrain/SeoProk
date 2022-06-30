var check = {
  class: {
    block: 'check',
    input: 'input'
  },
  block: null,
  input: null,
  value: null,
  name: null,
  status: null,
  Vars: function (block) {
    this.block = block;
    this.input = this.block.find('input');
    this.name = this.input.attr('name');
    this.status = this.input.attr('checked');
    this.value = this.input.val();
  },
  Filled: function (block) {
    this.Vars(block);
    if (this.status == 'checked') {
      this.block.addClass('--checked')
    }
  },
  Click: function (block) {
    this.Vars(block);
    if (this.status == undefined || this.status == '') {
      this.input.attr('checked', 'checked');
      this.block.addClass('--checked');
    }
    else {
      this.input.removeAttr('checked');
      this.block.removeClass('--checked');
    }

  },
  Init: function () {
    this.input = '.' + check.class.block + ' input';
    $('body').find('.' + check.class.block).each(function () {
      check.Filled($(this));
    })
    $('body').on('click', '.' + check.class.block, function () {
      check.Click($(this));
    });
  }
};

check.Init();