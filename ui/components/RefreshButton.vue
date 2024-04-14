<script setup>
const props = defineProps(['refreshing'])
const icon = computed(() => props.refreshing ? 'pi pi-refresh pi-spin' : 'pi pi-refresh')
</script>

<template>
  <Button v-if="refreshing" :icon="icon" rounded text="" :disabled="refreshing"/>
</template>

<style scoped lang="scss">

</style>
