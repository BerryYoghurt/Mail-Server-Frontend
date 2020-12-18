<template>

  <div class = "d-flex align-items-lg-stretch" v-if="editable">
    <label for="body" hidden>Body</label>
    <textarea
        id="body"
        class = "form-control"
        :value = "modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
  <div class = "d-flex align-items-lg-stretch" v-else>{{ modelValue }}</div>

</template>

<script>
export default {
  name: "TextEntry",
  props:{
    editable:Boolean,
    //text:Object //object containing a single element, value, so that it would be passed by reference
    modelValue:String
  },
  data(){
    return{
    }
  },
  emits:[
      'update:modelValue'
  ]
}
</script>

<style scoped>
  #body{
    height:100%;
    width: 100%;
  }
</style>