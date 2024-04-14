<script setup>
const props = defineProps(['refreshing'])
const icon = computed(() => props.refreshing ? 'pi pi-refresh pi-spin refresh-icon' : 'pi pi-refresh')
</script>

<template>
  <i v-if="refreshing" :class="icon"/>
</template>

<style scoped lang="scss">
.refresh-icon {
  color: color-mix(in srgb, var(--primary-color), transparent 50%);
}

</style>
