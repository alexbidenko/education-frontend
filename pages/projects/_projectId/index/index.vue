<template>
  <v-container fluid>
    <v-row v-if="project">
      <v-col cols="12" md="3">
        <v-card class="mb-4">
          <img
            style="width: 100%; display: block; min-height: 40px"
            :src="
              project.image
                ? `${baseURL}posts/media/proj_img/${project.image}`
                : '/assets/substrate.jpg'
            "
          />
          <template v-if="project.creator[0].id === user.id">
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
          </template>
        </v-card>
        <v-card v-if="project.tags.length" class="mb-4 pa-2">
          <v-chip
            v-for="item in project.tags"
            :key="item.id"
            class="ma-1"
            :to="`/search?tags=${item.name}`"
            >{{ item.name }}</v-chip
          >
        </v-card>

        <v-alert v-if="currentStage" border="left" color="indigo" dark>
          <small style="width: 100%; display: block">Статус проекта</small>
          {{ currentStage }}
        </v-alert>

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
                :src="
                  project.creator[0].avatar_image
                    ? `${baseURL}posts/media/avatars/${project.creator[0].avatar_image}`
                    : '/assets/substrate.jpg'
                "
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

        <v-list v-if="statuses.length">
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

        <TimeLine :project="project" />
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="mb-4" style="display: flex">
          <v-btn :to="`/projects/${$route.params.projectId}/board`" class="mr-4"
            >Доска</v-btn
          >
          <v-btn
            :to="`/projects/${$route.params.projectId}/calendar`"
            class="mr-4"
            >Календарь</v-btn
          >
          <v-dialog
            v-if="
              statuses.some((el) => el.user.id === user.id) ||
              project.creator[0].id === user.id
            "
            v-model="dialog"
            max-width="600"
          >
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
                  <v-textarea
                    v-model="model.description"
                    auto-grow
                    rows="2"
                    placeholder="Описание"
                  />
                  <v-text-field v-model="model.link" placeholder="Ссылка" />
                  <v-select
                    v-model="model.type"
                    :items="activitiesSelect"
                    label="Тип активности"
                  ></v-select>
                  <v-file-input
                    accept="image/*"
                    label="Прикрепить файл"
                    @change="model.file = $event"
                  />
                </v-card-text>
                <v-card-actions class="justify-end">
                  <v-btn text @click="dialog = false">Отменить</v-btn>
                  <v-btn
                    color="primary"
                    text
                    type="submit"
                    :disabled="!model.description || !model.type"
                    :loading="isRequest"
                    >Сохранить</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-form>
          </v-dialog>
          <v-dialog v-else max-width="600">
            <template #activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                fixed
                bottom
                right
                fab
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-account-plus</v-icon>
              </v-btn>
            </template>
            <template #default="connectDialog">
              <v-card>
                <v-toolbar color="primary" dark
                  >Присоединиться к проекту</v-toolbar
                >
                <v-card-text>
                  <v-select
                    v-model="role"
                    :items="items"
                    label="Выберите роль"
                  ></v-select>
                </v-card-text>
                <v-card-actions class="justify-end">
                  <v-btn text @click="connectDialog.value = false"
                    >Отменить</v-btn
                  >
                  <v-btn
                    text
                    :loading="isRequestConnect"
                    @click="contributeProject(project.id, project)"
                    >Присоединиться</v-btn
                  >
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </v-card>

        <v-card v-if="!notEmpty && project.creator[0].id === user.id">
          <v-card-title>Начните развивать свой проект</v-card-title>
          <v-card-text
            >Заполните всю информацию проекта, пригласите новых участников
            проекта, которые помогут вам в его развитии, внесите свой вклад в
            развитие своей идеи.</v-card-text
          >
        </v-card>

        <v-card class="mb-4">
          <v-card-text class="pb-0">
            <v-select
              v-model="selectedType"
              :items="['Не указано', ...activitiesSelect]"
              label="Фильтрация по активности"
            />
          </v-card-text>
        </v-card>

        <ContributeCard
          v-for="item in activities"
          :key="item.id"
          :activity="item"
        />

        <v-card v-if="!activities.length">
          <v-card-text>Пустой список активностей</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card
          v-if="
            currentStage &&
            currentStage.toLowerCase().includes('инвест') &&
            projectStages[0]
          "
          class="mb-2"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">
                Инвестирование
              </v-list-item-title>
              <v-list-item-subtitle>{{
                projectStages[0].description
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-card-actions class="d-flex flex-column">
            <div
              style="display: flex; justify-content: space-between; width: 100%"
            >
              <small>{{
                moneys.reduce((a, el) => a + +el.sum, 0).toLocaleString()
              }}</small>
              <v-spacer />
              <small>{{ (+projectStages[0].period).toLocaleString() }}</small>
            </div>
            <v-progress-linear
              color="purple"
              rounded
              :value="sum"
            ></v-progress-linear>
            <PopUp :stage="projectStages[0]" @update="updateMoney" />
          </v-card-actions>
        </v-card>
        <v-card v-if="project.creator[0].id === user.id && stage" class="mb-2">
          <v-btn
            style="width: 100%"
            color="secondary"
            small
            :loading="isSaveStage"
            @click="createStage"
            >Начать {{ stage }}</v-btn
          >
        </v-card>
        <v-card>
          <v-card-subtitle>Комментарии проекта</v-card-subtitle>
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
                  <v-btn
                    :disabled="!message || isSendMessage"
                    type="submit"
                    icon
                    large
                  >
                    <v-icon> mdi-send </v-icon>
                  </v-btn>
                </div>
              </v-layout>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="stageDialog" max-width="600">
      <v-card>
        <v-card-title>Обозначьте финансовые цели</v-card-title>
        <v-card-text>
          <v-textarea
            v-model="description"
            placeholder="Расскажите о ваших финансовых целях и необходимой сумме для развития проект."
            auto-grow
            rows="4"
          />
          <v-text-field
            v-model="summ"
            placeholder="Необходимая денежная сумма"
            type="number"
          />
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="stageDialog = false">Отменить</v-btn>
          <v-btn
            color="primary"
            text
            type="submit"
            :disabled="!description || isNaN(summ)"
            :loading="isSaveStage"
            @click="createStage(description, summ)"
            >Начать</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import CommentCard from '~/components/CommentCard'
import ContributeCard from '~/components/ContributeCard'
import TimeLine from '~/components/TimeLine'
import PopUp from '~/components/PopUp'
import { stages, categories, activitiesSelect } from '~/assets/statuses'

export default {
  components: {
    PopUp,
    CommentCard,
    TimeLine,
    ContributeCard,
  },

  inject: ['messageSubject', 'userSubject'],

  data: () => ({
    items: ['Участник', 'Ментор', 'Спонсор', 'Эксперт', 'Научный руководитель'],
    role: '',
    description: '',
    summ: '',
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
    selectedType: 'Не указано',
    activitiesSelect,
    isSendMessage: false,
    isSaveStage: false,
    stageDialog: false,
    isRequestConnect: false,
    moneys: [],
    notEmpty: false,
    model: {
      name: '',
      description: '',
      link: '',
      type: '',
      file: null,
    },
    isRequest: false,
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
      await this.getActivity()
      this.projectStages = (
        await this.$axios.$get(
          `get_project_stage/${this.$route.params.projectId}/`
        )
      ).stage.reverse()
      if (this.projectStages[0]?.name.includes('инвест')) {
        this.moneys = (
          await this.$axios.$get(`get_stage_money/${this.projectStages[0].id}/`)
        ).money
      }
    } catch {
      this.$router.push('/')
    }
  },

  computed: {
    sum() {
      return Math.ceil(
        (this.moneys.reduce((a, el) => a + +el.sum, 0) /
          +this.projectStages[0].period) *
          100
      )
    },
    stageGroup() {
      return stages[categories.indexOf(this.project.category)] || []
    },
    stage() {
      const index = this.stageGroup.indexOf(this.projectStages[0]?.name) + 1
      return index >= this.stageGroup.length
        ? ''
        : this.projectStages && this.stageGroup[index]
    },
    currentStage() {
      return (
        this.projectStages &&
        this.stageGroup[this.stageGroup.indexOf(this.projectStages[0]?.name)]
      )
    },
    user() {
      return this.$store.state.UserModule.user
    },
  },

  watch: {
    selectedType() {
      this.getActivity()
    },
  },

  mounted() {
    if (this.messageSubject) {
      this.messageSubject.subscribe(() => {
        Promise.all([
          this.$axios
            .$get(`get_project_comment/${this.$route.params.projectId}/`)
            .then(({ comments }) => {
              this.comments = comments
            }),
          this.$axios
            .$get(`get_project_status/${this.$route.params.projectId}/`)
            .then(({ statuses }) => {
              this.statuses = statuses
            }),
          this.getActivity(),
        ])
      })
    }
    if (this.userSubject) {
      this.userSubject.subscribe((data) => {
        if (data.projectId === +this.$route.params.projectId) {
          this.getActivity()
        }
      })
    }
  },

  methods: {
    updateMoney() {
      this.$axios
        .$get(`get_stage_money/${this.projectStages[0].id}/`)
        .then((d) => {
          this.moneys = d.money
        })
    },
    async getActivity() {
      this.activities = (
        await this.$axios.$get(
          `get_project_active/${this.$route.params.projectId}/`,
          {
            params: {
              type:
                this.selectedType !== 'Не указано'
                  ? this.selectedType
                  : undefined,
            },
          }
        )
      ).activities
      this.notEmpty = this.notEmpty || !!this.activities.length
    },
    createStage(description = '', summ = '') {
      if (!this.stage.includes('инвест') || (description && summ)) {
        this.isSaveStage = true
        this.$axios
          .$post('write_stage/', {
            name: this.stage,
            project: +this.$route.params.projectId,
            description,
            period: summ,
          })
          .then((data) => {
            this.projectStages.unshift(data)
            if (data.name.includes('инвест')) {
              this.$axios.$get(`get_stage_money/${data.id}/`).then((d) => {
                this.moneys = d.money
              })
            }
          })
          .finally(() => {
            this.stageDialog = false
            this.isSaveStage = false
          })
      } else this.stageDialog = true
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
      const article = `К проекту ${this.project.name} добавлена активность от ${
        this.statuses.find((el) => el.user.id === this.user.id)?.name || ''
      } ${this.user.name} ${this.user.last_name}`

      this.isRequest = true

      const fd = new FormData()
      fd.set('title', article)
      fd.set(
        'description',
        JSON.stringify({
          userId: this.user.id,
          message: this.message,
          projectId: this.project.id,
        })
      )

      Promise.all([
        this.$axios
          .$post('write_active/', {
            ...this.model,
            project: this.$route.params.projectId,
            user: this.user.id,
          })
          .then((data) => {
            if (this.model.file) {
              const fd = new FormData()
              fd.set('image', this.model.file)

              return this.$axios
                .$post(`update_active_file/${data.id}/`, fd)
                .then(({ file }) => ({ ...data, file }))
            }
            return data
          })
          .then((data) => {
            this.model.name = ''
            this.model.link = ''
            this.model.description = ''
            this.model.type = ''
            this.model.file = null
            this.dialog = false
            this.activities.unshift(data)
          })
          .finally(() => {
            this.isRequest = false
          }),
        this.$axios.$post('write_event/', {
          name: article,
          project: +this.project.id,
          user: this.project.creator[0].id,
        }),
        this.$axios.$post(
          'https://ws-lab-lake.admire.social/api/notification/user/' +
            this.project.creator[0].id,
          fd
        ),
        this.$axios.$post(
          'https://ws-lab-lake.admire.social/api/notification/project/' +
            this.project.id,
          fd
        ),
      ])
    },
    sendComment() {
      const article = `Добавлен комментарий к проекту ${this.project.name} от ${this.user.name} ${this.user.last_name}: ${this.message}`
      this.isSendMessage = true

      const fd = new FormData()
      fd.set('title', article)
      fd.set(
        'description',
        JSON.stringify({
          userId: this.user.id,
          message: this.message,
        })
      )

      Promise.all([
        this.$axios
          .$post('write_comment/', {
            project: +this.$route.params.projectId,
            user: this.user.id,
            description: this.message,
          })
          .then(() => {
            this.message = ''
            return this.$axios.$get(
              `get_project_comment/${this.$route.params.projectId}/`
            )
          })
          .then(({ comments }) => {
            this.comments = comments
            this.isSendMessage = false
          }),
        this.$axios.$post(
          'https://ws-lab-lake.admire.social/api/notification/project/' +
            this.$route.params.projectId,
          fd
        ),
      ])
    },
    contributeProject(id, project) {
      const article = `К проекту ${project.name} присоединился ${this.role} ${this.user.name} ${this.user.last_name}`
      this.isRequestConnect = true

      const fd = new FormData()
      fd.set('title', article)
      fd.set(
        'description',
        JSON.stringify({
          userId: this.user.id,
          message: this.message,
        })
      )

      Promise.all([
        this.$axios
          .$post('write_status/', {
            name: this.role,
            project: id,
            user: this.$store.state.UserModule.user.id,
          })
          .then(() => {
            this.$router.app.refresh()
          })
          .finally(() => {
            this.isRequestConnect = true
          }),
        this.$axios.$post('write_event/', {
          name: article,
          project: +id,
          user: project.creator[0].id,
        }),
        this.$axios.$post(
          'https://ws-lab-lake.admire.social/api/notification/user/' +
            project.creator[0].id,
          fd
        ),
      ])
    },
  },
}
</script>
