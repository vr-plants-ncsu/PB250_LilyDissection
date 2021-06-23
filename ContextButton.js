var clickCooldownCounter = 0;

AFRAME.registerComponent('contextbutton',{
  schema: {
    clickCooldown:{type: 'float', default: 0.2}
  },
 init: function(){
   let entity = this.el;
   this.el.addEventListener('mousedown', function(evt){
     if(clickCooldownCounter > 0){
       return;
     }
     this.components.contextbutton.resetCounter();
     entity.emit('context_activate',null,false);
   });
   
   window.addEventListener('keydown', function(evt){
      //the V key in decimol ascii
      var shortcutPressed = evt.keyCode === 86;
      if (!shortcutPressed){
        return;
      }
        if(entity.components.examineaudio.data.defAudioClip !== "none"){
        console.log('audio playback: ' + entity.components.examineaudio.data.defAudioClip);
        entity.setAttribute('sound',{src: entity.components.examineaudio.data.defAudioClip});
        entity.components.sound.playSound();
      }
      });
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