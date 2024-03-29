<template>
  <v-app dark>
    <v-navigation-drawer v-if="auth" v-model="drawer" fixed app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app>
      <v-app-bar-nav-icon v-if="auth" @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="$router.back">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn
        v-if="auth"
        class="mr-6"
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-menu v-if="auth" rounded="lg" offset-y>
        <template #activator="{ attrs, on }">
          <v-avatar v-bind="attrs" color="primary" v-on="on">
            <img
              v-if="user.avatar_image"
              :src="`${baseURL}posts/media/avatars/${user.avatar_image}`"
              style="object-fit: cover"
            />
            <span v-else class="white--text text-h5"
              >{{ user.name.substring(0, 1)
              }}{{ user.last_name.substring(0, 1) }}</span
            >
          </v-avatar>
        </template>

        <v-list>
          <v-list-item link @click.native="logout">
            <v-list-item-title v-text="output"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      right
      temporary
      fixed
      width="1000"
    >
      <v-list>
        <v-list-item @click="rightDrawer = !rightDrawer">
          <v-list-item-icon>
            <v-icon>mdi-close</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Закрыть</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider />
      <NotificationsList />
    </v-navigation-drawer>

    <AnimatedLogo />

    <v-snackbar v-model="snackbar">
      {{ message }}

      <template #action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Закрыть
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import { Subject } from 'rxjs'
import Pusher from 'pusher-js'
import { Mutations } from '../store/types'
import AnimatedLogo from '~/components/AnimatedLogo'
import NotificationsList from '~/components/NotificationsList'

const userSubject = new Subject()

export default {
  components: {
    AnimatedLogo,
    NotificationsList,
  },
  provide: {
    userSubject,
  },
  middleware: 'auth',
  data() {
    return {
      baseURL: process.env.BASE_URL,
      drawer: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Кабинет',
          to: '/',
        },
        {
          icon: 'mdi-magnify',
          title: 'Поиск',
          to: '/search',
        },
      ],
      rightDrawer: false,
      title: 'LABLAKE',
      output: 'Выход',
      auth: !!this.$cookies.get('USER_ID'),
      snackbar: false,
      message: '',
    }
  },

  computed: {
    user() {
      return this.$store.state.UserModule.user
    },
  },

  watch: {
    $route() {
      this.auth = !!this.$cookies.get('USER_ID')
    },
  },

  mounted() {
    const pusher = new Pusher('8da04f0e1ecfefbeaecc', {
      cluster: 'eu',
    })

    this.channel = pusher.subscribe(
      'notification-user-' + this.$store.state.UserModule.user?.id
    )
    this.channel.bind('messages', (data) => {
      const p = JSON.parse(data.description)
      if (p.userId !== this.$store.state.UserModule.user?.id) {
        userSubject.next(p)
        this.message = data.title
        this.snackbar = true
      }
    })
  },

  beforeDestroy() {
    if (this.channel) this.channel.unsubscribe()
  },
  methods: {
    logout() {
      this.$cookies.remove('USER_ID')
      this.$cookies.remove('USER_EMAIL')
      this.$router.push('/login')
      this.$store.commit('UserModule/' + Mutations.SET_USER, null)
    },
  },
}
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>
