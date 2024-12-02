<template>
  <main class="md:col-start-2 lg:col-start-3 md:col-end-12 lg:col-end-11 min-h-full">
    <div class="flex justify-between p-6 w-full">
      <form>
        <input
          v-model="searchTerm"
          id="search"
          type="search"
          class="min-w-96 border rounded-lg p-2"
          placeholder="Search Posts" />
        <span class="p-6">
          {{ posts.length }} Posts
        </span>
      </form>
      <button @click="onClickCreatePost" class="bg-darkgreen hover:bg-black text-white rounded-lg p-2">
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
        <div class="flex-1">{{ getShortDescription(post.body) }}</div>
        <div class="flex-1">{{ getUserNameById(post.userId) }}</div>
        <div class="grow-0 basis-20">
          <ul>
            <li>
                <button
                  @click="onClickEditPost(post.id)"
                  class="text-sm underline underline-offset-2 text-darkgreen">
                  Edit
                </button>
            </li>
            <li>
                <button
                  @click="onClickDeletePost(post.id)"
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
        <component :is="modals[currentModal]"></component>
      </ModalWrapper>
    </Transition>
  </Teleport>
</template>

<script setup>
import { provide, ref, computed, watch, onMounted } from 'vue'
import { useDebounceFn } from '@vueuse/core';
import CreatePost from '~/components/CreatePost.vue';
import EditPost from '~/components/EditPost.vue';
import DeletePost from '~/components/DeletePost.vue';

const router = useRouter();
const route = useRoute();
const { apiBase } = useRuntimeConfig().public
const { data } = await useFetch(`${apiBase}/posts`);
const { data: users } = await useFetch(`${apiBase}/users`);
const currentModal = ref(null);
const modals = {
  CreatePost,
  EditPost,
  DeletePost
}
const searchTerm = defineModel()
const searchPost = ref(null);
const posts = computed(
  () => searchPost.value
    ? data.value.filter(item => item.title.indexOf(searchPost.value) > -1)
    : data.value
);
const queries = {
  create: 'CreatePost',
  edit: 'EditPost',
  delete: 'DeletePost'
}

function getUserNameById(userId) {
  const user = users.value.find(({ id }) => id === userId)
  return user ? user.name : null
}

function getShortDescription(text) {
  return `${text.substr(0, 50)} …`;
}

function setCurrentModal(name = null, query = undefined) {
  router.replace({ query });
  currentModal.value = name;
}

function onClickCreatePost() {
  setCurrentModal('CreatePost', { 'create': null });
}

function onClickEditPost(postId) {
  setCurrentModal('EditPost', { 'edit': postId });
}

function onClickDeletePost(postId) {
  setCurrentModal('DeletePost', { 'delete': postId });
}

watch(
  searchTerm,
  useDebounceFn(event => {
    searchPost.value = searchTerm.value;
  }, 250, { maxWait: 5000 })
)

provide('modal', {
  modals,
  currentModal,
  setCurrentModal
})

onMounted(() => {
  for (const [param, value] of Object.entries(route.query)) {
    if (queries[param]) {
      setCurrentModal(queries[param], { [param]: Number(value) });
      break;
    }
  }
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