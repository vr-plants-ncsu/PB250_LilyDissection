AFRAME.registerComponent('rotatable',{
  schema: {
    isRotating:{type:'bool', default: false}
  },
  init: function(){
    let entity = this.el;
    
    this.el.addEventListener('mousedown', this.startRotation);
    document.addEventListener('mousedown', this.onMouseDown)
    document.addEventListener('mouseup', this.onMouseUp);
    document.addEventListener('mousemove', function(evt){
      if(this.data.isRotating){
      var dX;
    var dY;
    //TODO find our pivot
    //var modelPivotEl = this.modelPivotEl;
    //todo rectify
    if (!this.oldClientX) { return; }
    dX = this.oldClientX - evt.clientX;
    dY = this.oldClientY - evt.clientY;
    //we can tweak these as speeds
    entity.object3D.rotation.y -= dX / 100;
    entity.object3D.rotation.z -= dY / 200;

    // Clamp x rotation to [-90,90]
    entity.object3D.rotation.z = Math.min(Math.max(-Math.PI / 2, entity.object3D.rotation.z), Math.PI / 2);

    this.oldClientX = evt.clientX;
    this.oldClientY = evt.clientY;
    }});
    
  },
  startRotation: function(){
    this.data.isRotating = true;
  },
  onMouseDown: function (evt) {
    this.oldClientX = evt.clientX;
    this.oldClientY = evt.clientY;
  },
  onMouseUp: function(){
    this.data.isRotating = false;
  }
});