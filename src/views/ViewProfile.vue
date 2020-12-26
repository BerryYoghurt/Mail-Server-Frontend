<template>
  <div class="container-fluid h-100">
    <div class="row">
      <!--About User-->
      <div class="col-4 border d-flex flex-column card">
        <div class="d-flex flex-column card">
          <div class="border justify-content-center card-subtitle py-3">
            {{username}}
          </div>
          <button class="btn btn-outline-secondary py-2" data-bs-toggle="collapse" data-bs-target="#edit-password">Change Password</button>
          <form @submit.prevent="changePassword" class="collapse" id="edit-password">
            <label for="old-password" class="form-label">Enter old password:</label>
            <input id="old-password" type="password" class="form-text"> <br>
            <label for="password" class="form-label">Enter new password:</label>
            <input id="password" type="password" class="form-text"><br>
            <label for="confirm" class="form-label">Confirm new password:</label>
            <input id="confirm" type="password" class="form-text"><br>
            <input type = "submit">
          </form>
        </div>
        <!--For now.. should send changes to API and reload User (why? because if I change globally
        I would not be able to revert the changes, so I should temporarily store the changes then reload from scratch)-->
        <!--<button class="btn btn-success" :disabled="!edited" @click="saveAbout">Save Changes</button>-->
      </div>
      <!--User Data-->
      <div class = "col-8 border">
        <div>
          <UserFolders/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store';
import axios from "axios";
import UserFolders from '../components/UserFolders';

export default {
  name: "ViewProfile",
  components: {UserFolders},
  setup(){

    const username = store.state.user;

    const changePassword = function(event){
      console.log("submitted");
      let oldPassword = event.target[0].value;
      let password1 =event.target[1].value;
      let password2 = event.target[2].value;
      if(password1 === password2){
        axios.post(encodeURI('http://localhost:8086/changePassword'),
            {oldPassword: oldPassword, newPassword:password1},
            {withCredentials:true});
      }
      else{
        alert("Passwords do not match");
      }
    };

    return{
      username,
      changePassword
    }
  }
}
</script>
