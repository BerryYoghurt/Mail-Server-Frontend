<template>

  <div v-if="editable" class = "row mx-0">
    <label for =  "Subject" class = "col-sm-4 border">Subject</label>
    <input
        id = "Subject"
        class = "col-sm-8 border"
        type = "text"
        :value = "modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    >
  </div>
  <div v-else class="row mx-0">
    <div class = "col-sm-4 border">Subject</div>
    <div class = "col-sm-8 border">{{modelValue}}</div>
  </div>
</template>

<script>
export default {
  name: "SubjectSection",
  props:{
    editable: Boolean,
    modelValue: String
  },
  data(){
    return {
    }
  },
  emits:[
      'update:modelValue'
  ]
}
</script>

<style scoped>

</style>