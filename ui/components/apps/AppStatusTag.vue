<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
  enabled: {
    type: Boolean,
    required: false,
    default: true,
  },
});

const severity = computed(() => (props.enabled ? 'success' : 'secondary'));
const label = computed(() => (props.enabled ? t('apps.enabled.on').toUpperCase() : t('apps.enabled.off').toUpperCase()));
</script>

<template>
  <Tag :value="label" :severity="severity" />
  
</template>

<style scoped lang="scss">
</style>

