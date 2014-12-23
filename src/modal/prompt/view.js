var Radio = require('backbone.radio');
var View = require('src/common/view');
var Model = require('src/common/model');
var template = require('./template.hbs');

module.exports = View.extend({
  template: template,
  tagName: 'form',

  ui: {
    'input' : 'input'
  },

  initialize() {
    this.model = new Model(this.options);
    Radio.request('modal', 'open', this);
  },

  events: {
    'submit'             : 'submit',
    'click .btn-default' : 'cancel',
    'click .close'       : 'cancel'
  },

  submit(e) {
    e.preventDefault();
    var val = this.ui.input.val();
    Radio.request('modal', 'close').then(() => this.trigger('submit', val));
  },

  cancel() {
    Radio.request('modal', 'close').then(() =>
      this.trigger('cancel'));
  }
});
