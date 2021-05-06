var target = null;
var clickCooldownCounter = 0;
var currentScale = 0.0;

AFRAME.registerComponent('scalebutton',{
  schema: {
    clickCooldown:{type: 'float', default: 0.2},
    scaleDelta: {type: 'float', default: 0},
    scaleMin: {type: 'float', default: -1000},
    scaleMax: {type: 'float', default: 1000}
  },
 init: function(){
   let examBoxComp = document.querySelector('[ExamBox]');
   examBoxComp.addEventListener('associated', this.whenAssociated);
   examBoxComp.addEventListener('disassociated', this.whenDisassociated);
   let entity = this.el;
   this.el.addEventListener('mousedown', function(evt){
     if(clickCooldownCounter > 0){
       return;
     }
     this.components.scalebutton.resetCounter();
     //apply the scale delta till we hit the min or max
     if(target != null){
       let nextScale = currentScale + entity.scaleDelta;
       if(nextScale > entity.scaleMax){
         nextScale = entity.scaleMax;
       }
       if(nextScale < entity.scaleMin){
         nextScale = entity.scaleMin;
       }
       TweenMax.to(target.object3D, 0.3, {three:{scaleX:nextScale, scaleY:nextScale, scaleZ:nextScale}, ease:Sine.easeIn});
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
    currentScale = target.components.scale.x;
  },
  whenDisassociated: function(event){
    target = null;
  }
});