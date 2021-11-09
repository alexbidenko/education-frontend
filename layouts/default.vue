<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" fixed app v-if="auth">
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
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-if="auth" />
      <v-btn icon @click.stop="$router.back">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-menu v-if="auth" rounded="lg" offset-y>
        <template #activator="{ attrs, on }">
          <v-icon class="mr-6" v-bind="attrs" v-on="on">mdi-account</v-icon>
        </template>

        <v-list>
          <v-list-item
            v-for="specialization in specializations"
            :key="specialization"
            link
          >
            <v-list-item-title v-text="specialization"></v-list-item-title>
          </v-list-item>
          <v-divider />
          <v-list-item link @click.native="logout">
            <v-list-item-title v-text="output"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer" v-if="auth">
        <v-icon>mdi-bell</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" right temporary fixed>
      <NotificationsList />
    </v-navigation-drawer>

    <AnimatedLogo />
  </v-app>
</template>

<script>
import { Mutations } from '../store/types'
import AnimatedLogo from '~/components/AnimatedLogo'
import NotificationsList from '~/components/NotificationsList'

export default {
  components: {
    AnimatedLogo,
    NotificationsList,
  },
  middleware: 'auth',
  data() {
    return {
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
      specializations: ['Пользователь', 'Эксперт', 'Преподаватель'],
      rightDrawer: false,
      title: 'Work with Me',
      output: 'Выход',
      auth: !!this.$cookies.get('USER_ID'),
    }
  },
  watch: {
    $route() {
      this.auth = !!this.$cookies.get('USER_ID')
    },
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
