var Module = require('src/common/module');
var Router = require('./router');

module.exports = Module.extend({
  initialize() {
    this.router = new Router(this.options);
  }
});
