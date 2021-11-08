import { Middleware } from '@nuxt/types'
import { Actions } from '~/store/types'

const auth: Middleware = async ({ app, redirect, $axios, store }) => {
  if (!app.$cookies.get('TOKEN')) {
    redirect('/auth')
    return
  }

  const result = await $axios.$post('/auth')

  if (!store.state.UserModule.user) {
    await store.dispatch('UserModule/' + Actions.CHECK_USER, result)
  }
}

export default auth
