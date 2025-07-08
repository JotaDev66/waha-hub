<script setup>
// No props needed as this is a simple display component
</script>

<template>
  <span class="chatwoot-label">
    <img src="../../assets/chatwoot-icon.svg" alt="ChatWoot Icon" class="chatwoot-icon" />
    <span>ChatWoot</span>
  </span>
</template>

<style scoped>
.chatwoot-label {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.chatwoot-icon {
  width: 16px;
  height: 16px;
}
</style>