<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-3 col-lg-2 d-md-block bg-light sidebar">
          <div class="position-sticky pt-3">
              <ul class="nav flex-column">
                  <li v-for="(folder, index) in folders" :key="index" class="nav-item">
                    <a href="#" class="list-group-item list-group-item-action" id="folder"
                        data-bs-toggle="list" role="tab" @click="state.selectedFolder=folder">{{folder}}</a>
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
        <div class="table-responsive">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th style="text-align: left">Sender</th>
              <th style="text-align: center">Subject</th>
              <th style="text-align: right">Time</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(email, index) in state.mails" :key="'email-'+index" @click="()=> router.push({name: 'EmailViewNew', params: {emailString: JSON.stringify(email)}})">
                <td style="text-align: left">
                    <div class="form-check">
                    <input class="form-check-input" type="checkbox" :id="'checkbox'+index">
                    <label :for="'checkbox-'+index">
                    <span class=" badge bg-danger" v-if="email.priority==3">Critical</span>
                    <span class=" badge bg-warning text-dark" v-else-if="email.priority==2">Important</span>
                    <span class=" badge bg-primary" v-else-if="email.priority==1">Normal</span>
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
import {useRouter} from 'vue-router'
import mockMails from '../assets/MockEmails'

export default {
  name: "HomePage",
  setup() {
      const state = reactive({
          sortingCriteria: 'sender',
          selectedFolder: 'Inbox',
          username: 'ABE_Mark45',
          mails: mockMails
      });

      const folders = ['inbox', 'trash', 'drafts'];
      const router = useRouter();

      return {
          folders,
          state,
          router
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