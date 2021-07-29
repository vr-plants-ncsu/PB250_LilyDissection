AFRAME.registerComponent("clickdrag", {
  schema: {
    isMoving: { type: "bool", default: false }
  },
  init: function() {
    let comp = this;
    let entity = this.el;

    if (this.data.targetId !== "") {
      entity = document.querySelector("#" + this.data.targetId);
    }

    this.el.addEventListener("mousedown", function() {
      comp.data.isMoving = true;
    });
    document.addEventListener("mousedown", function(evt) {
      this.oldClientX = evt.clientX;
      this.oldClientY = evt.clientY;
    });
    document.addEventListener("mouseup", function() {
      comp.data.isMoving = false;
    });
    document.addEventListener("mousemove", function(evt) {
      if (comp.data.isMoving) {
        var dX;
        var dY;
        //TODO find our pivot
        //var modelPivotEl = this.modelPivotEl;
        //todo rectify
        if (!this.oldClientX) {
          return;
        }
        dX = this.oldClientX - evt.clientX;
        dY = this.oldClientY - evt.clientY;
        //we can tweak these as speeds
        //if(comp.data.rotateY){
        //entity.object3D.rotation.y -= dX / 100;
        //}
        //if(comp.data.rotateZ){
        //entity.object3D.rotation.z -= dY / 200;

        // Clamp x rotation to [-90,90]
        //entity.object3D.rotation.z = Math.min(Math.max(-Math.PI / 2, entity.object3D.rotation.z), Math.PI / 2);
        //}

        //get this distance between this object and the camera
        //apply the delta to the scrren space position, then unproject that
        //lerp the object to the screen space offset world position
        var camera = document.querySelector("[camera]");
        //todo use world positions here
        //var camDist = camera.object3D.position.distanceTo(entity.object3D.position);
        //find the screen position of the object
        var screenPos = comp.el.object3D.position.clone();
        comp.el.object3D.getWorldPosition(screenPos);
        screenPos.project(camera.getObject3D("camera"));
        //screenPos.x = evt.clientX;
        //screenPos.y = evt.clientY;
        //target the local position after unprojecting
        screenPos.unproject(camera.getObject3D("camera"));
        screenPos = comp.el.object3D.parent.worldToLocal(screenPos);
        console.log(
          "pos " +
            screenPos.x +
            " " +
            screenPos.y +
            " " +
            screenPos.z +
            " " +
            evt.screenX
        );
        TweenMax.to(comp.el.object3D, 0.1, {
          three: {
            positionX: screenPos.x,
            positionY: screenPos.y,
            positionZ: screenPos.z
          },
          ease: Sine.easeIn
        });

        this.oldClientX = evt.clientX;
        this.oldClientY = evt.clientY;
        //todo this is working alright but we should use the mouse position instead of the position delta...
      }
    });
  }
});
