<template>
  <div class="container-fluid"> <!--only render if mail has been fetched-->
    <!--button bar-->
    <div class = "row-sm border shadow bg-transparent">
      <button class = "btn btn-primary mx-2" @click="save">Save and Exit</button>
      <button class = "btn btn-success mx-2" @click="send">Send</button>
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
          <!--From-->
          <li class = "card">
            <div class = "row mx-0">
              <div class = "col-sm-4 border">From</div>
              <div class = "col-sm-8 border">{{state.mail.from}}</div>
            </div>
          </li>
          <!--Date-->
          <li class = "card">
            <div class = "row mx-0">
              <div class = "col-sm-4 border">Date</div>
              <div class = "col-sm-8 border">{{state.mail.date}}</div>
            </div>
          </li>
          <!--Priority-->
          <li class = "card">
            <div class = "row mx-0">
              <div class = "col-sm-4 border">Priority</div>
              <div class = "col-sm-8 border">
                <div v-for="(p,index) in priorities" :key = "index">
                  <label :for = "p">{{ p }}</label>
                  <input
                      type = "radio"
                      :id = "p"
                      name = "priority"
                      :value = "index+1"
                      v-model = "state.mail.priority"
                  />
                </div>
              </div>
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
                    v-model = "newReceiver"
                    @keyup.enter = "updateReceivers"
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
              v-model="state.mail.text"
          />
        </div>
        <hr>
        <div class = "card">
          <div class = "card-header">
            <strong>Attachment(s)</strong>
          </div>
          <div class = "card-body">
            <ul class = "list-group list-group-horizontal">
              <li class = "card list-group-item" v-for="(att,index) in state.mail.attachments" :key="index">
                {{att.name}}
                <button class = "btn btn-close" @click="state.mail.attachments.splice(index,1)"></button>
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
import mockMails from "@/assets/MockEmails"
import {useRouter} from 'vue-router'


export default {
  name: "ViewMail",
  props: {
    mailID:String
  },
  setup(){
    const state = reactive({
      mail: {},
      mailbox:'',
      newMail: false,
      editable: true
    });

    //the logic should be: if it's a newly composed mail do not fetch, else fetch, details after seeing API
    setTimeout(() => state.mail = mockMails[1],2000); //for testing.. TODO fetch from API
    //TODO decide on JSON field names
    state.mailbox = "draft"; //for testing.. TODO get from router and classify



    const priorities =[ //i don't need to make it reactive, do i?
      "Low",
      "Normal",
      "High",
      "Highest"
    ];
    const router = useRouter();
    let safeLeave = false;



    const newReceiver = ref(' ');
    const newAttachmentPath = ref("");

    const updateReceivers = function(){
      if(newReceiver.value){
        state.mail.receivers.push(newReceiver.value);
        newReceiver.value = "";
      }
    }
    const appendAttachments = function(files){
      state.mail.attachments.push(files[0]);
      newAttachmentPath.value = "";
    }
    const save = function(){
      //TODO send to API
      mockMails[1] = state.mail;
      discard()
    }
    const send = function(){
      //TODO send to API
      discard()
    }
    const discard = function(){
      router.replace({name:'HomePage'});
      safeLeave = true;
    }
    const safeguardOnLeave = function(){
      return safeLeave || confirm("Leave without saving?");
    }

    window.addEventListener('beforeunload',function(e){
      if(!safeguardOnLeave()){
        e.preventDefault();
        e.returnValue = ' ';
      }
    })

    return {
      state,
      priorities,
      newReceiver,
      newAttachmentPath,
      safeguardOnLeave,
      updateReceivers,
      appendAttachments,
      save,
      send,
      discard
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
