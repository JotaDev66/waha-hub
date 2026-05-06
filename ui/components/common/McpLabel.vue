<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<template>
  <span class="mcp-label">
    <span class="emoji">🤖</span>
    <span>{{ t('apps.mcp.name') }}</span>
  </span>
</template>

<style scoped>
.mcp-label {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.emoji {
  font-size: 1rem;
  line-height: 1;
}
</style>
