var lastPlacement = {x:0, y:0, z:0};
const gridX = 5;
const gridY = 5;
const origin = {x:0,y:0,z:0};
const endPoint = {x: 10, y:10, z:10};
var factorX = 0;
var factorY = 0;

AFRAME.registerComponent('gridable',{
  schema: {
    firstPosition : {type: 'vec3',default:{x:0, y:0, z:0}},
    isGridded: {type: 'bool', default:false}
  },
  
  init: function(){
    this.el.data.isGridded = false;
    this.el.data.firstPosition = this.el.components.position;
    
    window.addEventListener('keydown', this.onKeydown);
    
    factorX = (1/gridX) * (0.5);
    factorY = (1/gridY) * (0.5);
  },
  toggleGrid: function(){
    if(!this.data.isGridded){
    //go row first, column second
    if(lastPlacement.x < (endPoint.x - factorX)){
      //move down
      lastPlacement.y += (factorY * 2);
    }
    lastPlacement.x += (factorX * 2);
    TweenMax.to(this.el.object3D, 0.4, {three:{positionX: lastPlacement.x, positionY: lastPlacement.y,positionZ: lastPlacement.z}, ease:Sine.easeIn});
    }
    if(this.data.isGridded){
      TweenMax.to(this.el.object3D, 0.4, {three:{positionX: this.data.firstPosition.x, positionY: this.data.firstPosition.y,positionZ: this.data.firstPosition.z}, ease:Sine.easeIn});
      lastPlacement = {x:0, y:0, z:0};
    }
  },
   onKeydown: function (evt) {
    var shortcutPressed = evt.keyCode === 68;
    if (!shortcutPressed) { return; }
    this.toggleGrid();
  }
});