<template>
  <div class="fixed z-10 bg-black/85 inset-0 md:grid md:grid-cols-12 items-center" @click="unsetModal()">
    <div class="md:col-start-2 lg:col-start-3 md:col-end-12 lg:col-end-11 my-20 mx-6 md:mx-0" @click.stop>
      <div class="bg-white rounded overflow-hidden">
        <slot></slot>
      </div>
      <button
        class="absolute top-4 right-6 text-white text-5xl hover:text-green"
        @click="unsetModal()">
        ×
      </button>
    </div>
  </div>
</template>

<script setup>
const { unsetModal } = inject('modal');

onMounted(() => {
  useEventListener(document, 'keyup', event => {
    if (event.code === 'Escape') {
      unsetModal();
    }
  })
})
</script>
