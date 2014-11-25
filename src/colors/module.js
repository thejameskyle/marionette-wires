var Radio = require('backbone.radio');
var Module = require('src/common/module');
var Router = require('./router');

module.exports = Module.extend({
  initialize() {
    this.router = new Router(this.options);

    Radio.command('header', 'add', {
      name: 'Colors',
      path: 'colors',
      type: 'primary'
    });
  }
});
