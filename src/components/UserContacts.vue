<template>
  <div class="card d-flex flex-column">
    <div class = "card-body d-flex align-items-lg-stretch row">
      <ul class="list-group">
        <li v-for="(contact,index) in contacts" :key="index" class="list-group-item">
          <div class = "mx-0 my-0 px-0 py-0 row col-10">
            <!--name-->
            <div class="mx-0 my-0 px-0 py-0 col-6" v-if="currentlyEditing===index">
              <label for="edit-name" hidden></label>
              <input id='edit-name'
                     :ref="el => {if(el) nameInput[index] = el;}"
                     v-model="contact.name"
                     @keyup.enter="emailInput[currentlyEditing].focus();">
            </div>
            <div class="mx-0 my-0 px-0 py-0 border col-6" v-else>
              {{contact.name}}
            </div>
            <!--address-->
            <div class="mx-0 my-0 px-0 py-0 col-6" v-if="currentlyEditing===index">
              <label for="edit-email" hidden></label>
              <input id="edit-email"
                     :ref="el => {if(el) emailInput[index] = el;}"
                     v-model="contact.email"
                     type="email"
                     @keyup.enter="currentlyEditing = -1">
            </div>
            <div class="mx-0 my-0 px-0 py-0 border col-6" v-else>
              {{contact.email}}
            </div>
          </div>
          <button class="btn mx-1 mx-1 col-1" @click="edited = true; currentlyEditing = index; nameInput[currentlyEditing].focus();">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
            </svg>
          </button>
          <button
              class="btn btn-close mx-1 my-1 col-1"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="delete contact"
              @click="removeContact(index)"
          ></button>
        </li>
      </ul>
    </div>
    <div class="card-footer d-flex justify-content-between">
      <button class="btn btn-secondary" @click="edited = true; currentlyEditing = contacts.length; contacts.push({name:'New Contact', email:'address@example.com'});">New Contact</button>
      <button class="btn btn-success" @click="saveChanges()" :disabled="!edited">Save Changes</button>
    </div>
  </div>
</template>

<script>
import {reactive, ref} from 'vue';
import axios from 'axios';


export default {
  name: "UserContacts",
  setup(){
    const nameInput = reactive([]);
    const emailInput = reactive([]);
    const edited = ref(false);
    const contacts = reactive([]);
    axios.get(encodeURI('http://localhost:8086/getContacts'),
        {withCredentials:true})
        .then(
            response => {
              console.log(response.data);
              for (let contact in response.data){
                contacts.push({name:contact, email:response.data[contact]});
              }
              console.log(contacts);
            }
        );

    const currentlyEditing = ref(-1);

    const removeContact = function(index){
      contacts.splice(index,1);
      edited.value = true;
    };
    const saveChanges = function (){
      const requestBody = {};
      for(let index in contacts){
        requestBody[contacts[index].name] = contacts[index].email;
      }
      console.log(contacts);
      console.log(`req bdy = ${requestBody}`);
      axios.put(encodeURI('http://localhost:8086/updateContacts'),
          requestBody,
          {withCredentials:true});
      edited.value = false;
      currentlyEditing.value = -1;
    }

    return{
      contacts,
      edited,
      currentlyEditing,
      removeContact,
      saveChanges,
      emailInput,
      nameInput
    }
  },
  beforeRouteLeave(to,from,next){
    if(!this.edited || confirm("Unsaved changes.. continue without saving?")){
      next();
    }else{
      next(false);
    }
  }
}
</script>
