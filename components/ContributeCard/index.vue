<template>
  <v-card class="mb-4">
    <v-card-subtitle class="pb-0"
      >{{ activity.user.name }} {{ activity.user.last_name }}</v-card-subtitle
    >
    <v-card-title>{{ activity.name }}</v-card-title>
    <v-card-text>{{ activity.description }}</v-card-text>

    <v-card-actions v-if="activity.type" class="py-0">
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            alt="avatar"
            :src="icons[activity.type]"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ activity.type }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-card-actions>

    <v-card-actions>
      <v-btn
        v-if="activity.link && activity.link.startsWith('http')"
        color="orange lighten-2"
        text
        :href="activity.link"
      >
        Ссылка
      </v-btn>
      <v-btn
        v-if="activity.link && !activity.link.startsWith('http')"
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
        target="_blank"
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
    icons: {
      Коммит: '/assets/icons/commit.svg',
      Обзор: '/assets/icons/review.png',
      Помощь: '/assets/icons/assistance.svg',
      Инвестиция: '/assets/icons/invest.svg',
      Отчёт: '/assets/icons/report.svg',
      Предложение: '/assets/icons/idea.png',
    },
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
          'https://ws-lab-lake.admire.social/api/notification/project/' +
            this.$route.params.projectId,
          fd
        ),
      ])
    },
  },
}
</script>
