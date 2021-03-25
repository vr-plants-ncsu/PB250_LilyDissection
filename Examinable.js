var associated = false;

AFRAME.registerComponent('examinable',{
  schema: {
    snapedRotation: {type: 'vec3'},
    snapedScale: {type: 'vec3'}
  },
 init: function(){
   let entity = this.el;
   entity.addEventListener('click', function(evt){
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