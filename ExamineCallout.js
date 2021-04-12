var header;
var content;

AFRAME.registerComponent('examinecallout',{
  schema: {
    defHeader: {type:'string', default: "Welcome"},
    defContent: {type:'string', default:"Click on a part of the plant for more information\n test test"}
  },
  init: function(){
    header = document.querySelector('[examinetextheader]');
    context = document.querySelector('[examinetextbody]');
    
    let exambox = document.querySelector('[ExamBox]');
    exambox.addEventListener('associated', this.whenAssociated);
   exambox.addEventListener('disassociated', this.whenDisassociated);
  },
  whenAssociated: function(event){
    console.log("Yo");
    header.value = event.detail.associatedEntity.components.examinable.data.headerText;
    context.value = event.detail.associatedEntity.components.examinable.data.contentText;
  },
  whenDisassociated: function(event){
    header.value = this.data.defHeader;
    content.value = this.data.defContent;
  }
});