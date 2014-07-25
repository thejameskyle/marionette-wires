var Controller = require('../classes/controller');
var Radio = require('../classes/radio');
var LayoutView = require('./layout-view');

var routerChannel = Radio.channel('router');

module.exports = Controller.extend({
  channelName: 'modal',

  initialize: function () {
    this.layout = new LayoutView();
    this.container.show(this.layout);

    this.channel.commands.setHandler('open', this.openModal, this);
    this.channel.commands.setHandler('destroy', this.destroyModal, this);
  },

  openModal: function (options) {
    this.layout.openModal(options);
    
    // Original path (on page load)
    this.originalFragment = Backbone.history.fragment;

    this.listenTo(routerChannel.vent, 'route', function () {
      
      // If the path is not the same as the path on page load, we close the modal
      if (Backbone.history.fragment != this.originalFragment) {
        this.destroyModal();
      }
    });
  },

  destroyModal: function (options) {
    this.layout.destroyModal(options);
  }
});
