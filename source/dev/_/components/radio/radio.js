var radio = {
  class: {
    block: 'rad',
    input: 'input'
  },
  block: null,
  input: null,
  value: null,
  name: null,
  status: null,
  radios: null,
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
      this.radios = this.block.parents('body').find('input[name = ' + this.name + ']');
      this.radios.each(function () {
        var input = $(this).parents('.' + radio.class.block);
        $(this).removeAttr('checked');
        input.removeClass('--checked');
      });
      this.input.attr('checked', 'checked');
      this.block.addClass('--checked');
    }
  },
  Init: function () {
    this.input = '.rad input';
    $('body').find('.' + radio.class.block).each(function () {
      radio.Filled($(this));
    })
    $('.' + radio.class.block).on('click', function () {
      radio.Click($(this));
    });
  }
};
radio.Init();