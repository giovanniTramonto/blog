import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import App from '~/app.vue'


describe('index', () => {
  it('can mount', async () => {
    const component = await mountSuspended(App, { route: '/' });
    expect(component.text()).toContain('Title');
  })
})
