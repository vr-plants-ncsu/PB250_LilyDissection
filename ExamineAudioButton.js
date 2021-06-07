AFRAME.registerComponent('examineaudio',{
  schema: {
    defAudioClip: {type:'string', default: "none"}
  },
  init: function(){
    var entity = this.el;
    let exambox = document.querySelector('[ExamBox]');
    exambox.addEventListener('associated', function(event){
      entity.component.examineaudio.data.defAudioClip = event.detail.associatedEntity.components.examinable.data.audioClipUrl;
    });
    exambox.addEventListener('disassociated', function(){
      entity.component.examineaudio.data.defAudioClip = event.detail.associatedEntity.components.examinable.data.audioClipUrl;
    });
    this.el.addEventListener('mousedown', function(evt){
      if(entity.data.defAudioClip !== "none"){
        entity.setAttribute('sound',{src: entity.data.defAudioClip});
        entity.components.sound.playSound();
      }
    });
  }
});