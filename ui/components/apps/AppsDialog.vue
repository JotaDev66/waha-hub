<script setup>
import AppList from './AppList.vue';
import SessionHeader from '../sessions/SessionHeader.vue';
import InlineMessage from 'primevue/inlinemessage';
import { computed } from 'vue';

const visible = defineModel("visible");
const session = defineModel("session");
const server = defineModel("server");

const isStopped = computed(() => {
  return session.value.status === "STOPPED"
});

function hide() {
  visible.value = false;
}
</script>

<template>
  <Dialog
    v-model:visible="visible"
    :modal="true"
    class="p-fluid"
    maximizable
    style="min-width: 50%;"
  >
    <template #header>
      <SessionHeader
        :session="session"
      ></SessionHeader>
    </template>

    <AppList :server="server" :session="session" :isNewSession="false"></AppList>

    <template #footer>
      <div class="w-full flex flex-column gap-2">
        <div v-if="!isStopped">
          <InlineMessage severity="warn">
            The session is in '<b>{{ session.status }}</b>' status,
            in order to change apps or their configuration, the session will be restarted.
          </InlineMessage>
        </div>
        <div class="flex justify-content-end">
          <Button
            label="Close"
            icon="pi pi-times"
            text=""
            @click="hide"
            severity="secondary"
          />
        </div>
      </div>
    </template>
  </Dialog>
</template>

<style scoped lang="scss">
</style>
