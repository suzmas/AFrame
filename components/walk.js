// walk component
AFRAME.registerComponent('walk', {
  schema: {
    walking: {
      default: false
    },
  },
  init: function() {
    this.directionVec3 = new THREE.Vector3();
    this.el.sceneEl.addEventListener('click', function() {
      var camEl = document.querySelector('a-camera');
      var walking = camEl.getAttribute('walk').walking;
      camEl.setAttribute('walk', 'walking', !walking);
    });
  },

  tick: function(time) {

    if (this.data.walking) {
      console.log("we are walking");
      var directionVec3 = this.directionVec3;

      var distance = .05;
      this.el.object3D.translateZ(-distance);
    }
  }
});

// NEED TO: //
// stop user from moving off the ground
// potentially add walk control target to top left of screen instead of entire
// scene click listener
