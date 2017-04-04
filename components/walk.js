// follow compononent
AFRAME.registerComponent('walk', {
  schema: {
    speed: {type: 'number'},
  },
  init: function() {
    this.directionVec3 = new THREE.Vector3();
  },

  tick: function(time) {
    var directionVec3 = this.directionVec3;

    var distance = 1;
    this.el.object3D.translateZ( - distance );

  }
});
