<template>
  <div class="fixed z-10 bg-black/80 inset-0 p-16">
    <div class="bg-white border-5 border-green p-8">
      <slot></slot>
    </div>
    <button @click="onClickClose" class="absolute top-8 right-8 text-white">X</button>
  </div>
</template>

<script setup>
import { inject, onMounted, onBeforeUnmount } from 'vue';

const { setCurrentModal } = inject('modal');

onMounted(() => {
  document.addEventListener('keyup', onKeyUpClose);
});

onBeforeUnmount(() => {
  document.removeEventListener('keyup', onKeyUpClose);
});

function onKeyUpClose(event) {
  if (event.code === 'Escape') {
    setCurrentModal(null);
  }
}

function onClickClose() {
  setCurrentModal(null);
}

</script>
