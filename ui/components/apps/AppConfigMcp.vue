<script setup lang="ts">
import { reactive, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import type { McpAppConfig, SessionActions } from '../../services/waha/dtos';
import ApiKeyPermissions from '../apikeys/ApiKeyPermissions.vue';
import lodash from 'lodash';

const { t } = useI18n();

const props = defineProps({
  modelValue: {
    type: Object as () => McpAppConfig,
    required: true,
  },
  submitted: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue']);

const defaultActions: Required<SessionActions> = {
  read: true,
  send: false,
  control: true,
  setting: false,
  app: false,
  delete: false,
};

const config = reactive<McpAppConfig>(
  lodash.defaultsDeep({}, lodash.cloneDeep(props.modelValue ?? {}), { actions: defaultActions }),
);

watch(
  config,
  (val) => emit('update:modelValue', lodash.cloneDeep(val)),
  { deep: true, immediate: true },
);

function updateActions(val: SessionActions) {
  config.actions = val;
}
</script>

<template>
  <div class="mcp-config">
    <div class="field">
      <label class="block mb-1"><b>{{ t('apps.mcp.actionsLabel') }}</b></label>
      <small class="block mb-2 p-message-secondary">{{ t('apps.mcp.actionsHelp') }}</small>
      <ApiKeyPermissions :modelValue="config.actions ?? undefined" @update:modelValue="updateActions" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.mcp-config {
  width: 100%;
}
</style>
