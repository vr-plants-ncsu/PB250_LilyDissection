AFRAME.registerComponent('tabselector',{
  schema: {
    firstPosition : {type: 'vec3',default:{x:0, y:0, z:0}},
    isGridded: {type: 'bool', default:false},
    gridCooldown: {type: 'float', default:2}
  },
  
  init: function(){
    var listOfExaminable = document.querySelectorAll('div.dissect');
    window.addEventListener('keydown', function(evt){
      //the Q key in decimol ascii
      var shortcutPressed = evt.keyCode === 81;
      if (!shortcutPressed){
        return;
      }
        console.log("Tabity");
        listOfExaminable.forEach(
        function(currentValue, currentIndex, listObj){
          console.log(currentValue + " " + currentIndex + " " + listObj);
        }
        )
      });
      
    },
    
    //todo setup tab button
  tick: function(time, timeDelta){
    }
});