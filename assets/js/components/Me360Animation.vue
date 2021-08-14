<template>
  <div class="rounded-animation animation-element opacity from-bottom once">
    <div id="me360_animation_container">
      <canvas id="me360_canvas"></canvas>
      <div id="me360_dom_overlay_container"></div>
    </div>
  </div>
</template>

<script>
import Me360Animation from "../classes/Me360Animation";

export default {
  name: "me360-animation",
  data() {
    return {me360: null}
  },
  created() {
    this.init();
  },
  mounted() {
    this.mount();
  },
  methods: {
    init() {
      this.me360 = new Me360Animation();
    },
    mount() {
      this.me360.initAnimation();
    },
  }
}
</script>

<style scoped>
.rounded-animation:after {
  padding-top: 100%;
  display: block;
  content: '';
}

#me360_animation_container{
  position: absolute;
  border-radius: 50%;
  overflow: hidden;
  -webkit-mask-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC);
  width: 100%;
  height: 100%;
}

#me360_canvas{
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
}

#me360_dom_overlay_container{
  pointer-events: none;
  overflow: hidden;
  width: 500px;
  height: 500px;
  position: absolute;
  left: 0px;
  top: 0px;
  display: block;
}
</style>