<template>
  <div class="container-fluid">
    <!--button bar-->
    <div class = "row-sm border shadow">
      <button class = "btn btn-primary">Back</button>
      <!--context specific buttons-->
      <button class = "btn btn-primary">Delete</button>
    </div>
    <div class = "row border">
      <!--metadata-->
      <div class = "col-sm-3 border px-0 mx-0">
        <ul class = "list-group">
          <!--Subject-->
          <li class = "card">
            <SubjectSection></SubjectSection>
          </li>
          <!--From-->
          <li class = "card">
            <FromSection></FromSection>
          </li>
          <!--Date-->
          <li class = "card">
            <div class = "row mx-0">
              <label for = "date" class = "col-sm-4 border">Date</label>
              <!--always disabled-->
              <input id = "date" class = "col-sm-8 border" type = "text" value = "17:00 17/20/2020" disabled>
            </div>
          </li>
          <!--Priority-->
          <li class = "card">
            <PrioritySection></PrioritySection>
          </li>
          <!--Receivers-->
          <li class = "card">
            <ReceiversSection></ReceiversSection>
          </li>
        </ul>

      </div>
      <!--email-->
      <div class = "col-sm-9 border">
        <TextEntry></TextEntry>
        <hr>
        <AttachmentsSection></AttachmentsSection>
      </div>
    </div>

  </div>
</template>

<script>
import FromSection from '../components/FromSection';
import SubjectSection from "@/components/SubjectSection";
import PrioritySection from "@/components/PrioritySection";
import ReceiversSection from "@/components/ReceiversSection";
import TextEntry from "@/components/TextEntry";
import AttachmentsSection from "@/components/AttachmentsSection";
export default {
  name: "ViewMail",
  components: {AttachmentsSection, TextEntry, ReceiversSection, PrioritySection, SubjectSection, FromSection},
  props:{
    mailbox:String,
    mailID:String,
    newMail:Boolean
  },
  data(){
    return {
      mail: {
        from : "me",
        to: "myself",
        date: "17:00 17/12/2020",
        priority: 2,
        text: "Hey there",
        attachments: []
      }
    }
  },
  mounted() {
    <!--TODO fetch email-->

    switch(this.mailbox){
      case "inbox":
        break;
      case "sent":
        break;
      case "trash":
        break;
      case "draft":
        break;
      default:
    }
  }
}
</script>

<!-- no need for <style> because bootstrap takes care of it.. probably-->