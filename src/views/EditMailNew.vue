<template>
  <div class="container-fluid" v-if="state.mail">
    <!--button bar-->
    <div class = "row-sm border shadow bg-transparent">
      <button class = "btn btn-primary mx-2" @click="send(false)">Save and Exit</button>
      <button class = "btn btn-success mx-2" @click="send(true)">Send</button>
      <button class = "btn btn-danger mx-2"  @click="discard">Discard</button>
    </div>
    <div class = "row border mt-2">
      <!--metadata-->
      <div class = "col-sm-3 border shadow px-0 mx-0">
        <ul class = "list-group">
          <!--Subject-->
          <li class = "card">
            <div class = "row mx-0">
              <label for =  "Subject" class = "col-sm-4 border">Subject</label>
              <input
                  id = "Subject"
                  class = "col-sm-8 border"
                  type = "text"
                  v-model = "state.mail.subject"
              >
            </div>
          </li>
          <!--priority-->
          <li class = "card">
            <div class="dropdown text-center">
            <button v-bind:class="{'btn-secondary show': state.mail.priority==0, 'btn-success show': state.mail.priority==1, 'btn-warning show': state.mail.priority==2, 'btn-danger show': state.mail.priority==3}" class="btn dropdown-toggle w-100" id="priority-button" data-bs-toggle="dropdown" role="button">{{priorities[state.mail.priority]}}</button>
            <ul class="dropdown-menu" aria-labelledby="priority-button">
              <li><a class="dropdown-item" @click="state.mail.priority=0">Low</a></li>
              <li><a class="dropdown-item" @click="state.mail.priority=1">Normal</a></li>
              <li><a class="dropdown-item" @click="state.mail.priority=2">Important</a></li>
              <li><a class="dropdown-item" @click="state.mail.priority=3">Critical</a></li>
            </ul>
          </div>
          </li>
          <!--Receivers-->
          <li class = "card">
            <div class="card-header row mx-0">Receivers</div>
            <div class = "card-body">
              <ul class = "list-group">
                <li class = "list-group-item" v-for="(receiver,index) in state.mail.receivers" :key="index">
                  {{receiver}}
                  <button class = "btn btn-close" @click="state.mail.receivers.splice(index,1)"></button>
                </li>
              </ul>
            </div>
            <div class = "card-footer ">
              <div class = "col-sm-4">
                <label for = "receiver">Add Receiver</label>
              </div>
              <div class = "col-sm-8">
                <input
                    id = "receiver"
                    type="email"
                    class="form-control"
                    v-model = "state.newReceiver"
                    @keyup.enter = "updateReceivers()"
                    placeholder="Press Enter to submit.."
                >
              </div>
            </div>
          </li>
        </ul>

      </div>
      <!--email-->
      <div class = "col-sm-9 border d-flex align-items-stretch flex-column">
        <div class = "d-flex align-self-stretch h-100">
          <label for="body" hidden>Body</label>
          <textarea
              id="body"
              class = "form-control h-100"
              v-model="state.mail.bodyText"
          />
        </div>
        <hr>
        <div class = "card">
          <div class = "card-header">
            <strong>Saved Attachment(s)</strong>
          </div>
          <div class = "card-body">
            <ul class = "list-group list-group-horizontal">
              <li class = "card list-group-item" v-for="(att,index) in state.mail.attachments" :key="index">
                {{att}}
                <button class = "btn btn-close" @click="state.mail.attachments.splice(index,1)"></button>
              </li>
            </ul>
          </div>
        </div>


        <div class = "card">
          <div class = "card-header">
            <strong>New Attachment(s)</strong>
          </div>
          <div class = "card-body">
            <ul class = "list-group list-group-horizontal">
              <li class = "card list-group-item" v-for="(att,index) in state.attachments" :key="index">
                {{att.name}}
                <button class = "btn btn-close" @click="state.attachments.splice(index,1)"></button>
              </li>
            </ul>
          </div>
          <label for="add"></label>
          <input class="btn btn-outline-primary"
                 id = "add"
                 type = "file"
                 :value = newAttachmentPath
                 @input = "appendAttachments($event.target.files)"
          >

        </div>


      </div>
    </div>
  </div>

</template>

<script>
import {reactive, ref} from 'vue';
import router from '../router';
import axios from 'axios';
import store from '../store';

export default {
  name: "ViewMail",
  props: {
    emailId:String
  },
  setup(props){
    const state = reactive({
      mail: {
        id: null,
        sender: store.state.user,
        subject: '',
        priority: 0,
        bodyText: '',
        receivers: []
      },
      attachments: [],
      newReceiver: ''
    });
    if(props.emailId){
      axios.get(encodeURI(`http://localhost:8086/getMail?emailId=${props.emailId}&folderName=drafts`),{
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        withCredentials: true
      }).then(response => {
        state.mail = response.data;
      })
    }
    console.log(state.attachments);

    let safeLeave = false;

    const newAttachmentPath = ref("");

    const updateReceivers = function(){
      if(state.newReceiver && !state.mail.receivers.includes(state.newReceiver)){
        state.mail.receivers.push(state.newReceiver);
        state.newReceiver = "";
      }
    }
    const appendAttachments = function(files){
      state.attachments.push(files[0]);
      console.log(state.attachments);
      newAttachmentPath.value = "";
    }
    const send = async function(isCompose){
      const fd = new FormData();
      state.attachments.forEach(file => {
        fd.append('files', file);
      })
      fd.append('mail', JSON.stringify(state.mail));
      fd.append('compose', isCompose);
      console.log('sent mail');
      await axios.post('http://localhost:8086/compose', fd, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json'
        },
        withCredentials: true
      });
      discard();
    }
    const discard = function(){
      router.replace({name:'HomePage'});
      safeLeave = true;
    }
    const safeguardOnLeave = function(){
      if(!safeLeave){
        if(confirm("Leave without saving?")){
          safeLeave = true;
          return true;
        }else{
          return false;
        }
      }else{
        return true;
      }
      //return safeLeave || confirm("Leave without saving?");
    }

    window.addEventListener('beforeunload',function(e){
      if(!safeguardOnLeave()){
        e.preventDefault();
        e.returnValue = ' ';
      }
    })

    const priorities = ['Low', 'Normal', 'Important', 'Critical'];

    return {
      state,
      newAttachmentPath,
      safeguardOnLeave,
      updateReceivers,
      appendAttachments,
      send,
      discard,
      priorities
    };
  },
  beforeRouteLeave(to,from,next){
    if(this.safeguardOnLeave()){
      next();
    }else{
      next(false);
    }
  },
}

</script>
