<template>
  <v-card class="mb-4">
    <v-card-subtitle class="pb-0"
      >{{ activity.user.name }} {{ activity.user.last_name }}</v-card-subtitle
    >
    <v-card-title>{{ activity.name }}</v-card-title>
    <v-card-text>{{ activity.description }}</v-card-text>

    <v-card-actions>
      <v-btn
        v-if="activity.link"
        color="orange lighten-2"
        text
        :to="activity.link"
      >
        Ссылка
      </v-btn>

      <v-btn
        v-if="activity.file"
        color="orange"
        text
        :href="`${baseURL}posts/media/files/${activity.file}`"
      >
        Файл
      </v-btn>

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
  inject: ['messageSubject'],
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

  watch: {
    message() {
      this.show = true
    },
    show(val) {
      if (val) {
        this.$axios
          .$get(`get_active_comment/${this.activity.id}/`)
          .then((data) => {
            this.comments = data.activity_comments.reverse()
          })
      }
    },
  },

  mounted() {
    if (this.messageSubject) {
      this.messageSubject.subscribe(async () => {
        if (this.show) {
          this.comments = (
            await this.$axios.$get(`get_active_comment/${this.activity.id}/`)
          ).activity_comments.reverse()
        }
      })
    }
  },

  methods: {
    sendMessage() {
      this.isRequest = true
      const article = `Добавлен комментарий к активности ${this.activity.name} от ${this.$store.state.UserModule.user.name} ${this.$store.state.UserModule.user.last_name}: ${this.message}`

      const fd = new FormData()
      fd.set('title', article)
      fd.set(
        'description',
        JSON.stringify({
          userId: this.$store.state.UserModule.user.id,
          message: this.message,
        })
      )

      Promise.all([
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
          }),
        this.$axios.$post(
          'https://api-cyber-garden.admire.social/api/notification/project/' +
            this.$route.params.projectId,
          fd
        ),
      ])
    },
  },
}
</script>
