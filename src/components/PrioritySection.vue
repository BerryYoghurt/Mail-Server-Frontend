<template>
  <div class = "row mx-0">
    <div class = "col-sm-4 card-header border">Priority</div>
    <div class = "card-body col-sm-8 border">
      <div v-if = "editable">
        <div v-for="p in priorities" :key = "p.value">
          <label :for = "p.name">{{ p.name }}</label>
          <input
              type = "radio"
              :id = "p.name"
              :value = "p.value"
              <!--v-model="priority"-->
          >
        </div>
      </div>

      <div v-else></div>

      <!--<label for = "Low">Low</label>
      <input type = "radio" id = "Low" value = 1 disabled>
      <label for = "Normal">Normal</label>
      <input type = "radio" id = "Normal" value = 2 disabled>
      <label for = "High">High</label>
      <input type = "radio" id = "High" value = 3 disabled>
      <label for = "Highest">Highest</label>
      <input type = "radio" id = "Highest" value = 4 disabled>-->
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
      priorities:{
        low:{
          name: "Low",
          value: 1
        },
        normal:{
          name: "Normal",
          value: 2
        },
        high:{
          name: "High",
          value: 3
        },
        highest:{
          name: "Highest",
          value: 4
        }
      }
    }
  },
  emits:[
    'update:priority'
  ],
  methods:{

  }
}
</script>

<style scoped>

</style>