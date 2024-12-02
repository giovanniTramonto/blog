<template>
  <Form @submit="onSubmit" :validation-schema="postSchema">
    <header class="p-6 bg-black">
      <h1 class="text-xl text-white">New Post</h1>
    </header>
    <div class="p-6">
      <label for="author" class="block py-2">Author</label>
      <Field id="author" class="border border-green w-full p-2" name="author" v-model="post.author" as="select">
        <option value="">Select Author …</option>
        <option v-for="user in users" :value="user.id">{{ user.name }}</option>
      </Field>
      <!--<ErrorMessage name="author" v-slot="{ message }">
        <div class="bg-green text-white p-2">{{ message }}</div>
      </ErrorMessage>-->
    </div>
    <div class="p-6">
      <Field v-slot="{ field }" v-model="post.title" type="text" name="title">
        <label for="title" class="block py-2">Title</label>
        <input id="title" class="border border-green w-full p-2" type="text" name="title" v-bind="field" />
      </Field>
      <ErrorMessage name="title" v-slot="{ message }">
        <div class="bg-green text-white p-2">{{ message }}</div>
      </ErrorMessage>
    </div>
    <div class="p-6">
      <Field v-slot="{ field }" v-model="post.description" name="description">
        <label for="textarea" class="block py-2">Description</label>
        <textarea id="textarea" name="description" class="border border-green w-full p-2" rows="4" v-bind="field"></textarea>
      </Field>
      <ErrorMessage name="description" v-slot="{ message }">
        <div class="bg-green text-white p-2">{{ message }}</div>
      </ErrorMessage>
    </div>
    <div class="p-6">
      <input class="rounded-lg bg-darkgreen text-white hover:bg-black p-4" type="submit" value="Create" />
    </div>
  </Form>
</template>

<script setup>
import { reactive } from 'vue';
import { Field, Form, ErrorMessage } from 'vee-validate';
import { postSchema } from '~/utils/validation';

const { apiBase } = useRuntimeConfig().public
const { data: users } = await useFetch(`${apiBase}/users`);
const post = reactive({
  title: null,
  description: null,
  author: null
});

async function onSubmit() {
  await $fetch(`${apiBase}/posts`, {
    method: 'POST',
    body: JSON.stringify(post),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
}
</script>