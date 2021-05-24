var isActive = false;
var isVisible = false;
var crossSection = document.createElement('a-entity');

AFRAME.registerComponent('contextvisible',{
  schema: {
    gltfName:{type: 'string', default: ""}
  },
 init: function(){
   let contextButton = document.querySelector('[ContextButton]');
   contextButton.addEventListener('context_activate', this.onContext);
   let examBoxComp = document.querySelector('[ExamBox]');
   examBoxComp.addEventListener('associated', this.whenAssociated);
   examBoxComp.addEventListener('disassociated', this.whenDisassociated);
   //make the cross section object
   crossSection.setAttribute('gltf-model',this.data.gltfName);
   //crossSection.setAttribute('visible',false);
   var scene = document.querySelector('a-scene');
  scene.appendChild(crossSection);
   
 },
  onContext: function(){
    if(isActive){
      if(!isVisible){
        crossSection.setAttribute('visible',true);
        isVisible = true;
      }
      if(isVisible){
        crossSection.setAttribute('visible',false);
        isVisible = false;
      }
    }
  },
  whenAssociated: function(event){
    console.log(event.detail.cloneEntity.id)
    if(event.detail.associatedEntity === this.el){
      event.detail.cloneEntity.appendChild(crossSection);
      isActive = true;
    }
  },
  whenDisassociated: function(event){
        if(event.detail.associatedEntity === this.el){
      isActive = false;
    }
  }
});