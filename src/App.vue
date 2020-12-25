<template>
    <custom-navbar v-if="store.state.user" :username="store.state.user"/>
    <router-view />

</template>

<script>
import store from './store';
import CustomNavbar from './components/CustomNavbar.vue';

export default {
  name: "App",
  components: {
    CustomNavbar
  },
  setup() {
    return {
      store
    }
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