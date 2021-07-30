AFRAME.registerComponent("hovercallout", {
  schema: {
    hoverText: { type: "string", default: "" }
  },
  init: function() {
    //on hover find the callout text and change it to hoverText
    
    var calloutTextComp = document.querySelector('#callouttext').components.text;
    console.log("here " + document.querySelector('#callouttext').components.text.data.value);
    var comp = this;
    
    this.el.addEventListener('mouseenter', function(evt){
      var calloutTextComp = document.querySelector('#callouttext').components.text;
      console.log("touch " + calloutTextComp.data.value);
      calloutTextComp.data.value = comp.data.hoverText;
    });
    this.el.addEventListener('mouseleave', function(evt){
      var calloutTextComp = document.querySelector('#callouttext').components.text;
      calloutTextComp.data.value = "";
    });
  }
});
