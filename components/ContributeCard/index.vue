<template>
  <v-card class="mb-4">
    <v-card-subtitle class="pb-0"
      >{{ activity.user.name }} {{ activity.user.last_name }}</v-card-subtitle
    >
    <v-card-title>{{ activity.name }}</v-card-title>
    <v-card-text>{{ activity.description }}</v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-list subheader two-line style="max-height: 60vh; overflow-y: auto">
          <v-list-item v-for="item in comments" :key="item.date">
            <v-list-item-avatar>
              <v-img
                :src="`${baseURL}posts/media/avatars/${item.user.avatar_image}`"
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title
                style="white-space: pre-wrap !important"
                v-text="`${item.user.name} ${item.user.last_name}`"
              ></v-list-item-title>
              <v-list-item-subtitle
                style="white-space: pre-wrap !important"
                v-text="item.description"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
    </v-expand-transition>

    <v-divider />

    <v-card-text class="pb-0">
      <v-form @submit.prevent="sendMessage">
        <v-layout>
          <v-textarea
            v-model="message"
            rows="1"
            auto-grow
            @keydown.ctrl.enter="sendMessage"
          />
          <div>
            <v-btn
              :disabled="!message"
              type="submit"
              icon
              large
              :loading="isRequest"
            >
              <v-icon> mdi-send </v-icon>
            </v-btn>
          </div>
        </v-layout>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ContributeCard',
  props: {
    activity: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    show: false,
    message: '',
    isRequest: false,
    baseURL: process.env.BASE_URL,
    comments: [],
  }),

  async fetch() {
    try {
      this.comments = (
        await this.$axios.$get(`get_active_comment/${this.activity.id}/`)
      ).activity_comments.reverse()
    } catch (error) {
      console.error(error)
    }
  },
  watch: {
    message() {
      this.show = true
    },
  },

  methods: {
    sendMessage() {
      this.isRequest = true
      this.$axios
        .$post(`write_active_comment/`, {
          description: this.message,
          activity: this.activity.id,
          user: this.$store.state.UserModule.user.id,
        })
        .then((data) => {
          this.message = ''
          this.comments.unshift(data)
        })
        .finally(() => {
          this.isRequest = false
        })
    },
  },
}
</script>
