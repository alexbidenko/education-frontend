<template>
  <v-form style="height: 100%; display: flex; align-items: center">
    <v-container>
      <v-row class="py-12">
        <v-col cols="12" md="8" class="mx-auto">
          <h1 class="text-h4 mb-12">Войдите в свой аккаунт</h1>
          <v-text-field
            v-model="login.email"
            label="Email"
            outlined
          ></v-text-field>
          <v-text-field
            v-model="login.password"
            label="Пароль"
            outlined
            type="password"
          ></v-text-field>
          <div class="d-flex justify-space-between">
            <v-btn color="primary" :loading="isRequest" @click="userLogin"
              >Войти</v-btn
            >
            <v-btn outlined to="/registration">Регистрация</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: 'Login',
  layout: 'empty',
  data: () => ({
    login: {
      email: '',
      password: '',
    },
    isRequest: false,
  }),
  methods: {
    async userLogin() {
      try {
        this.isRequest = true
        const response = await this.$axios.$post('authorization/', this.login)
        this.$cookies.set('USER_ID', response.id)
        this.$cookies.set('USER_EMAIL', response.email)

        this.$router.push('/')
      } catch (error) {
        console.log(error)
      }
      this.isRequest = false
    },
  },
}
</script>
