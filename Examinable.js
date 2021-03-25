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
     if(associated){
       examBoxComp.unassociate();
       associated = false;
     }
     if(!associated){
     //associate it
     examBoxComp.associate(entity);
       associated = true;
     }
   })
 } 
});