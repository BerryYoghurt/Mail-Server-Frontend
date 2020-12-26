<template>
    <nav class="navbar sticky-top navbar-expand-lg navbar-light bg-light flex-md-nowrap">
      <div class="container">
        <!--<a class="navbar-brand">Gmail</a>-->
        <router-link class="navbar-brand" aria-current="page" :to="{name:'HomePage'}">Gmail</router-link>
        <!-- Collapse Button-->
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link active" aria-current="page" to="/user/">{{username}}</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link active" aria-current="page" :to="{name:'Contacts'}">Contacts</router-link>
            </li>
          </ul>
          <ul class="navbar-nav navbar-right mx-2">
            <li class="nav-item">
              <router-link class="btn btn-outline-success mx-5" :to="{ name:'EditMail', params:{emailId:''} }">Compose</router-link>
              <button class="btn btn-outline-danger" @click="store.dispatch('signOut');router.push({path: '/'})">Sign out</button>
            </li>
          </ul>
        <button
          class="navbar-toggler d-md-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebar"
          aria-controls="sidebar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

      </div>
    </nav>
</template>

<script>
import router from '../router/index';
import store from '../store/index'

export default {
    name: "CustomNavbar",
    props: {
        username: String,
    },
    setup() {
        return {
            store,
            router
        }
    }
}
</script>