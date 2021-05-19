var isActive = false;
var isVisible = false;

AFRAME.registerComponent('contextVisible',{
  schema: {
  },
 init: function(){
   let contextButton = document.querySelector('[ContextButton]');
   contextButton.addEventListener('context_activate', this.onContext);
   let examBoxComp = document.querySelector('[ExamBox]');
   examBoxComp.addEventListener('associated', this.whenAssociated);
   examBoxComp.addEventListener('disassociated', this.whenDisassociated);
   this.el.setAttribute('visible', false);
 },
  onContext: function(){
    if(isActive){
      if(!isVisible){
        this.el.setAttribute('visible', true);
      }
      if(isVisible){
        this.el.setAttribute('visible', false);
      }
    }
  },
  associated: function(event){
    if(event.detail.associatedEntity === this.el){
      isActive = true;
    }
  },
  disassociated: function(event){
        if(event.detail.associatedEntity === this.el){
      isActive = false;
    }
  }
});