var Marionette = require('backbone.marionette');
var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('lodash');
var Radio = require('backbone.radio');
var Route = require('./route');

module.exports = Marionette.AppRouter.extend({
  constructor() {
    this.channel = Radio.channel('router');
    this.on('all', this._onRouterEvent);
    this.listenTo(Backbone.history, 'route', this._onHistoryRoute);
    Marionette.AppRouter.apply(this, arguments);
  },

  _onRouterEvent(name) {
    var args = _.toArray(arguments).slice(1);
    this.channel.trigger.apply(this.channel, [name, this].concat(args));
  },

  _onHistoryRoute(router) {
    if (this === router) {
      this.active = true;
    } else {
      this.active = false;
    }
  },

  execute(callback, args) {
    if (!this.active) {
      this.triggerMethod.apply(this, ['before:enter'].concat(args));
    }

    this.triggerMethod.apply(this, ['before:route'].concat(args));

    $.when(this._execute(callback, args)).then(() => {
      if (!this.active) {
        this.triggerMethod.apply(this, ['enter'].concat(args));
      }

      this.triggerMethod.apply(this, ['route'].concat(args));
    });
  },

  _execute(callback, args) {
    var route = callback.apply(this, args);

    if (route instanceof Route) {
      route.router = this;
      return route.enter(args);
    }
  },

  triggerMethod: Marionette.triggerMethod
});
