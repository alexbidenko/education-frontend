<template>
  <v-list-item link>
    <v-list-item-content>
      <v-list-item-title v-text="`Text`"></v-list-item-title>
      <v-list-item-subtitle v-text="'text'"></v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: 'NotificationsList',
  data: () => ({
    events: [],
  }),
  async fetch() {
    this.events = await this.$axios.$get(
      'get_user_event/' + this.$store.state.UserModule.user.id + '/'
    )
  },
  mounted() {
    console.log(this.events)
  }
}
</script>
