<script setup>
import OverlayPanel from "primevue/overlaypanel";
import { ref } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  }
});

const overlayPanel = ref(null);
const currentItem = ref(null);

const toggle = (event, item) => {
  overlayPanel.value.toggle(event);
  currentItem.value = item;
};

defineExpose({
  toggle,
  currentItem
});
</script>

<template>
  <OverlayPanel ref="overlayPanel" appendTo="body" :showCloseIcon="true">
    <div style="min-width:15rem;">
      <div v-if="currentItem" class="flex flex-column">
        <slot></slot>
      </div>
    </div>
  </OverlayPanel>
</template>
