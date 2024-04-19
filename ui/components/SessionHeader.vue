<script setup>
defineProps(["session"])

</script>

<template>
  <div class="p-dialog-title flex gap-2 align-items-center">
        <span>
          {{ session?.name }}
        </span>
    <SessionStatusTag
        :status="session.status"
    ></SessionStatusTag>
    <div>
      <span>(</span>
      <ServerConnectionIcon :connected="session.server.connected"></ServerConnectionIcon>
      <span class="ml-1">{{ session.server.name }} </span>
      <span>)</span>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
