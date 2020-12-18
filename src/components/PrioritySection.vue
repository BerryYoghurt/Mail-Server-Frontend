<template>
  <div class = "row mx-0">
    <div class = "col-sm-4 card-header border">Priority</div>
    <div class = "card-body col-sm-8 border">
      <div v-if = "editable">
        <div v-for="(p,index) in priorities" :key = "index">
          <label :for = "p">{{ p }}</label>
          <input
              type = "radio"
              :id = "p"
              :value = "index+1"
              :checked="priority === index+1"
              v-on:click="$emit('update:priority',+$event.target.value)"
          />
        </div>
      </div>
      <div v-else>{{priorities[priority-1]}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PrioritySection",
  props:{
    editable:Boolean,
    priority:Number
  },
  data() {
    return {
      priorities:[
        "Low",
        "Normal",
        "High",
        "Highest"
      ]
    }
  },
  emits:[
    'update:priority'
  ],
  methods:{
    /*clicked(event){
      console.log(event);
      console.log(this.currentPriority);
    }*/
  },
  /*mounted() {
    this.currentPriority = this.priority;
  }*/
}
</script>

<style scoped>

</style>