<script setup>
const props = defineProps(['server'])
const store = useServerStore()

</script>

<template>
  <code>
    {{ server.version.engine }}
  </code>
  <code> (</code>
  <code :class="{'text-orange-400': server.version.version !==store.latestVersion}">
    {{ server.version.version }}
  </code>
  <code>)</code>
</template>

<style scoped lang="scss">

</style>
