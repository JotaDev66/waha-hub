<script setup>
// Display label for the Calls app with a phone emoji
</script>

<template>
  <span class="calls-label">
    <span class="emoji">📞</span>
    <span>Calls</span>
  </span>
</template>

<style scoped>
.calls-label {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.emoji {
  font-size: 1rem;
  line-height: 1;
}
</style>
