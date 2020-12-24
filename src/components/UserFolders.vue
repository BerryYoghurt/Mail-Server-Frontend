<template>
  <div class="card d-flex">
    <div class="card-body d-flex align-items-lg-stretch row">
      <ul class="list-group">
        <li class="list-group-item d-flex" v-for="(folder,index) in folders" :key="index">
          <div class = "mx-0 my-0 px-0 py-0" v-if="index !== currentlyEditing">
            {{folder}}
          </div>
          <div class = "mx-0 my-0 px-0 py-0" v-if="currentlyEditing === index">
            <input v-model="newName" @keyup.enter="renameFolder()">
          </div>
          <div class="mx-0 my-0 px-0 py-0" v-if="!permanentFolders.includes(folder)">
            <button @click="currentlyEditing=index" class="btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
              </svg>
            </button>
            <button class="btn btn-close" @click="deleteFolder(index)" v-if="index!==currentlyEditing"></button>
          </div>
        </li>
      </ul>
    </div>
    <div class="card-footer">
      <button class="btn btn-primary" @click="addFolder()">Add Folder</button>
    </div>
  </div>
</template>

<script>
import {ref, reactive} from 'vue';
import axios from "axios";

export default {
  name: "UserFolders",
  setup(){
    const folders = reactive([]);
    axios.get(encodeURI('http://localhost:8086/getFolders'),{withCredentials:true})
    .then(response=>{
      console.log(response.data);
      for(let index in response.data){
        folders.push(response.data[index]);
      }
    });
    const permanentFolders = ['inbox', 'sent', 'drafts', 'trash'];
    const currentlyEditing = ref(-1);
    const newName = ref('');
    const editing = ref(false);

    const deleteFolder = function (index){
      if(confirm("Are you sure you want to delete this folder?")){
        axios.delete(encodeURI('http://localhost:8086/removeFolder'),
            {data:{folder:folders[index]}
            ,withCredentials:true});
        folders.splice(index,1);
      }
    };
    const addFolder = function (){
      axios.post(encodeURI('http://localhost:8086/addFolder'),
          {folder:'New Folder'},
          {withCredentials:true});
      folders.push('New Folder');
    };
    const renameFolder = function (){
      axios.post(encodeURI('http://localhost:8086/renameFolder'),
          {oldFolder:folders[currentlyEditing.value],
                newFolder: newName.value},
          {withCredentials:true});
      folders[currentlyEditing.value] = newName.value;
      editing.value = false;
      currentlyEditing.value = -1;
    }

    return{
      folders,
      permanentFolders,
      currentlyEditing,
      deleteFolder,
      addFolder,
      renameFolder,
      newName
    }
  }
}
</script>

<style scoped>

</style>