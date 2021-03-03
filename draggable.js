AFRAME.registerComponent('cursor-draggable', {
  schema: {
    isDragging: {default: false}
  },
  init: function () { 
    console.log("draggable");
    
    this.el.addEventListener('click', function (evt) {
      this.isDragging = !this.isDragging;
      console.log(evt.detail.intersection.point);
    });
  },
  tick: function(){
  if(this.isDragging){
    
  }
}
});