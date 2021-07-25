var isRotatingtable = false;
var element;

AFRAME.registerComponent('rotatabletable',{
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
    isRotatingtable = true;
  },
  onMouseDown: function (evt) {
    this.oldClientX = evt.clientX;
    this.oldClientY = evt.clientY;
  },
  onMouseUp: function(){
    isRotatingtable = false;
  },
  onMouseMove: function(evt){
    if(isRotatingtable){
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
    element.object3D.rotation.z -= dY / 200;

    // Clamp x rotation to [-90,90]
    element.object3D.rotation.z = Math.min(Math.max(-Math.PI / 2, element.object3D.rotation.z), Math.PI / 2);

    this.oldClientX = evt.clientX;
    this.oldClientY = evt.clientY;
    }
  }
});