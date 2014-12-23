var Router = require('src/common/router');
var Radio = require('backbone.radio');

var LayoutView = require('./layout-view');
var Collection = require('./collection');

var IndexRoute = require('./index/route');
var ShowRoute = require('./show/route');

module.exports = Router.extend({
  initialize(options) {
    this.container = options.container;
    this.collection = new Collection();
  },

  onBeforeEnter() {
    this.layout = new LayoutView();
    this.container.show(this.layout);
    Radio.command('header', 'activate', { path: 'books' });
  },

  routes: {
    'books'     : 'index',
    'books/:id' : 'show'
  },

  index() {
    return new IndexRoute({
      collection: this.collection
    });
  },

  show() {
    return new ShowRoute({
      collection : this.collection,
      layout     : this.layout
    });
  }
});
