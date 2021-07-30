AFRAME.registerComponent("hovercallout", {
  schema: {
    hoverText: { type: "string", default: "" }
  },
  init: function() {
    //on hover find the callout text and change it to hoverText
    
    var calloutTextComp = document.querySelector('#callouttext');
    console.log("here " + document.querySelector('#callouttext'));
    calloutTextComp.components.text.value = "a";
    var comp = this;
    
    this.el.addEventListener('mouseenter', function(evt){
      calloutTextComp.value = comp.data.hoverText;
    });
    this.el.addEventListener('mouseleave', function(evt){
      calloutTextComp.value = "";
    });
  }
});
