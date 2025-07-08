<script setup lang="ts">
import {ref, computed} from 'vue';

const props = defineProps({
  app: {
    type: Object,
    required: true
  },
  session: {
    type: String,
    required: true
  }
});

const webhookUrl = computed(() => {
  return `/webhooks/chatwoot/${props.session}/${props.app.id}`;
});

const exampleUrl = computed(() => {
  return `http://waha:3000${webhookUrl.value}`;
});

const templateUrl = computed(() => {
  return `{WAHA_BASE_URL}${webhookUrl.value}`;
});

async function copyWebhookUrl() {
  await navigator.clipboard.writeText(templateUrl.value);
}

async function copyExampleUrl() {
  await navigator.clipboard.writeText(exampleUrl.value);
}
</script>

<template>
  <div class="chatwoot-faq">
    <Accordion :multiple="true" :activeIndex="[1]">
      <AccordionTab header="About WAHA ChatWoot App">
        <div class="mb-3">
          <a href="https://waha.devlike.pro/docs/apps/chatwoot" target="_blank">
            Learn more about WAHA ChatWoot App
          </a>
        </div>
      </AccordionTab>

      <AccordionTab header="ChatWoot Inbox - Webhook URL">
        <div class="mb-4">
          <p class="mb-1">
            Use this <strong>Webhook URL</strong> for your <b>ChatWoot Inbox</b>:
          </p>
          <div class="p-inputgroup mb-1">
            <InputText
                :value=templateUrl
                disabled
                placeholder="Webhook URL"
            />
            <Button
                label="Copy"
                icon="pi pi-copy"
                @click="copyWebhookUrl"
                v-tooltip.focus.bottom="{ value: 'Copied to clipboard' }"
            />
          </div>
          <small class="p-message-secondary">👉 Replace <b>WAHA_BASE_URL</b> with <b>Your WAHA URL</b></small>
        </div>

        <div class="mt-4">
          <p>Example (if you're using <b>docker-compose</b> default setup):</p>
          <div class="p-inputgroup">
            <InputText
                :value="exampleUrl"
                disabled
                placeholder="Example URL"
            />
            <Button
                label="Copy"
                icon="pi pi-copy"
                @click="copyExampleUrl"
                v-tooltip.focus.bottom="{ value: 'Copied to clipboard' }"
            />
          </div>
        </div>
      </AccordionTab>
    </Accordion>
  </div>
</template>

<style scoped lang="scss">
.chatwoot-faq {
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
