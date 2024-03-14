<template>
  <nav-bar></nav-bar>
  <router-view/>
  <footer-component></footer-component>
</template>

<script>
import 'bootstrap';
import NavBar from '@/components/NavBar.vue'
import FooterComponent from '@/components/FooterComponent.vue'
export default {
  components: { 
    NavBar ,
    FooterComponent
  },
}
</script>

