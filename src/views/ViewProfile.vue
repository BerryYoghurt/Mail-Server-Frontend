<template>
  <div class="container-fluid h-100">
    <div class="row">
      <!--About User-->
      <div class="col-4 border d-flex flex-column card">
        <div class="d-flex flex-column card">
          <div class="border d-flex align-items-md-baseline justify-content-between card-title py-2">
            <strong>{{name}}</strong>
            <button class="btn" data-bs-toggle="collapse" data-bs-target="#edit-name">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
              </svg>
            </button>
          </div>
          <div id="edit-name" class="collapse mx-1 my-2">
            <label for="name"></label>
            <input id="name" @keyup.enter="(event)=>{changeName(event.target.value)}" > <!--TODO how should the backend receive this?-->
          </div>
          <div class="border justify-content-center card-subtitle py-3">
            {{username}}@ourserver.cat
          </div>
          <button class="btn btn-outline-secondary py-2" data-bs-toggle="collapse" data-bs-target="#edit-password">Change Password</button>
          <form @submit.prevent="changePassword" class="collapse" id="edit-password">
            <label for="password" class="form-label">Enter new password:</label>
            <input id="password" type="password" class="form-text">
            <label for="confirm" class="form-label">Confirm new password:</label>
            <input id="confirm" type="password" class="form-text">
            <input type = "submit" hidden>
          </form>
        </div>
        <!--For now.. should send changes to API and reload User (why? because if I change globally
        I would not be able to revert the changes, so I should temporarily store the changes then reload from scratch)-->
        <button class="btn btn-success" :disabled="!edited" @click="saveAbout">Save Changes</button>
      </div>
      <!--User Data-->
      <div class = "col-8 border">
        <div class="btn-group">
          <router-link :to="{ name:'UserContacts'}" append replace tag="button" class="btn btn-primary mx-1" >My Contacts</router-link>
          <router-link :to="{ name:'UserFolders' }" append replace tag="button" class="btn btn-primary mx-1" >My Folders</router-link>
        </div>
        <div>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import {reactive} from "vue";
import mockUser from '../assets/MockUser';
import {ref} from 'vue';
//import {useStore} from 'vuex';

/**extracts the name, username/handle/whatever you're gonna cal it, */
/*
const extract = function(){
  let user ={};
  for(let key in mockUser){
    switch (key){
      case 'name':
      case 'username':
        user[key] = mockUser[key];//String, no need to deep copy
        break;
      /*case 'contacts':
        user.contacts = [];
        for(let contact in mockUser.contacts){
          user.contacts.push({name:contact.name});
          user.contacts.lastItem.emails = [];
          for(let email in contact.emails){
            user.contacts.lastItem.emails.push(email);
          }
        }
        break;
      case 'folders':
        user.folders=[];
        for(let folder in mockUser.folders){
          user.folders.push(folder);
        }
        break;
      default:
        user[key] = mockUser[key]; //copy all others shallow
    }
  }
  return user;
}
*/
export default {
  name: "ViewProfile",
  setup(){
    //TODO fetch user data from API using store.user.username or .id or whatever
    //NOTE!! do not change store directly, change a local variable then dispatch a change action!!
    //const user = extract();
    const edited = ref(false);
    /*const store = useStore();
    const name = ref(store.state.user.name);
    const username = store.state.user.username;*/
    const name = ref(mockUser.name);
    const username = mockUser.username;

    const changeName = function(newName){
      if(newName){
        name.value=newName;
        edited.value = true;
      }
    };
    const saveAbout = function(){
      //TODO send update request
      //update store.state.user, I guess this gives no security problems since the email and token are unchanged..?
      edited.value = false;
      console.log("saved about");
    };
    const changePassword = function(event){
      console.log("submitted");
      let password1 =event.target[0].value;
      let password2 = event.target[1].value;
      if(password1 === password2){
        //TODO send to backend
        edited.value=true;
      }
      else{
        alert("Passwords do not match");
      }
    };

    return{
      name,
      username,
      edited,
      changeName,
      saveAbout,
      changePassword
    }
  }
}
</script>
