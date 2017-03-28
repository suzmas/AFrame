AFRAME.registerComponent('hop-away', {
  schema: {
    event: {type: 'string', default: ''},
    message: {type: 'string', default: 'Hello, World!'}
  },

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


// init: function(){
//   var dur = Math.floor(Math.random() * 1500 + 400);
//   var pos = this.el.getAttribute("position");
//   var randomDist = Math.random() * 2;
//   var animation = document.createElement("a-animation");
//   animation.setAttribute("begin", "mouseenter");
//   animation.setAttribute("attribute","position");
//   animation.setAttribute("to", (pos.x + randomDist) + " " + (pos.y + 1) + " " + pos.z);
//   animation.setAttribute("dur", dur);
//   this.el.appendChild(animation);
//   var animation2 = document.createElement("a-animation");
//   animation2.setAttribute("begin", "mouseenter");
//   animation2.setAttribute("delay", dur-1);
//   animation2.setAttribute("attribute","position");
//   animation2.setAttribute("to", (pos.x + randomDist) + " " + (pos.y) + " " + pos.z);
//   animation2.setAttribute("dur", dur);
//   this.el.appendChild(animation2);
// }
