<template>
  <main class="h-full flex justify-center">
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </main>
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