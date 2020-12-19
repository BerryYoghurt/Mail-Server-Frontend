<template>
  <div class="container">
      <div class="d-flex p-2" style="overflow: hidden;">
        <div class="list-group" id="list-tab" role="tablist" style="width: 20%;">
          <a href="#" v-for="(folder, index) in folders" :key="index" class="list-group-item list-group-item-action" id="folder"
            data-bs-toggle="list" role="tab" @click="state.selectedFolder=folder">{{folder}}</a>
      </div>
      <div class="d-flex flex-grow-1 h-100 p-2" style="overflow-y: scroll;">
        <div class="list-group" style="width: 100%;">
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
  name: "HomePageOld",
  setup() {
      const state = reactive({
          sortingCriteria: 'sender',
          selectedFolder: 'Inbox',
          username: 'ABE_Mark45'
      });
      const folders = ['inbox', 'trash', 'drafts'];
      const sampleMails = [
          {
              subject: "Email Subject",
              sender: 'Ahmed Bahgat',
              date: '30-10-2000',
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
          },
          
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