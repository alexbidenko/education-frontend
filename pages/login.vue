<template>
  <v-form style="height: 100%; display: flex; align-items: center">
    <v-container>
      <v-row>
        <v-col cols="12" md="8" class="mx-auto">
          <v-text-field
            v-model="login.email"
            label="Email"
            outlined
            full-width
          ></v-text-field>
          <v-text-field
            v-model="login.password"
            label="Пароль"
            outlined
            full-width
            type="password"
          ></v-text-field>
          <div class="d-flex justify-space-between">
            <v-btn depressed color="primary" @click="userLogin">Войти</v-btn>
            <v-btn depressed color="secondary" to="/registration"
              >Зарегистрироваться</v-btn
            >
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    login: {
      email: '',
      password: '',
    },
  }),
  methods: {
    async userLogin() {
      try {
        const response = await this.$axios.$post('authorization/', this.login)
        this.$cookies.set('USER_ID', response.id)
        this.$cookies.set('USER_EMAIL', response.email)

        this.$router.push('/')
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
