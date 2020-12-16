<template>
  <div
    id="login"
    class="d-flex align-items-center justify-content-center container"
    style="min-height: 60vh"
  >
    <div class="w-100" style="max-width: 400px">
      <div class="card">
        <div class="card-body">
          <h2 class="text-center mb-4">Login</h2>
          <div v-if="state.error">
            <div class="alert alert-danger">{{ state.error }}</div>
          </div>
          <form>
            <div id="email-group" class="form-group mb-3">
              <label class="form-label" for="email">Email</label>
              <input type="email" class="form-control" id="email" v-model="state.email" />
            </div>

            <div id="password-group" class="form-group mb-3">
              <label class="form-label" for="password">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="state.password"
              />
            </div>

            <button type="submit" class="btn btn-primary w-100">Log In!</button>
          </form>
        </div>
      </div>

      <div className="w-100 text-center m-2">
        Don't have an account?
        <router-link to="/signup"> Sign Up</router-link>
      </div>
      <div className="w-100 text-center m-2">
        <router-link to="/about"> About</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";

export default {
  name: "LogIn",
  setup() {
    const state = reactive({
      email: "",
      password: "",
      error: false,
      loading: false,
    });

    return {
      state,
    };
  },
};
</script>
