<template>
  <div class="card d-flex flex-column">
    <div class = "card-body d-flex align-items-lg-stretch row">
      <ul class="list-group col-6">
        <li v-for="(contact,index) in contacts" :key="index" class="list-group-item">
          {{contact}} <!--for the time being-->
          <button class="btn mx-1 mx-1" @click="currentContact = index">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
            </svg>
          </button>
          <button
              class="btn btn-close mx-1 my-1"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="delete contact"
              @click="removeContact(index)"
          ></button>
        </li>
      </ul>
      <div class="card col-6" id="contact-details" v-if="currentContact > -1 && currentContact < contacts.length">
        <div class="card-title">Current Contact {{currentContact}}</div>
        <div class="card-body">Emails</div>
      </div>
      <div class="card col-6" id="add-contact" v-else-if="currentContact == contacts.length">
        <div class="card-title">Name Here</div>
        <div class="card-body">Emails Here</div>
      </div>
    </div>
    <div class="card-footer d-flex justify-content-between">
      <button class="btn btn-secondary" @click="currentContact = contacts.length">New Contact</button>
      <button class="btn btn-success">Save Changes</button>
    </div>
  </div>
</template>

<script>
import {reactive, ref} from 'vue';
import mockUser from '../assets/MockUser'

const extractContacts = function(){
  let contacts =[];
  for(let index in mockUser.contacts){
    contacts.push(mockUser.contacts[index]);
  }
  return contacts;
}

export default {
  name: "UserContacts",
  setup(){
    //TODO check if store.user.contacts is not null and fetch if null, then render
    const edited = ref(false);
    const contacts = reactive(extractContacts());
    const currentContact = ref(-1);
    let newContact = ref(null);

    const appendContact = function (){
      contacts.push(newContact);
      edited.value = true;
    }
    const removeContact = function(index){
      contacts.splice(index,1);
      edited.value = true;
    }

    return{
      contacts,
      edited,
      currentContact,
      newContact,
      removeContact,
      appendContact,

    }
  }
}
</script>
