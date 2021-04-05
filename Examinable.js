var associated = false;
var clickCooldownCounter = 0;

AFRAME.registerComponent('examinable',{
  schema: {
    clickCooldown: {type: 'float', default: 0.2}
  },
 init: function(){
   this.resetCounter();
   let entity = this.el;
   entity.addEventListener('click', function(evt){
     if(clickCooldownCounter > 0){
       return;
     }
     this.components.examinable.resetCounter();
     //find our examination box
     let examBoxComp = document.querySelector('[ExamBox]').components.exambox;
     
     examBoxComp.el.addEventListener('associated', this.whenAssociated);
     examBoxComp.el.addEventListener('disassociated', this.whenDisassociated);
     
     if(associated === true){
       examBoxComp.disassociate();
       associated = false;
       return;
     }
     if(associated === false){
     //associate it
     examBoxComp.associate(entity);
       associated = true;
       return;
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
    //if the detail entity is this entity we react locally
    if(event.detail.associatedEntity === this.el){
      return;
    }
    //if not we can use this event to react to a different entity being examined
  },
  whenDisassociated: function(event){
    //if the detail entity is this entity we react locally
    if(event.detail.disassociatedEntity === this.el){
      return;
    }
    //if not we can use this event to react to a different entity being removed
  }
});