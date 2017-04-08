AFRAME.registerComponent('spawner', {
  schema: {
    on: {
      default: 'click'
    },
    mixin: {
      default: ''
    }
  },

  /**
   * Add event listener to entity that when emitted, spawns the entity.
   */
  update: function(oldData) {
    this.el.addEventListener(this.data.on, this.spawn.bind(this));
  },

  /**
   * Spawn new entity with a mixin of components at the entity's current position.
   */
  spawn: function() {
    var el = this.el;
    var entity = document.createElement('a-entity');
    var matrixWorld = el.object3D.matrixWorld;
    var position = new THREE.Vector3();
    var rotation = el.getAttribute('rotation');
    var entityRotation;

    // Have the spawned entity face the same direction as the entity.
    // Allow the entity to further modify the inherited rotation.
    position.setFromMatrixPosition(matrixWorld);
    entity.setAttribute('position', position);
    entity.setAttribute('mixin', this.data.mixin);
    entity.addEventListener('loaded', function() {
      entityRotation = entity.getAttribute('rotation');
      entity.setAttribute('rotation', {
        x: entityRotation.x + rotation.x,
        y: entityRotation.y + rotation.y,
        z: entityRotation.z + rotation.z
      });
    });
    el.sceneEl.appendChild(entity);
  }
});

AFRAME.registerComponent('click-listener', {
  // When the window is clicked, emit a click event from the entity.
  init: function() {
    var el = this.el;
    window.addEventListener('click', function() {
      el.emit('click', null, false);
    });
  }
});

AFRAME.registerComponent('projectile', {
  schema: {
    speed: { default: 0.6 }
  },
  tick: function (t) {
    console.log(t);
    var speed = this.data.speed;
    this.el.object3D.translateY( -speed );
    var entity = this.el;
    if (t > 1000) { this.el.removeObject3D(); }
  }
});

AFRAME.registerComponent('collider', {
  schema: {
    target: { default: '' }
  },

  // Calc targets
  init: function () {
    console.log(this);
    var targetEls = this.el.sceneEl.querySelectorAll(".enemy");
    this.targets = [];
    for (var i=0; i<targetEls.length; i++) {
      this.targets.push(targetEls[i].object3D);
    }
    this.el.object3D.updateMatrixWorld();
  },

  // check collisions w/ cylinder
  tick: function (t) {
    var collisionResults;
    var directionVector;
    var el = this.el;
    var sceneEl = el.sceneEl;
    this.el.setAttribute('geometry', 'buffer: false;'); //issue
    var mesh = el.getObject3D('mesh');
    var object3D = el.object3D;
    var raycaster;
    var vertices = mesh.geometry.vertices;
    var bottomVertex = vertices[0].clone();
    var topVertex = vertices[vertices.length -1].clone();

    // calc positions of start and end of obj
    bottomVertex.applyMatrix4(object3D.matrixWorld);
    topVertex.applyMatrix4(object3D.matrixWorld);

    // direction vec from start to end of obj
    directionVector = topVertex.clone().sub(bottomVertex).normalize();

    // raycast for collision
    raycaster = new THREE.Raycaster(bottomVertex, directionVector, 1);
    collisionResults = raycaster.intersectObjects(this.targets, true);
    collisionResults.forEach(function (target) {
      // tell enemy it was hit
      target.object.el.emit('collider-hit', {target: el});
      console.log('Tis but a flesh wound');
    });
  }
});
