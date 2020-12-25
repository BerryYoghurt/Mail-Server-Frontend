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
            <tr v-for="(email, index) in state.mails" :key="index" @click="gotTo(email)">
                <td style="text-align: left" class="col-3">
                    <div class="form-check">
                    <input class="form-check-input" type="checkbox" :id="'checkbox'+index">
                    <span class=" badge bg-danger" v-if="email.priority==3">Critical</span>
                    <span class=" badge bg-warning text-dark" v-else-if="email.priority==2">Important</span>
                    <span class="badge bg-success" v-else-if="email.priority==1">Normal</span>
                    <span class="badge bg-secondary" v-else-if="email.priority==0">Low</span>
                    </div>
                </td>
                <td style="text-align: center" class="col-3">
                  <label :for="'checkbox-'+index">
                    {{ email.sender }}
                  </label>
                </td>
                <td style="text-align: center" class="col-3">{{ email.subject }}</td>
                <td style="text-align: right" class="col-3">{{ email.date }}</td>
            </tr>
          </tbody>
          <!--<email-in-homepage /> -->
        </table>
          <nav>
            <ul class="pagination justify-content-center">
              <li class="page-item"><a class="page-link" href="#" @click="decrementPage">Previous</a></li>
              <li class="page-item"><a class="page-link" href="#" @click="incrementPage">Next</a></li>
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
          page: 1
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