<template>
  <form v-if="post" @submit.prevent="onSubmit">
    <h1 class="text-xl text-white p-6 bg-black">Delete Post</h1>
    <div class="p-6">
      <input
        type="text"
        readonly 
        class="bg-green text-white p-2"
        :value="post.title" />
    </div>
    <button
      type="submit"
      class="rounded-lg bg-darkgreen text-white disabled:bg-darkgreen/40 hover:bg-black p-4 m-6">
      Delete
    </button>
  </Form>
</template>

<script setup>
const { apiBase } = useRuntimeConfig().public;
const { apiDelete, apiFetch } = useApi();
const { currentModal, showModal, unsetModal } = inject('modal');
const { id: postId } = currentModal.value.data;
const { data: post } = await apiFetch(`posts/${postId}`);

showModal();

async function onSubmit() {
  await apiDelete(`posts/${postId}`);
  unsetModal();
}
</script>