var Model = require('src/common/model');

module.exports = Model.extend({
  urlRoot: '/api/books',

  isActive() {
    return this.collection.active === this;
  }
});
