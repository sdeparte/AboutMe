<template>
  <ul class="sub-menu">
    <div class="text-center bg-gray soft-gray-border p-4 mb-4">
      <a v-bind:href="creations.url" class="sd-button sd-button-default">
        <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="eye" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-eye fa-w-18 fa-1-5x"><g class="fa-group"><path fill="currentColor" d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288.14 400H288a143.93 143.93 0 1 1 .14 0z" class="fa-secondary"></path><path fill="currentColor" d="M380.66 280.87a95.78 95.78 0 1 1-184.87-50.18 47.85 47.85 0 0 0 66.9-66.9 95.3 95.3 0 0 1 118 117.08z" class="fa-primary"></path></g></svg>
        {{ creations.title }}
      </a>
    </div>

    <div class="row sd-section justify-content-md-center">
      <div v-for="bigType in creations.bigTypes" class="col-lg-3 col-md-6">
        <a v-bind:href="bigType.url" class="no-underline">
          <div class="content soft-gray-border text-center">
            <div class="sd-circle d-inline-block" v-html="bigType.svg"></div>
            <div class="sd-title">
              <h5>
                {{ bigType.title }}
              </h5>

              <div class="text-center">
                {{ bigType.count }}
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
  name: "navbar",
  props: ['creations'],
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