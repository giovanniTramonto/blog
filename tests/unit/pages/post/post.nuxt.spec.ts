import { describe, it, expect } from 'vitest'
import { ref } from 'vue'
import { mountSuspended, registerEndpoint } from '@nuxt/test-utils/runtime';
import Post from '~/pages/posts/[id].vue'
import postSnapshot from './post.snapshot';

const postId = 5;
const userId = 3;

registerEndpoint('/posts/', () => ref({ id: postId, userId, title: 'My new post', body: 'Lorem Ipsum' }));
registerEndpoint('/users/', () => ref({ id: userId, name: 'Leanne Graham' }));

describe('Post', () => {
  it('equals snapshot', async () => {
    const component = await mountSuspended(Post, { route: `/posts/${postId}` });
    expect(component.html()).toMatchInlineSnapshot(postSnapshot);
  })
})

