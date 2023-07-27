<script setup>
defineProps({
  skill: {
    name: String,
    description: String
  }
});
</script>

<template>
  <div class="card">
    <h4>
      {{ skill.name }}
    </h4>
    <p>
      {{ skill.description }}
    </p>
  </div>
</template>

<style lang="scss" scoped></style>
