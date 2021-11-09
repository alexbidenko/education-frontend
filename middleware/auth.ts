import { Middleware } from '@nuxt/types'
import { Actions } from '~/store/types'

const auth: Middleware = async ({ app, redirect, store, route }) => {
  if (
    !app.$cookies.get('USER_ID') &&
    !route.fullPath.startsWith('/login') &&
    !route.fullPath.startsWith('/registration')
  ) {
    redirect('/login')
    return
  }

  try {
    if (!store.state.UserModule.user && app.$cookies.get('USER_ID')) {
      await store.dispatch('UserModule/' + Actions.CHECK_USER)
    }
    if (
      app.$cookies.get('USER_ID') &&
      (route.fullPath.startsWith('/login') ||
        route.fullPath.startsWith('/registration'))
    ) {
      redirect('/')
    }
  } catch {
    if (
      !route.fullPath.startsWith('/login') &&
      !route.fullPath.startsWith('/registration')
    ) {
      redirect('/login')
    }
  }
}

export default auth
