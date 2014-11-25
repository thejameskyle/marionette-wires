var nprogress = require('nprogress');
var Backbone = require('backbone');
var FormBehavior = require('src/forms/behavior');
var _ = require('lodash');
var View = require('src/common/view');
var template = require('./template.hbs');

module.exports = View.extend({
  template: template,
  className: 'colors colors--edit container',

  behaviors: {
    form: { behaviorClass: FormBehavior }
  },

  templateHelpers() {
    return {
      errors: this.model.validationError
    };
  },

  initialize () {
    _.bindAll(this, 'handleSaveSuccess');
  },

  events: {
    'submit form': 'handleSubmit'
  },

  handleSubmit () {
    var errors = this.model.validate(this.form);

    if (!errors) {
      nprogress.start();
      this.model
        .save(this.form)
        .done(this.handleSaveSuccess);
    } else {
      this.model.validationError = errors;
      this.render();
    }
  },

  handleSaveSuccess () {
    Backbone.history.navigate('colors/' + this.model.id, { trigger: true });
  }
});
