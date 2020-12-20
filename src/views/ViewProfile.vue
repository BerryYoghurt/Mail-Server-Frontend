<template>
  <div class="container-fluid h-100">
    <div class="row">
      <!--About User-->
      <div class="col-4 border d-flex flex-column card">
        <div class="border d-flex align-items-md-baseline justify-content-between card-title py-2">
          <strong>{{user.name}}</strong>
          <button class="btn" data-bs-toggle="collapse" data-bs-target="#edit-name">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
            </svg>
          </button>
        </div>
        <div id="edit-name" class="collapse">
          <label for="name"></label>
          <input id="name" @keyup.enter="(event)=>{if(event.target.value){user.name=event.target.value;}}" > <!--TODO how should the backend receive this?-->
        </div>
        <div class="border justify-content-center card-subtitle py-2">
          {{user.username}}@ourserver.cat
        </div>
        <button class="btn btn-outline-secondary py-2" data-bs-toggle>Change Password</button>
      </div>
      <!--User Data-->
      <div class = "col-8 border">
        <div class="btn-group">
          <!--I have no idea why append is so buggy-->
          <router-link :to="{ name:'UserContacts', params : { contacts:user.contacts } }" append replace tag="button" class="btn btn-primary" >My Contacts</router-link>
          <router-link :to="{ name:'UserFolders', params : { folders:user.folders } }" append replace tag="button" class="btn btn-primary" >My Folders</router-link>
        </div>
        <div>
          <router-view></router-view>
        </div>
      </div>
    </div>
    {{user}}
  </div>
</template>

<script>
import {reactive} from "vue";

export default {
  name: "ViewProfile",
  setup(){
    //TODO fetch user data from API using store.user.username or .id or whatever
    const user = reactive({
      name:'Miyuki Shirogane',
      username:'prez',
      folders:[
          'inbox',
          'sent',
          'draft',
          'trash',
          'custom mailbox1',
          'custom mailbox2'
      ],
      contacts:[
          'Shinomiya',
          'Ishigami',
          'Hayasaka'
      ]
    })
    console.log(user.contacts);


    return{
      user,
    }
  }
}
</script>
