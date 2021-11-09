<template>
  <v-container fluid>
    <v-row v-if="project">
      <v-col cols="12" md="3">
        <v-card class="mb-4">
          <img
            style="width: 100%; display: block"
            :src="
              project.image
                ? `${baseURL}posts/media/proj_img/${project.image}`
                : '/assets/substrate.jpg'
            "
          />
          <input
            ref="uploader"
            class="d-none"
            type="file"
            accept="image/*"
            @change="uploadAvatar"
          />
          <v-btn
            style="top: 8px; right: 8px; position: absolute"
            color="primary"
            class="text-none"
            rounded
            depressed
            icon
            @click="$refs.uploader.click()"
          >
            <v-icon>mdi-cloud-upload</v-icon>
          </v-btn>
        </v-card>
        <v-card v-if="project.tags.length" class="mb-4 pa-2">
          <v-chip v-for="item in project.tags" :key="item.id" class="ma-1">{{
            item.name
          }}</v-chip>
        </v-card>

        <v-card class="mb-4">
          <v-list two-line>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{ project.name }}</v-list-item-title>
                <v-list-item-subtitle>Название проекта</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{ project.description }}</v-list-item-title>
                <v-list-item-subtitle>Описание</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{ project.category }}</v-list-item-title>
                <v-list-item-subtitle>Категория проекта</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-btn
            style="width: 100%"
            :to="`/projects/${$route.params.projectId}/update`"
            >Редактировать</v-btn
          >
        </v-card>

        <v-list>
          <v-subheader>Создатель</v-subheader>

          <v-list-item link :to="`/users/${project.creator[0].id}`">
            <v-list-item-avatar>
              <v-img
                :src="`${baseURL}posts/media/avatars/${project.creator[0].avatar_image}`"
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title
                v-text="
                  `${project.creator[0].name} ${project.creator[0].last_name}`
                "
              />
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-list>
          <v-subheader>Контрибьюторы</v-subheader>
          <div v-for="(item, index) in statuses" :key="index">
            <v-divider v-if="index !== 0" inset />

            <v-list-item link :to="`/users/${item.user.id}`">
              <v-list-item-avatar>
                <v-img
                  :src="`${baseURL}posts/media/avatars/${item.user.avatar_image}`"
                ></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title
                  v-text="`${item.user.name} ${item.user.last_name}`"
                ></v-list-item-title>
                <v-list-item-subtitle v-text="item.name"></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </div>
        </v-list>

        <v-card class="mb-4">
          <TimeLine :project="project" />
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="mb-4" style="display: flex">
          <v-btn :to="`/projects/${$route.params.projectId}/board`" class="mr-4"
            >Доска</v-btn
          >
          <v-btn :to="`/projects/${$route.params.projectId}/calendar`"
            >Календарь</v-btn
          >
          <v-dialog v-model="dialog" max-width="600">
            <template #activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                color="primary"
                dark
                fixed
                bottom
                right
                fab
                v-on="on"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <v-form @submit.prevent="createActive">
              <v-card>
                <v-toolbar color="primary" dark
                  >Создать новую активность</v-toolbar
                >
                <v-card-text>
                  <v-text-field v-model="model.name" placeholder="Название" />
                  <v-text-field
                    v-model="model.description"
                    placeholder="Описание"
                  />
                  <v-text-field v-model="model.link" placeholder="Ссылка" />
                </v-card-text>
                <v-card-actions class="justify-end">
                  <v-btn text @click="dialog = false">Отменить</v-btn>
                  <v-btn color="primary" text type="submit">Сохранить</v-btn>
                </v-card-actions>
              </v-card>
            </v-form>
          </v-dialog>
        </v-card>

        <ContributeCard
          v-for="item in activities"
          :key="item.id"
          :activity="item"
        />
      </v-col>
      <v-col cols="12" md="3">
        <v-card class="mb-2">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">
                Заголовок для получения денег
              </v-list-item-title>
              <v-list-item-subtitle>Описание денег</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-card-actions class="d-flex flex-column">
            <v-progress-linear
              color="purple"
              rounded
              value="80"
            ></v-progress-linear>
            <Popup />
          </v-card-actions>
        </v-card>
        <v-card class="mb-2">
          <v-btn
            style="width: 100%"
            color="secondary"
            small
            @click="createStage"
            >Начать {{ stage }}</v-btn
          >
        </v-card>
        <v-card>
          <CommentCard :comments="comments" />
          <v-divider />

          <v-card-text class="pb-0">
            <v-form @submit.prevent="sendComment">
              <v-layout>
                <v-textarea
                  ref="input"
                  v-model="message"
                  rows="1"
                  auto-grow
                  @keydown.ctrl.enter="sendComment"
                />
                <div>
                  <v-btn :disabled="!message" type="submit" icon large>
                    <v-icon> mdi-send </v-icon>
                  </v-btn>
                </div>
              </v-layout>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CommentCard from '~/components/CommentCard'
