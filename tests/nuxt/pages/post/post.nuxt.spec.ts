import { describe, it, expect, vi, afterAll } from 'vitest'
import { ref } from 'vue'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';
import Post from '~/pages/posts/[id].vue'

const postId = 5;
const userId = 3;

const { useFetchMock } = vi.hoisted(() => ({
  useFetchMock: vi.fn((request) => {
    let data = null
    if (request === `/posts/${postId}`) {
      data = ref({ id: postId, userId, title: 'My new post', body: 'Lorem Ipsum' });
    }
    if (request === `/users/${userId}`) {
      data = ref({ id: userId, name: 'Sensei Vu' });
    }
    return {
      data
    }
  })
}))

mockNuxtImport('useFetch', () => useFetchMock)

afterAll(() => {
  useFetchMock.mockReset();
})


describe('Post', () => {
  it('equals snapshot', async () => {
    const component = await mountSuspended(Post, { route: `/posts/${postId}` });
    expect(component.html()).toMatchInlineSnapshot(`
      "<main class="md:col-start-2 lg:col-start-3 md:col-end-12 lg:col-end-11 min-h-full">
        <header>
          <h1 class="text-xl p-6 bg-green">My new post</h1><span class="block p-6 text-green">Sensei Vu</span>
        </header>
        <section class="p-6">
          <p>Lorem Ipsum</p>
        </section>
        <footer class="p-6"><a href="/" class="bg-darkgreen hover:bg-black text-white rounded-lg p-2">Overview</a></footer>
      </main>"
    `);
  })
})
