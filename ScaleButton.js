var target = null;
var clickCooldownCounter = 0;
var entity = null;

AFRAME.registerComponent('scalebutton',{
  schema: {
    clickCooldown:{type: 'float', default: 0.2},
    scaleDelta: {type: 'float', default: 0},
    scaleMin: {type: 'float', default: -1000},
    scaleMax: {type: 'float', default: 1000},
    currentScale: {type: 'float', default: 0}
  },
 init: function(){
   let examBoxComp = document.querySelector('[ExamBox]');
   entity = this.el;
   examBoxComp.addEventListener('associated', this.whenAssociated);
   examBoxComp.addEventListener('disassociated', this.whenDisassociated);
   
   this.el.addEventListener('mousedown', function(evt){
     if(clickCooldownCounter > 0){
       return;
     }
     this.components.scalebutton.resetCounter();
     //apply the scale delta till we hit the min or max
     if(target != null){
       let nextScale = entity.components.scalebutton.data.currentScale + entity.components.scalebutton.data.scaleDelta;
       console.log("lets see: " + nextScale + " " + entity.components.scalebutton.data.currentScale + " " + entity.components.scalebutton.data.scaleDelta);
       if(nextScale > entity.components.scalebutton.scaleMax){
         nextScale = entity.components.scalebutton.scaleMax;
       }
       if(nextScale < entity.components.scalebutton.scaleMin){
         nextScale = entity.components.scalebutton.scaleMin;
       }
       TweenMax.to(target.object3D, 0.3, {three:{scaleX:nextScale, scaleY:nextScale, scaleZ:nextScale}, ease:Sine.easeIn});
       entity.components.scalebutton.data.currentScale = nextScale;
     }
   })
 },
  tick: function(time, timeDelta){
    if(clickCooldownCounter > 0){
    clickCooldownCounter -= timeDelta/1000;
    }
  },
  resetCounter: function(){
    clickCooldownCounter = this.data.clickCooldown;
  },
  whenAssociated: function(event){
    //we're assuming a uniform scale to start but we'll be applying one anyway
    target = event.detail.cloneEntity;
    entity.components.scalebutton.data.currentScale = 0.6;
    console.log("CScale: " + entity.components.scalebutton.data.currentScale);
  },
  whenDisassociated: function(event){
    target = null;
  }
});