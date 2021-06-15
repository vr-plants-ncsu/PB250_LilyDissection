var header = null;
var content = null;
var calloutFocused = false;
var calloutStart = new THREE.Vector3(0,0,0);

AFRAME.registerComponent('examinecallout',{
  schema: {
    defHeader: {type:'string', default: "Welcome"},
    defContent: {type:'string', default:"Click on a part of the plant for more information\n test test"},
    focusDepth: {type:'float', default:3},
    focusCooldown: {type:'float', default:2}
  },
  init: function(){
    calloutStart = this.el.object3D.position;
    
    var comp = this;
    window.addEventListener('keydown', function(evt){
      //the D key in decimol ascii
      var shortcutPressed = evt.keyCode === 68;
      if (!shortcutPressed || comp.data.focusCooldown > 0){
        return;
      }
      comp.toggleGrid();
      comp.data.gridCooldown = 2;
    });
    
    header = document.querySelector('#examinetextheader').components.text;
    content = document.querySelector('#examinetextbody').components.text;
    let ref = this.el.components.examinecallout;
    header.data.value = ref.data.defHeader;
    content.data.value = ref.data.defContent;
    let exambox = document.querySelector('[ExamBox]');
    exambox.addEventListener('associated', function(event){
      header.el.setAttribute('text','value',event.detail.associatedEntity.components.examinable.data.headerText);
      content.el.setAttribute('text','value',event.detail.associatedEntity.components.examinable.data.contentText);
    });
    exambox.addEventListener('disassociated', function(){
      header.el.setAttribute('text','value',ref.data.defHeader);
      content.el.setAttribute('text', 'value', ref.data.defContent);
    });
  },
  focusScreen: function(){
    if(!calloutFocused){
      //lerp the callout to be just in front of the viewer's camera
      var cam = this.el.sceneEL.camera;
      //the fourth column contains the forward direction of the matrix
      var forward = new THREE.Vector3( cam.matrix.elements[13], cam.matrix.elements[14], cam.matrix.elements[15]);
      forward.multiplyScalar(this.data.focusDepth);
      TweenMax.to(this.el.object3D, 0.4, {three:{positionX: forward.x, positionY: forward.y,positionZ: forward.z}, ease:Sine.easeIn});
      calloutFocused = true;
      return;
    }
    if(calloutFocused){
      TweenMax.to(this.el.object3D, 0.4, {three:{positionX: this.data.calloutStart.x, positionY: this.data.calloutStart.y,positionZ: this.data.calloutStart.z}, ease:Sine.easeIn});
    }
  }
});