var Module = require('src/common/module');
var Radio = require('backbone.radio');
var Backbone = require('backbone');
var $ = require('jquery');

var LayoutView = require('./layout-view');

var AlertView   = require('./alert/view');
var ConfirmView = require('./confirm/view');
var PromptView  = require('./prompt/view');

module.exports = Module.extend({
  initialize() {
    this.container = this.options.container;
    this.channel = Radio.channel('modal');
    this.start();
  },

  onStart() {
    this.layout = new LayoutView();
    this.container.show(this.layout);

    this.channel.reply({
      'open'    : this.open,
      'close'   : this.close,
      'alert'   : this.alert,
      'confirm' : this.confirm,
      'prompt'  : this.prompt
    }, this);

    this.listenTo(Backbone.history, {
      'route' : this.onRoute
    });
  },

  onStop() {
    this.channel.reset();
  },

  onRoute() {
    if (this.fragment !== Backbone.history.fragment) {
      this.close();
    }
  },

  alert(options) {
    var deferred = $.Deferred();
    var view = new AlertView(options);

    view.on({
      'confirm' : deferred.resolve,
      'cancel'  : deferred.resolve
    });

    return deferred;
  },

  confirm(options) {
    var deferred = $.Deferred();
    var view = new ConfirmView(options);

    view.on({
      'confirm' : deferred.resolve,
      'cancel'  : deferred.reject
    });

    return deferred;
  },

  prompt(options) {
    var deferred = $.Deferred();
    var view = new PromptView(options);

    view.on({
      'submit' : deferred.resolve,
      'cancel' : deferred.reject
    });

    return deferred;
  },

  open(view) {
    this.fragment = Backbone.history.fragment;
    return this.close().then(() => {
      this.isOpen = true;
      return this.layout.open(view);
    });
  },

  close() {
    if (this.isOpen) {
      this.isOpen = false;
      return this.layout.close();
    } else {
      return $.Deferred().resolve();
    }
  }
});
