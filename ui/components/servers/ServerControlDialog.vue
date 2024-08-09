<script setup>


const visible = defineModel("visible");
const props = defineProps(['server'])
</script>

<template>
  <Dialog
      v-model:visible="visible"
      :modal="true"
      class="p-fluid"
      style="max-width: 100%"
  >
    <template #header v-if="!modeNew">
      <div>
        <ServerConnectionIcon :connected="server.connected"></ServerConnectionIcon>
        <span class="ml-1">{{ server.name }}</span>
        <a :href="server.connection?.url" target="_blank" class="ml-2">
          {{ server.connection?.url }}
          <i class="pi pi-external-link"></i>
        </a>
      </div>
    </template>

    <ServerVariablesTable :server="props.server"></ServerVariablesTable>
  </Dialog>

</template>

<style scoped lang="scss">

</style>
