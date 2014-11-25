var _ = require('lodash');
var Backbone = require('backbone');
var Model = require('src/common/model');

module.exports = Model.extend({
  defaults: {
    timeout: false,
    dismissible: true,
    clearOnRoute: true
  },

  initialize() {
    if (this.get('timeout') !== false) {
      this._setTimeout();
    }

    this.on('destroy', this._clearTimeout);

    if (this.get('clearOnRoute')) {
      this.listenTo(Backbone.history, 'route', this.destroy);
    }
  },

  _setTimeout() {
    this._timeout = setTimeout(_.bind(this.destroy, this), this.get('timeout'));
  },

  _clearTimeout() {
    if (this._timeout) {
      clearTimeout(this._timeout);
      delete this._timeout;
    }
  }
});
