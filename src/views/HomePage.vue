<template>
  <div class="container-fluid">

<!-- Modal -->
<div class="modal fade" id="copyModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="copyModalLabel">{{state.mailsAction}}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Choose folder to {{state.mailsAction}} to
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownFolderButton" data-bs-toggle="dropdown" aria-expanded="false">
            {{state.destFolder}}
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownFolderButton">
            <li v-for="(folder, index) in destinationFolders" :key="index"><a class="dropdown-item" href="#" @click="state.destFolder=folder" >{{folder}}</a></li>
          </ul>
        </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" @click="processMultipleMails">{{state.mailsAction}}!</button>
      </div>
    </div>
  </div>
</div>
    <div class="row">
      <div id="sidebar" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
          <div class="position-sticky pt-3">
              <br>
              <input class="form-control my-2" type="search" placeholder="Search" aria-label="Search" v-model="state.searchString" v-if="!['priority', 'date'].includes(state.filterCriteria)"/>
              <input class="w-100 my-2" type="date" v-model="state.searchString" v-if="state.filterCriteria=='date'"/>
              <div class="dropdown text-center my-2" v-if="state.filterCriteria=='priority'">
                <button v-bind:class="{'btn-secondary show': state.searchString==0, 'btn-success show': state.searchString==1, 'btn-warning show': state.searchString==2, 'btn-danger show': state.searchString==3}" class="btn dropdown-toggle w-100" id="priority-button-search" data-bs-toggle="dropdown" role="button">{{priorities[state.searchString]}}</button>
                <ul class="dropdown-menu" aria-labelledby="priority-button">
                  <li><a href="#" class="dropdown-item" @click="state.searchString=0">Low</a></li>
                  <li><a href="#" class="dropdown-item" @click="state.searchString=1">Normal</a></li>
                  <li><a href="#" class="dropdown-item" @click="state.searchString=2">Important</a></li>
                  <li><a href="#" class="dropdown-item" @click="state.searchString=3">Critical</a></li>
                </ul>
              </div>

              <div class="btn-group special">
              <button type="button" class="btn btn-outline-success" style="width:90%;" @click="search">Search</button>
                <button type="button" class="btn btn-success dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false"></button>
                <ul class="dropdown-menu">
                  <li><a href="#" class="dropdown-item" @click="state.searchString='';state.filterCriteria='sender'">Sender</a></li>
                  <li><a href="#" class="dropdown-item" @click="state.searchString='';state.filterCriteria='subject'">Subject</a></li>
                  <li><a href="#" class="dropdown-item" @click="state.searchString='';state.filterCriteria='attachments'">Attachments</a></li>
                  <li><a href="#" class="dropdown-item" @click="state.searchString='';state.filterCriteria='body'">Body</a></li>
                  <li><a href="#" class="dropdown-item" @click="state.searchString=0;state.filterCriteria='priority';">Priority</a></li>
                  <li><a href="#" class="dropdown-item" @click="state.searchString='2020-12-12';state.filterCriteria='date'">Date</a></li>
                </ul>
              </div>
              <br><br>

              <ul class="nav flex-column">
                  <li v-for="(folder, index) in folders" :key="index" class="nav-item">
                    <a href="#" class="list-group-item list-group-item-action" id="folder"
                        data-bs-toggle="list" role="tab" @click="state.selectedIndices={};state.selectedFolder=folder;state.page=1;fetchFolder();">{{folder}}</a>
                 </li>
              </ul>
          </div>

      </div>

      <div class="col-md-9 ms-sm-auto col-lg-10 px-md-4" style="display: block;">
        <h1 v-if="state.mails.length==0">No emails yet!</h1>
        <div v-else class="table-responsive">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th style="text-align: left" class="col-3"><button class="btn btn-outline-success w-100" @click="state.selectedIndices={};state.sortingCriteria='priority';fetchFolder();">Priority</button></th>
              <th style="text-align: center" class="col-3"><button class="btn btn-outline-success w-100"  @click="state.selectedIndices={};state.sortingCriteria='sender';fetchFolder();">Sender</button></th>
              <th style="text-align: center" class="col-3"><button class="btn btn-outline-success w-100" @click="state.selectedIndices={};state.sortingCriteria='subject';fetchFolder();">Subject</button></th>
              <th style="text-align: right" class="col-3"><button class="btn btn-outline-success w-100"  @click="state.selectedIndices={};state.sortingCriteria='date';fetchFolder();">Date</button></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(email, index) in state.mails" :key="index">
                <td style="text-align: left" class="col-3">
                    <div class="form-check">
                    <input class="form-check-input" type="checkbox" :checked="state.selectedIndices[email.id]" @click="checkBox(email.id)">
                    <span class=" badge bg-danger" v-if="email.priority==3" @click="gotTo(email)">Critical</span>
                    <span class=" badge bg-warning text-dark" v-else-if="email.priority==2" @click="gotTo(email)">Important</span>
                    <span class="badge bg-success" v-else-if="email.priority==1" @click="gotTo(email)">Normal</span>
                    <span class="badge bg-secondary" v-else-if="email.priority==0" @click="gotTo(email)">Low</span>
                    </div>
                </td>
                <td style="text-align: center" class="col-3"  @click="gotTo(email)">
                  <label :for="'checkbox-'+index">
                    {{ email.sender }}
                  </label>
                </td>
                <td style="text-align: center" class="col-3"  @click="gotTo(email)">{{ email.subject }}</td>
                <td style="text-align: right" class="col-3"  @click="gotTo(email)">{{ new Date(email.date).toDateString() }}</td>
            </tr>
          </tbody>
          <!--<email-in-homepage /> -->
        </table>
            <nav>
              <ul class="pagination justify-content-center">
                <li class="page-item">
                  <a class="page-link px-5" style="color: #dc3545;" href="#" @click="removeMultipleMails">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg> Delete
                  </a>
                </li>
                <li class="page-item" data-bs-toggle="modal" data-bs-target="#copyModal" @click="state.mailsAction='copy'">
                  <a class="page-link px-5" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
                      <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                      <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                    </svg> Copy
                  </a>
                </li>
                <li class="page-item" data-bs-toggle="modal" data-bs-target="#copyModal" @click="state.mailsAction='move'">
                  <a class="page-link px-5" style="color: #20c997;" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-move" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708l2-2zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10zM.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708l-2-2zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8z"/>
                    </svg> Move
                  </a>
                </li>
              </ul>
          </nav>
            <nav>
              <ul class="pagination justify-content-center">
                <li class="page-item"><a class="page-link px-4" href="#" @click="decrementPage">Previous</a></li>
                <li class="page-item"><a class="page-link px-4" href="#" @click="incrementPage">Next</a></li>
              </ul>
          </nav>

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
          sortingCriteria: 'date',
          filterCriteria: 'subject',
          selectedFolder: 'inbox',
          username: 'ABE_Mark45',
          mails: [],
          searchString: '',
          page: 1,
          selectedIndices: {},
          destFolder: '',
          mailsAction: 'copy'
      });
        const permanentFolders = ['inbox', 'sent', 'drafts', 'trash'];
        const destinationFolders = [];
        const folders = reactive([]);
        axios.get(encodeURI('http://localhost:8086/getFolders'),{withCredentials:true})
        .then(response=>{
          for(let index in response.data){
            folders.push(response.data[index]);
            if(!permanentFolders.includes(folders[index])){
              destinationFolders.push(folders[index]);
            }
          }
          if(destinationFolders.length > 0)
              state.destFolder = destinationFolders[0];
        });



      async function fetchFolder() {
        let url = `http://localhost:8086/folders/${state.selectedFolder}?`;
        url += `sortType=${state.sortingCriteria}`;
        url += `&page=${state.page}`;
        if(state.filterCriteria){
          url += `&filterType=${state.filterCriteria}`;
          url += `&filterValue=${state.searchString}`;
        }
        const response = await axios.get(encodeURI(url), {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
          ,withCredentials: true
        });
        console.log(state.sortingCriteria)
        console.log(response.data);
        if(state.page != 1 && response.data.length == 0)
          return 0;
        state.mails = response.data;
        return state.mails.length || 0;
      }
      fetchFolder();

      function gotTo(email) {
        if(state.selectedFolder != 'drafts')
          router.push({name: 'EmailViewNew', params: {emailData: JSON.stringify({folder: state.selectedFolder, id: email.id}), foldersData: JSON.stringify(folders)}});
        else {
          console.log(email.id);
          router.push({name: 'EditMail', params: {emailId: email.id}});
        }
      }

      function search() {
        console.log(`filter criteria: ${state.filterCriteria}`);
        console.log(`search string: ${state.searchString}`);
        if(state.searchString === '')
          return;
        fetchFolder();
        state.filterCriteria = '';
        state.searchString = '';
      }

      async function incrementPage() {
        state.page++;
        const resLength = await fetchFolder();
        if(!resLength)
          state.page = Math.max(1, state.page-1);
      }

      function decrementPage() {
        state.page = Math.max(1, state.page-1);
        fetchFolder();
      }

      function checkBox(id) {
        state.selectedIndices[id] = !state.selectedIndices[id];
      }

      async function removeMultipleMails() {
        let mailsToBeDeleted = [];
        for(let k in state.selectedIndices) {
          if(state.selectedIndices[k])
            mailsToBeDeleted.push(k);
        }
        const response = await axios.delete(encodeURI(`http://localhost:8086/removeMultipleMails/${state.selectedFolder}`), {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          withCredentials: true,
          data: mailsToBeDeleted
        });

        // TODO: confirmation
        console.log(response.data);
        router.go(0);
      }

      async function processMultipleMails() {
        if(!state.destFolder){
          return;
        }

        let url = `http://localhost:8086/${state.mailsAction}MultipleMails`;
        let mailsToBeProcessed = [];
        for(let k in state.selectedIndices) {
          if(state.selectedIndices[k])
            mailsToBeProcessed.push(k);
        }

        const data = {
          from: state.selectedFolder,
          to: state.destFolder,
          array: mailsToBeProcessed
        };

        const response = await axios.put(encodeURI(url), data, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          withCredentials: true,
        });
        console.log(response.data);
        router.go(0);
      }
      
      const priorities = ['Low', 'Normal', 'Important', 'Critical'];

      return {
          folders,
          state,
          destinationFolders,
          router,
          fetchFolder,
          gotTo,
          search,
          incrementPage,
          decrementPage,
          checkBox,
          removeMultipleMails,
          processMultipleMails,
          priorities
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
}

.btn-group.special {
  display: flex;
}

.special {
  flex: 1
}

</style>