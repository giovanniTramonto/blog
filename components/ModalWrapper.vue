<template>
  <div class="fixed z-10 bg-black/80 inset-0 p-16">
    <div class="bg-white border-5 border-green p-8">
      <slot></slot>
    </div>
    <button @click="setCurrentModal(null)" class="absolute top-8 right-8 text-white">X</button>
  </div>
</template>

<script setup>
import { inject } from 'vue';

const { setCurrentModal } = inject('modal');
</script>
