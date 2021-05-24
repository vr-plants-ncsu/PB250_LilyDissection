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
   crossSection.setAttribute('visible',false);
   
 },
  onContext: function(){
    if(isActive){
      if(!isVisible){
        crossSection.setAttribute('visible',true);
      }
      if(isVisible){
        crossSection.setAttribute('visible',false);
      }
    }
  },
  associated: function(event){
    console.log(event.detail.cloneEntity.id)
    if(event.detail.associatedEntity === this.el){
      event.detail.cloneEntity.appendChild(crossSection);
      isActive = true;
    }
  },
  disassociated: function(event){
        if(event.detail.associatedEntity === this.el){
      isActive = false;
    }
  }
});