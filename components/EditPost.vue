<template>
  <Form v-if="post" v-slot="{ errors }" :validation-schema="postSchema" @submit="onSubmit">
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
      <Field v-model="post.body" v-slot="{ field }" name="description">
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
      :disabled="!isObjectEmpty(errors)">
      Update
    </button>
  </Form>
</template>

<script setup>
import { inject } from 'vue';
import { Field, Form, ErrorMessage } from 'vee-validate';
import { postSchema } from '~/utils/validation';
import { isObjectEmpty } from '~/utils/object';

const { currentModal, showModal, unsetModal } = inject('modal');
const { id: postId } = currentModal.value.data;
const { apiPut, apiFetch } = useApi();
const { data: users } = await apiFetch('users');
const { data: post } = await apiFetch(`posts/${postId}`);

showModal();

async function onSubmit(values) {
  await apiPut(`posts/${postId}`, {
    id: postId,
    userId: values.author,
    title: values.title,
    body: values.description
  });
  unsetModal();
}
</script>