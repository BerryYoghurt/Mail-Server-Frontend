<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-3 col-lg-2 d-md-block bg-light sidebar">
          <div class="position-sticky pt-3">
              <ul class="nav flex-column">
                  <li v-for="(folder, index) in folders" :key="index" class="nav-item">
                    <a href="#" class="list-group-item list-group-item-action" id="folder"
                        data-bs-toggle="list" role="tab" @click="fetchFolder(folder)">{{folder}}</a>
                 </li>
              </ul>
          </div>

        <!--
        <div class="list-group" id="list-tab" role="tablist">
          <a href="#" v-for="(folder, index) in folders" :key="index" class="list-group-item list-group-item-action" id="folder"
            data-bs-toggle="list" role="tab" @click="state.selectedFolder=folder">{{folder}}</a>
        </div>
        -->
      </div>

      <div class="col-md-9 ms-sm-auto col-lg-10 px-md-4" style="display: block;">
        <h1 v-if="state.mails.length==0">No emails yet!</h1>
        <div v-else class="table-responsive">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th style="text-align: left">Sender</th>
              <th style="text-align: center">Subject</th>
              <th style="text-align: right">Time</th>
            </tr>
          </thead>
          <tbody>
<<<<<<< HEAD
            <tr v-for="(email, index) in state.mails" :key="index" @click="redirectToMail(email)">
=======
            <tr v-for="(email, index) in state.mails" :key="index" @click="gotTo(email)">
>>>>>>> 669182a8c709b78bb93397cbb7a77922d502bc83
                <td style="text-align: left">
                    <div class="form-check">
                    <input class="form-check-input" type="checkbox" :id="'checkbox'+index">
                    <label :for="'checkbox-'+index">
                    <span class=" badge bg-danger" v-if="email.priority==3">Critical</span>
                    <span class=" badge bg-warning text-dark" v-else-if="email.priority==2">Important</span>
                    <span class="badge bg-success" v-else-if="email.priority==1">Normal</span>
                    <span class="badge bg-secondary" v-else-if="email.priority==0">Low</span>
                    {{ email.sender }}
                    </label>
                    </div>
                </td>
                <td style="text-align: center">{{ email.subject }}</td>
                <td style="text-align: right">{{ email.date }}</td>
            </tr>
          </tbody>
          <!--<email-in-homepage /> -->
        </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {reactive} from 'vue';
import router from '../router';
import axios from 'axios';

export default {
  name: "HomePage",
  setup() {
      const state = reactive({
          sortingCriteria: 'sender',
          selectedFolder: 'inbox',
          username: 'ABE_Mark45',
          mails: []
      });
    const folders = ['inbox', 'trash', 'draft', 'sent'];
    const redirectToMail = function (email){
        if(state.selectedFolder === 'draft'){
          router.push({name: 'EmailViewNew', params: {mailID: email.id}});
        }else{
          router.push({name: 'EmailViewNew', params: {emailString: JSON.stringify(email)}});
        }
    }

      async function fetchFolder(folder) {
        state.selectedFolder = folder;
        
        const response = await axios.get(`http://localhost:8086/folders/${folder}`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
          ,withCredentials: true
        });
        console.log(response.data);
        state.mails = response.data;
      }
      fetchFolder('inbox');

      function gotTo(email) {
        if(state.selectedFolder != 'drafts')
          router.push({name: 'EmailViewNew', params: {emailString: JSON.stringify(email)}});
        else {
          console.log(email.id);
          router.push({name: 'EditMail', params: {emailId: email.id}});
        }
      }

      return {
          folders,
          state,
          router,
          fetchFolder,
          gotTo

      };
  },

};
</script>

<style scoped>
.sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    padding: 48px 0 0;
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
}
</style>