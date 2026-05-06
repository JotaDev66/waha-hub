<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const toast = useToast();

const props = defineProps({
  app: {
    type: Object,
    required: true,
  },
  server: {
    type: Object,
    required: true,
  },
});

const key = computed(() => props.app?.config?.key as string | undefined);
const isKeyRevealed = ref(false);

const mcpUrl = computed(() => {
  const base = (props.server?.connection?.url as string | undefined)?.replace(/\/$/, '') ?? 'http://localhost:3000';
  return `${base}/mcp`;
});

function maskKey(k: string) {
  if (!k) return '';
  const prefix = k.startsWith('key_') ? 'key_' : '';
  const body = prefix ? k.slice(prefix.length) : k;
  return `${prefix}${body.slice(0, 3)}****${body.slice(-3)}`;
}

async function copyUrl() {
  await navigator.clipboard.writeText(mcpUrl.value);
  toast.add({ severity: 'success', summary: t('apps.mcp.copiedToClipboard'), life: 2000 });
}

async function copyKey() {
  if (!key.value) return;
  await navigator.clipboard.writeText(key.value);
  toast.add({ severity: 'success', summary: t('apps.mcp.copiedToClipboard'), life: 2000 });
}
</script>

<template>
  <div class="mcp-faq">
    <Accordion :multiple="true" :activeIndex="key ? [0, 1] : [0]">
      <AccordionTab :header="t('apps.mcp.aboutApp')">
        <p class="mb-3">
          <b>{{ t('apps.mcp.description') }}</b>
        </p>
        <a href="https://waha.devlike.pro/docs/apps/mcp" target="_blank" rel="noopener noreferrer">
          {{ t('apps.mcp.learnMore') }}
        </a>
      </AccordionTab>

      <AccordionTab v-if="key" :header="t('apps.mcp.connectTitle')">
        <p class="mb-2">{{ t('apps.mcp.connectHelp') }}</p>
        <p class="mb-3">
          {{ t('apps.mcp.connectDocsPrefix') }}
          <a href="https://waha.devlike.pro/docs/apps/mcp" target="_blank" rel="noopener noreferrer">{{ t('apps.mcp.connectDocsLink') }}</a>.
        </p>

        <div class="field">
          <label class="block mb-1"><b>{{ t('apps.mcp.urlLabel') }}</b></label>
          <div class="p-inputgroup">
            <InputText :value="mcpUrl" disabled />
            <Button
              :label="t('apps.mcp.copy')"
              icon="pi pi-copy"
              @click="copyUrl"
              v-tooltip.focus.bottom="{ value: t('apps.mcp.copiedToClipboard') }"
            />
          </div>
        </div>

        <div class="field">
          <label class="block mb-1"><b>{{ t('apps.mcp.keyLabel') }}</b></label>
          <small class="block mb-2 p-message-secondary">{{ t('apps.mcp.keyHeader') }}</small>
          <div class="p-inputgroup">
            <InputText :value="isKeyRevealed ? key : maskKey(key)" disabled class="font-mono" />
            <Button
              :label="isKeyRevealed ? t('apps.mcp.hideKey') : t('apps.mcp.showKey')"
              :icon="isKeyRevealed ? 'pi pi-eye-slash' : 'pi pi-eye'"
              @click="isKeyRevealed = !isKeyRevealed"
            />
            <Button
              :label="t('apps.mcp.copy')"
              icon="pi pi-copy"
              @click="copyKey"
              v-tooltip.focus.bottom="{ value: t('apps.mcp.copiedToClipboard') }"
            />
          </div>
          <small class="p-message-secondary">{{ t('apps.mcp.keyHelp') }}</small>
        </div>
      </AccordionTab>
    </Accordion>
  </div>
</template>

<style scoped lang="scss">
.mcp-faq {
  margin-bottom: 1.5rem;

  a {
    color: var(--primary-color);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
