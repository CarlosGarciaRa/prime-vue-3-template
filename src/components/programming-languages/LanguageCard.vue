<script setup>
defineProps({
  language: {
    name: String,
    description: String
  }
});
</script>

<template>
  <div class="card">
    <h4>
      {{ language.name }}
    </h4>
    <p>
      {{ language.description }}
    </p>
  </div>
</template>

<style lang="scss" scoped></style>
