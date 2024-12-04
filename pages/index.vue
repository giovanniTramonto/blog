<template>
  <main class="md:col-start-2 lg:col-start-3 md:col-end-12 lg:col-end-11 min-h-full">
    <nav class="flex gap-4 justify-between p-6 w-full">
      <form class="flex-1">
        <input
          v-model="searchTerm"
          id="search"
          type="search"
          class="md:min-w-96 border border-green rounded-lg p-2"
          placeholder="Search Posts" />
        <span class="p-2 max-[768px]:hidden">
          {{ filteredPosts.length }} Posts
        </span>
      </form>
      <button
        class="bg-darkgreen hover:bg-black text-white rounded-lg p-2"
        @click="onClickCreatePost">
        Create new Post
      </button>
    </nav>
    <section>
      <ul>
        <li class="flex gap-6 bg-green p-6">
          <div class="flex-1">
            Title
          </div>
          <div class="flex-1 max-[768px]:hidden">
            Description
          </div>
          <div class="flex-1 max-[768px]:hidden">
            Author
          </div>
          <div class="grow-0 basis-20"></div>
        </li>
        <li
          v-for="post in filteredPosts"
          :key="post.id"
          class="flex gap-6 p-6 border-b border-green hover:bg-green/10 cursor-pointer"
          @click="onClickPost(post.id)">
          <div class="flex-1">
            {{ post.title }}
          </div>
          <div class="flex-1 max-[768px]:hidden">{{ getShortDescription(post.body) }}</div>
          <div class="flex-1 max-[768px]:hidden">{{ getUserNameById(post.userId) }}</div>
          <div class="grow-0 basis-20">
            <ul>
              <li>
                  <button
                    @click.stop="onClickEditPost(post.id)"
                    class="text-sm underline underline-offset-2 text-darkgreen hover:text-black">
                    Edit
                  </button>
              </li>
              <li>
                  <button
                    @click.stop="onClickDeletePost(post.id)"
                    class="text-sm underline underline-offset-2 text-darkgreen hover:text-black">
                    Delete
                  </button>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </section>
  </main>

  <Teleport to="body">
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
const { apiFetch } = useApi()
const { data: posts } = await apiFetch('posts');
const { data: users } = await apiFetch('users');
const currentModal = ref(null);
const isModalVisible = ref(false);
const modals = {
  create: CreatePost,
  edit: EditPost,
  delete: DeletePost
}
const searchTerm = defineModel();
const searchPost = ref(null);
const filteredPosts = computed(
  () => searchPost.value
    ? posts.value.filter(item => item.title.indexOf(searchPost.value) > -1)
    : posts.value ?? []
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
