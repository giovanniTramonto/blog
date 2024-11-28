<template>
  <div class="h-full">
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script setup>
useHead({
  htmlAttrs: {
    class: 'h-full',

  },
  bodyAttrs: {
    class: 'bg-green h-full'
  }
})
</script>

<style>
#__nuxt {
  height: inherit;
}
</style>