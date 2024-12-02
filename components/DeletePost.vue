<template>
  <form @submit.prevent="onSubmit">
    <h1 class="text-xl text-white p-6 bg-black">Delete Post</h1>
    <div class="p-6">
      <input
        type="text"
        readonly 
        class="bg-green text-white p-2"
        :value="postTitle" />
    </div>
    <button
      type="submit"
      class="rounded-lg bg-darkgreen text-white disabled:bg-darkgreen/40 hover:bg-black p-4 m-6">
      Delete
    </button>
  </Form>
</template>

<script setup>
import { ref } from 'vue';

const { currentModal, setCurrentModal } = inject('modal');
const { apiBase } = useRuntimeConfig().public;
const route = useRoute();
const { delete: postId } = route.query;
const { data: post } = await useFetch(`${apiBase}/posts/${postId}`);
const postTitle = ref(post?.title);

async function onSubmit() {
  await $fetch(`${apiBase}/posts/${postId}`, {
    method: 'DELETE'
  });
  setCurrentModal(null);
}
</script>