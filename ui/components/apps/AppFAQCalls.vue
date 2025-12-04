<script setup lang="ts">
import {useI18n} from 'vue-i18n';

const {t} = useI18n();
</script>

<template>
  <div class="calls-faq">
    <Accordion :multiple="true" :activeIndex="[0]">
      <AccordionTab :header="t('apps.calls.aboutApp')">
        <p class="mb-3">
          <b>
            {{ t('apps.calls.description') }}
          </b>
        </p>
        <a href="https://waha.devlike.pro/docs/apps/calls" target="_blank" rel="noopener noreferrer">
          {{ t('apps.calls.learnMore') }}
        </a>
      </AccordionTab>
    </Accordion>
  </div>
</template>

<style scoped lang="scss">
.calls-faq {
  margin-bottom: 1.5rem;

  a {
    color: var(--primary-color);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
