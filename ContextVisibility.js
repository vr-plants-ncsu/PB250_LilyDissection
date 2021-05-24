var isActive = false;
var isVisible = false;
var crossSection = document.createElement('a-entity');
var cVisEntity;

AFRAME.registerComponent('contextvisible',{
  schema: {
    gltfName:{type: 'string', default: ""}
  },
 init: function(){
   cVisEntity = this.el; 
   let contextButton = document.querySelector('[ContextButton]');
   contextButton.addEventListener('context_activate', this.onContext);
   let examBoxComp = document.querySelector('[ExamBox]');
   examBoxComp.addEventListener('associated', this.whenAssociated);
   examBoxComp.addEventListener('disassociated', this.whenDisassociated);
   //make the cross section object
   crossSection.setAttribute('gltf-model',this.data.gltfName);
   crossSection.setAttribute('visible',false);
 },
  onContext: function(){
    console.log('event go!');
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
    if(event.detail.associatedEntity === cVisEntity){
      event.detail.cloneEntity.appendChild(crossSection);
      isActive = true;
    }
  },
  whenDisassociated: function(event){
        if(event.detail.associatedEntity === cVisEntity){
      isActive = false;
    }
  }
});