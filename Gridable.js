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
  },
  toggleGrid: function(){
    
    this.el.setAttribute('position', {});
  }
});