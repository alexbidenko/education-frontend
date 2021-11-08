<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" md="8" class="mx-auto">
          <v-text-field
            :email="login.email"
            label="Email"
            outlined
            full-width
          ></v-text-field>
          <v-text-field
            :password="login.password"
            label="Пароль"
            outlined
            full-width
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
      const { email, password } = this.login
      try {
        const response = await this.$axios.$post('', this.login)
        if (email !== '' && password !== '') {
          return null
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
