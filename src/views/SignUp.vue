<template>
  <div id="signup" class="d-flex align-items-center justify-content-center container" style="min-height: 80vh">
    <div class="w-100" style="max-width: 400px">
      <div class="card">
        <div class="card-body">
          <h2 class="text-center mb-4">Sign Up</h2>
          <div v-if="state.error">
            <div class="alert alert-danger">{{ state.error }}</div>
          </div>
          <form @submit.prevent="signUp">
            <div id="name-group" class="form-group mb-3">
              <label class="form-label">Full Name</label>
              <input class="form-control" id="name" v-model="state.name" />
            </div>

            <div id="email-group" class="form-group mb-3">
              <label class="form-label">Email</label>
              <input type="email" class="form-control" id="email" v-model="state.email" />
            </div>

            <div id="password-group" class="form-group mb-3">
              <label class="form-label">Password</label>
              <input type="password" class="form-control" id="password" v-model="state.password"/>
            </div>

            <div id="confirm-password-group" class="form-group mb-3">
              <label class="form-label">Confirm Password</label>
              <input type="password" class="form-control" id="confirm-password" v-model="state.confirmPassword"/>
            </div>

            <button type="submit" class="btn btn-primary w-100">Sign Up!</button>
          </form>
        </div>
      </div>

      <div className="w-100 text-center m-2">
        Already have an account?
        <router-link to="/login"> Login</router-link>
      </div>
      <div className="w-100 text-center m-2">
        <router-link to="/about"> About</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from "vue";
import axios from 'axios';
import router from '../router';
import store from '../store';
export default {
  name: "SignUp",
  beforeRouteEnter() {
      if(store.getters.loggedInUser)
        router.push({name: 'HomePage'})
  },
  setup() {
    const state = reactive({
      email: "ahmed@gmail.com",
      password: "a",
      name: "ahmed bahgat",
      confirmPassword: "a",
      error: false,
      loading: false,
    });

    async function signUp() {      
      const body = {
        name: state.name,
        email: state.email,
        password: state.password
      }
      if(state.password === state.confirmPassword) {      // validate email here
        const result = await axios.post('http://localhost:8086/signup', body, {
          headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json'
          },
          withCredentials: true
        });
        console.log(result.data);
        if(result.data === false){
          state.error = "User already registered";
        }else{
          const user = result.data.user;
          store.commit('SET_USER', user);
          router.push({name: 'HomePage'});
        }
      }else{
        state.error = "Passwords are not the same";
      }
      
    }

    return {
      state,
      signUp,
      user: computed(()=> store.state.user),
      router
    };
  },
  
};
</script>
