var Route = require('src/common/route');

module.exports = Route.extend({
  initialize(options) {
    this.collection = options.collection;
  },

  fetch() {
    if (this.collection.isNew()) {
      return this.collection.fetch();
    }
  },

  onEnter() {
    var id = this.collection.first().get('id');
    this.navigate('books/' + id, {
      trigger: true,
      replace: true
    });
  }
});
