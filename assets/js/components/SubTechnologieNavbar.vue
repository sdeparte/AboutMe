<template>
  <ul class="sub-menu">
    <div class="row sd-section justify-content-md-center">
      <div v-for="technologie in technologies" class="col-lg-6 col-md-6">
        <a v-bind:href="technologie.url" class="no-underline">
          <div class="content soft-gray-border">
            <div class="sd-circle float-left m-2 mr-4" v-html="technologie.svg"></div>
            <div class="sd-title">
              <h5>
                {{ technologie.title }}
              </h5>

              <div class="text-center">
                <div v-for="img in technologie.imgs" class="dev-plugin" v-bind:class="img.class">
                  <img v-bind:src="img.src" alt="">
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  </ul>
</template>

<script>
import $ from "jquery";

export default {
  name: "subTechnologieNavbar",
  props: ['technologies'],
}
</script>

<style scoped>
  .navbar .navbar-nav>.nav-item>.sub-menu{
    color: #2c3e50;
    position: absolute;
    border-radius:10px;
    top: calc(100% + 7px);
    left: 50px;
    right: 50px;
    background: #fff;
    padding: 45px 0 30px;
    margin: 0;
    visibility: hidden;
    opacity: 0;
    -webkit-box-shadow: 0 0 20px rgba(0, 0, 0, .1);
    box-shadow: 0 0 20px rgba(0, 0, 0, .1);
    -webkit-transform: translateY(10px);
    transform: translateY(10px);

    -webkit-transition: .3s opacity, .3s transform, .3s padding, .3s margin, .3s max-height, 0s visibility .3s;
    -moz-transition: .3s opacity, .3s transform, .3s padding, .3s margin, .3s max-height, 0s visibility .3s;
    transition: .3s opacity, .3s transform, .3s padding, .3s margin, .3s max-height, 0s visibility .3s;
  }

  .navbar .navbar-nav>.nav-item.active>.sub-menu{
    opacity: 1;
    visibility: inherit;
    transition-delay: 0s;
    -webkit-transform: none;
    transform: none;
  }

  .navbar>.navbar-nav>.nav-item>.sub-menu>.sd-section{
    cursor: pointer;
  }

  @media (max-width: 767.98px) {
    .navbar .navbar-nav>.nav-item>.sub-menu{
      position: relative;
      top: 0;
      left: 0;
      right: 0;
      margin-top: 0;
      padding: 0;
      max-height: 0;
      overflow: hidden;
    }

    .navbar .navbar-nav>.nav-item.active>.sub-menu{
      max-height: 2e3px;
      overflow: visible;
      padding: 30px 0;
      margin-top: 23px;
    }
  }
</style>