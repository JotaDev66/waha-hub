<script setup>
import {computed} from "vue";
import {useI18n} from "vue-i18n";

const props = defineProps({
  deviceName: String,
  browserName: String,
})

const {t} = useI18n();
const runtimeConfig = useRuntimeConfig();
const baseUrl = runtimeConfig.app?.baseURL || "/";

const knownBrowsers = {
  Chrome: `${baseUrl}icons/browsers/chrome.svg`,
  Firefox: `${baseUrl}icons/browsers/firefox.svg`,
  IE: `${baseUrl}icons/browsers/ie.svg`,
  Opera: `${baseUrl}icons/browsers/opera.svg`,
  Safari: `${baseUrl}icons/browsers/safari.svg`,
}

const isKnownBrowser = computed(() => {
  return props.browserName && Object.prototype.hasOwnProperty.call(knownBrowsers, props.browserName)
})

const isUnknownBrowser = computed(() => {
  return !props.browserName || !isKnownBrowser
})

const fallbackDeviceName = computed(() => props.deviceName || t('sessions.linkedDeviceGenericDevice'))

const displayText = computed(() => {
  if (isUnknownBrowser.value) {
    return fallbackDeviceName.value
  }
  if (isKnownBrowser.value) {
    return `${props.browserName} (${fallbackDeviceName.value})`
  }
  return `${props.browserName} (${fallbackDeviceName.value})`
})

const isMuted = computed(() => !isKnownBrowser.value)

const iconSrc = computed(() => {
  if (!isKnownBrowser.value) {
    return null
  }
  return knownBrowsers[props.browserName]
})
</script>

<template>
  <div class="linked-device-card" :class="{muted: isMuted}">
    <div class="linked-device-icon">
      <img v-if="iconSrc" :src="iconSrc" :alt="props.browserName"/>
      <div v-else class="linked-device-placeholder"></div>
    </div>
    <div class="linked-device-text">
      <div class="linked-device-title">{{ displayText }}</div>
      <div class="linked-device-status">{{ t('sessions.linkedDeviceActive') }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.linked-device-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px;
  border: 1px solid var(--surface-200);
  border-radius: 6px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06);
  color: #1f2937;
}

.linked-device-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.linked-device-icon img {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.linked-device-placeholder {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--surface-300);
}

.linked-device-text {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.linked-device-title {
  font-weight: 600;
  color: var(--text-color);
}

.linked-device-status {
  color: var(--text-color-secondary);
  font-size: 0.9rem;
}

.muted {
  color: var(--text-color-secondary);
}

.muted .linked-device-placeholder {
  background: var(--surface-400);
}

.muted img {
  filter: grayscale(100%);
  opacity: 0.7;
}
</style>
