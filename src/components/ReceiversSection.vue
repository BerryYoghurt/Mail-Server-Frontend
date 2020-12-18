<template>
  <div class="card-header">Receivers</div>
  <div class = "card-body">
    <ul class = "list-group">
      <li class = "list-item">
        receiver1
      </li>
    </ul>
  </div>
  <div class = "card-footer">
    <button class = "btn btn-primary" hidden>Add Receiver</button>
  </div>
</template>

<script>
export default {
  name: "ReceiversSection",
  props:{
    editable:Boolean,
    receivers:Array
  }
}
</script>

<style scoped>

</style>