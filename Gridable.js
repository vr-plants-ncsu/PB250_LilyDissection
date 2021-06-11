var lastPlacement = {x:0, y:0, z:0};
const gridX = 5;
const gridY = 5;
const origin = {x:0,y:0,z:0};
const endPoint = {x: 10, y:10, z:10};
var factorX = 0;
var factorY = 0;

AFRAME.registerComponent('examinable',{
  schema: {
    firstPosition : {type: 'vec3',default:{x:0, y:0, z:0}},
    isGridded: {type: 'bool', default:false}
  },
  
  init: function(){
    this.el.data.isGridded = false;
    this.el.data.firstPosition = this.el.components.position;
    
    factorX = (1/gridX) * (0.5);
    factorY = (1/gridY) * (0.5);
  },
  toggleGrid: function(){
    //go row first, column second
    if(lastPlacement.x < (endPoint.x - factorX)){
      //move down
      lastPlacement.y += (factorY * 2);
    }
    lastPlacement.x += (factorX * 2);
    TweenMax.to(newEntity.object3D, 0.3, {three:{positionX: lastPlacement.x, positionY: lastPlacement.y,positionZ: lastPlacement.z}, ease:Sine.easeIn});
  }
});