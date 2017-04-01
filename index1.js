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
  },
  init: function () {
    var data = this.data;
    var el = this.el;
    this.geometry = new THREE.BoxBufferGeometry(data.width, data.height, data.depth);
    this.material = new THREE.MeshStandardMaterial({color: data.color});
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    el.setObject3D('mesh', this.mesh);
  },
  /**
   * Update the mesh in response to property updates.
   */
  update: function (oldData) {
    var data = this.data;
    var el = this.el;
    // If `oldData` is empty, then this means we're in the initialization process.
    // No need to update.
    if (Object.keys(oldData).length === 0) { return; }
    // Geometry-related properties changed. Update the geometry.
    if (data.width !== oldData.width ||
        data.height !== oldData.height ||
        data.depth !== oldData.depth) {
      el.getObject3D('mesh').geometry = new THREE.BoxBufferGeometry(data.width, data.height,
                                                                    data.depth);
    }
    // Material-related properties changed. Update the material.
    if (data.color !== oldData.color) {
      el.getObject3D('mesh').material.color = data.color;
    }
  },

  remove: function() {
    this.el.removeObject3D('mesh');
  }
});


// follow compononent tutorial
AFRAME.registerComponent('follow', {
  schema: {
    target: {type: 'selector'},
    speed: {type: 'number'},
    faceTarget:{type: 'boolean', default: true}
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

    if (distance < 1) { return; }

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
     var yAngle = 90 - Math.atan2(directionVec3.z, directionVec3.x) * (180 / Math.PI);
     this.el.setAttribute('rotation', 'y', yAngle);
   }
  }
});
