<template>
  <Form @submit="onSubmit" :validation-schema="postSchema">
    <header class="p-6 bg-black">
      <h1 class="text-xl text-white">Update Post</h1>
    </header>
    <div class="p-6">
      <Field v-slot="{ field }" v-model="post.author" type="text" name="author">
        <label for="title" class="block py-2">Author</label>
        <input v-bind="field" class="border border-green w-full p-2" type="text" name="author" />
      </Field>
      <ErrorMessage name="author" v-slot="{ message }">
        <div class="bg-green text-white p-2">{{ message }}</div>
      </ErrorMessage>
    </div>
    <div class="p-6">
      <Field v-slot="{ field }" v-model="post.title" type="text" name="title">
        <label for="title" class="block py-2">Title</label>
        <input v-bind="field" class="border border-green w-full p-2" type="text" name="title" />
      </Field>
      <ErrorMessage name="title" v-slot="{ message }">
        <div class="bg-green text-white p-2">{{ message }}</div>
      </ErrorMessage>
    </div>
    <div class="p-6">
      <Field v-slot="{ field, errors }" v-model="post.description" name="description">
        <label for="textarea" class="block py-2">Description</label>
        <textarea v-bind="field" id="textarea" name="description" class="border border-green w-full p-2" rows="4"></textarea>
      </Field>
      <ErrorMessage name="description" v-slot="{ message }">
        <div class="bg-green text-white p-2">{{ message }}</div>
      </ErrorMessage>
    </div>
    <div class="p-6">
      <input
        class="rounded-lg bg-darkgreen text-white disabled:bg-darkgreen/40 hover:bg-black p-4"
        type="submit"
        value="Update"
        :disabled="!post.id" />
    </div>
  </Form>
</template>

<script setup>
import { reactive, inject } from 'vue';
import { Field, Form, ErrorMessage } from 'vee-validate';
import { postSchema } from '~/utils/validation';

const { currentModal } = inject('modal');
const { postId } = currentModal.value.data ?? {}
const post = reactive({});
const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);

if (response.ok) {
  const { id, title, body: description, userId: author } = await response.json()
  Object.assign(post, {
    id,
    title,
    author,
    description
  })
}

async function onSubmit() {
  await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
    method: 'PUT',
    body: JSON.stringify(post),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
}
</script>