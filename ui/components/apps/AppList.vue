<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';
import { useServerStore } from '../../stores/useServerStore';
import { App } from '../../services/waha/dtos';
import AppEdit from './AppEdit.vue';
import useShowToastOnResult from '../../composables/useShowToastOnResult';
import { generateRandomId } from '../../utils/ids';
import ChatWootLabel from '../common/ChatWootLabel.vue';

const toast = useToast();
const confirm = useConfirm();
const store = useServerStore();
const req = useShowToastOnResult();

const props = defineProps({
  server: Object,
  session: Object,
  isNewSession: {
    type: Boolean,
    default: false
  }
});

const apps = ref<App[]>([]);
const loading = ref(false);
const appDialog = ref(false);
const selectedApp = ref<App | null>(null);
const isNewApp = ref(false);

// Load apps when component is mounted or when server/session changes
onMounted(async () => {
  await loadApps();
});

watch(() => [props.server, props.session], async () => {
  await loadApps();
}, { deep: true });

async function loadApps() {
  if (!props.server || !props.session || !props.session.name) {
    apps.value = [];
    return;
  }

  try {
    loading.value = true;
    apps.value = await req(
      store.getApps(props.server.id, props.session.name),
      undefined,
      "Failed to load apps"
    );
  } catch (error) {
    console.error("Error loading apps:", error);
  } finally {
    loading.value = false;
  }
}

function openNewApp() {
  if (props.isNewSession) {
    toast.add({
      severity: 'info',
      summary: 'Info',
      detail: 'Create session first to add Apps',
      life: 3000
    });
    return;
  }

  selectedApp.value = {
    id: generateAppId(),
    session: props.session.name,
    app: "chatwoot",
    config: {}
  };
  isNewApp.value = true;
  appDialog.value = true;
}

function editApp(app: App) {
  selectedApp.value = { ...app };
  isNewApp.value = false;
  appDialog.value = true;
}

function confirmDeleteApp(app: App, event: Event) {
  const appTypeLabel = getAppTypeLabel(app.app);
  confirm.require({
    target: event.currentTarget,
    message: `Delete ${appTypeLabel} (${app.id})?`,
    icon: 'pi pi-exclamation-triangle',
    rejectClass: 'p-button-secondary p-button-outlined p-button-sm',
    acceptClass: 'p-button-danger p-button-sm',
    rejectLabel: 'No',
    acceptLabel: 'Yes, Delete',
    accept: async () => {
      await deleteApp(app);
    },
    reject: () => {
      // Do nothing on reject
    }
  });
}

async function deleteApp(app: App) {
  try {
    await req(
      store.deleteApp(props.server.id, app.id),
      undefined,
      "Failed to delete app"
    );
    const appTypeLabel = getAppTypeLabel(app.app);
    toast.add({
      severity: 'success',
      summary: 'App Deleted',
      detail: `${appTypeLabel} (${app.id})`,
      life: 3000
    });
    await loadApps();
  } catch (error) {
    console.error("Error deleting app:", error);
  }
}

function generateAppId() {
  return generateRandomId();
}

async function saveApp(app: App) {
  try {
    const appTypeLabel = getAppTypeLabel(app.app);
    if (isNewApp.value) {
      await req(
        store.createApp(props.server.id, app),
        undefined,
        "Failed to create app"
      );
      toast.add({
        severity: 'success',
        summary: 'App Created',
        detail: `${appTypeLabel} (${app.id})`,
        life: 3000
      });
    } else {
      await req(
        store.updateApp(props.server.id, app),
        undefined,
        "Failed to update app"
      );
      toast.add({
        severity: 'success',
        summary: 'App Updated',
        detail: `${appTypeLabel} (${app.id})`,
        life: 3000
      });
    }
    await loadApps();
    // Close the dialog after successful save
    appDialog.value = false;
    return true;
  } catch (error) {
    console.error("Error saving app:", error);
    return false;
  }
}

// This function is used for text-only representation (e.g., in toast messages)
function getAppTypeLabel(appType: string) {
  switch (appType) {
    case 'chatwoot':
      return 'ChatWoot';
    default:
      return appType;
  }
}
</script>

<template>
  <div class="app-list">
    <div class="flex justify-content-between align-items-center w-full mb-2">
      <div>
        <h5 class="mb-0">
          🧩 Apps
          <i
              v-tooltip='"Built-in integrations"'
              class="pi pi-info-circle"
          ></i>
        </h5>
      </div>
      <div>
        <Button 
          label="Add App" 
          icon="pi pi-plus" 
          @click="openNewApp" 
          severity="success"
          text
        />
      </div>
    </div>

    <DataTable 
      :value="apps" 
      :loading="loading" 
      dataKey="id"
      :paginator="apps.length > 10" 
      :rows="10"
      showGridlines
    >
      <template #empty>
        <div class="text-center p-4">
          No apps found. Click "Add App" to create one.
        </div>
      </template>

      <Column field="app" header="App Type">
        <template #body="{ data }">
          <ChatWootLabel v-if="data.app === 'chatwoot'" />
          <template v-else>{{ getAppTypeLabel(data.app) }}</template>
        </template>
      </Column>
      <Column field="id" header="ID"></Column>
      <Column style="width: 10rem; text-align: right;">
        <template #body="{ data }">
          <div class="flex gap-2 justify-content-end">
            <Button 
              icon="pi pi-pencil" 
              @click="editApp(data)" 
              outlined 
              rounded 
              severity="success"
              v-tooltip.top="'Edit App'"
            />
            <Button 
              icon="pi pi-trash" 
              @click="confirmDeleteApp(data, $event)" 
              outlined 
              rounded 
              severity="danger"
              v-tooltip.top="'Delete App'"
            />
          </div>
        </template>
      </Column>
    </DataTable>

    <ConfirmPopup></ConfirmPopup>

    <AppEdit 
      v-if="selectedApp" 
      v-model="selectedApp" 
      :server="server"
      v-model:visible="appDialog"
      :isNewApp="isNewApp"
      :loading="loading"
      @save="saveApp" 
      @cancel="appDialog = false"
    />
  </div>
</template>

<style scoped lang="scss">
.app-list {
  margin-bottom: 1rem;
}
</style>
