<template>
  <div class="fixed z-10 bg-black/80 inset-0 p-16">
    <div class="bg-white border-5 border-green p-8">
      <slot></slot>
    </div>
    <button @click="setCurrentModal(null)" class="absolute top-8 right-8 text-white">X</button>
  </div>
</template>

<script setup>
import { useEventListener } from '@vueuse/core';
import { inject, onMounted, onBeforeUnmount } from 'vue';

const { setCurrentModal } = inject('modal');

onMounted(() => {
  useEventListener(document, 'keyup', event => {
    if (event.code === 'Escape') {
      setCurrentModal(null);
    }
  })
})
</script>
