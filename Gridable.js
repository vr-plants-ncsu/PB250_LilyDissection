var lastPlacement;
const gridX = 5;
const gridY = 5;

AFRAME.registerComponent('examinable',{
  schema: {
    firstPosition : {type: 'vec3',default:{x:0, y:0, z:0}}
  },
  init: function(){
    
  }
});