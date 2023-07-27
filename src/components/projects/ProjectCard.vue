<script setup>
defineProps({
  project: {
    title: String,
    description: String,
    link: String
  }
});
</script>

<template>
  <div class="card">
    <h4>
      {{ project.title }}
    </h4>
    <p>
      {{ project.lastName }}
    </p>
  </div>
</template>

<style lang="scss" scoped></style>
