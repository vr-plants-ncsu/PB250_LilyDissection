var storedObject;
var canAssociate = true;
const examinableAssociated = new Event('associate');
const examinableDisassociated = new Event('disassociate');
AFRAME.registerComponent('exambox',{
  schema: {
    snapedRotation: {type: 'vec3'},
    snapedScale: {type: 'vec3'}
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
    //move the element to the point
    //entity.setAttribute('position', castPoint.components.position);
    TweenMax.to(entity.object3D, 0.3, {three:{rotationX:0, rotationY:45, rotationZ:0}, ease:Sine.easeIn});
    //TweenMax.to(entity.object3D, 0.3, {three:{opacity: 0.7}, ease:Sine.easeIn});
    //entity.object3D.rotation.set(0, 45, 0);
    //entity.setAttribute('scale', this.snapedScale);
    //rotate to our ideal rotation
    storedObject = entity;
    //set to ideal scale
    //make it impossible to associate other objects
    canAssociate = false;
    console.log(storedObject.id + " is added");
  },
  disassociate: function(){
    console.log(storedObject.id + " is removed");
    TweenMax.to(storedObject.object3D, 0.3, {three:{rotationX:0, rotationY:0, rotationZ:0}, ease:Sine.easeOut});
    //TweenMax.to(storedObject.object3D, 0.3, {three:{opacity: 1.0}, ease:Sine.easeIn});
    //storedObject.object3D.rotation.set(0, 0, 0);
    storedObject = null;
    canAssociate = true;
  }
});