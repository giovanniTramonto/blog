import { describe, it, expect, vi } from 'vitest'
import { ref } from 'vue'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';
import CreatePost from '~/components/CreatePost.vue'

const { useFetchMock } = vi.hoisted(() => {
  return {
    useFetchMock: vi.fn(() => {
      return {
        data: ref([{ id: 1, name: 'Leanne Graham' }, { id: 2, name: 'Michael Jordan' }, { id: 3, name: 'Shaquille O’Neal' }])
      }
    })
  }
})

mockNuxtImport('useFetch', () => {
  return useFetchMock
})

describe('CreatePost', () => {
  it('equals snapshot', async () => {
    const component = await mountSuspended(CreatePost, {
      provide: {
        modal: {
          showModal: () => {},
          unsetModal: () => {}
        }
      }
    });
    expect(component.findAll('option').length).toEqual(4);
  })
})

