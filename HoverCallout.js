AFRAME.registerComponent("hovercallout", {
  schema: {
    hoverText: { type: "string", default: "" }
  },
  init: function() {
    //on hover find the callout text and change it to hoverText
    var calloutTextComp = document.querySelector('#calloutText').components.text;
    var comp = this;
    
    this.el.addEventListener('mouseenter', function(evt){
      calloutTextComp.value = comp;
    });
    this.el.addEventListener('mouseleave', function(evt){
      calloutTextComp.value = "";
    });
  }
});
