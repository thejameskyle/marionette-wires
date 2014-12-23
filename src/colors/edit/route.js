var Route = require('src/common/route');
var Model = require('../model');
var View = require('./view');

module.exports = Route.extend({
  initialize(options) {
    this.container = options.container;
    this.collection = options.collection;
  },

  fetch(id) {
    if (this.collection.isNew()) {
      this.model = new Model({ id: id });
      return this.model.fetch();
    } else {
      this.model = this.collection.get(id);
    }
  },

  render() {
    this.view = new View({
      model: this.model
    });
    this.container.show(this.view);
  }
});
