<template>
  <div class="h-full md:grid md:grid-cols-12">
    <NuxtPage/>
  </div>
</template>

<script setup>
useHead({
  htmlAttrs: {
    class: 'h-full',

  },
  bodyAttrs: {
    class: 'h-full'
  }
})
</script>

<style>
#__nuxt {
  height: inherit;
}
</style>