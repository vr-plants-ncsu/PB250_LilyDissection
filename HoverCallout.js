AFRAME.registerComponent("hovercallout", {
  schema: {
    hoverText: { type: "string", default: "" }
  },
  init: function() {
    //on hover find the callout text and change it to hoverText
    var comp = this;
    
    this.el.addEventListener('mouseenter', function(evt){
      var calloutTextComp = document.querySelector('#callouttext');
      TweenMax.to(comp.el, 0.4, {three:{opacity: 1}, ease:Sine.easeIn});
      calloutTextComp.setAttribute('text','value',comp.data.hoverText);
    });
    this.el.addEventListener('mouseleave', function(evt){
      var calloutTextComp = document.querySelector('#callouttext');
      TweenMax.to(comp.el, 0.4, {three:{opacity: 0}, ease:Sine.easeIn});
      //calloutTextComp.setAttribute('text','value','');
    });
  }
});
