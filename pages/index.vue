<template>
  <main class="md:col-start-2 lg:col-start-3 md:col-end-12 lg:col-end-11 min-h-full">
    <div class="flex justify-between p-6 w-full">
      <form>
        <input id="search" class="min-w-96 border rounded-lg p-2" type="search" value="Search Posts" />
      </form>
      <button @click="setCurrentModal('CreatePost')" class="bg-darkgreen hover:bg-black text-white rounded-lg p-2">
        Create new Post
      </button>
    </div>
    <ul>
      <li class="flex gap-6 bg-black text-white p-6 sticky top-0">
        <div class="flex-1">
          Title
        </div>
        <div class="flex-1">
          Description
        </div>
        <div class="flex-1">
          Author
        </div>
        <div class="grow-0 basis-20"></div>
      </li>
      <li v-for="post in posts" :key="post.id" class="flex gap-6 p-6 border-b border-green hover:bg-green">
        <div class="flex-1">
          {{ post.title }}
        </div>
        <div class="flex-1">Lorem Ispum</div>
        <div class="flex-1">Author {{ post.userId }}</div>
        <div class="grow-0 basis-20">
          <ul>
            <li>
                <button
                  @click="setCurrentModal('EditPost', { postId: post.id })"
                  class="text-sm underline underline-offset-2 text-darkgreen">
                  Edit
                </button>
            </li>
            <li>
                <button
                  @click="setCurrentModal('DeletePost', { postId: post.id })"
                  class="text-sm underline underline-offset-2 text-darkgreen">
                  Delete
                </button>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </main>

  <Teleport to="#teleports">
    <Transition>
      <ModalWrapper v-if="currentModal">
        <component :is="modals[currentModal.name]"></component>
      </ModalWrapper>
    </Transition>
  </Teleport>
</template>

<script setup>
import { provide, ref } from 'vue'
import CreatePost from '~/components/CreatePost.vue';
import EditPost from '~/components/EditPost.vue';
import DeletePost from '~/components/DeletePost.vue';

const { data: posts } = await useFetch(`${useRuntimeConfig().public.apiBase}/posts`);
const currentModal = ref(null)
const modals = {
  CreatePost,
  EditPost,
  DeletePost
}

function setCurrentModal(name, data = {}) {
  currentModal.value = name ? {
    name,
    data
  } : null
}

provide('modal', {
  modals,
  currentModal,
  setCurrentModal
})
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>