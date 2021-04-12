var header = null;
var content = null;

AFRAME.registerComponent('examinecallout',{
  schema: {
    defHeader: {type:'string', default: "Welcome"},
    defContent: {type:'string', default:"Click on a part of the plant for more information\n test test"}
  },
  init: function(){
    header = document.querySelector('#examinetextheader').components.text;
    content = document.querySelector('#examinetextbody').components.text;
    let ref = this.el.components.examinecallout;
    let exambox = document.querySelector('[ExamBox]');
    exambox.addEventListener('associated', function(event){
      header.setAttribute('value', event.detail.associatedEntity.components.examinable.data.headerText);
      content.value = event.detail.associatedEntity.components.examinable.data.contentText;
    });
    exambox.addEventListener('disassociated', function(){
      header.value = ref.data.defHeader;
      content.value = ref.data.defContent;
    });
  },
  whenAssociated: function(event){
    console.log("Yo");
    
  },
  whenDisassociated: function(event){
    console.log("Yo2");
    
  }
});