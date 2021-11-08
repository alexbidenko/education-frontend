<template>
  <v-container>
    <v-row class="py-6">
      <v-col cols="12" sm="6" md="4">
        <v-card class="mb-4">
          <img
            class="indexPage__avatar"
            src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2020/05/01/08/avatar-sigourney-weaver.jpg?width=1200&auto=webp&quality=75"
          />
        </v-card>
        <v-card class="mx-auto">
          <v-list two-line>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Test</v-list-item-title>
                <v-list-item-subtitle>Имя</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Test</v-list-item-title>
                <v-list-item-subtitle>Фамилия</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Test</v-list-item-title>
                <v-list-item-subtitle>Отчество</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Test</v-list-item-title>
                <v-list-item-subtitle>Тип пользователя</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>aliconnors@example.com</v-list-item-title>
                <v-list-item-subtitle>Email</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>2021-05-28</v-list-item-title>
                <v-list-item-subtitle>Дата регистрации</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <PreviewProject preview />
    </v-row>
  </v-container>
</template>

<script>
import PreviewProject from '~/components/PreviewProjects/index.vue'

export default {
  components: {
    PreviewProject,
  },
  // middleware: 'auth',
  mounted() {
    this.$axios.$post('write_user/', {
      name: 'miha',
      last_name: 'kopec',
      patronimyc: 'alexandrovich',
      type: 'uchenik',
      email: 'huy',
      password: 'sosi moy valiy her',
      organization: 'parasha',
      avatar_image: 'fotka',
    })
  },
}
</script>

<style lang="scss">
.indexPage {
  &__avatar {
    width: 100%;
    display: block;
  }
}
</style>
