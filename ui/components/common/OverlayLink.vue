<script setup>
defineProps({
  href: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});
</script>

<template>
  <a :href="href" target="_blank" class="overlay-link w-full flex align-items-center">
    <i :class="`pi ${icon} mr-2`"></i>
    <span>{{ name }}</span>
  </a>
</template>
<style>
.overlay-link {
  display: flex;
  align-items: center;
  position: relative;
  outline: 0 none;
  color: var(--text-color);
  cursor: pointer;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  transition: background-color 0.2s, box-shadow 0.2s;
}

.overlay-link:hover {
  background-color: var(--surface-hover);
}
</style>
