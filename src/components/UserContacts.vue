<template>
  <div class="card d-flex flex-column">
    <ul class="list-group">
      <li v-for="(contact,index) in state.contacts" :key="index" class="list-group-item">
        {{contact}} <!--for the time being-->
        <button
            class="btn btn-close"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="delete contact"
            @click="removeContact(index)"
        ></button>
      </li>
    </ul>
    <div class="card-footer">
      <button class="btn btn-secondary">Add Contact</button>
    </div>
  </div>
</template>

<script>
import {reactive, ref} from 'vue';

export default {
  name: "UserContacts",
  props:{
    contacts:Array
  },
  setup(props){
    console.log(props.contacts)
    const state = reactive({
      contacts:props.contacts
    });
    const edited = ref(false);

    const appendContact = function (contact){
      state.contacts.push(contact);
      edited.value = true;
    }
    const removeContact = function(index){
      state.contacts.splice(index,1);
      edited.value = true;
    }

    return{
      state,
      removeContact,
      appendContact,
      edited
    }
  }
}
</script>

<style scoped>

</style>