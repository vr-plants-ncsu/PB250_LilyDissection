var storedObject = null;
var canAssociate = true;
var storedRotation = new THREE.Vector3(0,0,0);
var storedPosition = new THREE.Vector3(0,0,0);
var storedScale = new THREE.Vector3(0,0,0);

AFRAME.registerComponent('exambox',{
  schema: {
    snapedRotation: {type: 'vec3', default:{x:0, y:0, z:0}},
    snapedScale: {type: 'vec3', default: {x:0, y:0, z:0}},
    snapedOffset: {type: 'vec3', default: {x:0, y:0, z:0}}
  },
  init: function (){
  },
  tick: function(){
  //get the location of all the entities in our check list
    
  //if any of them are close enough to our cast point and the box is empty
    //make that object our stored object and require it be removed before 
    //adding any other new objects
},
  associate: function(entity){
        //if we already have a stored entity, dissassocite first
    if(storedObject !== null){
      this.disassociate();
    }
    //clone the entity
    var clone3d = new THREE.Object3D();
    clone3d = entity.object3D.clone();
    var newEntity = document.createElement('a-entity');
    var scene = document.querySelector('a-scene');
    scene.appendChild(newEntity);
    newEntity.setObject3D('gltf-model',clone3d);
    newEntity.setAttribute('draggable');
    entity.object3D.getWorldPosition(newEntity.object3D.position);
    entity.object3D.getWorldQuaternion(newEntity.object3D.quaternion);
    entity.object3D.getWorldScale(newEntity.object3D.scale);
    
    TweenMax.to(newEntity.object3D, 0.3, {three:{rotationX:this.data.snapedRotation.x, rotationY:this.data.snapedRotation.y, rotationZ:this.data.snapedRotation.z}, ease:Sine.easeIn});
    let offsetLocation = new THREE.Vector3(0,0,0);
    offsetLocation.addVectors(this.el.object3D.position, this.data.snapedOffset);
    TweenMax.to(newEntity.object3D, 0.3, {three:{positionX: offsetLocation.x, positionY: offsetLocation.y,positionZ: offsetLocation.z}, ease:Sine.easeIn});
    storedScale = entity.object3D.scale;
    TweenMax.to(newEntity.object3D, 0.3, {three:{scaleX:this.data.snapedScale.x, scaleY:this.data.snapedScale.y, scaleZ:this.data.snapedScale.z}, ease:Sine.easeIn});
    //rotate to our ideal rotation
    storedObject = newEntity;
    //set to ideal scale
    //make it impossible to associate other objects
    canAssociate = false;
    
    this.el.emit('associated',{associatedEntity: newEntity},false);
  },
  disassociate: function(){
    //TweenMax.to(storedObject.object3D, 0.3, {three:{rotationX:storedRotation.x, rotationY:storedRotation.y, rotationZ:storedRotation.z}, ease:Sine.easeOut});
    //TweenMax.to(storedObject.object3D, 0.3, {three:{positionX: storedPosition.x, positionY: storedPosition.y,positionZ: storedPosition.z}, ease:Sine.easeOut});
    TweenMax.to(storedObject.object3D, 0.3, {three:{scaleX:0, scaleY:0, scaleZ:0}, ease:Sine.easeOut});
    //TweenMax.to(storedObject.object3D, 0.3, {three:{opacity: 1.0}, ease:Sine.easeIn});
    //storedObject.object3D.rotation.set(0, 0, 0);
    this.el.emit('disassociated',{disassociatedEntity: storedObject},false);
    storedObject = null;
    canAssociate = true;
  }
});