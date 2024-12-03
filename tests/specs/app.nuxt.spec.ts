import { it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import App from '~/app.vue'

it('app can mount', async () => {
  const component = await mountSuspended(App, { route: '/' });
  expect(component.text()).toContain('Title');
})
