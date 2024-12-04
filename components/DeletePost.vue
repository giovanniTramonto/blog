<template>
  <form v-if="post" @submit.prevent="onSubmit">
    <h1 class="text-xl p-6 bg-green">Delete Post</h1>
    <div class="p-6">
      {{ post.title }}
    </div>
    <button
      type="submit"
      class="rounded-lg bg-darkgreen hover:bg-black text-white disabled:bg-darkgreen/40 p-4 m-6">
      Delete
    </button>
  </Form>
</template>

<script setup>
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