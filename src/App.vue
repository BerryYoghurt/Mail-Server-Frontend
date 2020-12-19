<template>
    <custom-navbar username="ABE_Mark45"/>
    <router-view />
</template>

<script>
import CustomNavbar from './components/CustomNavbar.vue';
export default {
  name: "App",
  components: {
    CustomNavbar
  }
};

</script>

<style scoped>
::-webkit-scrollbar {
    width: 0px;
    background: transparent;
}

* {
  -ms-overflow-style: none !important;
}
</style>