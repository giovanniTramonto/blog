<template>
  <main class="md:col-start-2 lg:col-start-3 md:col-end-12 lg:col-end-11">

    <Form @submit="onSubmit" :validation-schema="postSchema">
      <header class="p-6 bg-black">
        <h1 class="text-xl text-white">New Post</h1>
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
        <input class="rounded-lg bg-darkgreen text-white hover:bg-black p-4" type="submit" value="Create" />
      </div>
    </Form>
  </main>
</template>

<script setup>
import { reactive } from 'vue';
import { Field, Form, ErrorMessage } from 'vee-validate';

const post = reactive({
  title: null,
  description: null,
  author: null
});

const postSchema = {
  author(value) {
    const { length } = value ?? {}
    return length > 0 && length < 250
  },
  title(value) {
    const { length } = value ?? {}
    return length > 0 && length < 250
  },
  description(value) {
    const { length } = value ?? {}
    return length > 0 && length < 500
  }
}

async function onSubmit() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(post),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  if (response.ok) {
    await navigateTo({ path: '/' })
  }
}
</script>