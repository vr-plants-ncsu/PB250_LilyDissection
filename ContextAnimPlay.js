AFRAME.registerComponent('contextAnimPlay',{
  schema: {
    animName:{type: 'string', default: ""}
  },
 init: function(){
   let contextButton = document.querySelector('[ContextButton]');
   contextButton.addEventListener('context_activate', this.onContext);
   let examBoxComp = document.querySelector('[ExamBox]');
   examBoxComp.addEventListener('associated', this.whenAssociated);
   examBoxComp.addEventListener('disassociated', this.whenDisassociated);
 },
  onContext: function(){
    
  },
  associated: function(){
    if()
  },
  disassociated: function(){
    
  }
});