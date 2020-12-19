<template>
  <a class="list-group-item list-group-item-action">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">{{ sender }}</h5>
      <small class="text-muted">{{ date }}</small>
    </div>
    <p class="mb-1">
      {{ subject }}
    </p>
    <small class="text-muted">{{ importance }}</small>
  </a>
</template>

<script>
export default {
  name: "EmailInHomepage",

  props: {
    sender: String,
    subject: String,
    date: String,
    importance: Number,
  },
};
</script>
