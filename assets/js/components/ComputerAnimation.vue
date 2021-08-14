<template>
  <div id="computer_animation_handler" class="responsive-animation animation-element opacity from-bottom once wait-load">
    <div id="computer_global_container" data-animation-handler="computer_animation_handler" data-related-to="computer_animation_container">
      <div id="computer_animation_container">
        <canvas id="computer_canvas"></canvas>
        <div id="computer_dom_overlay_container"></div>
      </div>
    </div>
  </div>
</template>

<script>
import ComputerAnimation from "../classes/ComputerAnimation";

export default {
  name: "computer-animation",
  data() {
    return {computer: null}
  },
  created() {
    this.init();
  },
  mounted() {
    this.mount();
  },
  methods: {
    init() {
      this.computer = new ComputerAnimation();
    },
    mount() {
      this.computer.initAnimation();
    },
  }
}
</script>

<style scoped>
#computer_animation_handler {
  float: right;
  position: relative;
  width: 60%;
  max-width: 800px;
  max-height: 600px;
  margin-top: -26%;
  overflow: hidden;
}

#computer_animation_handler:after {
  padding-top: 77%;
  display: block;
  content: '';
}

#computer_animation_container {
  position: absolute;
  width: 100%;
  height: 100%;
}

#computer_canvas {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
}

#computer_dom_overlay_container {
  pointer-events:none;
  overflow:hidden;
  width:800px;
  height:600px;
  position: absolute;
  left: 0px;
  top: 0px;
  display: block;
}
</style>