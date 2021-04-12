var header = null;
var content = null;

AFRAME.registerComponent('examinecallout',{
  schema: {
    defHeader: {type:'string', default: "Welcome"},
    defContent: {type:'string', default:"Click on a part of the plant for more information\n test test"}
  },
  init: function(){
    header = document.querySelector('#examinetextheader').components.text;
    context = document.querySelector('#examinetextbody').components.text;
    
    let exambox = document.querySelector('[ExamBox]');
    exambox.addEventListener('associated', function(event){
      header.value = event.detail.associatedEntity.components.examinable.data.headerText;
      context.value = event.detail.associatedEntity.components.examinable.data.contentText;
    });
    exambox.addEventListener('disassociated', function(){
      header.value = this.data.defHeader;
      content.value = this.data.defContent;
    });
  },
  whenAssociated: function(event){
    console.log("Yo");
    
  },
  whenDisassociated: function(event){
    console.log("Yo2");
    
  }
});