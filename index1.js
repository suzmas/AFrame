// first aframe component entity example
AFRAME.registerComponent('hop-away', {
  schema: {
    event: {type: 'string', default: ''},
    message: {type: 'string', default: 'Hello, World!'}
  },

  multiple: true,

  init: function() {
    var self = this;
    this.eventHandlerFn = function() { console.log(self.data.message);};
  },

  update: function(oldData) {
    var data = this.data;
    var el = this.el;

    if (oldData.event && data.event !== oldData.event) {
      el.removeEventListener(oldData.event, this.eventHandlerFn);
    }

    if (data.event) {
      el.addEventListener(data.event, this.eventHandlerFn);
    } else {
    console.log(data.message);
    }
  },

  remove: function() {
    var data = this.data;
    var el = this.el;

    if (data.event) {
      el.removeEventListener(data.event, this.eventHandlerFn);
    }
  }
});
// Aframe component entity Box example
AFRAME.registerComponent('box', {
  schema: {
    width: {type: 'number', default: 1},
    height: {type: 'number', default: 1},
    depth: {type: 'number', default: 1},
    color: {type: 'color', default: '#AAA'}
  }
});
