var isRotating = false;
var element;

AFRAME.registerComponent('rotatable',{
  schema: {
  },
  init: function(){
    this.el.addEventListener('mousedown', this.startRotation);
    document.addEventListener('mousedown', this.onMouseDown)
    document.addEventListener('mouseup', this.onMouseUp);
    document.addEventListener('mousemove', this.onMouseMove);
    
    element = this.el;
  },
  startRotation: function(){
    console.log("start");
    isRotating = true;
  },
  onMouseDown: function (evt) {
    this.oldClientX = evt.clientX;
    this.oldClientY = evt.clientY;
  },
  onMouseUp: function(){
    console.log("stop")
    isRotating = false;
  },
  onMouseMove: function(evt){
    if(isRotating){
      var dX;
    var dY;
    //TODO find our pivot
    //var modelPivotEl = this.modelPivotEl;
    //todo rectify
    if (!this.oldClientX) { return; }
    dX = this.oldClientX - evt.clientX;
    dY = this.oldClientY - evt.clientY;
    //we can tweak these as speeds
    element.object3D.rotation.y -= dX / 100;
    element.object3D.rotation.x -= dY / 200;

    // Clamp x rotation to [-90,90]
    element.object3D.rotation.x = Math.min(Math.max(-Math.PI / 2, element.object3D.rotation.x), Math.PI / 2);

    this.oldClientX = evt.clientX;
    this.oldClientY = evt.clientY;
    }
  }
});