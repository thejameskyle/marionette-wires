var Route = require('src/common/route');
var View = require('./view');

module.exports = Route.extend({
  initialize(options) {
    this.container = options.container;
  },

  render() {
    this.view = new View();
    this.container.show(this.view);
  }
});
