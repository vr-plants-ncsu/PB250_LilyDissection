var crossSection;

AFRAME.registerComponent('contextvisible',{
  schema: {
    gltfName:{type: 'string', default: ""},
    isActive:{type: 'bool', default: false},
    isVisible:{type: 'bool', default: false}
  },
  isVisible : false,
  isActive : false,
 init: function(){
   let contextButton = document.querySelector('[ContextButton]');
   contextButton.addEventListener('context_activate', this.onContext);
   let examBoxComp = document.querySelector('[ExamBox]');
   examBoxComp.addEventListener('associated', this.whenCVisAssociated);
   examBoxComp.addEventListener('disassociated', this.whenCVisDisassociated);
   //this.makeModel();
 },
  onContext: function(){
    if(this.isActive){
      if(!this.isVisible){
        console.log('event go! ' + this.isActive + this.isVisible);
        crossSection.setAttribute('visible',true);
        this.isVisible = true;
        return;
      }
      if(this.isVisible){
        crossSection.setAttribute('visible',false);
        this.isVisible = false;
        return;
      }
    }
  },
  whenCVisAssociated: function(event){
      event.detail.associatedEntity.components.contextvisible.makeModel();
      event.detail.cloneEntity.appendChild(crossSection);
      event.detail.associatedEntity.components.contextvisible.isActive = true;
  },
  whenCVisDisassociated: function(event){
      event.detail.associatedEntity.components.contextvisible.removeModel();
      event.detail.associatedEntity.components.contextvisible.isActive = false;
  },
  makeModel: function(){
    //make the cross section object
   crossSection = document.createElement('a-entity');
   crossSection.setAttribute('id', 'crosssection')
   crossSection.setAttribute('gltf-model',this.data.gltfName);
   crossSection.setAttribute('visible',false);
   crossSection.setAttribute('scale',this.el.getAttribute('scale'));
  },
  removeModel: function(){
    crossSection.parentNode.removeChild(crossSection);
  }
});