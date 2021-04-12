AFRAME.registerComponent('examinecallout',{
  schema: {
    clickCooldown: {type: 'float', default: 0.2}
  },
  init: function(){
    var header = document.querySelector('[examinetextheader]');
    var context = document.querySelector('[examinetextbody]');
    
    let exambox = document.querySelector('[ExamBox]');
    exambox.addEventListener('associated', this.whenAssociated);
   exambox.addEventListener('disassociated', this.whenDisassociated);
  },
  whenAssociated: function(newEntity){
    newEntity.
  },
  whenDisassociated: function(oldEntity){
    
  }
});