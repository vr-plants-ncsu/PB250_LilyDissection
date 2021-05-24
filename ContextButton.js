var clickCooldownCounter = 0;

AFRAME.registerComponent('contextbutton',{
  schema: {
    clickCooldown:{type: 'float', default: 0.2}
  },
 init: function(){
   this.el.addEventListener('mousedown', function(evt){
     if(clickCooldownCounter > 0){
       return;
     }
     this.components.contextbutton.resetCounter();
     entity.emit('context_activate')
   })
 },
  tick: function(time, timeDelta){
    if(clickCooldownCounter > 0){
    clickCooldownCounter -= timeDelta/1000;
    }
  },
    resetCounter: function(){
    clickCooldownCounter = this.data.clickCooldown;
  }
});