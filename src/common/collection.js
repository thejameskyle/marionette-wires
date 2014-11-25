var Backbone = require('backbone');

module.exports = Backbone.Collection.extend({
  constructor() {
    Backbone.Collection.apply(this, arguments);
    this._isNew = true;
    this.once('sync', function() {
      this._isNew = false;
    });
  },

  isNew() {
    return this._isNew;
  }
});
