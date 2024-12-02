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
      <li
        v-for="post in posts"
        :key="post.id"
        class="flex gap-6 p-6 border-b border-green hover:bg-green"
        @click="onClickPost(post.id)">
        <div class="flex-1">
          {{ post.title }}
        </div>
        <div class="flex-1">{{ getShortDescription(post.body) }}</div>
        <div class="flex-1">{{ getUserNameById(post.userId) }}</div>
        <div class="grow-0 basis-20">
          <ul>
            <li>
                <button
                  @click.stop="onClickEditPost(post.id)"
                  class="text-sm underline underline-offset-2 text-darkgreen">
                  Edit
                </button>
            </li>
            <li>
                <button
                  @click.stop="onClickDeletePost(post.id)"
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
    <ModalWrapper
      v-if="currentModal?.name"
      class="transition-opacity duration-300"
      :style="wrapperStyles">
      <component :is="modals[currentModal.name]"></component>
    </ModalWrapper>
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
const isModalVisible = ref(false);
const modals = {
  create: CreatePost,
  edit: EditPost,
  delete: DeletePost
}
const searchTerm = defineModel();
const searchPost = ref(null);
const posts = computed(
  () => searchPost.value
    ? data.value.filter(item => item.title.indexOf(searchPost.value) > -1)
    : data.value
);
const wrapperStyles = computed(() => ({
  opacity: isModalVisible.value ? 1 : 0
}));

function getUserNameById(userId) {
  const user = users.value.find(({ id }) => id === userId)
  return user ? user.name : null
}

function getShortDescription(text) {
  return `${text.substr(0, 50)} …`;
}

function setCurrentModal(name, data = {}) {
  currentModal.value = {
    name,
    data
  };
}

function showModal() {
  isModalVisible.value = true;
}

function unsetModal() {
  currentModal.value = null;
  isModalVisible.value = false;
  router.replace({ query: null });
}

function onClickCreatePost() {
  setCurrentModal('create');
  router.replace({ query: { action: 'create' } });
}

function onClickEditPost(postId) {
  setCurrentModal('edit', { id: postId });
  router.replace({ query: { id: postId, action: 'edit' } });
}

function onClickDeletePost(postId) {
  setCurrentModal('delete', { id: postId });
  router.replace({ query: { id: postId, action: 'delete' } });
}

function onClickPost(postId) {
  router.push({ path: `/posts/${postId}` });
}

watch(
  searchTerm,
  useDebounceFn(event => {
    searchPost.value = searchTerm.value;
  }, 250, { maxWait: 5000 })
)

provide('modal', {
  isModalVisible,
  currentModal,
  setCurrentModal,
  showModal,
  unsetModal
})

onMounted(() => {
  const { action, id } = route.query;
  if (action) {
    setCurrentModal(action, { id });
  }
})
</script>
