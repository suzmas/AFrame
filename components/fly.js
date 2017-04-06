AFRAME.registerComponent('click-to-fly', {
  schema: {
    vel: {
      default: { x: 0, y: 0, z: -0.4},
      type: 'vec3'
    },
    flying: {
      default: false
    }
  },
  init: function() {
    this.el.sceneEl.addEventListener('click', function() {
      console.log("CLICKED ON CAMERA");
      var camEl = document.querySelector('a-camera');
      var flying = camEl.getAttribute('click-to-fly').flying;
      camEl.setAttribute('click-to-fly', 'flying', flying);
    });
  },
  tick: function(t) {
    if (t - this.time < 20) {
      return;
    }
    this.time = t;
    var data = this.data;
    var vel = data.vel;
    var flying = data.flying;
    this.rotX = 0;
    this.rotZ = 0;
    console.log(flying);
    if (flying == true) {
      var pos = this.el.getAttribute('position');
      if (window.DeviceMotionEvent != undefined) {
        window.ondevicemotion = function(e) {
          var ay = event.accelerationIncludingGravity.y;
          var az = event.accelerationIncludingGravity.z;
          vel.x = ay * 0.1;
          vel.y = az * -0.08;
          var ship = document.querySelector('#ship');
          ship.setAttribute('rotation', {
            x: Math.round(az * 100) / 100 * -5,
            y: Math.round(ay * 100) / 100 * -5,
            z: Math.round(ay * 100) / 100 * -5
          });
        };
      }
      if (pos.z < -400) {
        pos.z = 0;
      }
      this.el.setAttribute('position', {
        x: pos.x + vel.x,
        y: pos.y + vel.y,
        z: pos.z + vel.z
      });
    }
  }
});

AFRAME.registerComponent('lock-to-camera', {
  tick: function(t) {
    //if(t - this.time < 20){return;}
    //this.time = t;
    var camEl = document.querySelector('a-camera');
    var flying = camEl.getAttribute('click-to-fly').flying;
    console.log(flying);
    if (flying == true) {
      var camPos = camEl.getAttribute('position');
      this.el.setAttribute('position', {
        x: camPos.x,
        y: camPos.y - 1,
        z: camPos.z - 2
      });
    }
  }
})