import ContributeCard from '~/components/ContributeCard'
import TimeLine from '~/components/TimeLine'
import Popup from '~/components/PopUp'
import { stages, categories } from '~/assets/statuses'

export default {
  components: {
    Popup,
    CommentCard,
    TimeLine,
    ContributeCard,
  },

  inject: ['messageSubject'],

  data: () => ({
    baseURL: process.env.BASE_URL,
    project: null,
    statuses: [],
    comments: [],
    activities: [],
    projectStages: [],
    message: '',
    dialog: false,
    stages,
    categories,
    model: {
      name: '',
      description: '',
      link: '',
    },
  }),

  async fetch() {
    try {
      this.project = await this.$axios.$get(
        `get_project/${this.$route.params.projectId}/`
      )
      this.statuses = (
        await this.$axios.$get(
          `get_project_status/${this.$route.params.projectId}/`
        )
      ).statuses
      this.comments = (
        await this.$axios.$get(
          `get_project_comment/${this.$route.params.projectId}/`
        )
      ).comments
      this.activities = (
        await this.$axios.$get(
          `get_project_active/${this.$route.params.projectId}/`
        )
      ).activities
      this.projectStages = (
        await this.$axios.$get(
          `get_project_stage/${this.$route.params.projectId}/`
        )
      ).stage.reverse()
    } catch {
      this.$router.push('/')
    }
  },

  computed: {
    stageGroup() {
      return stages[categories.indexOf(this.project.category)]
    },
    stage() {
      return (
        this.projectStages &&
        this.stageGroup[
          this.stageGroup.indexOf(this.projectStages[0]?.name) + 1
        ]
      )
    },
  },

  mounted() {
    if (this.messageSubject) {
      this.messageSubject.subscribe(async () => {
        this.comments = (
          await this.$axios.$get(
            `get_project_comment/${this.$route.params.projectId}/`
          )
        ).comments
      })
    }
  },

  methods: {
    createStage() {
      this.$axios
        .$post('write_stage/', {
          name: this.stage,
          project: +this.$route.params.projectId,
          description: '',
          period: '',
        })
        .then((data) => {
          this.projectStages.unshift(data)
        })
    },
    uploadAvatar(event) {
      const image = event.target.files[0]
      if (image) {
        const fd = new FormData()
        fd.set('image', image)
        this.$axios
          .$post(`update_project_image/${this.$route.params.projectId}/`, fd)
          .then(({ img_name }) => {
            this.project.image = img_name
          })
      }
    },
    createActive() {
      this.$axios
        .$post('write_active/', {
          ...this.model,
          project: this.$route.params.projectId,
          user: this.$store.state.UserModule.user.id,
        })
        .then((data) => {
          this.dialog = false
          this.activities.unshift(data)
        })
    },
    sendComment() {
      const article = `Добавлен комментарий к проекту ${this.project.name} от ${this.$store.state.UserModule.user.name} ${this.$store.state.UserModule.user.last_name}: ${this.message}`
      this.$axios
        .$post('write_comment/', {
          project: +this.$route.params.projectId,
          user: this.$store.state.UserModule.user.id,
          description: this.message,
        })
        .then(() => {
          return this.$axios.$post('write_event/', {
            name: article,
            project: +this.$route.params.projectId,
            user: this.$store.state.UserModule.user.id,
          })
        })
        .then(() => {
          const fd = new FormData()
          fd.set('title', article)
          fd.set(
            'description',
            JSON.stringify({
              userId: this.$store.state.UserModule.user.id,
              message: this.message,
            })
          )
          return this.$axios.$post(
            'http://ws-cyber-garden.admire.social/api/notification/project/' +
              this.$route.params.projectId,
            fd
          )
        })
        .then(() => {
          this.message = ''
          return this.$axios.$get(
            `get_project_comment/${this.$route.params.projectId}/`
          )
        })
        .then(({ comments }) => {
          this.comments = comments
        })
    },
  },
}
</script>
