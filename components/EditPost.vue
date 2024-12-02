<template>
  <Form v-slot="{ errors }" :validation-schema="postSchema" @submit="onSubmit">
    <h1 class="text-xl text-white p-6 bg-black">Edit Post</h1>
    <div class="p-6">
      <label for="author" class="block py-2">Author</label>
      <Field
        v-model="post.userId"
        v-slot="{ value }"
        id="author"
        name="author"
        class="border border-green w-full p-2"
        as="select">
        <option value>Select Author …</option>
        <option
          v-for="user in users"
          :value="user.id"
          :selected="value && value === user.id">
          {{ user.name }}
        </option>
      </Field>
      <ErrorMessage v-slot="{ message }" name="author">
        <div class="bg-green text-white p-2">{{ message }}</div>
      </ErrorMessage>
    </div>
    <div class="p-6">
      <Field v-model="post.title" v-slot="{ field }" type="text" name="title">
        <label for="title" class="block py-2">Title</label>
        <input
          v-bind="field"
          id="title"
          type="text"
          name="title"
          class="border border-green w-full p-2" />
      </Field>
      <ErrorMessage v-slot="{ message }" name="title">
        <div class="bg-green text-white p-2">{{ message }}</div>
      </ErrorMessage>
    </div>
    <div class="p-6">
      <Field v-slot="{ field }" v-model="post.description" name="description">
        <label for="textarea" class="block py-2">Description</label>
        <textarea
        v-bind="field"
        id="textarea"
        name="description"
        class="border border-green w-full p-2"
        rows="4">
      </textarea>
      </Field>
      <ErrorMessage v-slot="{ message }" name="description">
        <div class="bg-green text-white p-2">{{ message }}</div>
      </ErrorMessage>
    </div>
    <button
      class="rounded-lg bg-darkgreen text-white disabled:bg-darkgreen/40 hover:bg-black p-4 m-6"
      type="submit"
      :disabled="!post.id || !isObjectEmpty(errors)">
      Update
    </button>
  </Form>
</template>

<script setup>
import { reactive, inject } from 'vue';
import { Field, Form, ErrorMessage } from 'vee-validate';
import { postSchema } from '~/utils/validation';
import { isObjectEmpty } from '~/utils/object';

const { currentModal, setCurrentModal } = inject('modal');
const post = reactive({});
const { apiBase } = useRuntimeConfig().public;
const { data: users } = await useFetch(`${apiBase}/users`);
const route = useRoute();
const { edit: postId } = route.query;
const response = await useFetch(`${apiBase}/posts/${postId}`);

if (response.status.value === 'success') {
  const { id, title, body: description, userId } = response.data.value;
  Object.assign(post, {
    id,
    title,
    userId,
    description
  });
}

async function onSubmit(values) {
  await $fetch(`${apiBase}/posts/${postId}`, {
    method: 'PUT',
    body: JSON.stringify({
      id: postId,
      userId: values.author,
      title: values.title,
      body: values.description
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  setCurrentModal(null);
}
</script>