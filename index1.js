AFRAME.registerComponent('random-bounce', {
  schema: {
    min: {default: 1},
    max: {default: 3},
    dur: {default: null}
  },
  init: function(){
    var data = this.data;
    var max = data.max;
    var min = data.min;
    var dur = data.dur;
    if (dur == null){
      dur = Math.floor(Math.random() * 1500 + 400)
    };
    var pos = this.el.getAttribute("position");
    var randomHeight = Math.random() * (max - min) + min
    var animation = document.createElement("a-animation");
    animation.setAttribute("begin", "mouseenter");
    animation.setAttribute("attribute","position");
    animation.setAttribute("to", pos.x + " " + (pos.y + randomHeight) + " " + pos.z);
    animation.setAttribute("direction", "alternate");
    animation.setAttribute("dur", dur);
    this.el.appendChild(animation);
  }
});
