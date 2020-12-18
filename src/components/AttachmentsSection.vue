<template>
  <div class = "card">
    <div class = "card-header">
      <strong>Attachment(s)</strong>
    </div>
    <div class = "card-body">
      <ul class = "list-group list-group-horizontal">
        <li class = "card list-group-item" v-for="(att,index) in attachments" :key="index">
          {{att.name}}
        </li>
      </ul>
    </div>
    <div class="card-footer" v-if="editable">
      <label for="add"></label>
      <input class="btn btn-outline-primary"
             id = "add"
             type = "file"
             value=""
             @click = "appendAttachments"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "AttachmentsSection",
  props:{
    editable:Boolean,
    attachments:Array //should have a name and a Blob(file) attribute.. I think
  },
  data(){
    return{
      newAttachment:{
        name:'',
        value: Blob
      }
    }
  },
  methods :{
    appendAttachments(){
      //this.attachments.push(event.target.value);
      //TODO see how the attachment should be appended...
    }
  }
}
</script>

<style scoped>
  #add{

  }
</style>