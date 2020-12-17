<template>
  <div v-if="editable">{{text.text}}</div>
  <div v-else>
    <label for="body">Body</label>
    <textarea id="body"></textarea>
  </div>
</template>

<script>
export default {
  name: "TextEntry",
  props:{
    editable:Boolean,
    text:Object //object containing a single element, text, so that it would be passed by reference
  }
}
</script>

<style scoped>

</style>