var lastPlacement = {x:0, y:0, z:0};
const gridX = 5;
const gridY = 5;
const gridOrigin = {x:0,y:0,z:0};
const gridEndPoint = {x: 10, y:10, z:10};
var gridFactorX = 0;
var gridFactorY = 0;
var gridCooldown = 0;

AFRAME.registerComponent('gridable',{
  schema: {
    firstPosition : {type: 'vec3',default:{x:0, y:0, z:0}},
    isGridded: {type: 'bool', default:false}
  },
  
  init: function(){
    this.data.isGridded = false;
    this.data.firstPosition.x = this.el.object3D.position.x;
    this.data.firstPosition.y = this.el.object3D.position.y;
    this.data.firstPosition.z = this.el.object3D.position.z;
    var comp = this;
    
    window.addEventListener('keydown', function(evt){
      //the D key in decimol ascii
      var shortcutPressed = evt.keyCode === 68;
      if (!shortcutPressed || gridCooldown > 0){
        return;
      }
      comp.toggleGrid();
      gridCooldown = 5;
    });
    
    gridFactorX = (1/gridX) * (0.5);
    gridFactorY = (1/gridY) * (0.5);
    lastPlacement = gridOrigin;
  },
  tick: function(time, timeDelta){
    gridCooldown -= timeDelta;
  },
  toggleGrid: function(){
    var entity = this.el;
    if(!this.data.isGridded){
    //go row first, column second
    if(lastPlacement.x < (gridEndPoint.x - gridFactorX)){
      //move down
      lastPlacement.y += (gridFactorY * 2);
    }
    lastPlacement.x += (gridFactorX * 2);
    console.log("Gridding");
    TweenMax.to(entity.object3D, 0.4, {three:{positionX: lastPlacement.x, positionY: lastPlacement.y,positionZ: lastPlacement.z}, ease:Sine.easeIn});
    this.data.isGridded = true;
    }
    if(this.data.isGridded){
      console.log("Ungridding");
      TweenMax.to(entity.object3D, 0.4,
                  {three:{positionX: this.data.firstPosition.x,
                          positionY: this.data.firstPosition.y,
                          positionZ: this.data.firstPosition.z}, ease:Sine.easeIn});
      lastPlacement = gridOrigin;
      this.data.isGridded = false;
    }
  }
});