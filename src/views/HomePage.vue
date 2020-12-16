<template>
  <div class="container-fluid d-flex flex-column flex-grow-1 vh-100 overflow-hidden">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand">Gmail</a>
        <!-- Collapse Button-->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>


        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link active" aria-current="page" :to="'/users/'+state.username">{{state.username}}</router-link>
            </li>

          </ul>
          <form class="d-flex">
              <div class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Search By</a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" @click="state.sortingCriteria='sender'">Sender</a></li>
                <li><a class="dropdown-item" @click="state.sortingCriteria='subject'">Subject</a></li>
                <li><a class="dropdown-item" @click="state.sortingCriteria='attachments'">Attachments</a></li>
              </ul>
              </div>

            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
    <div class="row flex-grow-1 overflow-hidden">
      <div class="col-2 mh-100 overflow-auto py-2">
        <div class="list-group" id="list-tab" role="tablist">
          <a href="#" v-for="(folder, index) in folders" :key="index" class="list-group-item list-group-item-action" id="folder"
            data-bs-toggle="list" role="tab" @click="state.selectedFolder=folder">{{folder}}</a>
        </div>
      </div>
      <div class="col mh-100 overflow-auto py-2">
        <div class="list-group">
          <email-in-homepage v-for="(email, index) in sampleMails" :key="index" v-bind="email"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {reactive} from 'vue';
import EmailInHomepage from "../components/EmailInHomepage.vue";
export default {
  name: "HomePage",
  setup() {
      const state = reactive({
          sortingCriteria: 'sender',
          selectedFolder: 'Inbox',
          username: 'ABE_Mark45'
      });

      const folders = ['inbox', 'trash', 'drafts'];

      const sampleMails = [
          {
              subject: "fdfsdfsd",
              sender: 'fsdfsdfsdf',
              date: 'fsdfsdfsd',
              importance: 2
          },
          {
              subject: "fdfsdfsd",
              sender: 'fsdfsdfsdf',
              date: 'fsdfsdfsd',
              importance: 2
          },
          {
              subject: "fdfsdfsd",
              sender: 'fsdfsdfsdf',
              date: 'fsdfsdfsd',
              importance: 2
          },
          {
              subject: "fdfsdfsd",
              sender: 'fsdfsdfsdf',
              date: 'fsdfsdfsd',
              importance: 2
          }
      ]

      function showSelectedFolder() {
          console.log(state.selectedFolder);
      }

      return {
          folders,
          state,
          showSelectedFolder,
          sampleMails
      };
  },

  components: {
    EmailInHomepage,
  },
};
</script>