<script setup>
import {onBeforeMount} from "vue";
import {useServerStore} from "../stores/useServerStore";

const store = useServerStore()
onBeforeMount(() => {
  store.refresh()
});
</script>

<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <SessionTable></SessionTable>
      </div>
    </div>
  </div>
</template>
