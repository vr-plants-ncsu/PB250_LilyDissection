AFRAME.registerComponent('examinable',{
  schema: {
    snapedRotation: {type: 'vec3'},
    snapedScale: {type: 'vec3'}
  },
 init: function(){
   this.el.addEventListener('click', function(evt){
     //find our examination box
     var examBoxComp = document.querySelector('ExamBox').components.exambox;
     //associate it
     examBoxComp.associate(this.el);
   })
 } 
});