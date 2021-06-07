AFRAME.registerComponent('examineaudio',{
  schema: {
    defAudioClip: {type:'string', default: "none"}
  },
  init: function(){
    var audio = this.el.components.audio;
    var entity = this.el;
    let exambox = document.querySelector('[ExamBox]');
    exambox.addEventListener('associated', function(event){
      entity.component.examineaudio.data.defAudioClip = event.
    });
    exambox.addEventListener('disassociated', function(){
      header.el.setAttribute('text','value',ref.data.defHeader);
      content.el.setAttribute('text', 'value', ref.data.defContent);
    });
  }
});