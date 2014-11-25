var Router = require('src/common/router');
var Radio = require('backbone.radio');
var IndexRoute = require('./route');

module.exports = Router.extend({
  initialize(options) {
    this.container = options.container;
  },

  onBeforeEnter() {
    Radio.command('header', 'activate', { path: '' });
  },

  routes: {
    '': 'index'
  },

  index() {
    return new IndexRoute({
      container: this.container
    });
  }
});
