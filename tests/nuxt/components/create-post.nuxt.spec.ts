import { describe, it, expect, vi, afterAll } from 'vitest'
import { ref } from 'vue'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';
import CreatePost from '~/components/CreatePost.vue'
import { users } from '~/tests/nuxt/mock/data'

const provide = {
  modal: {
    showModal: () => {},
    unsetModal: () => {}
  }
}
const { useFetchMock } = vi.hoisted(() => ({
  useFetchMock: vi.fn(() => ({ data: ref(users) }))
}))

mockNuxtImport('useFetch', () => useFetchMock)

afterAll(() => {
  useFetchMock.mockReset();
})

describe('CreatePost', async () => {
  const component = await mountSuspended(CreatePost, { provide });

  it('has users', () => {
    const options = component.findAll('option')
    expect(options.length).toEqual(4);
    expect(options[1].text()).toEqual('Dale Cooper');
  })

  it('has title input', async () => {
    expect(component.find('input').attributes().name).toEqual('title');
  })

  it('has decription textarea', async () => {
    expect(component.find('textarea').attributes().name).toEqual('body');
  })

  it('has create button', async () => {
    expect(component.find('button').text()).toEqual('Create');
  })
})

