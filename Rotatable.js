AFRAME.registerComponent('rotatable',{
  schema: {
  },
  init: function(){
    this.el.addEventListener('click', this.startRotation);
  },
  startRotation: function(){
    console.log("click get");
  }
});