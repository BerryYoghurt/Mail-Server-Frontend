<template>
  <div id="view-mail" class="d-flex align-items-center justify-content-center container" style="min-height: 30vh">
    <div class="w-100" style="max-width: 800px">
      <div class="card" v-if="state.email">
        <div class="card-body">
          <div class="row">
            <h3 class="text-truncate bg-gradient card-title col-10" data-bs-toggle="tooltip" data-bs-placement="bottom" :title="state.email.subject">{{state.email.subject}}
              <span class="badge bg-danger" v-if="state.email.priority==3">Critical</span>
              <span class="badge bg-warning text-dark" v-else-if="state.email.priority==2">Important</span>
              <span class="badge bg-success" v-else-if="state.email.priority==1">Normal</span>
              <span class="badge bg-secondary" v-else-if="state.email.priority==0">Low</span>
            </h3>
          </div>
          <div class="card-subtitle text-muted">
            <div class="row">
              <h4 class="col"><span class="badge round-pill bg-secondary">{{state.email.sender}}</span></h4>
              <div class="col text-end">{{state.email.date}}</div>
            </div>
          </div>
          <br>
          <div id="email-body">{{state.email.bodyText}}</div>
          <br>

          <div class="dropdown text-center" v-if="state.email.attachments.length">
            <button class="btn btn-secondary dropdown-toggle col-6" id="attachments-button" data-bs-toggle="dropdown">Attachments</button>
            <ul class="dropdown-menu">
              <li v-for="(attachment, index) in state.email.attachments" :key="index"><a class="dropdown-item" @click="downloadAttachment(attachment)">{{attachment}}</a></li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {reactive} from 'vue';
export default {
    name: "ViewMailNew",
    setup(props) {
      const emailDataJosn = JSON.parse(props.emailData);
      const state = reactive({
        email: null
      });

      axios.get(encodeURI(`http://localhost:8086/getMail?emailId=${emailDataJosn.id}&folderName=${emailDataJosn.folder}`),{
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        withCredentials: true
      }).then(response => {
        state.email = response.data;
        console.log(state.email);
      })

      function downloadAttachment(attachment) {
        window.open(encodeURI(`http://localhost:8086/download?emailId=${state.email.id}&fileName=${attachment}`));
      }
      return {
        state,
        downloadAttachment
      }
    },
    props: {
      emailData: String
    }
}
</script>