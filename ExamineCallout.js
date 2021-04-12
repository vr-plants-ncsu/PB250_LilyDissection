var header;
var content;

AFRAME.registerComponent('examinecallout',{
  schema: {
    defHeader: {type:'string', default: "Welcome"},
    defContent: {type:'string', default:"Click on a part of the plant for more information\n test test"}
  },
  init: function(){
    header = document.querySelector('[examinetextheader]').components.text;
    context = document.querySelector('[examinetextbody]').components.text;
    
    let exambox = document.querySelector('[ExamBox]');
    exambox.addEventListener('associated', function(){console.log("Yo");});
    exambox.addEventListener('disassociated', this.whenDisassociated);
  },
  whenAssociated: function(event){
    console.log("Yo");
    header.value = event.detail.associatedEntity.components.examinable.data.headerText;
    context.value = event.detail.associatedEntity.components.examinable.data.contentText;
  },
  whenDisassociated: function(event){
    console.log("Yo2");
    header.value = this.data.defHeader;
    content.value = this.data.defContent;
  }
});