var target = null;
var clickCooldownCounter = 0;
var entity = null;

AFRAME.registerComponent('contextbutton',{
  schema: {
    clickCooldown:{type: 'float', default: 0.2}
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
  },
  whenDisassociated: function(event){
    target = null;
  }
});