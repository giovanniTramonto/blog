<template>
  <div class="flex-1 max-w-[1200px] min-h-full">
    <div class="flex justify-between p-6 w-full">
      <form>
        <input class="min-w-96 border rounded-lg p-2" type="search" value="Search Posts" />
      </form>
      <button
        @click="onClickNewPost"
        class="bg-darkgreen hover:bg-black text-white rounded-lg p-2">
        Create new Post
      </button>
    </div>
    <div class="flex-1">
      <form>
        <ul>
          <li class="flex gap-6 bg-black text-white p-6 sticky top-0">
            <div class="grow-0">
              <input type="checkbox">
            </div>
            <div class="flex-1">
              Title
            </div>
            <div class="flex-1">
              Description
            </div>
            <div class="flex-1">
              Author
            </div>
          </li>
          <li v-for="post in posts" class="flex gap-6 p-6 border-b border-green hover:bg-green">
            <div class="grow-0">
              <input type="checkbox">
            </div>
            <div class="flex-1">
              {{ post.title }}
            </div>
            <div class="flex-1"></div>
            <div class="flex-1"></div>
          </li>
        </ul>
      </form>
    </div>
  </div>
</template>

<script setup>
const response = await fetch('https://jsonplaceholder.typicode.com/posts');
const posts = await response.json();


function onClickNewPost() {}
</script>
