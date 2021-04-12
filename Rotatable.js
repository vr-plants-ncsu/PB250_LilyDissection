var isRotating = false;

AFRAME.registerComponent('rotatable',{
  schema: {
  },
  init: function(){
    this.el.addEventListener('click', this.startRotation);
    document.addEventListener('mousedown', this.onMouseDown)
    document.addEventListener('mouseup', this.onMouseUp);
    document.addEventListener('mousemove', this.onMouseMove);
  },
  startRotation: function(){
    isRotating = true;
  },
  onMouseDown: function (evt) {
    this.oldClientX = evt.clientX;
    this.oldClientY = evt.clientY;
  },
  onMouseUp: function(){
    isRotating = false;
  },
  onMouseMove: function(evt){
    if(isRotating){
      this.rotateElement(evt);
    }
  },
  rotateElement(evt){
    var dX;
    var dY;
    //TODO find our pivot
    var modelPivotEl = this.modelPivotEl;
    //todo rectify
    if (!this.oldClientX) { return; }
    dX = this.oldClientX - evt.clientX;
    dY = this.oldClientY - evt.clientY;
    //we can tweak these as speeds
    modelPivotEl.object3D.rotation.y -= dX / 100;
    modelPivotEl.object3D.rotation.x -= dY / 200;

    // Clamp x rotation to [-90,90]
    modelPivotEl.object3D.rotation.x = Math.min(Math.max(-Math.PI / 2, modelPivotEl.object3D.rotation.x), Math.PI / 2);

    this.oldClientX = evt.clientX;
    this.oldClientY = evt.clientY;
  }
});