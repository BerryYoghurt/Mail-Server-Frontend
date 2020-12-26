<template>
  <div id="contactsUpdate" class="d-flex align-items-center justify-content-center container">

<div class="modal fade" id="editFieldModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="copyModalLabel">Edit Field</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Write new value:
        <input type="text"  v-model="state.newField"/>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="edit">Save</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="addContactModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="addContactModalLabel">Add Contact</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Enter name:
        <input type="text" v-model="state.newContact.name"/>
        <br>
        Enter Email:
        <input type="text" v-model="state.newContact.mail"/>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="addContact">Save</button>
      </div>
    </div>
  </div>
</div>


    <div class="w-100" style="max-width: 400px">
        <div class="d-flex justify-content-center my-2">
            <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addContactModal">Add Contact</button>
        </div>
        <div v-if="state.contacts.length == 0" class="d-flex justify-content-center my-2">
            <h1>No Contacts Yet!</h1>
        </div>
        <div v-else class="card my-3" v-for="(contact, i) in state.contacts" :key="i">
            <div class="card-header d-flex justify-content-between">
                <button class="btn btn-success" @click="state.op='name';state.selectedI=i;state.newField=state.contacts[i].name;" data-bs-toggle="modal" data-bs-target="#editFieldModal">Edit Name</button>
                <button class="btn btn-success" @click="state.op='newmail';state.selectedI=i;" data-bs-toggle="modal" data-bs-target="#editFieldModal">Add Email</button>
                <button class="btn btn-danger" @click="deleteContact(i)">Delete</button>
            </div>
            <div class="card-body">
                <h5 class="card-title mt-2">{{contact.name}}</h5>
                 <ul class="list-group list-group-flush">
                    <li class="list-group-item d-flex justify-content-between align-items-center" v-for="(contactMail, j) in contact.emails" :key="j">
                        {{contactMail}}
                        <div>
                            <button class="btn btn-outline-success btn-sm" @click="state.op='field';state.selectedI=i;state.selectedJ=j;state.newField=state.contacts[i].emails[j];" data-bs-toggle="modal" data-bs-target="#editFieldModal">E</button>
                            <button class="btn btn-outline-danger btn-sm ms-2" @click="deleteEmail(i, j)">X</button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import axios from 'axios';
export default {
    name: 'Contacts',
    setup() {
        const state = reactive({
            contacts: [],
            selectedI: 0,
            selectedJ: 0,
            op: 'field',
            newField: '',
            newContact: {
                name: '',
                mail: ''
            }
        });

        
        axios.get(encodeURI('http://localhost:8086/getContacts'), {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            withCredentials: true
        }).then(response => {
            state.contacts = response.data;
        });
        

        function sendUpdatedContacts() {
            axios.put(encodeURI('http://localhost:8086/updateContacts'), state.contacts,{
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                withCredentials: true
            }).then(response => {
                console.log(response.data);
            });

        }

       function edit() {
            if(state.newField == '')
                return;
            if(state.op == 'name')
                state.contacts[state.selectedI].name=state.newField;
            else if(state.op == 'field')
                state.contacts[state.selectedI].emails[state.selectedJ]=state.newField;
            else
                state.contacts[state.selectedI].emails.push(state.newField);
            state.newField = '';
            sendUpdatedContacts();
       }

       function addContact() {
            if(!state.newContact.name.length || !state.newContact.mail.length)
                return;
            state.contacts.push({
                name: state.newContact.name,
                emails: [state.newContact.mail]
            });
            sendUpdatedContacts();
       }

        function deleteContact(i) {
            state.contacts.splice(i, 1);
            sendUpdatedContacts();
        }

        function deleteEmail(i, j) {
            state.contacts[i].emails.splice(j, 1);
            sendUpdatedContacts();
        }

        return {
            state,
            edit,
            addContact,
            deleteContact,
            deleteEmail
        }
    }
}
</script>