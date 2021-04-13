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
    header.data.value = ref.data.defHeader;
    content.data.value = ref.data.defContent;
    let exambox = document.querySelector('[ExamBox]');
    exambox.addEventListener('associated', function(event){
      //header.data.value = event.detail.associatedEntity.components.examinable.data.headerText;
      header.el.setAttribute('text','value',event.detail.associatedEntity.components.examinable.data.headerText);
      //content.data.value = event.detail.associatedEntity.components.examinable.data.contentText;
      content.el.setAttribute('text','value',event.detail.associatedEntity.components.examinable.data.contentText);
    });
    exambox.addEventListener('disassociated', function(){
      header.el.setAttribute('text','value',ref.data.defHeader);
      content.el.setAttribute('text', 'value', ref.data.defContent);
    });
  }
});