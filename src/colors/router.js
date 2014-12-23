var Router = require('src/common/router');
var Radio = require('backbone.radio');

var Collection  = require('./collection');
var IndexRoute  = require('./index/route');
var CreateRoute = require('./create/route');
var ShowRoute   = require('./show/route');
var EditRoute   = require('./edit/route');

module.exports = Router.extend({
  initialize(options) {
    this.container = options.container;
    this.collection = new Collection();
  },

  onBeforeEnter() {
    Radio.command('header', 'activate', { path: 'colors' });
  },

  routes: {
    'colors'          : 'index',
    'colors/new'      : 'create',
    'colors/:id'      : 'show',
    'colors/:id/edit' : 'edit'
  },

  index() {
    return new IndexRoute({
      container  : this.container,
      collection : this.collection
    });
  },

  create() {
    return new CreateRoute({
      container  : this.container,
      collection : this.collection
    });
  },

  show() {
    return new ShowRoute({
      container  : this.container,
      collection : this.collection
    });
  },

  edit() {
    return new EditRoute({
      container  : this.container,
      collection : this.collection
    });
  }
});
