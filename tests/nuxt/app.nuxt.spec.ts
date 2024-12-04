import { it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import App from '~/app.vue'

it('can mount with index page', async () => {
  const component = await mountSuspended(App, { route: '/' });
  expect(component.find('form').text()).toContain('0 Posts')
  expect(component.find('li').text()).toContain('Title');
})
