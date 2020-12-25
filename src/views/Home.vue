<template>
  <div id="home" class="container">
    <div class="row text-center">
      <h1>Mail Server</h1>
    </div>
      <img src="../../public/cats.jpg" class="rounded mx-auto d-block img-thumbnail" style="height: 400px !important;">
      <br>
    <div class="text-center">
        <button class="col-2 btn btn-primary btn-lg mx-1" @click="goto('/login')">Login</button>
        <button class="col-2 btn btn-primary btn-lg mx-1" @click="goto('/signup')">Signup</button>
    </div>
  </div>
</template>

<script>
import router from '../router';
export default {
  name: "Home",
  setup() {
    function goto(path) {
      router.push({path: path});
    }

    return {
      goto
    }
  }
};
</script>
