// follow compononent
AFRAME.registerComponent('follow', {
  schema: {
    target: {type: 'selector'},
    speed: {type: 'number'},
    faceTarget:{type: 'boolean', default: false}
  },
  init: function() {
    this.directionVec3 = new THREE.Vector3();
  },

  tick: function(time, timeDelta) {
    var directionVec3 = this.directionVec3;

    var targetPosition = this.data.target.object3D.position;
    var currentPosition = this.el.object3D.position;

    // subtract the vectors to get dir
    directionVec3.copy(targetPosition).sub(currentPosition);

    // calc dist
    var distance = directionVec3.length();
    console.log(distance);

    if (distance < 8) { return; }

    // scale down magnitude to match speed
    var factor = this.data.speed / distance;
    ['x', 'y', 'z'].forEach(function (axis) {
      directionVec3[axis] *= factor * (timeDelta / 1000);
    });

    // translate entity in dir toward target
    this.el.setAttribute('position', {
      x: currentPosition.x + directionVec3.x,
      y: currentPosition.y, // + directionVec3.y,
      z: currentPosition.z + directionVec3.z
    });

    if (this.data.faceTarget == true){
     var zAngle = 90 - Math.atan2(directionVec3.z, directionVec3.x) * (180 / Math.PI);
     this.el.setAttribute('rotation', 'y', zAngle);
   }
  }
});
