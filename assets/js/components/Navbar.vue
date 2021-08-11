<template>
  <div>
    <div class="back-shadow" v-bind:class="{ shown: isShadowShown }" v-on:click="clickShadow"></div>

    <nav id="navbar" class="navbar navbar-expand-md">
      <a v-bind:href="logoUrl">
        <img class="navbar-brand" v-bind:src="logoImg" />
      </a>
      <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li v-for="link in JSON.parse(links)" class="nav-item" v-bind:class="{ 'has-children': link.hasChildren }">
            <a class="nav-link" v-bind:href="link.url" v-on:click="clickLink">
              {{ link.title }}
              <span v-if="link.hasChildren" class="indicator"></span>
            </a>
            <subTechnologieNavbar v-if="link.subTechnologieNavbar" v-bind:technologies="link.subTechnologieNavbar"></subTechnologieNavbar>
            <subCreationNavbar v-if="link.subCreationNavbar" v-bind:creations="link.subCreationNavbar"></subCreationNavbar>
          </li>
        </ul>
      </div>
    </nav>

    <div class="padding-navbar"></div>
  </div>
</template>

<script>
import $ from "jquery";
import SubTechnologieNavbar from "./SubTechnologieNavbar";
import SubCreationNavbar from "./SubCreationNavbar";

export default {
  name: "navbar",
  components: {SubTechnologieNavbar, SubCreationNavbar},
  props: ['logoUrl', 'logoImg', 'links'],
  data() {
    return { isShadowShown: false }
  },
  methods: {
    clickLink(event) {
      let $element = $(event.target).parent('.nav-item')
      const wasActive = $element.hasClass('active');

      $.each($('.navbar .navbar-nav>.nav-item.active'), function(){
        $(this).removeClass('active');
      });

      if (!wasActive) {
        $element.addClass('active');
      }

      if ($element.hasClass('has-children')) {
        if ($element.hasClass('active') && !this.isShadowShown) {
          this.isShadowShown = true;
        } else if (!$element.hasClass('active') && this.isShadowShown) {
          this.isShadowShown = false;
        }
      } else {
        this.isShadowShown = false;
      }
    },
    clickShadow(event) {
      $.each($('.navbar .navbar-nav>.nav-item.active'), function(){
        $(this).removeClass('active');
      });

      this.isShadowShown = false;
    }
  }
}
</script>

