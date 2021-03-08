var castPoint;
var trackedList;
var storedObject;
var canAssociate = true;

AFRAME.registerComponent('exambox',{
  schema: {
    snapedRotation: {type: 'vec3'},
    snapedScale: {type: 'vec3'}
  },
  init: function (){
    //find the point we're going to cast from
    castPoint = document.querySelector('#castPoint');
    //if we don't have it log it
    if(castPoint === null){
      console.log("No cast point found! Add one to the entity that has the exam box");
    }
    //check for tagged entries and add them to our check list
    trackedList = document.querySelectorAll('.collidable');
  },
  tick: function(){
  //get the location of all the entities in our check list
    if(!canAssociate){
      if(storedObject.object3D.position.distanceTo(castPoint.object3D.position) > 0.5){
        this.disassociate();
      }
      return;
    }
    trackedList.forEach(element =>{
      //console.log("checking " + element.id);
      if(element.object3D.position.distanceTo(castPoint.object3D.position) < 0.5){
        console.log(element.id + " is " + element.object3D.position.distanceTo(castPoint.object3D.position));
        this.associate(element);
      }
    });
  //if any of them are close enough to our cast point and the box is empty
    //make that object our stored object and require it be removed before 
    //adding any other new objects
},
  associate: function(entity){
    //move the element to the point
    //entity.setAttribute('position', castPoint.components.position);
    entity.setAttribute('rotation',this.snapedRotation);
    entity.setAttribute('scale', this.snapedScale);
    //rotate to our ideal rotation
    storedObject = entity;
    //set to ideal scale
    //make it impossible to associate other objects
    canAssociate = false;
    console.log(storedObject.id + " is added");
  },
  disassociate: function(){
    console.log(storedObject.id + " is removed");
    storedObject = null;
    canAssociate = true;
  }
});