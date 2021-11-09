<template>
  <v-list>
    <template v-if="events.length">
      <v-list-item
        v-for="i in events"
        :key="i.id"
        :to="`/projects/${i.project.id}`"
        link
      >
        <v-list-item-content :title="i.name">
          <v-list-item-title v-text="i.first"></v-list-item-title>
          <v-list-item-subtitle v-text="i.second"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
    <v-list-item v-else>
      <v-list-item-content>
        <v-list-item-title>Список уведомлений пустой</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: 'NotificationsList',
  inject: ['userSubject'],
  data: () => ({
    events: [],
  }),
  async fetch() {
    await this.getEvents()
  },
  mounted() {
    if (this.userSubject) {
      this.userSubject.subscribe(() => {
        this.getEvents()
      })
    }
  },
  methods: {
    async getEvents() {
      this.events = (
        await this.$axios.$get(
          'get_user_event/' + this.$store.state.UserModule.user.id + '/'
        )
      ).events.map((el) => ({
        ...el,
        first: el.name.split(': ')[0],
        second: el.name.split(': ')[1] || '',
      }))
    },
  },
}
</script>
