var Radio = require('backbone.radio');
var Module = require('src/common/module');
var Collection = require('src/common/collection');
var View = require('./view');

module.exports = Module.extend({
  initialize() {
    this.container = this.options.container;
    this.collection = new Collection();
    this.channel = Radio.channel('header');
    this.start();
  },

  onStart() {
    this.view = new View({ collection: this.collection });
    this.container.show(this.view);

    this.channel.comply({
      add      : this.onAdd,
      activate : this.onActivate,
      remove   : this.onRemove
    }, this);
  },

  onStop() {
    this.channel.reset();
  },

  onAdd(model) {
    this.collection.add(model);
  },

  onRemove(model) {
    model = this.collection.findWhere(model);
    this.collection.remove(model);
  },

  onActivate(model) {
    this.collection.invoke('set', 'active', false);
    model = this.collection.findWhere(model);
    if (model) {
      model.set('active', true);
    }
  }
});
