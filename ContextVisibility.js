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
   examBoxComp.addEventListener('associated', this.whenCVisAssociated);
   examBoxComp.addEventListener('disassociated', this.whenCVisDisassociated);
   //make the cross section object
   crossSection.setAttribute('gltf-model',this.data.gltfName);
   crossSection.setAttribute('visible',false);
   crossSection.setAttribute('scale',this.el.getAttribute('scale'));
 },
  onContext: function(){
    if(isActive){
      if(!isVisible){
        console.log('event go! ' + isActive + isVisible);
        crossSection.setAttribute('visible',true);
        isVisible = true;
        return;
      }
      if(isVisible){
        crossSection.setAttribute('visible',false);
        isVisible = false;
        return;
      }
    }
  },
  whenCVisAssociated: function(event){
    if(event.detail.associatedEntity === cVisEntity){
      event.detail.cloneEntity.appendChild(crossSection);
      isActive = true;
    }
  },
  whenCVisDisassociated: function(event){
        if(event.detail.associatedEntity === cVisEntity){
      isActive = false;
    }
  }
});