<template>
  <div v-if="showPost" class="md:col-start-2 lg:col-start-3 md:col-end-12 lg:col-end-11 min-h-full">
    <header>
      <h1 class="text-xl p-6 bg-green">{{ post.title }}</h1>
      <span class="block p-6 text-darkgreen">{{ user.name }}</span>
    </header>
    <main class="p-6">
      <section>
        <p>{{ post.body }}</p>
      </section>
    </main>
    <footer class="p-6">
      <NuxtLink to="/" class="bg-darkgreen hover:bg-black text-white rounded-lg p-2">Overview</NuxtLink>
    </footer>
  </div>
</template>

<script setup>
const route = useRoute();
const { apiFetch } = useApi();
const { id } = route.params;
const { data: post } = await apiFetch(`posts/${id}`);
const { data: user } = await apiFetch(`users/${post.value?.userId}`);
const showPost = computed(() => post.value && user.value);
</script>
