<script setup>
import EnterCodeGuide from "./EnterCodeGuide.vue";

const props = defineProps(['session'])
const phone = ref('')
const loading = ref(false)
const code = ref('0000-0000')

const codeParts = computed(() => {
  return code.value.split('-')
})

function showCode() {
  alert(phone.value)
}

</script>

<template>
  <div class="flex flex-column gap-2 mt-4">
    <div class="flex justify-content-between gap-2">
      <div class="field">
        <InputText
            id="phone"
            v-model.trim="phone"
            required="true"
            autofocus
            placeholder="1213213213 (no +, no dashes -)"
        />
      </div>
      <div>
        <Button
            label="Show Code"
            icon="pi pi-send"
            @click="showCode"
            :loading="loading"
        />
      </div>
    </div>
  </div>
  <Divider></Divider>

  <div>
    <EnterCodeGuide></EnterCodeGuide>
  </div>

  <div class="card flex justify-content-center align-items-center">

    <div>
      <template
          v-for="symbol of code"
          v-if="code"
      >
        <span
            class="mx-1"
            style="font-size:2rem">
          {{ symbol }}
        </span>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
