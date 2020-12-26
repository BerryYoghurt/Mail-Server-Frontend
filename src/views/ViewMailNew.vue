<template>
  <div id="view-mail" class="d-flex align-items-center justify-content-center container" style="min-height: 30vh">
  <div class="modal fade" id="copyModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="copyModalLabel">{{state.mailAction}}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Choose folder to {{state.mailAction}} to
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownFolderButton" data-bs-toggle="dropdown" aria-expanded="false">
            {{state.destFolder}}
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownFolderButton">
            <li v-for="(folder, index) in destinationFolders" :key="index"><a class="dropdown-item" href="#" @click="state.destFolder=folder">{{folder}}</a></li>
          </ul>
        </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" @click="processMail">{{state.mailAction}}!</button>
      </div>
    </div>
  </div>
</div>

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
    
    <nav class="my-4">
      <ul class="pagination justify-content-center">
        <li class="page-item">
          <a class="page-link px-5" style="color: #dc3545;" href="#" @click="removeMail">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
              <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg> Delete
          </a>
        </li>
        <li class="page-item" data-bs-toggle="modal" data-bs-target="#copyModal" @click="state.mailAction='copy'">
          <a class="page-link px-5" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
              <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
              <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
            </svg> Copy
          </a>
        </li>
        <li class="page-item" data-bs-toggle="modal" data-bs-target="#copyModal" @click="state.mailAction='move'">
          <a class="page-link px-5" style="color: #20c997;" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-move" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708l2-2zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10zM.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708l-2-2zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8z"/>
            </svg> Move
          </a>
        </li>
      </ul>
    </nav>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {reactive} from 'vue';
import router from '../router';
export default {
    name: "ViewMailNew",
    setup(props) {
      if(!props.emailData)
        router.replace({name: 'HomePage'});
      const folders = JSON.parse(props.foldersData);
      const permanentFolders = ['inbox', 'sent', 'drafts', 'trash'];
      const destinationFolders = [];
      for(let index in folders){
        if(!permanentFolders.includes(folders[index])){
          destinationFolders.push(folders[index]);
        }
      }

      const emailDataJson = JSON.parse(props.emailData);
      console.log(emailDataJson);
      const state = reactive({
        email: null,
        mailAction: 'copy',
        destFolder: ''
      });

      if(destinationFolders.length > 0){
        state.destFolder = destinationFolders[0];
      }

      axios.get(encodeURI(`http://localhost:8086/getMail?emailId=${emailDataJson.id}&folderName=${emailDataJson.folder}`),{
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
        console.log(state.email);
        window.open(encodeURI(`http://localhost:8086/download?emailId=${state.email.id}&fileName=${attachment}`));
      }

      async function removeMail() {
        const response = await axios.delete(encodeURI(`http://localhost:8086/remove/${emailDataJson.folder}`), {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          withCredentials: true,
          data: state.email.id
        });

        // TODO: confirmation
        console.log(response.data);
        router.push({name: 'HomePage'});
      }

      async function processMail() {
        if(!state.destFolder){
          return;
        }
        let url = `http://localhost:8086/${state.mailAction}`;
        
        const data = {
          from: emailDataJson.folder,
          to: state.destFolder,
          id: state.email.id
        };
        console.log(data);
        const response = await axios.put(encodeURI(url), data, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          withCredentials: true,
          data: data
        });
        console.log(response.data);
        router.push({name: 'HomePage'});
      }




      return {
        state,
        downloadAttachment,
        removeMail,
        processMail,
        destinationFolders
      }
    },
    props: {
      emailData: String,
      foldersData: String
    }
}
</script>