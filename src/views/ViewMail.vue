<template>
  <div class="container-fluid vh-100 vw-100" v-if="state.mail"> <!--only render if mail has been fetched-->
    <!--button bar-->
    <div class = "row-sm border shadow">
      <button class = "btn btn-primary">Back</button>
      <!--context specific buttons-->
      <button class = "btn btn-primary">Delete</button>
    </div>
    <div class = "row border mt-2">
      <!--metadata-->
      <div class = "col-sm-3 border shadow px-0 mx-0">
        <ul class = "list-group">
          <!--Subject-->
          <li class = "card">
            <SubjectSection :editable="state.editable" v-model="state.mail.subject"></SubjectSection>
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
            <PrioritySection
                :editable="state.editable"
                :priority="state.mail.priority"
                @update:priority="state.mail.priority=$event"
            />
          </li>
          <!--Receivers-->
          <li class = "card">
            <ReceiversSection :editable="state.editable" :receivers="state.mail.receivers"></ReceiversSection>
          </li>
        </ul>

      </div>
      <!--email-->
      <div class = "col-sm-9 border">
        <TextEntry :editable="state.editable" v-model="state.mail.text"></TextEntry>
        <hr>
        <AttachmentsSection :editable="state.editable" :attachments="state.mail.attachments"></AttachmentsSection>
      </div>
    </div>
    {{state.mail}}
  </div>

</template>

<script>
import SubjectSection from "@/components/SubjectSection";
import PrioritySection from "@/components/PrioritySection";
import ReceiversSection from "@/components/ReceiversSection";
import TextEntry from "@/components/TextEntry";
import AttachmentsSection from "@/components/AttachmentsSection";
import {reactive, onMounted} from 'vue';
import mockMails from "@/assets/MockEmails"

export default {
  name: "ViewMail",
  components: {AttachmentsSection, TextEntry, ReceiversSection, PrioritySection, SubjectSection},
  setup(){
    const state = reactive({
      mail: {},
      mailbox:'',
      newMail: false,
      editable: true
    });
    onMounted(() => {
      setTimeout(() => state.mail = mockMails[0],2000); //for testing.. TODO fetch from API
      state.mailbox = "inbox"; //for testing.. TODO get from router and classify
    });

    return {
      state,

    };
  }
}
</script>
