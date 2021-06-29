var clickCooldownCounter = 0;

AFRAME.registerComponent('contextbutton',{
  schema: {
    clickCooldown:{type: 'float', default: 0.2},
    onGltfUrl:{type:'float', default: ""},
    offGltfUrl:{type:'float', default: ""},
    state:{type:'bool', default: false}
  },
 init: function(){
   let comp = this;
   let entity = this.el;
   this.el.addEventListener('mousedown', function(evt){
     if(clickCooldownCounter > 0){
       return;
     }
     this.components.contextbutton.resetCounter();
     entity.emit('context_activate',null,false);
     if(comp.data.state == false){
       //set the model to the alt
       entity.setAttribute('gltf-model',this.data.onGltfUrl);
       this.data.state = true;
     }
     if(this.data.state == true){
       //set the model to the alt
       this.el.setAttribute('gltf-model',this.data.offGltfUrl);
       this.data.state = false;
     }
   });
   
   window.addEventListener('keydown', function(evt){
      //the V key in decimol ascii
      var shortcutPressed = evt.keyCode === 83;
      if (!shortcutPressed){
        return;
      }
        if(clickCooldownCounter > 0){
       return;
     }
     this.components.contextbutton.resetCounter();
     entity.emit('context_activate',null,false);
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