<style scoped>
  .back-shadow{
    cursor: pointer;
    z-index: 5;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .6);
    opacity: 0;
    visibility: hidden;

    -webkit-transition: .3s opacity, .3s transform, 0s visibility .3s;
    -moz-transition: .3s opacity, .3s transform, 0s visibility .3s;
    transition: .3s opacity, .3s transform, 0s visibility .3s;
  }

  .back-shadow.shown{
    opacity: 1;
    visibility: visible;
    transition-delay: 0s;
    -webkit-transform: none;
    transform: none;
  }

  .navbar{
    position:fixed;
    left:0;
    right:0;
    color:#fff;
    z-index:99;
    background-color:#2c3e50;

    -webkit-transition: background-color .5s ease-in-out;
    -moz-transition: background-color .5s ease-in-out;
    transition: background-color .5s ease-in-out;
  }

  .navbar .navbar-brand{
    height:60px;
  }

  .navbar .navbar-toggler{
    margin-right: 20px;
    width: 28px;
    height: 20px;
    position: relative;
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    cursor: pointer;
    z-index: 10;

    -webkit-transition: .5s ease-in-out;
    -moz-transition: .5s ease-in-out;
    transition: .5s ease-in-out;
  }

  .navbar .navbar-toggler>span{
    display: block;
    position: absolute;
    height: 2px;
    background: #fff;
    border-radius: 2px;

    width: 100%;
    opacity: 1;
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    left: 0;

    -webkit-transition: .3s ease-in-out;
    -moz-transition: .3s ease-in-out;
    transition: .3s ease-in-out;
  }

  .navbar .navbar-toggler>span:nth-child(1){
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    top: 0;
    left: 3px;
    transform-origin: left center;
  }

  .navbar .navbar-toggler>span:nth-child(2){
    top: 9px;
    width: 0%;
    opacity: 0;
    transform-origin: left center;
  }

  .navbar .navbar-toggler>span:nth-child(3){
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    top: 18px;
    left: 3px;
    transform-origin: left center;
  }

  .navbar .navbar-toggler.collapsed>span{
    width: 100%;
    opacity: 1;
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    left: 0;
  }

  .navbar .navbar-nav>.nav-item a.nav-link{
    font-weight: bold;
    margin-right: 20px;
    padding: 5px 0;
    position: relative;
    display: inline-block;
  }

  .navbar .navbar-nav>.nav-item a.nav-link:first-child{
    margin-right: 50px;
  }

  .navbar .navbar-nav>.nav-item a.nav-link:before {
    content: '';
    position: absolute;
    left: 0;
    height: 1px;
    bottom: -1px;
    right: 100%;
    background: #fff;
    opacity: 0;
    transition: .3s right,.3s opacity,.3s background;
  }

  .navbar .navbar-nav>.nav-item.selected a.nav-link,
  .navbar .navbar-nav>.nav-item:hover a.nav-link{
    color : #fff;
  }

  .navbar .navbar-nav>.nav-item.selected a.nav-link:before,
  .navbar .navbar-nav>.nav-item:hover a.nav-link:before{
    right: 0;
    opacity: 1;
  }

  .navbar .navbar-nav>.nav-item.has-children a.nav-link:after {
    content: '';
    display: inline-block;
    width: 11px;
    height: 7px;
    background: url('../../imgs/down-arrow-white.svg') no-repeat center center/11px 7px;
    position: relative;
    top: -1px;
    left: 2px;
    transition: .3s transform;
  }

  .navbar .navbar-nav>.nav-item.has-children.active a.nav-link:after{
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }

  .navbar .navbar-nav>.nav-item a.nav-link>.indicator{
    display: block;
    z-index: 1;
    position: absolute;
    top: calc(100% + 13px);
    left: 50%;
    margin-left: -44px;
    width: 79px;
    height: 15px;
    background: url('../../imgs/menu-indicator.png') center center/79px 15px;
    opacity: 0;
    visibility: hidden;
    -webkit-transform: translateY(10px);
    transform: translateY(10px);

    -webkit-transition: .3s opacity, .3s transform, 0s visibility .3s;
    -moz-transition: .3s opacity, .3s transform, 0s visibility .3s;
    transition: .3s opacity, .3s transform, 0s visibility .3s;
  }

  .navbar .navbar-nav>.nav-item.active a.nav-link>.indicator{
    opacity: 1;
    visibility: visible;
    transition-delay: 0s;
    -webkit-transform: none;
    transform: none;
  }

  @media (max-width: 767.98px) {
    .navbar .navbar-collapse.show{
      height: calc(100vh - 60px);
      overflow-y: auto;
    }

    .navbar .navbar-nav>.nav-item a.nav-link{
      margin: 5px 10px;
    }

    .navbar .navbar-nav>.nav-item a.nav-link>.indicator{
      -webkit-transform: translateY(10px);
      transform: translateY(10px);

      -webkit-transition: 0s opacity, 0s transform, 0s visibility;
      -moz-transition: 0s opacity, 0s transform, 0s visibility;
      transition: 0s opacity, 0s transform, 0s visibility;
    }

    .navbar .navbar-nav>.nav-item.active a.nav-link>.indicator{
      -webkit-transition: .3s opacity .3s, .3s transform .3s, 0s visibility .3s;
      -moz-transition: .3s opacity .3s, .3s transform .3s, 0s visibility .3s;
      transition: .3s opacity .3s, .3s transform .3s, 0s visibility .3s;
    }
  }
</style>