// first aframe component entity example
AFRAME.registerComponent('hop-away', {
  schema: {
    event: {
      type: 'string',
      default: ''
    },
    message: {
      type: 'string',
      default: 'Hello, World!'
    }
  },

  init: function() {
    var self = this;
    this.eventHandlerFn = function() {
      console.log(self.data.message);
    };
  },

  hop: function() {
    var dist = Math.random(2);

    for (i = 0; i < dist; i++) {
      this.el.setAttribute('position', {
        x: currentPosition.x + directionVec3.x,
        y: currentPosition.y, // + directionVec3.y,
        z: currentPosition.z + directionVec3.z
      })
    };
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
    width: {
      type: 'number',
      default: 1
    },
    height: {
      type: 'number',
      default: 1
    },
    depth: {
      type: 'number',
      default: 1
    },
    color: {
      type: 'color',
      default: '#AAA'
    }
  },
  init: function() {
    var data = this.data;
    var el = this.el;
    this.geometry = new THREE.BoxBufferGeometry(data.width, data.height, data.depth);
    this.material = new THREE.MeshStandardMaterial({
      color: data.color
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    el.setObject3D('mesh', this.mesh);
  },
  /**
   * Update the mesh in response to property updates.
   */
  update: function(oldData) {
    var data = this.data;
    var el = this.el;
    // If `oldData` is empty, then this means we're in the initialization process.
    // No need to update.
    if (Object.keys(oldData).length === 0) {
      return;
    }
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
  },
});
