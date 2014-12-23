var Route = require('src/common/route');
var Model = require('../model');
var View = require('./view');

module.exports = Route.extend({
  initialize(options) {
    this.container = options.container;
    this.collection = options.collection;
  },

  fetch() {
    if (this.collection.isNew()) {
      return this.collection.fetch();
    }
  },

  render() {
    this.model = new Model();
    this.view = new View({
      collection: this.collection,
      model: this.model
    });
    this.container.show(this.view);
  }
});
