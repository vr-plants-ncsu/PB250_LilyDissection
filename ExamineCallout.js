var header = null;
var content = null;
var calloutFocused = false;
var calloutStart = new THREE.Vector3();
var calloutDefRot = new THREE.Vector3();

AFRAME.registerComponent('examinecallout',{
  schema: {
    defHeader: {type:'string', default: "Welcome"},
    defContent: {type:'string', default:"Click on a part of the plant for more information\n test test"},
    focusDepth: {type:'float', default:0.3},
    focusCooldown: {type:'float', default:0},
    contentPage: {type:'int', default:0},
    numPages: {type: 'int', default:0}
  },
  init: function(){
    calloutStart.x = this.el.object3D.position.x;
    calloutStart.y = this.el.object3D.position.y;
    calloutStart.z = this.el.object3D.position.z;
    calloutDefRot.x = this.el.object3D.rotation.x * 180 / Math.PI;
    calloutDefRot.y = this.el.object3D.rotation.y * 180 / Math.PI;
    calloutDefRot.z = this.el.object3D.rotation.z * 180 / Math.PI;
    
    var comp = this;
    window.addEventListener('keydown', function(evt){
      //the F key in decimol ascii
      var shortcutPressed = evt.keyCode === 71;
      if (!shortcutPressed || comp.data.focusCooldown > 0){
        return;
      }
      comp.focusScreen(comp);
      comp.data.focusCooldown = 2;
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
      event.detail.associatedEntity.components.examinable.data.numPages = event.detail.associatedEntity.components.examinable.data.contentText.length / 80;
    if(event.detail.associatedEntity.components.examinable.data.numPages > 3){
      console.Log("Size of pages excedes three, consider reducing text length");
    }
    });
    exambox.addEventListener('disassociated', function(){
      header.el.setAttribute('text','value',ref.data.defHeader);
      content.el.setAttribute('text', 'value', ref.data.defContent);
    });
  },
  tick: function(time, timeDelta){
    if(this.data.focusCooldown > 0){
      this.data.focusCooldown -= timeDelta;
    }
  },
  focusScreen: function(comp){
    var entity = comp.el;
    if(!calloutFocused){
      //lerp the callout to be just in front of the viewer's camera
      var cam = entity.sceneEl.camera;
      //the fourth row contains the forward direction of the matrix, negative because openGL https://gamedev.net/forums/topic/319213-direction-vector-from-rotation-matrix/3053474/
      var forward = new THREE.Vector3( cam.matrixWorld.elements[7], cam.matrixWorld.elements[11], cam.matrixWorld.elements[15]);
      forward.multiplyScalar(-this.data.focusDepth);
      var worldCamPos = new THREE.Vector3();
      cam.getWorldPosition(worldCamPos);
      forward.addVectors(forward,worldCamPos);
      forward = entity.object3D.parent.worldToLocal(forward);
      
      //now setup rotation
      var rotTarget = new THREE.Vector3(cam.rotation.x,cam.rotation.y,cam.rotation.z);

      rotTarget.x -= entity.object3D.rotation.x;
      rotTarget.y -= entity.object3D.rotation.y;
      rotTarget.z -= entity.object3D.rotation.z;
      console.log(rotTarget.y);
      rotTarget.x *= 180.0 / Math.PI;
      rotTarget.y *= 180.0 / Math.PI;
      rotTarget.z *= 180.0 / Math.PI;
      console.log(rotTarget.y);
      rotTarget.y = (rotTarget.y - 90) % 360;
      //entity.object3D.lookAt(worldCamPos);
      
      TweenMax.to(entity.object3D, 0.4, {three:{positionX: forward.x, positionY: forward.y,positionZ: forward.z}, ease:Sine.easeIn});
      TweenMax.to(entity.object3D, 0.4, {three:{rotationX: rotTarget.x, rotationY: rotTarget.y,rotationZ: rotTarget.z}, ease:Sine.easeIn});
      calloutFocused = true;
      console.log("going " + " " + calloutFocused);
      return;
    }
    if(calloutFocused){
      console.log("returning " + " " + calloutStart.x + " " + calloutStart.y + " " + calloutStart.z);
      TweenMax.to(entity.object3D, 0.4, {three:{positionX: calloutStart.x, positionY: calloutStart.y,positionZ: calloutStart.z}, ease:Sine.easeIn});
      TweenMax.to(entity.object3D, 0.4, {three:{rotationX: calloutDefRot.x,
                                                rotationY: calloutDefRot.y,
                                                rotationZ: calloutDefRot.z}, ease:Sine.easeIn});
      calloutFocused = false;
    }
  }
});