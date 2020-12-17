<template>
  <div class = "row mx-0">
    <div class = "col-sm-4 border">From</div>
    <div class = "col-sm-8 border">{{sender}}</div>
  </div>
</template>

<script>
export default {
  name: "FromSection",
  props:{
    sender:String
  }
}
</script>

<style scoped>

</style>