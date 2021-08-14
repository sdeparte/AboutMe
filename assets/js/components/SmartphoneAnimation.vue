<template>
  <div id="smartphone_animation_handler" class="responsive-animation animation-element opacity from-left wait-load">
    <div id="smartphone_global_container" data-animation-handler="smartphone_animation_handler">
      <div id="smartphone_animation_container">
        <canvas id="smartphone_canvas"></canvas>
        <div id="smartphone_dom_overlay_container"></div>
      </div>
    </div>
  </div>
</template>

<script>
import SmartphoneAnimation from "../classes/SmartphoneAnimation";

export default {
  name: "smartphone-animation",
  data() {
    return {smartphone: null}
  },
  created() {
    this.init();
  },
  mounted() {
    this.mount();
  },
  methods: {
    init() {
      this.smartphone = new SmartphoneAnimation();
    },
    mount() {
      this.smartphone.initAnimation();
    },
  }
}
</script>

<style scoped>
#smartphone_animation_handler {
  float: left;
  position: relative;
  width: 33%;
  max-width: 500px;
  max-height: 768px;
  overflow: hidden;
}

#smartphone_animation_handler:after {
  padding-top: 153%;
  display: block;
  content: '';
}

#smartphone_animation_container {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 4;
}

#smartphone_canvas {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
}

#smartphone_dom_overlay_container {
  pointer-events:none;
  overflow:hidden;
  width:500px;
  height:768px;
  position: absolute;
  left: 0px;
  top: 0px;
  display: block;
}
</style>