<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import lodash from 'lodash';
import { CallsAppConfig } from '../../services/waha/dtos';

const { t } = useI18n();

const props = defineProps({
  modelValue: {
    type: Object as () => CallsAppConfig,
    required: true,
  },
  submitted: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue']);

const defaultMessage = computed(() => t('apps.calls.message.default'));

const getDefaults = (): CallsAppConfig => ({
  dm: {
    reject: true,
    message: defaultMessage.value,
  },
  group: {
    reject: true,
    message: defaultMessage.value,
  },
});

const config = reactive<CallsAppConfig>(
  lodash.defaultsDeep({}, lodash.cloneDeep(props.modelValue ?? {}), getDefaults()),
);

watch(
  config,
  (val) => {
    const out = lodash.cloneDeep(val);
    if (out.dm.message === undefined || out.dm.message === null) out.dm.message = '';
    if (out.group.message === undefined || out.group.message === null) out.group.message = '';
    emit('update:modelValue', out);
  },
  { deep: true, immediate: true },
);

watch(
  () => defaultMessage.value,
  (val, oldVal) => {
    if (config.dm.message === oldVal) config.dm.message = val;
    if (config.group.message === oldVal) config.group.message = val;
  },
);
</script>

<template>
  <div class="calls-config">
    <h4 class="text-center">{{ t('apps.calls.dm.title') }}</h4>
    <div class="field">
      <ToggleButton
        v-model="config.dm.reject"
        onIcon="pi pi-ban"
        offIcon="pi pi-phone"
        :onLabel="t('apps.calls.reject.on')"
        :offLabel="t('apps.calls.reject.off')"
      />
    </div>

    <div class="field">
      <label class="block mb-2" for="dm-message">
        {{ t('apps.calls.message.label') }}
      </label>
      <Textarea
        id="dm-message"
        v-model="config.dm.message"
        :autoResize="true"
        :rows="2"
        :placeholder="t('apps.calls.message.placeholder')"
      />
      <small class="p-message-secondary">
        {{ t('apps.calls.message.help') }}
      </small>
    </div>

    <hr />

    <h4 class="text-center">{{ t('apps.calls.group.title') }}</h4>
    <div class="field">
      <ToggleButton
        v-model="config.group.reject"
        onIcon="pi pi-ban"
        offIcon="pi pi-phone"
        :onLabel="t('apps.calls.reject.on')"
        :offLabel="t('apps.calls.reject.off')"
      />
    </div>

    <div class="field">
      <label class="block mb-2" for="group-message">
        {{ t('apps.calls.message.label') }}
      </label>
      <InlineMessage severity="warn" class="mb-2">
        {{ t('apps.calls.group.note') }}
      </InlineMessage>
      <Textarea
        id="group-message"
        v-model="config.group.message"
        :autoResize="true"
        :rows="2"
        :placeholder="t('apps.calls.message.placeholder')"
      />
      <small class="p-message-secondary">
        {{ t('apps.calls.message.help') }}
      </small>
    </div>
  </div>
</template>

<style scoped lang="scss">
.calls-config {
  width: 100%;

  label {
    font-weight: bold;
  }
}
</style>
