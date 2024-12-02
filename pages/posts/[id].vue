<template>
  <main v-if="showPost" class="md:col-start-2 lg:col-start-3 md:col-end-12 lg:col-end-11 min-h-full">
    <header>
      <h1 class="text-xl text-white p-6 bg-black">{{ post.title }}</h1>
      <span class="block p-6 text-green">{{ user.name }}</span>
    </header>
    <section class="p-6">
      <p>
        {{ post.body }}
      </p>
    </section>
    <footer class="p-6">
      <NuxtLink to="/" class="bg-green hover:bg-black hover:text-white p-2">Overview</NuxtLink>
    </footer>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue';

const post = ref(null);
const user = ref(null);
const route = useRoute();
const { apiBase } = useRuntimeConfig().public;
const { id } = route.params
const showPost = computed(() => post.value && user.value);

if (id) {
  const { data: postData } = await useAsyncData('post', () => $fetch(`${apiBase}/posts/${id}`));
  post.value = postData.value;
  const { data: userData } = await useAsyncData('user', () => $fetch(`${apiBase}/users/${post.value.userId}`));
  user.value = userData.value
}
</script>
