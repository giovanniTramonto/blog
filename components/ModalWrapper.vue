<template>
  <div class="fixed z-10 bg-black/80 inset-0 p-16">
    <div class="bg-white border-5 border-green p-8">
      <slot></slot>
    </div>
    <button
      class="absolute top-4 right-6 text-white text-5xl hover:text-green"
      @click="unsetModal()">
      ×
    </button>
  </div>
</template>

<script setup>
import { useEventListener } from '@vueuse/core';
import { inject, onMounted, onBeforeUnmount } from 'vue';

const { unsetModal } = inject('modal');

onMounted(() => {
  useEventListener(document, 'keyup', event => {
    if (event.code === 'Escape') {
      unsetModal();
    }
  })
})
</script>
