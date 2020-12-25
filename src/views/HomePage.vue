<template>
  <div class="container-fluid">
    <div class="row">
      <div id="sidebar" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
          <div class="position-sticky pt-3">
              <br>
              <input class="form-control my-2" type="search" placeholder="Search" aria-label="Search" v-bind="state.searchString"/>
              <div class="btn-group special">
                <button type="button" class="btn btn-outline-success" style="width:90%;" @click="search">Search</button>
                <button type="button" class="btn btn-success dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false"></button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" @click="state.filterCriteria='sender'">Sender</a></li>
                  <li><a class="dropdown-item" @click="state.filterCriteria='subject'">Subject</a></li>
                  <li><a class="dropdown-item" @click="state.filterCriteria='attachments'">Attachments</a></li>
                </ul>
              </div>
              <br><br>

              <ul class="nav flex-column">
                  <li v-for="(folder, index) in folders" :key="index" class="nav-item">
                    <a href="#" class="list-group-item list-group-item-action" id="folder"
                        data-bs-toggle="list" role="tab" @click="state.selectedFolder=folder;state.page=1;fetchFolder();">{{folder}}</a>
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
              <th style="text-align: left" class="col-3"><button class="btn btn-outline-success w-100" @click="state.sortingCriteria='priority';fetchFolder();">Priority</button></th>
              <th style="text-align: center" class="col-3"><button class="btn btn-outline-success w-100"  @click="state.sortingCriteria='sender';fetchFolder();">Sender</button></th>
              <th style="text-align: center" class="col-3"><button class="btn btn-outline-success w-100" @click="state.sortingCriteria='subject';fetchFolder();">Subject</button></th>
              <th style="text-align: right" class="col-3"><button class="btn btn-outline-success w-100"  @click="state.sortingCriteria='date';fetchFolder();">Date</button></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(email, index) in state.mails" :key="index">
                <td style="text-align: left" class="col-3">
                    <div class="form-check">
                    <input class="form-check-input" type="checkbox" :id="'checkbox'+index">
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
                <td style="text-align: right" class="col-3"  @click="gotTo(email)">{{ email.date }}</td>
            </tr>
          </tbody>
          <!--<email-in-homepage /> -->
        </table>
            <nav>
              <ul class="pagination justify-content-center">
                <li class="page-item">
                  <a class="page-link px-5" style="color: #dc3545;" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg> Delete
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link px-5" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
                      <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                      <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                    </svg> Copy
                  </a>
                </li>
                <li class="page-item">
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
          filterCriteria: 'date',
          selectedFolder: 'inbox',
          username: 'ABE_Mark45',
          mails: [],
          searchString: '',
          page: 1,
          selectedIndices: []
      });
        const folders = reactive([]);
        axios.get(encodeURI('http://localhost:8086/getFolders'),{withCredentials:true})
        .then(response=>{
          for(let index in response.data){
            folders.push(response.data[index]);
          }
        });

      async function fetchFolder() {
        let url = `http://localhost:8086/folders/${state.selectedFolder}?`;
        url += `sortType=${state.sortingCriteria}`;
        url += `&page=${state.page}`;
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
        state.selectedIndices = [];
        return state.mails.length || 0;
      }
      fetchFolder();

      function gotTo(email) {
        if(state.selectedFolder != 'drafts')
          router.push({name: 'EmailViewNew', params: {emailData: JSON.stringify({folder: state.selectedFolder, id: email.id})}});
        else {
          console.log(email.id);
          router.push({name: 'EditMail', params: {emailId: email.id}});
        }
      }

      function search() {
        if(state.searchString == '')
          return;
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

      return {
          folders,
          state,
          router,
          fetchFolder,
          gotTo,
          search,
          incrementPage,
          decrementPage
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